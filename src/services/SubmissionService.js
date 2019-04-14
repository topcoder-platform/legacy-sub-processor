/**
 * The service to handle new submission events for non-MM challenge.
 */
const config = require('config')
const Joi = require('joi')

const logger = require('legacy-processor-module/common/logger')
const Schema = require('legacy-processor-module/Schema')
const LegacySubmissionIdService = require('legacy-processor-module/LegacySubmissionIdService')

// The event schema to validate events from Kafka
const eventSchema = Schema.createEventSchema({
  id: Joi.sid().required(),
  resource: Joi.resource(),
  challengeId: Joi.id().required(),
  memberId: Joi.id().required(),
  submissionPhaseId: Joi.id().required(),
  type: Joi.string().required(),
  url: Joi.string().uri().optional(),
  legacySubmissionId: Joi.id().optional()
})

/**
 * Handle new submission message.
 * @param {String} value the message value (JSON string)
 */
async function handle (value) {
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
  if (!Schema.validateEvent(event, eventSchema)) {
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

  // Attempt to retrieve the subTrack of the challenge
  const subTrack = await LegacySubmissionIdService.getSubTrack(event.payload.challengeId)
  logger.debug(`Challenge ${event.payload.challengeId} get subTrack ${subTrack}`)

  const mmChallangeSubtracks = config.MM_CHALLENGE_SUBTRACK.split(',').map(x => x.trim())

  // Skip MM challenge submissions
  if (!subTrack || mmChallangeSubtracks.includes(subTrack)) {
    logger.debug(`Skipped event for subTrack: ${subTrack}`)
    return
  }

  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    // Handle new submission
    const patchObject = await LegacySubmissionIdService.addSubmission(
      event.payload.id,
      event.payload.challengeId,
      event.payload.memberId,
      event.payload.submissionPhaseId,
      event.payload.url,
      event.payload.type
    )

    logger.debug(`Patched to the Submission API: id ${event.payload.id}, patch: ${JSON.stringify(patchObject)}`)
  } else if (event.payload.url) {
    // We only concerns updating url,
    // while the update event may not be caused by url update

    let legacySubmissionId = event.payload.legacySubmissionId
    if (!legacySubmissionId) {
      // In case legacySubmissionId not present, try to get it from submission API
      const submission = await LegacySubmissionIdService.getSubmission(event.payload.id)
      legacySubmissionId = submission.legacySubmissionId || 0
    }

    await LegacySubmissionIdService.updateUpload(
      event.payload.challengeId,
      event.payload.memberId,
      event.payload.submissionPhaseId,
      event.payload.url,
      event.payload.type,
      legacySubmissionId
    )
    logger.debug(`Submission url updated, legacy submission id : ${legacySubmissionId} with url ${event.payload.url}`)
  }

  logger.debug(`Successful Processing of non MM challenge submission message: ${JSON.stringify(event, null, 2)}`)
}

module.exports = {
  handle
}
