/**
 * The script to send test events to Kafka.
 */
// Make sure that we don't send test events in production environment by mistake
process.env.NODE_ENV = 'test'

const Kafka = require('no-kafka')
const config = require('config')
const _ = require('lodash')
const util = require('util')
const logger = require('../src/common/logger')

// The good sample message
const sampleMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 111,
    submissionId: 111,
    challengeId: 1234,
    memberId: 4321,
    resource: 'submission',
    url: 'https://topcoder-dev-submissions.s3.amazonaws.com/cfdbc0cf-6437-433e-8af1-c56f317f2afd',
    type: 'Contest Submission'
  }
}

// The test events
const events = [
  // Different topic, not consumed by the app
  { topic: 'different-topic', message: { value: 'message' } },

  // Null message
  { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: null } },

  // Empty message
  { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '' } },

  // Not well-formed JSON string
  { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: 'abc' } },

  // Empty JSON string
  { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '{}' } },

  // Invalid timestamp and payload
  {
    topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
    message: {
      value: JSON.stringify(_.merge({}, sampleMessage, {
        timestamp: 'invalid date',
        payload: {
          id: 0,
          challengeId: 'a',
          memberId: 'b',
          url: 'invalid url',
          resource: 'submission',
          type: null
        }
      }))
    }
  },

  // Wrong message topic
  {
    topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
    message: {
      value: JSON.stringify(_.merge({}, sampleMessage, {
        topic: 'wrong-topic'
      }))
    }
  },

  // Wrong message originator
  {
    topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
    message: {
      value: JSON.stringify(_.merge({}, sampleMessage, {
        originator: 'wrong-originator'
      }))
    }
  },

  // Good message
  { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
]

// Init the producer and send the test events
const producer = new Kafka.Producer({
  connectionString: config.KAFKA_URL,
  ssl: {
    cert: config.KAFKA_CLIENT_CERT,
    key: config.KAFKA_CLIENT_CERT_KEY
  }
})

// Get event id from argument
// npm run produce-test-event 0
let eventId

if (process.argv.length > 4) {
  // custom event
  sampleMessage.topic = process.argv[2]
  sampleMessage.payload.challengeId = Number(process.argv[3])
  sampleMessage.payload.memberId = Number(process.argv[4])
  sampleMessage.payload.submissionPhaseId = Number(process.argv[5])
  if (typeof process.argv[6] !== 'undefined') {
    sampleMessage.payload.legacySubmissionId = process.argv[6]
  }
  eventId = 9
  events[eventId] = { topic: process.argv[2], message: { value: JSON.stringify(sampleMessage) } }
} else {
  eventId = Number(process.argv[2])
}

producer.init()
  .then(() => producer.send(events[eventId]))
  .then((results) => {
    logger.debug(`Produced event ${util.inspect(events[eventId])}`)
    logger.debug(results)
  })
  .then(() => process.exit(0))
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
