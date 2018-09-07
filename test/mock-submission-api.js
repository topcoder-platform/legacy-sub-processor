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

const responses = {
  '/submissions/111': sampleMessage,
  '/submissions/112': sampleUpdateMessage,
  '/submissions/113': sampleFinalFixMessage
}

const server = http.createServer((req, res) => {
  logger.debug(`${req.method} ${req.url}`)

  // PUT /submissions/:id
  if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.match(/^\/submissions\/[1-9]\d*$/)) {
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
  } else if (req.method === 'GET' && req.url.match(/^\/submissions\/[1-9]\d*$/)) {
    return send(res, 200, responses[req.url])
  } else {
    // 404 for other routes
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(3000)

module.exports = server
