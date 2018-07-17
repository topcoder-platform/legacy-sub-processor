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
    submission: {
      id: 111,
      challengeId: 1234,
      memberId: 4321,
      url: 'http://content.topcoder.com/some/path',
      type: 'ContestSubmission'
    }
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
          submission: {
            id: 0,
            challengeId: 'a',
            memberId: 'b',
            url: 'invalid url',
            type: null
          }
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
const eventId = Number(process.argv[2])

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
