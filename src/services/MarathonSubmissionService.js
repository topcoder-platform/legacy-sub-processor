/**
 * The service to handle marathon match challenge submission events.
 */
const _ = require('lodash')
const config = require('config')
const LegacySubmissionIdService = require('./LegacySubmissionIdService')

/**
 * Handle marathon match challenge submission events.
 * @param {Object} axios the axios
 * @param {Object} event the event
 * @param {Object} db the informix database
 * @param {Number} timestamp the timestamp
 */
module.exports.handleMarathonSubmission = async (axios, event, db, timestamp) => {
  let challengeId = _.get(event, 'payload.challengeId')
  let memberId = _.get(event, 'payload.memberId')
  let isExample = _.get(event, 'payload.isExample', 0)
  let url = _.get(event, 'payload.url')
  // only handle new submission topic
  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    await LegacySubmissionIdService.addMMSubmission(db, challengeId,
      memberId,
      isExample,
      url,
      timestamp
    )
  }
}
