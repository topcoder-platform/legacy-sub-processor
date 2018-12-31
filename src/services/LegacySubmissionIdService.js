/**
 * Legacy submission service
 */
const logger = require('../common/logger')
const constant = require('../common/constant')
const _ = require('lodash')

const QUERY_INSERT_UPLOAD = `insert into upload(upload_id, project_id, project_phase_id, resource_id,
  upload_type_id, upload_status_id, parameter, url, create_user, create_date, modify_user, modify_date)
  values(@uploadId@, @challengeId@, @phaseId@, @resourceId@, @uploadType@, @uploadStatusId@, 
  @parameter@,@url@, @createUser@, @createDate@, @modifyUser@, @modifyDate@)`

const QUERY_INSERT_SUBMISSION = `insert into submission (submission_id, upload_id, submission_status_id,
  submission_type_id, create_user, create_date, modify_user, modify_date) values(@submissionId@, 
  @uploadId@, @submissionStatusId@,@submissionTypeId@, @createUser@, @createDate@, @modifyUser@, @modifyDate@)`

const QUERY_INSERT_RESOURCE_SUBMISSION = `insert into resource_submission (resource_id,
   submission_id, create_user, create_date, modify_user, modify_date) 
  values(@resourceId@, @submissionId@, @createUser@, @createDate@, @modifyUser@, @modifyDate@)`

const QUERY_DELETE_SUBMISSION = `update submission set submission_status_id =${constant.SUBMISSION_STATUS['Deleted']}
   where upload_id in (select upload_id from upload where project_id=@challengeId@ and resource_id=@resourceId@
   and upload_status_id=${constant.UPLOAD_STATUS['Deleted']})`

const QUERY_DELETE_UPLOAD = `update upload set upload_status_id =${constant.UPLOAD_STATUS['Deleted']}
  where project_id=@challengeId@ and resource_id=@resourceId@ and upload_id <> @uploadId@`

const QUERY_GET_CHALLENGE_PROPERTIES = `select r.resource_id, pi28.value, pp.phase_type_id
  , pcl.project_type_id from project p, project_category_lu pcl, resource r, project_phase pp, outer project_info pi28 
  where p.project_category_id = pcl.project_category_id and p.project_id = r.project_id
  and r.user_id = @userId@ and r.resource_role_id = @resourceRoleId@ and p.project_id = pp.project_id 
  and pp.project_phase_id = @phaseId@ and p.project_id = pi28.project_id
  and pi28.project_info_type_id = 28 and p.project_id = @challengeId@`

const QUERY_UPDATE_UPLOAD_BY_SUBMISSION_ID = `update upload set url = @url@ where
  upload_id in (select s.upload_id from submission s, upload uu where uu.upload_id = s.upload_id and s.submission_id = @submissionId@)`

const QUERY_UPDATE_UPLOAD = `update upload set url = @url@ where
  upload_id in (select upload_id from
   (select first 1 upload_id from upload where project_id = @challengeId@ and project_phase_id = @phaseId@
   and resource_id = @resourceId@ and upload_status_id = 1 order by create_date desc))`

const QUERY_GET_MMCHALLENGE_PROPERTIES = `select pi56.value, lcs.long_component_state_id,cc.open_time,cc.language_id, 
   NVL(lcs.@numSubmissionsCol@,0) as submission_number from project p, informixoltp:round_component rc, 
  informixoltp:long_component_state lcs, project_info pi56,informixoltp:long_compilation cc
  where p.project_id = pi56.project_id and rc.round_id = pi56.value 
  and lcs.round_id = pi56.value and rc.component_id = lcs.component_id and lcs.long_component_state_id=cc.long_component_state_id
  and pi56.project_info_type_id = 56 and p.project_category_id=37 and lcs.coder_id=@userId@ and p.project_id = @challengeId@`

const QUERY_INSERT_LONG_SUBMISSION = `insert into informixoltp:long_submission(long_component_state_id, submission_number, 
  submission_text, open_time, submit_time, submission_points, language_id, example) values(@componentStateId@, @numSubmissions@, 
  @submissionText@, @openTime@, @submitTime@, @submissionPoints@, @languageId@, @isExample@)`

const QUERY_UPDATE_LONG_COMPONENT_STATE = `update informixoltp:long_component_state set points =NVL(@points@, points),status_id =@statusId@,
  @numSubmissionsCol@=@numSubmissions@ where long_component_state_id=@componentStateId@`

const QUERY_UPDATE_SUBMISSION_INITIAL_REVIEW_SCORE = `update submission set initial_score=@reviewScore@ where submission_id=@submissionId@`

const QUERY_UPDATE_SUBMISSION_FINAL_REVIEW_SCORE = `update submission set final_score=@reviewScore@ where submission_id=@submissionId@`

// will use example_submission_number if isExample=1 otherwise return submission_number
const getSubmissionNumberCol = (isExample) => (isExample ? 'example_submission_number' : 'submission_number')

