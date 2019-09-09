/**
 * The main entry of the application.
 */
require('legacy-processor-module/bootstrap')

const config = require('config')
const KafkaConsumer = require('legacy-processor-module/KafkaConsumer')

const SubmissionService = require('./src/services/SubmissionService')
const tracer = require('legacy-processor-module/common/tracer')

// Initialize tracing if configured.
// Even if tracer is not initialized, all calls to tracer module will not raise any errors
if (config.has('tracing')) {
  tracer.initTracing(config.get('tracing'))
}

const consumer = KafkaConsumer.startConsumer(SubmissionService, [config.KAFKA_AGGREGATE_SUBMISSION_TOPIC])

if (process.env.NODE_ENV === 'test') {
  module.exports = consumer
}
