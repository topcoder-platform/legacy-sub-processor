/**
 * Legacy submission service
 */
const logger = require('../common/logger')
const constant = require('../common/constant')
const _ = require('lodash')
const Informix = require('informix').Informix
const URL = require('url').URL

const QUERY_GET_RESOURCE_FOR_USER = 'select resource_id  from resource where project_id=:challengeId ' +
  'and user_id=:userId and resource_role_id=:resourceRoleId'

const QUERY_MULTIPLE_SUB_CONFIG = 'select value from project_info where project_id =:challengeId and ' +
  'project_info_type_id=28'

const QUERY_INSERT_UPLOAD = 'insert into upload(upload_id, project_id, project_phase_id, resource_id,' +
  'upload_type_id, upload_status_id, parameter, url, create_user, create_date, modify_user, modify_date) ' +
  'values(:values)'

const QUERY_INSERT_SUBMISSION = 'insert into submission (submission_id, upload_id, submission_status_id, ' +
  'submission_type_id, create_user, create_date, modify_user, modify_date) values(:values)'

const QUERY_INSERT_RESOURCE_SUBMISSION = 'insert into resource_submission (resource_id, submission_id, ' +
  'create_user, create_date, modify_user, modify_date) values(:values)'

const QUERY_DELETE_SUBMISSION = 'update submission set submission_status_id =' + constant.SUBMISSION_STATUS['Deleted'] +
  ' where upload_id in (select upload_id from upload where project_id=:challengeId and resource_id=:resourceId ' +
  ' and upload_status_id=' + constant.UPLOAD_STATUS['Deleted'] + ')'

const QUERY_DELETE_UPLOAD = 'update upload set upload_status_id =' + constant.UPLOAD_STATUS['Deleted'] +
  ' where project_id=:challengeId and resource_id=:resourceId and upload_id <> :uploadId'

const QUERY_GET_PHASE_TYPE_ID = 'select phase_type_id from project_phase where project_phase_id=:phaseId and project_id=:challengeId'

/**
 * Get resource for a given user, challenge id, and resource role id
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} resourceRoleId resource role id
 */
function getResourceForUserId (db, challengeId, userId, resourceRoleId) {
  return db.query(QUERY_GET_RESOURCE_FOR_USER.replace(/:challengeId/, challengeId)
    .replace(/:userId/, userId)
    .replace(/:resourceRoleId/, resourceRoleId))
    .then((cursor) => {
      return cursor.fetchAll({close: true})
    })
    .then((result) => {
      logger.debug('Resource id result for : challenge ' + challengeId + ' memberId: ' +
                  userId + ' is ' + result)
      if (!_.isArray(result) || _.isEmpty(result)) {
        throw new Error('null or empty result get resourceId for : challenge ' + challengeId + ' memberId: ' +
                  userId)
      }
      return result[0][0]
    })
}

/**
 * Get "Allow multiple submissions" property
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 */
function getAllowMultipleSubmission (db, challengeId) {
  return db.query(QUERY_MULTIPLE_SUB_CONFIG.replace(/:challengeId/, challengeId))
    .then(cursor => {
      return cursor.fetchAll({close: true})
    })
    .then(result => {
      if (_.isArray(result) && !_.isEmpty(result)) {
        return result[0][0] === 'true'
      }
      return false
    })
}

/**
 * Get phase type id
 * @param {Informix} db database
 * @param {Number} phaseId phase id
 * @param {Number} challengeId chaleenge id
 */
function getPhaseTypeId (db, phaseId, challengeId) {
  return db.query(QUERY_GET_PHASE_TYPE_ID.replace(/:phaseId/, phaseId).replace(/:challengeId/, challengeId))
    .then(cursor => {
      return cursor.fetchAll({close: true})
    })
    .then(result => {
      if (!_.isArray(result) || _.isEmpty(result)) {
        throw new Error('Can not found phase type of phaseId: ' + phaseId)
      }
      return result[0][0]
    })
}

