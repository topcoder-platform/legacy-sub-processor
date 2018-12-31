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

/**
 * Update Review Score for submission
 * @param {Object} event the event
 * @param {Object} db the informix database
 */
module.exports.updateReviewScore = async (Axios, m2m, event, db) => {
  // Axios instance to make calls to the Submission API
  const axios = Axios.create({
    baseURL: config.SUBMISSION_API_URL,
    timeout: config.SUBMISSION_TIMEOUT
  })

  let reviewScore = _.get(event, 'payload.score')
  let submissionId = _.get(event, 'payload.submissionId')
  let testType = _.get(event, 'payload.metadata.testType')

  // M2M token necessary for pushing to Bus API
  let apiOptions = null
  if (m2m) {
    const token = await m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
    apiOptions = { headers: { 'Authorization': `Bearer ${token}` } }
  }

  let sub = await axios.get(`/submissions/${submissionId}`, apiOptions)
  sub = sub.data
  if (!sub.legacySubmissionId) {
    throw new Error(`legacySubmissionId not found`)
  }

  // only handle new submission topic
  if (event.topic === config.KAFKA_NEW_SUBMISSION_TOPIC) {
    await LegacySubmissionIdService.updateReviewScore(db, sub.legacySubmissionId, reviewScore, testType)
  }
}
