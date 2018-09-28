/**
 * The service to handle new submission events.
 */
const _ = require('lodash')
const config = require('config')
const Axios = require('axios')
const Joi = require('joi')
const logger = require('../common/logger')
const LegacySubmissionIdService = require('./LegacySubmissionIdService')

// Custom Joi type
Joi.id = () => Joi.number().integer().positive().required()

// The event schema to validate events from Kafka
const eventSchema = Joi.object().keys({
  topic: Joi.string().required(),
  originator: Joi.string().required(),
  timestamp: Joi.date().required(),
  'mime-type': Joi.string().required(),
  payload: Joi.object().keys({
    id: Joi.alternatives().try(Joi.id(), Joi.string().uuid()).required(),
    resource: Joi.alternatives().try(Joi.string().valid('submission'), Joi.string().valid('review')),
    challengeId: Joi.id(),
    memberId: Joi.id(),
    submissionPhaseId: Joi.id(),
    url: Joi.string().uri().required(),
    type: Joi.string().required(),
    legacySubmissionId: Joi.number().integer().positive().optional()
  }).required().unknown(true)
})

// Axios instance to make calls to the Submission API
const axios = Axios.create({
  baseURL: config.SUBMISSION_API_URL,
  timeout: config.SUBMISSION_TIMEOUT
})

/**
 * Handle new submission message.
 * @param {String} value the message value (JSON string)
 */
async function handle (value, db, m2m, idUploadGen, idSubmissionGen) {
  if (!value) {
    logger.debug('Skipped null or empty event')
    return
  }

  // Parse JSON string to get the event
  let event
  try {
    event = JSON.parse(value)
  } catch (err) {
    logger.debug(`Skipped non well-formed JSON message: ${err.message}`)
    return
  }

  if (!event) {
    logger.debug('Skipped null or empty event')
    return
  }

  // Validate event
  const validationResult = Joi.validate(event, eventSchema, { abortEarly: false, stripUnknown: true })
  if (validationResult.error) {
    const validationErrorMessage = _.map(validationResult.error.details, 'message').join(', ')
    logger.debug(`Skipped invalid event, reasons: ${validationErrorMessage}`)
    return
  }

  // Check topic and originator
  if (event.topic !== config.KAFKA_NEW_SUBMISSION_TOPIC && event.topic !== config.KAFKA_UPDATE_SUBMISSION_TOPIC) {
    logger.debug(`Skipped event from topic ${event.topic}`)
    return
  }

  if (event.originator !== config.KAFKA_NEW_SUBMISSION_ORIGINATOR) {
    logger.debug(`Skipped event from originator ${event.originator}`)
    return
  }

  if (event.payload.resource !== 'submission') {
    logger.debug(`Skipped event from resource ${event.payload.resource}`)
    return
  }

  // M2M token necessary for pushing to Bus API
  let apiOptions = null
  if (m2m) {
    const token = await m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
    apiOptions = { headers: { 'Authorization': `Bearer ${token}` } }
  }

  let sub = await axios.get(`/submissions/${event.payload.id}`, apiOptions)
  sub = sub.data
  logger.debug(`fetched latest record for ${event.payload.id}: ${JSON.stringify(sub)}`)

  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    const idObject = await LegacySubmissionIdService.addSubmission(db, sub.challengeId,
      sub.memberId,
      sub.submissionPhaseId,
      sub.url,
      sub.type,
      idUploadGen,
      idSubmissionGen
    )
    const legacyId = _.values(idObject)[0]
    const legacyKey = _.keys(idObject)[0]
    logger.debug(`id with key ${legacyKey} has value ${legacyId}`)

    // Update to the Submission API
    await axios.patch(`/submissions/${event.payload.id}`, idObject, apiOptions)

    logger.debug(`Updated to the Submission API: id ${event.payload.id}, id ${legacyId}`)
  } else {
    if (event.timestamp > sub.updated) { // CWD-- is the event actually newer than the data in the db? maybe ES hasn't updated yet so let's take the event data for the URL
      sub.url = _.get(event, 'payload.url', sub.url)
    }

    await LegacySubmissionIdService.updateUpload(db, sub.challengeId,
      sub.memberId,
      sub.submissionPhaseId,
      sub.url,
      sub.type,
      sub.legacySubmissionId || 0
    )
    logger.debug(`Uploaded submission updated legacy submission id : ${sub.legacySubmissionId || 0} with url ${sub.url}`)
  }
}

module.exports = {
  handle
}
