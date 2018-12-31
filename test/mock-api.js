/**
 * The mock server for challenge api
 */
const http = require('http')
const send = require('http-json-response')
const logger = require('../src/common/logger')

// only include used properties and you may check real response from https://api.topcoder-dev.com/v4/challenges?filter=id=30005521
const getChallenge = (subTrack) => ({
  result: {
    content: [{subTrack}]
  }
})
const responses = {
  '/challenges?filter=id=30005521': getChallenge('DEVELOPMENT'),
  '/challenges?filter=id=30005540': getChallenge('ARCHITECTURE'),
  '/challenges?filter=id=30005530': getChallenge('DEVELOPMENT'),
  '/challenges?filter=id=30054163': getChallenge('DEVELOP_MARATHON_MATCH'),
  '/challenges?filter=id=30054378': getChallenge('DEVELOP_MARATHON_MATCH'),
  '/challenges?filter=id=60005521': getChallenge('')
}

const mockServer = http.createServer((req, res) => {
  logger.debug(`${req.method} ${req.url}`)
  if (req.method === 'GET' && Object.keys(responses).includes(req.url)) {
    return send(res, 200, responses[req.url])
  } else if (req.method === 'GET' && req.url.match(/^\/challenges\?filter=id=\d+$/)) {
    // default to mock as mm challenge
    return send(res, 200, getChallenge('DEVELOP_MARATHON_MATCH'))
  } else {
    // 404 for other routes
    res.statusCode = 404
    res.end('Not Found')
  }
})

module.exports = {
  mockServer
}
