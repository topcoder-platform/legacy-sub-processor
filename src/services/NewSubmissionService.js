/**
 * The service to handle new submission events.
 */
const config = require('config')
const Axios = require('axios')
const Joi = require('joi')
const _ = require('lodash')
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
    submissionId: Joi.alternatives().try(Joi.id(), Joi.string().uuid()),
    challengeId: Joi.id(),
    memberId: Joi.id(),
    submissionPhaseId: Joi.id(),
    url: Joi.string().uri().required(),
    type: Joi.string().required(),
    isFileSubmission: Joi.boolean().optional(),
    fileType: Joi.string().optional(),
    filename: Joi.string().optional()
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
  if (event.topic !== config.KAFKA_NEW_SUBMISSION_TOPIC) {
    logger.debug(`Skipped event from topic ${event.topic}`)
    return
  }
  if (event.originator !== config.KAFKA_NEW_SUBMISSION_ORIGINATOR) {
    logger.debug(`Skipped event from originator ${event.originator}`)
    return
  }

  // Generate a legacy submission id
  const legacySubmissionId = await LegacySubmissionIdService.addSubmission(dbOpts, event.payload.challengeId,
    event.payload.memberId,
    event.payload.submissionPhaseId,
    event.payload.type,
    idUploadGen,
    idSubmissionGen
  )
  logger.debug('Submission was added with id: ' + legacySubmissionId)

  // Update to the Submission API
  await axios.put(`/submissions/${event.payload.submissionId}`, {
    id: event.payload.id,
    legacySubmissionId
  })

  logger.debug(`Updated to the Submission API: id ${event.payload.submissionId}, legacy submission id ${legacySubmissionId}`)
}

module.exports = {
  handle
}
