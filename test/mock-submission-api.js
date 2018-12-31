/**
 * The mock Submission API.
 */
const config = require('config')
const http = require('http')
const path = require('path')
const fs = require('fs')
const send = require('http-json-response')
const logger = require('../src/common/logger')

// The good sample submission
const sampleSubmission = {
  id: 111,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95245
}

// The good sample submission
const sampleUpdateSubmission = {
  id: 112,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path/updated',
  type: 'Contest Submission',
  submissionPhaseId: 95245
}

// The good final fix sample submission
const sampleFinalFixSubmission = {
  id: 113,
  challengeId: 30005540,
  memberId: 132458,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95308
}

// The good studio sample submission
const sampleStudioSubmission = {
  id: 114,
  challengeId: 30005530,
  memberId: 124764,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95288
}

// The good not allow multiple submission sample submission
const sampleNotAllowMultipleSubmission = {
  id: 115,
  challengeId: 30005540,
  memberId: 132458,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95301
}

// The good no challenge properties sample submission
const sampleNoChallengePropertiesSubmission = {
  id: 116,
  challengeId: 30005530,
  memberId: 132458,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95308
}

// The good sample legacy update submission
const sampleLegacyUpdateSubmission = {
  id: 117,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path/legacyupdated',
  type: 'Contest Submission',
  submissionPhaseId: 95245,
  legacySubmissionId: 93000,
  updated: '2018-02-16T00:00:00'
}

const normalSubmission = {
  'resource': 'submission',
  'id': 'cfdbc0cf-6437-433e-8af1-c56f317f2afd',
  'type': 'Contest Submission',
  'url': 'https://topcoder-dev-submissions.s3.amazonaws.com/cfdbc0cf-6437-433e-8af1-c56f317f2afd',
  'memberId': 124916,
  'challengeId': 30005521,
  'created': '2018-07-31T17:05:17.835Z',
  'updated': '2018-07-31T17:05:17.835Z',
  'createdBy': 'callmekatootie',
  'updatedBy': 'callmekatootie',
  'submissionPhaseId': 95245,
  'isFileSubmission': true,
  'fileType': 'zip',
  'filename': 'Photo on 7-30-18 at 11.47 AM #2.jpg'
}

// The good sample MM update submission
const sampleLegacyMMSubmission = {
  id: 118,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'review',
  typeId: 'bcf2b43b-20df-44d1-afd3-7fc9787213e',
  type: 'Contest Submission',
  score: 90,
  legacySubmissionId: 93002,
  updated: '2018-02-16T00:00:00'
}

const responses = {
  '/submissions/111': sampleSubmission,
  '/submissions/112': sampleUpdateSubmission,
  '/submissions/113': sampleFinalFixSubmission,
  '/submissions/114': sampleStudioSubmission,
  '/submissions/115': sampleNotAllowMultipleSubmission,
  '/submissions/116': sampleNoChallengePropertiesSubmission,
  '/submissions/117': sampleLegacyUpdateSubmission,
  '/submissions/118': sampleLegacyMMSubmission,
  '/submissions/cfdbc0cf-6437-433e-8af1-c56f317f2afd': normalSubmission
}
const codePath = '/submissionTexts/cfdbc0cf-6437-433e-8af1-c56f317f2afd'
const submissionPath = path.join(__dirname, './test_files/Test.java')
const submissionText = fs.readFileSync(submissionPath)
const mockSubmissionApi = http.createServer((req, res) => {
  logger.debug(`${req.method} ${req.url}`)
  // PUT /submissions/:id
  if ((req.method === 'PUT' || req.method === 'PATCH') &&
      (req.url.match(/^\/submissions\/[1-9]\d*$/) ||
       req.url.match(/^\/submissions\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi))) {
    let body = ''
    req.on('data', chunk => {
      // Convert Buffer to string
      body += chunk.toString()
    })
    req.on('end', () => {
      logger.debug(body)

      // Always return 200 response
      res.statusCode = 200
      res.end()
    })
  } else if (req.method === 'GET' && req.url.includes(codePath)) {
    // will mock download file request
    res.writeHead(200, {'content-type': 'application/text'})
    fs.createReadStream(submissionPath).pipe(res)
  } else if (req.method === 'GET' &&
    (req.url.match(/^\/submissions\/[1-9]\d*$/) ||
     req.url.match(/^\/submissions\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi))) {
    return send(res, 200, responses[req.url] || normalSubmission)
  } else {
    // 404 for other routes
    res.statusCode = 404
    res.end('Not Found')
  }
})
if (!module.parent) {
  const port = config.MOCK_SUBMISSION_API_PORT || 3000
  mockSubmissionApi.listen(port)
  console.log(`mock submission api is listen port ${port}`)
}
module.exports = {
  sampleSubmission,
  sampleUpdateSubmission,
  sampleFinalFixSubmission,
  sampleStudioSubmission,
  sampleNotAllowMultipleSubmission,
  sampleNoChallengePropertiesSubmission,
  sampleLegacyUpdateSubmission,
  sampleLegacyMMSubmission,
  mockSubmissionApi,
  submissionUrl: `${config.SUBMISSION_API_URL}${codePath}`,
  submissionText
}
