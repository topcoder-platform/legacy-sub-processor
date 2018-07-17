/**
 * The main entry of the application.
 */
const Promise = require('bluebird')
const Kafka = require('no-kafka')
const config = require('config')
const util = require('util')
const logger = require('./src/common/logger')
const NewSubmissionService = require('./src/services/NewSubmissionService')

/**
 * Handle the messsages from Kafka.
 * @param {Array<Object>} messsages the messages
 * @param {String} topic the topic
 * @param {Number} partition the partition
 * @private
 */
function handleMessages (messages, topic, partition) {
  return Promise.each(messages, (m) => {
    const messageValue = m.message.value ? m.message.value.toString('utf8') : null
    const messageInfo = `message from topic ${topic}, partition ${partition}, offset ${m.offset}: ${messageValue}`

    logger.debug(`Received ${messageInfo}`)

    // Handle the event
    return NewSubmissionService.handle(messageValue)
      .then(() => {
        logger.debug(`Completed handling ${messageInfo}`)

        // Commit offset
        return consumer.commitOffset({ topic, partition, offset: m.offset })
          .catch(err => {
            logger.error(`Failed to commit offset for ${messageInfo}: ${err.message}`)
            logger.error(util.inspect(err))
          })
      })
      .catch(err => {
        // Catch all errors thrown by the handler
        logger.error(`Failed to handle ${messageInfo}: ${err.message}`)
        logger.error(util.inspect(err))
      })
  })
}

// Initialize the consumer
const consumer = new Kafka.GroupConsumer({
  groupId: config.KAFKA_GROUP_ID,
  connectionString: config.KAFKA_URL,
  ssl: {
    cert: config.KAFKA_CLIENT_CERT,
    key: config.KAFKA_CLIENT_CERT_KEY
  }
})

// Start to listen from the Kafka topic
consumer.init({
  subscriptions: [config.KAFKA_NEW_SUBMISSION_TOPIC],
  handler: handleMessages
})
  .catch(err => {
    logger.error(util.inspect(err))
    process.exit(1)
  })
