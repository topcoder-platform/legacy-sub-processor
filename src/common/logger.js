/**
 * Configure the logger.
 */
const config = require('config')
const winston = require('winston')

// Initialize the logger
const logger = new winston.Logger({
  level: config.LOG_LEVEL,
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger
