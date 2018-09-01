/**
 * The service to handle new submission events.
 */
const config = require('config')
const Axios = require('axios')
const Joi = require('joi')
const _ = require('lodash')
const m2mAuth = require('tc-core-library-js').auth.m2m
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
async function handle (value, dbOpts, idUploadGen, idSubmissionGen) {
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
  if (config.AUTH0_CLIENT_ID && config.AUTH0_CLIENT_SECRET) {
    const m2m = m2mAuth(_.pick(config, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME']))
    const token = await m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
    apiOptions = { headers: { 'Authorization': `Bearer ${token}` } }
  }

  let sub = await axios.get(`/submissions/${event.payload.id}`, apiOptions)
  sub = sub.data
  logger.debug(`fetched latest record for ${event.payload.id}: ${JSON.stringify(sub)}`)

  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    logger.info('new create topic')
    const legacySubmissionId = await LegacySubmissionIdService.addSubmission(dbOpts, sub.challengeId,
      sub.memberId,
      sub.submissionPhaseId,
      sub.url,
      sub.type,
      idUploadGen,
      idSubmissionGen
    )
    logger.debug('Submission was added with id: ' + legacySubmissionId)

    // Update to the Submission API
    await axios.patch(`/submissions/${event.payload.id}`, {
      legacySubmissionId
    }, apiOptions)

    logger.debug(`Updated to the Submission API: id ${event.payload.id}, legacy submission id ${legacySubmissionId}`)
  } else {
    logger.info('new update topic')
    if (event.timestamp > sub.updated) { // CWD-- is the event actually newer than the data in the db? maybe ES hasn't updated yet so let's take the event data for the URL
      sub.url = _.get(event, 'payload.url', sub.url)
    }

    await LegacySubmissionIdService.updateUpload(dbOpts, sub.challengeId,
      sub.memberId,
      sub.submissionPhaseId,
      sub.url,
      sub.type,
      sub.legacySubmissionId || 0
    )
    logger.debug(`Uploaded submission updated legacy submission id : ${event.payload.legacySubmissionId} with url ${sub.url}`)
  }
}

module.exports = {
  handle
}
