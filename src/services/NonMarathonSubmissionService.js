/**
 * The service to handle non marathon match challenge submission events.
 */
const _ = require('lodash')
const Joi = require('joi')
const config = require('config')
const LegacySubmissionIdService = require('./LegacySubmissionIdService')
const logger = require('../common/logger')
/**
 * Handle non marathon match challenge submission events.
 * @param {Object} axios the axios instance for submission api
 * @param {Object} event the event
 * @param {Object} db the informix database
 * @param {Object} m2m the m2m auth
 * @param {IDGenerator} idUploadGen IDGenerator instance of upload
 * @param {IDGenerator} idSubmissionGen IDGenerator instance of submission
 * @param {Number} timestamp the timestamp
 */
module.exports.handleNonMarathonSubmission = async (axios, event, db, m2m, idUploadGen, idSubmissionGen, timestamp) => {
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
    if (sub.updated) {
      // only check if exist such field
      const updatedTimestamp = Joi.attempt(sub.updated, Joi.date()).getTime()
      if (timestamp > updatedTimestamp) {
        // CWD-- is the event actually newer than the data in the db? maybe ES hasn't updated yet so let's take the event data for the URL
        sub.url = _.get(event, 'payload.url', sub.url)
      }
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