/**
 * Get upload resource, isAllowMultipleSubmission property, phase type, and challenge type
 * for a given user, challenge id, resource role id and phase id
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} resourceRoleId resource role id
 * @param {Number} phaseId submission phasse id
 * @returns {Array} [resourceId, isAllowMultipleSubmission, phaseTypeId, challengeTypeId]
 */
async function getChallengeProperties (db, challengeId, userId, resourceRoleId, phaseId) {
  const result = await db.query(QUERY_GET_CHALLENGE_PROPERTIES, {challengeId, userId, resourceRoleId, phaseId})
  logger.debug(`Challenge properties for: ${challengeId} are: ${JSON.stringify(result)}`)
  if (!_.isArray(result) || _.isEmpty(result)) {
    throw new Error(`null or empty result get challenge properties for : challenge id ${challengeId}`)
  }
  return result[0]
}

/**
 * Get mm challenge related properties
 *
 * @param {Informix} db database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} isExample the is example flag
 * @returns {Array} [roundId, componentStateId, openTime, languageId, numSubmissions]
 */
async function getMMChallengeProperties (db, challengeId, userId, isExample) {
  const result = await db.query(QUERY_GET_MMCHALLENGE_PROPERTIES, {
    challengeId,
    userId,
    numSubmissionsCol: {replace: getSubmissionNumberCol(isExample)}})
  logger.debug(`MM Challenge properties for: ${challengeId} are: ${JSON.stringify(result)}`)
  if (!_.isArray(result) || _.isEmpty(result)) {
    throw new Error(`null or empty result get mm challenge properties for : challenge id ${challengeId}`)
  }
  return result[0]
}

/**
 * Set delete to previous submission
 * @param {Informix} informix the database
 * @param {Context} ctx informix db context
 * @param {Number} challengeId challenge id
 * @param {Number} resourceId resource id
 * @param {Number} uploadId upload id
 */
async function deletePreviousSubmission (informix, ctx, challengeId, resourceId, uploadId) {
  let params = {challengeId, resourceId, uploadId}
  await informix.query(ctx, QUERY_DELETE_UPLOAD, params)
  await informix.query(ctx, QUERY_DELETE_SUBMISSION, params)
}

/**
 * Add submission for marathon match challenge
 *
 * @param {Informix} informix the database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} isExample the is example flag
 * @param {String} submissionText submission text
 * @param {Number} timestamp the timestamp
 */
async function addMMSubmission (informix, challengeId, userId, isExample, submissionText, timestamp) {
  logger.debug(`add mm challenge submission for challengeId: ${challengeId}  userId: ${userId} 
  isExample: ${isExample} submissionText: ${submissionText} timestamp: ${timestamp}`)
  // query database in one sql to get all necessary fields
  let [roundId, componentStateId, openTime, languageId, numSubmissions] = await getMMChallengeProperties(informix, challengeId, userId, isExample)
  logger.debug(`get mm challenge properties roundId: ${roundId} 
   componentStateId: ${componentStateId} openTime: ${openTime} languageId: ${languageId} numSubmissions ${numSubmissions}`)
  let ctx = informix.createContext()
  try {
    await ctx.begin()
    numSubmissions++
    let params = {
      componentStateId,
      numSubmissions,
      submissionText,
      openTime,
      submitTime: timestamp,
      submissionPoints: 0,
      languageId,
      isExample // already number with 0 or 1
    }
    logger.debug(`insert long submissions with params : ${JSON.stringify(params)}`)
    await informix.query(ctx, QUERY_INSERT_LONG_SUBMISSION, params)
    params = {
      componentStateId,
      numSubmissions,
      numSubmissionsCol: {replace: getSubmissionNumberCol(isExample)},
      points: {replace: (isExample ? 'null' : 0)}, // if null will update with old value or no effects
      statusId: constant.COMPONENT_STATE.NOT_CHALLENGED
    }
    logger.debug(`update long component state with params : ${JSON.stringify(params)}`)
    await informix.query(ctx, QUERY_UPDATE_LONG_COMPONENT_STATE, params)
    await ctx.commit()
  } catch (e) {
    await ctx.rollback()
    throw e
  } finally {
    await ctx.end()
  }
}

/**
 * Add submission for non marathon match challenge
 *
 * @param {Informix} informix the database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} phaseId phase id
 * @param {String} url submission url
 * @param {String} submissionType submission type
 * @param {IDGenerator} idUploadGen IDGenerator instance of upload
 * @param {IDGenerator} idSubmissionGen IDGenerator instance of submission
 */
