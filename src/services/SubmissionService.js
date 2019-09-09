/**
 * The service to handle new submission events for non-MM challenge.
 */
const config = require('config')
const Joi = require('joi')

const logger = require('legacy-processor-module/common/logger')
const Schema = require('legacy-processor-module/Schema')
const LegacySubmissionIdService = require('legacy-processor-module/LegacySubmissionIdService')
const tracer = require('legacy-processor-module/common/tracer')

// The event schema to validate events from Kafka
const eventSchema = Schema.createEventSchema({
  id: Joi.sid().required(),
  resource: Joi.resource(),
  challengeId: Joi.id().required(),
  memberId: Joi.id().required(),
  submissionPhaseId: Joi.id().required(),
  type: Joi.string().required(),
  url: Joi.string()
    .uri()
    .optional(),
  legacySubmissionId: Joi.id().optional()
})

/**
 * Handle new submission and update submission event.
 * @param {Object} event the event object
 * @param {Object} parentSpan the parent span object
 */
async function handle (event, parentSpan = null) {
  const span = tracer.buildSpans('SubmissionService.handle', parentSpan)

  if (!event) {
    logger.debug('Skipped null or empty event')
    span.setTag('error', true)
    span.log({
      event: 'error',
      message: 'Skipped null or empty event'
    })
    span.finish()
    return
  }

  // Check topic and originator
  if (event.topic !== config.KAFKA_AGGREGATE_SUBMISSION_TOPIC) {
    logger.debug(`Skipped event from topic ${event.topic}`)
    span.setTag('error', true)
    span.log({
      event: 'error',
      message: `Skipped event from topic ${event.topic}`,
      eventReceived: event
    })
    span.finish()
    return
  }

  if (event.originator !== config.KAFKA_NEW_SUBMISSION_ORIGINATOR) {
    logger.debug(`Skipped event from originator ${event.originator}`)
    span.setTag('error', true)
    span.log({
      event: 'error',
      message: `Skipped event from originator ${event.originator}`,
      eventReceived: event
    })
    span.finish()
    return
  }
  span.setTag('originator', event.originator)

  if (event.payload.resource !== 'submission') {
    logger.debug(`Skipped event from resource ${event.payload.resource}`)
    span.setTag('error', true)
    span.log({
      event: 'error',
      message: `Skipped event from resource ${event.payload.resource}`,
      eventReceived: event
    })
    span.finish()
    return
  }

  // Validate event
  if (!Schema.validateEvent(event, eventSchema)) {
    span.setTag('error', true)
    span.log({
      event: 'error',
      message: 'Received event does not match expected schema',
      eventReceived: event
    })
    span.finish()
    return
  }

  // If valid schema, log the event and add tags
  span.log({
    event: 'debug',
    message: 'Received valid event',
    eventReceived: event
  })
  Object.keys(event.payload).forEach((key) => {
    const valueType = typeof event.payload[key]
    // Tag values can only be numbers, boolean or strings
    if (valueType === 'number' || valueType === 'boolean' || valueType === 'string') {
      span.setTag(key, event.payload[key])
    }
  })

  // Attempt to retrieve the subTrack of the challenge
  const subTrack = await LegacySubmissionIdService.getSubTrack(
    event.payload.challengeId,
    span
  )
  logger.debug(
    `Challenge ${event.payload.challengeId} get subTrack ${subTrack}`
  )
  span.setTag('subTrack', subTrack)

  const mmChallangeSubtracks = config.MM_CHALLENGE_SUBTRACK.split(',').map(x =>
    x.trim()
  )

  // Skip MM challenge submissions
  if (!subTrack || mmChallangeSubtracks.includes(subTrack)) {
    logger.debug(`Skipped event for subTrack: ${subTrack}`)
    span.log({
      event: 'debug', // Not an error event
      message: `Skipped event for subTrack: ${subTrack}`
    })
    span.finish()
    return
  }

  if (event.payload.originalTopic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    // Handle new submission
    logger.debug(`Started adding submission for ${event.payload.id}`)
    try {
      const timestamp = Date.parse(event.payload.created)
      const patchObject = await LegacySubmissionIdService.addSubmission(
        event.payload.id,
        event.payload.challengeId,
        event.payload.memberId,
        event.payload.submissionPhaseId,
        event.payload.url,
        event.payload.type,
        timestamp,
        false,
        span
      )

      logger.debug(
        `Successfully processed non MM message - Patched to the Submission API: id ${
          event.payload.id
        }, patch: ${JSON.stringify(patchObject)}`
      )
      span.log({
        event: 'debug',
        message: 'Successfully processed non MM message - Patched to the Submission API',
        patch: patchObject
      })
      span.finish()
    } catch (error) {
      logger.error(
        `Failed to handle ${JSON.stringify(event)}: ${error.message}`
      )
      logger.error(error)
      tracer.logSpanError(span, error)
      span.finish()
      throw error
    }
  } else if (event.payload.url) {
    // We only concerns updating url,
    // while the update event may not be caused by url update

    let legacySubmissionId = event.payload.legacySubmissionId
    if (!legacySubmissionId) {
      // In case legacySubmissionId not present, try to get it from submission API
      const submission = await LegacySubmissionIdService.getSubmission(
        event.payload.id,
        span
      )
      legacySubmissionId = submission.legacySubmissionId || 0
    }

    logger.debug(
      `Started updating URL for submission for ${legacySubmissionId}`
    )
    try {
      await LegacySubmissionIdService.updateUpload(
        event.payload.challengeId,
        event.payload.memberId,
        event.payload.submissionPhaseId,
        event.payload.url,
        event.payload.type,
        legacySubmissionId,
        span
      )
      logger.debug(
        `Successfully processed non MM message - Submission url updated, legacy submission id : ${legacySubmissionId} with url ${
          event.payload.url
        }`
      )
    } catch (error) {
      logger.error(
        `Failed to handle ${JSON.stringify(event)}: ${error.message}`
      )
      logger.error(error)
      tracer.logSpanError(span, error)
      throw error
    } finally {
      span.finish()
    }
  }
}

module.exports = {
  handle
}