/**
 * Add submission
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} phaseId phase id
 * @param {String} submissionType submission type
 * @param {IDGenerator} idUploadGen IDGenerator instance of upload
 * @param {IDGenerator} idSubmissionGen IDGenerator instance of submission
 */
async function addSubmission (dbOpts, challengeId, userId, phaseId, url, submissionType, idUploadGen, idSubmissionGen) {
  const informix = new Informix(dbOpts)

  var uploadType = constant.UPLOAD_TYPE['Submission']
  var phaseTypeId = getPhaseTypeId(informix, phaseId, challengeId)
  var resourceId = getResourceForUserId(informix, challengeId, userId, constant.SUBMISSION_TYPE[submissionType].roleId)
  var isAllowMultipleSubmission = getAllowMultipleSubmission(informix, challengeId)
  var uploadId = idUploadGen.getNextId()
  var submissionId = idSubmissionGen.getNextId()

  uploadId = await uploadId
  submissionId = await submissionId
  resourceId = await resourceId
  phaseTypeId = await phaseTypeId
  isAllowMultipleSubmission = await isAllowMultipleSubmission

  if (phaseTypeId === constant.PHASE_TYPE['Final Fix']) {
    uploadType = constant.UPLOAD_TYPE['Final Fix']
  }

  const s3Url = new URL(url)

  logger.debug('add submission for resourceId: ' + resourceId +
        ' uploadId: ' + uploadId +
        ' submissionId: ' + submissionId +
        ' allow multyple submission: ' + isAllowMultipleSubmission +
        ' uploadType: ' + uploadType)

  var ctx = informix.createContext()
  return ctx.begin()
    .then(() => {
      var values = [ uploadId, challengeId, phaseId, resourceId, uploadType, constant.UPLOAD_STATUS['Active'],
        '"N/A"', '"' + s3Url.pathname.substring(1) + '"', userId, 'current', userId, 'current' ]
      logger.debug('insert upload with values : ' + values)
      return ctx.query(QUERY_INSERT_UPLOAD.replace(/:values/, values.join(',')))
    })
    .then((cursor) => {
      cursor.close()
      var values = [ submissionId, uploadId, constant.SUBMISSION_STATUS['Active'], constant.SUBMISSION_TYPE[submissionType].id,
        userId, 'current', userId, 'current' ]
      logger.debug('insert submission with values: ' + values)
      return ctx.query(QUERY_INSERT_SUBMISSION.replace(/:values/, values.join(',')))
    })
    .then((cursor) => {
      cursor.close()
      var values = [ resourceId, submissionId, userId, 'current',
        userId, 'current' ]
      logger.debug('insert resource_submission with values: ' + values)
      return ctx.query(QUERY_INSERT_RESOURCE_SUBMISSION.replace(/:values/, values.join(',')))
    })
    .then(async (cursor) => {
      cursor.close()
      if (!isAllowMultipleSubmission) {
        await deletePreviousSubmission(ctx, challengeId, resourceId, uploadId)
      }
      return ctx.commit()
    })
    .then(() => {
      ctx.end()
      return submissionId
    })
    .catch(e => {
      ctx.rollback()
      throw e
    })
}

/**
 * Set delete to previous submission
 *
 * @param {Context} ctx informix db context
 * @param {Number} challengeId challenge id
 * @param {Number} resourceId resource id
 * @param {Number} uploadId upload id
 */
function deletePreviousSubmission (ctx, challengeId, resourceId, uploadId) {
  return ctx.query(QUERY_DELETE_UPLOAD.replace(/:challengeId/, challengeId).replace(/:resourceId/, resourceId)
    .replace(/:uploadId/, uploadId))
    .then(cursor => {
      cursor.close()
      return ctx.query(QUERY_DELETE_SUBMISSION.replace(/:challengeId/, challengeId)
        .replace(/:resourceId/, resourceId))
    })
    .then(cursor => {
      return cursor.close()
    })
}

module.exports = { addSubmission }
