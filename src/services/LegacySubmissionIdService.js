/**
 * Legacy submission service
 */
const logger = require('../common/logger')
const constant = require('../common/constant')
const _ = require('lodash')

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

const QUERY_GET_CHALLENGE_PROPERTIES = 'select r.resource_id, pi28.value, pp.phase_type_id, pcl.project_type_id ' +
  'from project p, project_category_lu pcl, resource r, project_phase pp, outer project_info pi28 ' +
  'where p.project_category_id = pcl.project_category_id and p.project_id = r.project_id ' +
  'and r.user_id = :userId and r.resource_role_id = :resourceRoleId and p.project_id = pp.project_id ' +
  'and pp.project_phase_id = :phaseId and p.project_id = pi28.project_id ' +
  'and pi28.project_info_type_id = 28 and p.project_id = :challengeId'

const QUERY_UPDATE_UPLOAD_BY_SUBMISSION_ID = 'update upload set url = ":newUrl" where ' +
  'upload_id in (select s.upload_id from submission s, upload uu where uu.upload_id = s.upload_id and s.submission_id = :submissionId)'

const QUERY_UPDATE_UPLOAD = 'update upload set url = ":newUrl" where ' +
  'upload_id in (select upload_id from ' +
  ' (select first 1 upload_id from upload where project_id = :challengeId and project_phase_id = :phaseId ' +
  ' and resource_id = :resourceId and upload_status_id = 1 order by create_date desc))'

/**
 * Get upload resource, isAllowMultipleSumbmission property, phase type, cand challenge type
 * for a given user, challenge id, resource role id and phase id
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} resourceRoleId resource role id
 * @param {Number} phaseId submission phasse id
 * @returns {Array} [resourceId, isAllowMultipleSumbmission, phaseTypeId, challengeTypeId]
 */
function getChallengeProperties (db, challengeId, userId, resourceRoleId, phaseId) {
  return db.query(QUERY_GET_CHALLENGE_PROPERTIES.replace(/:challengeId/, challengeId)
    .replace(/:userId/, userId)
    .replace(/:resourceRoleId/, resourceRoleId)
    .replace(/:phaseId/, phaseId))
    .then((cursor) => {
      return cursor.fetchAll({ close: true })
    })
    .then((result) => {
      logger.debug('Challenge properties for: ' + challengeId + ' are: ' + result)
      if (!_.isArray(result) || _.isEmpty(result)) {
        throw new Error('null or empty result get challenge properties for : challenge ' + challengeId)
      }
      return result[0]
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

/**
 * Add submission
 *
 * @param {Object} informix the database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} phaseId phase id
 * @param {String} submissionType submission type
 * @param {IDGenerator} idUploadGen IDGenerator instance of upload
 * @param {IDGenerator} idSubmissionGen IDGenerator instance of submission
 */
async function addSubmission (informix, challengeId, userId, phaseId, url, submissionType, idUploadGen, idSubmissionGen) {
  const props = await getChallengeProperties(informix, challengeId, userId, constant.SUBMISSION_TYPE[submissionType].roleId, phaseId)

  let uploadType = null
  let uploadId = null
  let submissionId = null
  let resourceId = props[0]
  let isAllowMultipleSubmission = props[1] === 'true'
  let phaseTypeId = props[2]
  let challengeTypeId = props[3]

  if (challengeTypeId === constant.CHALLENGE_TYPE['Studio']) {
    isAllowMultipleSubmission = true
  }

  uploadId = await idUploadGen.getNextId()
  if (phaseTypeId === constant.PHASE_TYPE['Final Fix']) {
    uploadType = constant.UPLOAD_TYPE['Final Fix']
  } else {
    submissionId = await idSubmissionGen.getNextId()
    uploadType = constant.UPLOAD_TYPE['Submission']
  }

  logger.debug('add submission for resourceId: ' + resourceId +
        ' uploadId: ' + uploadId +
        ' submissionId: ' + submissionId +
        ' allow multyple submission: ' + isAllowMultipleSubmission +
        ' uploadType: ' + uploadType +
        ' challengeTypeId: ' + challengeTypeId)

  var ctx = informix.createContext()
  if (uploadType === constant.UPLOAD_TYPE['Final Fix']) {
    return ctx.begin()
      .then(() => {
        var values = [ uploadId, challengeId, phaseId, resourceId, uploadType, constant.UPLOAD_STATUS['Active'],
          '"N/A"', '"' + url + '"', userId, 'current', userId, 'current' ]
        logger.debug('insert upload with values : ' + values)
        return ctx.query(QUERY_INSERT_UPLOAD.replace(/:values/, values.join(',')))
      })
      .then((cursor) => {
        cursor.close()
        return ctx.commit()
      })
      .then(() => {
        return { 'legacyUploadId': uploadId }
      })
      .catch(e => {
        ctx.rollback()
        throw e
      })
      .finally(() => {
        return ctx.end()
      })
  } else {
    return ctx.begin()
      .then(() => {
        var values = [ uploadId, challengeId, phaseId, resourceId, uploadType, constant.UPLOAD_STATUS['Active'],
          '"N/A"', '"' + url + '"', userId, 'current', userId, 'current' ]
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
        return { 'legacySubmissionId': submissionId }
      })
      .catch(e => {
        ctx.rollback()
        throw e
      })
      .finally(() => {
        return ctx.end()
      })
  }
}

/**
 * Update upload url of latest user submission
 * If submission is provided then it will use it
 *
 * @param {Object} informix the database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} phaseId phase id
 * @param {String} url new url value
 * @param {String} submissionType submission type
 * @param {Number} submissionId submission id
 */
async function updateUpload (informix, challengeId, userId, phaseId, url, submissionType, submissionId) {
  let sql

  if (submissionId > 0) {
    sql = QUERY_UPDATE_UPLOAD_BY_SUBMISSION_ID.replace(/:newUrl/, url).replace(/:submissionId/, submissionId)
  } else {
    logger.warn('no valid submission id')
    let props = await getChallengeProperties(informix, challengeId, userId, constant.SUBMISSION_TYPE[submissionType].roleId, phaseId)
    sql = QUERY_UPDATE_UPLOAD.replace(/:newUrl/, url).replace(/:challengeId/, challengeId).replace(/:phaseId/, phaseId)
      .replace(/:resourceId/, props[0])
  }
  logger.debug(sql)

  return informix.query(sql).then(cursor => cursor.close())
}

module.exports = {
  addSubmission,
  updateUpload
}
