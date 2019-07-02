/**
 * The service to handle new submission events for non-MM challenge.
 */
const config = require("config");
const Joi = require("joi");

const logger = require("legacy-processor-module/common/logger");
const Schema = require("legacy-processor-module/Schema");
const LegacySubmissionIdService = require("legacy-processor-module/LegacySubmissionIdService");

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
});

/**
 * Handle new submission and update submission event.
 * @param {Object} event the event object
 */
async function handle(event) {
  if (!event) {
    logger.debug("Skipped null or empty event");
    return;
  }

  // Check topic and originator
  if (
    event.topic !== config.KAFKA_NEW_SUBMISSION_TOPIC &&
    event.topic !== config.KAFKA_UPDATE_SUBMISSION_TOPIC
  ) {
    logger.debug(`Skipped event from topic ${event.topic}`);
    return;
  }

  if (event.originator !== config.KAFKA_NEW_SUBMISSION_ORIGINATOR) {
    logger.debug(`Skipped event from originator ${event.originator}`);
    return;
  }

  if (event.payload.resource !== "submission") {
    logger.debug(`Skipped event from resource ${event.payload.resource}`);
    return;
  }

  // Validate event
  if (!Schema.validateEvent(event, eventSchema)) {
    return;
  }

  // Attempt to retrieve the subTrack of the challenge
  const subTrack = await LegacySubmissionIdService.getSubTrack(
    event.payload.challengeId
  );
  logger.debug(
    `Challenge ${event.payload.challengeId} get subTrack ${subTrack}`
  );

  const mmChallangeSubtracks = config.MM_CHALLENGE_SUBTRACK.split(",").map(x =>
    x.trim()
  );

  // Skip MM challenge submissions
  if (!subTrack || mmChallangeSubtracks.includes(subTrack)) {
    logger.debug(`Skipped event for subTrack: ${subTrack}`);
    return;
  }

  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    // Handle new submission
    logger.debug(`Started adding submission for ${event.payload.id}`);
    try {
      const patchObject = await LegacySubmissionIdService.addSubmission(
        event.payload.id,
        event.payload.challengeId,
        event.payload.memberId,
        event.payload.submissionPhaseId,
        event.payload.url,
        event.payload.type
      );

      logger.debug(
        `Successfully processed non MM message - Patched to the Submission API: id ${
          event.payload.id
        }, patch: ${JSON.stringify(patchObject)}`
      );
    } catch (error) {
      logger.error(`Failed to handle ${JSON.stringify(event)}: ${error.message}`)
      logger.error(error);
    }
  } else if (event.payload.url) {
    // We only concerns updating url,
    // while the update event may not be caused by url update

    let legacySubmissionId = event.payload.legacySubmissionId;
    if (!legacySubmissionId) {
      // In case legacySubmissionId not present, try to get it from submission API
      const submission = await LegacySubmissionIdService.getSubmission(
        event.payload.id
      );
      legacySubmissionId = submission.legacySubmissionId || 0;
    }

    logger.debug(
      `Started updating URL for submission for ${legacySubmissionId}`
    );
    try {
      await LegacySubmissionIdService.updateUpload(
        event.payload.challengeId,
        event.payload.memberId,
        event.payload.submissionPhaseId,
        event.payload.url,
        event.payload.type,
        legacySubmissionId
      );
      logger.debug(
        `Successfully processed non MM message - Submission url updated, legacy submission id : ${legacySubmissionId} with url ${
          event.payload.url
        }`
      );
    } catch (error) {
      logger.error(`Failed to handle ${JSON.stringify(event)}: ${error.message}`)
      logger.error(error);
    }
  }
}

module.exports = {
  handle
};
