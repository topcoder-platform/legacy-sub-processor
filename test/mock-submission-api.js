/**
 * The mock Submission API.
 */
const http = require('http')
const send = require('http-json-response')
const logger = require('../src/common/logger')

// The good sample message
const sampleMessage = {
  id: 111,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95245
}

// The good sample message
const sampleUpdateMessage = {
  id: 112,
  challengeId: 30005521,
  memberId: 124916,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path/updated',
  type: 'Contest Submission',
  submissionPhaseId: 95245
}

// The good final fix sample message
const sampleFinalFixMessage = {
  id: 113,
  challengeId: 30005540,
  memberId: 132458,
  resource: 'submission',
  url: 'http://content.topcoder.com/some/path',
  type: 'Contest Submission',
  submissionPhaseId: 95308
}

const normalMessage = {
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

const responses = {
  '/submissions/111': sampleMessage,
  '/submissions/112': sampleUpdateMessage,
  '/submissions/113': sampleFinalFixMessage,
  '/submissions/cfdbc0cf-6437-433e-8af1-c56f317f2afd': normalMessage
}

const server = http.createServer((req, res) => {
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
  } else if (req.method === 'GET' &&
    (req.url.match(/^\/submissions\/[1-9]\d*$/) ||
     req.url.match(/^\/submissions\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi))) {
    return send(res, 200, responses[req.url] || normalMessage)
  } else {
    // 404 for other routes
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(3000)

module.exports = server
