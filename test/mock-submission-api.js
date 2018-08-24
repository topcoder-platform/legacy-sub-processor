/**
 * The mock Submission API.
 */
const http = require('http')
const logger = require('../src/common/logger')

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
  } else {
    // 404 for other routes
    res.statusCode = 404
    res.end('Not Found')
  }
})

server.listen(3000)

module.exports = server
