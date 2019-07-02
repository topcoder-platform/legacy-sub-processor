/**
 * The main entry of the application.
 */
require('legacy-processor-module/bootstrap')

const config = require('config')
const KafkaConsumer = require('legacy-processor-module/KafkaConsumer')

const SubmissionService = require('./src/services/SubmissionService')

const consumer = KafkaConsumer.startConsumer(SubmissionService, [config.KAFKA_NEW_SUBMISSION_TOPIC, config.KAFKA_UPDATE_SUBMISSION_TOPIC])

if (process.env.NODE_ENV === 'test') {
  module.exports = consumer
}