async function addSubmission (informix, challengeId, userId, phaseId, url, submissionType, idUploadGen, idSubmissionGen) {
  const [resourceId, value, phaseTypeId, challengeTypeId] = await getChallengeProperties(informix, challengeId,
    userId, constant.SUBMISSION_TYPE[submissionType].roleId, phaseId)
  let uploadType = null
  let submissionId = null
  let isAllowMultipleSubmission = value === 'true'
  if (challengeTypeId === constant.CHALLENGE_TYPE['Studio']) {
    isAllowMultipleSubmission = true
  }

  let uploadId = await idUploadGen.getNextId()
  if (phaseTypeId === constant.PHASE_TYPE['Final Fix']) {
    uploadType = constant.UPLOAD_TYPE['Final Fix']
  } else {
    submissionId = await idSubmissionGen.getNextId()
    uploadType = constant.UPLOAD_TYPE['Submission']
  }

  logger.debug(`add non mm challenge submission for resourceId: ${resourceId}
         uploadId: ${uploadId}
         submissionId: ${submissionId}
         allow multiple submission: ${isAllowMultipleSubmission}
         uploadType: ${uploadType}
         challengeTypeId: ${challengeTypeId}`)

  let ctx = informix.createContext()
  try {
    await ctx.begin()
    let audits = {
      createUser: userId,
      createDate: {replace: 'current'},
      modifyUser: userId,
      modifyDate: {replace: 'current'}
    }
    let params = {
      uploadId,
      challengeId,
      phaseId,
      resourceId,
      uploadType,
      url,
      uploadStatusId: constant.UPLOAD_STATUS['Active'],
      parameter: 'N/A',
      ...audits
    }
    logger.debug(`insert upload with params : ${JSON.stringify(params)}`)
    await informix.query(ctx, QUERY_INSERT_UPLOAD, params)
    if (uploadType === constant.UPLOAD_TYPE['Final Fix']) {
      await ctx.commit()
      return { 'legacyUploadId': uploadId }
    } else {
      params = {
        submissionId,
        uploadId,
        submissionStatusId: constant.SUBMISSION_STATUS['Active'],
        submissionTypeId: constant.SUBMISSION_TYPE[submissionType].id,
        ...audits
      }
      logger.debug(`insert submission with params : ${JSON.stringify(params)}`)
      await informix.query(ctx, QUERY_INSERT_SUBMISSION, params)
      params = {
        submissionId,
        resourceId,
        submissionStatusId: constant.SUBMISSION_STATUS['Active'],
        submissionTypeId: constant.SUBMISSION_TYPE[submissionType].id,
        ...audits
      }
      logger.debug(`insert resource submission with params : ${JSON.stringify(params)}`)
      await informix.query(ctx, QUERY_INSERT_RESOURCE_SUBMISSION, params)
      if (!isAllowMultipleSubmission) {
        logger.debug(`delete previous submission for challengeId: ${challengeId} resourceId: ${resourceId} uploadId:${uploadId}`)
        await deletePreviousSubmission(informix, ctx, challengeId, resourceId, uploadId)
      }
      await ctx.commit()
      return { 'legacySubmissionId': submissionId }
    }
  } catch (e) {
    await ctx.rollback()
    throw e
  } finally {
    await ctx.end()
  }
}

/**
 * Update Review Score for marathon match challenge
 *
 * @param {Informix} informix the database
 * @param {Number} submissionId
 * @param {Number} reviewScore
 * @param {Number} testType : provisional or final
 */
async function updateReviewScore (informix, submissionId, reviewScore, testType) {
  logger.debug(`update mm challenge submission review score for submissionId: ${submissionId}
         reviewScore: ${reviewScore}
         testType: ${testType}`)

  let params = {
    submissionId: submissionId,
    reviewScore: reviewScore
  }
  logger.debug(`updated submission score with params : ${JSON.stringify(params)}`)
  return informix.query((testType === 'provisional' ? QUERY_UPDATE_SUBMISSION_INITIAL_REVIEW_SCORE
    : QUERY_UPDATE_SUBMISSION_FINAL_REVIEW_SCORE), params)
}

/**
 * Update upload url of latest user submission
 * If submission is provided then it will use it
 *
 * @param {Informix} informix the database
 * @param {Number} challengeId challenge id
 * @param {Number} userId user id
 * @param {Number} phaseId phase id
 * @param {String} url new url value
 * @param {String} submissionType submission type
 * @param {Number} submissionId submission id
 */
async function updateUpload (informix, challengeId, userId, phaseId, url, submissionType, submissionId) {
  let sql
  let params

  if (submissionId > 0) {
    sql = QUERY_UPDATE_UPLOAD_BY_SUBMISSION_ID
    params = {url, submissionId}
  } else {
    logger.warn('no valid submission id')
    let [resourceId] = await getChallengeProperties(informix, challengeId, userId, constant.SUBMISSION_TYPE[submissionType].roleId, phaseId)
    sql = QUERY_UPDATE_UPLOAD
    params = {url, challengeId, phaseId, resourceId}
  }
  logger.debug(`update upload with sql ${sql} and params ${JSON.stringify(params)}`)
  return informix.query(sql, params)
}

module.exports = {
  addSubmission,
  addMMSubmission,
  updateReviewScore,
  updateUpload
}
