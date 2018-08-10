/**
 * Mocha tests of the Topcoder - Submission Legacy Processor Application.
 */
process.env.NODE_ENV = 'test'

const assert = require('assert')
const Kafka = require('no-kafka')
const config = require('config')
const _ = require('lodash')
const logger = require('../src/common/logger')

// Start mock submission api
const mockSubmissionApi = require('./mock-submission-api')

// Start the app
require('../index')

// The good sample message
const sampleMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    submissionId: 111,
    challengeId: 30005521,
    memberId: 124916,
    url: 'http://content.topcoder.com/some/path',
    type: 'Contest Submission',
    submissionPhaseId: 95245
  }
}

const producer = new Kafka.Producer({
  connectionString: config.KAFKA_URL,
  ssl: {
    cert: config.KAFKA_CLIENT_CERT,
    key: config.KAFKA_CLIENT_CERT_KEY
  }
})

describe('Topcoder - Submission Legacy Processor Application', () => {
  // Inject the logger to validate the message
  let logMessages = []
  logger.debug = (message) => {
    logMessages.push(message)
  }
  logger.error = (message) => {
    logMessages.push(message)
  }

  before((done) => {
    producer.init().then(() => {
      // Make sure that the app has enough time to consume all the pending events in the Kafka queue
      setTimeout(done, 5000)
    })
  })
  beforeEach((done) => {
    logMessages = []
    done()
  })

  it('should not consume message from a different topic', (done) => {
    producer.send({ topic: 'different-topic', message: { value: 'message' } })
      .then(() => {
        setTimeout(done, 2000)
      })
  })

  it('should skip message with null value', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: null } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped null or empty event')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null string value', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: 'null' } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped null or empty event')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with empty value', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '' } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped null or empty event')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with non-well-formed JSON string value', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: 'abc' } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped non well-formed JSON message: Unexpected token a in JSON at position 0')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with empty JSON string', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '{}' } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "topic" is required, "originator" is required, "timestamp" is required, "mime-type" is required, "payload" is required')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with invalid timestamp and payload value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          timestamp: 'invalid date',
          payload: {
            submissionId: 0,
            challengeId: 'a',
            memberId: 'b',
            url: 'invalid url',
            type: null,
            submissionPhaseId: 333
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "timestamp" must be a number of milliseconds or valid date string, "submissionId" must be a positive number, "submissionId" must be a string, "challengeId" must be a number, "memberId" must be a number, "url" must be a valid uri, "type" must be a string')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with wrong topic value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          topic: 'wrong-topic'
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped event from topic wrong-topic')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with wrong originator value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          originator: 'wrong-originator'
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped event from originator wrong-originator')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null submissionId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submissionId: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionId" must be a number, "submissionId" must be a string')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with zero submissionId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submissionId: 0
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionId" must be a positive number, "submissionId" must be a string')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null challengeId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            challengeId: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "challengeId" must be a number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with zero challengeId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            challengeId: 0
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "challengeId" must be a positive number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null memberId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            memberId: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "memberId" must be a number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with zero memberId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            memberId: 0
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "memberId" must be a positive number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null url value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            url: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "url" must be a string')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with invalid url value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            url: 'invalid'
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "url" must be a valid uri')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null type value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            type: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "type" must be a string')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with empty type value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            type: ''
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "type" is not allowed to be empty')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with null submissionPhaseId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submissionPhaseId: null
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionPhaseId" must be a number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with zero submissionPhaseId value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submissionPhaseId: 0
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionPhaseId" must be a positive number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should log error if the submission-api is unreachable', (done) => {
    mockSubmissionApi.close(() => {
      const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
      producer.send(m)
        .then((results) => {
          setTimeout(() => {
            mockSubmissionApi.listen(3000)
            const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
            assert.equal(logMessages.length, 9)
            assert.equal(logMessages[0], `Received ${messageInfo}`)
            assert.ok(logMessages[7].startsWith(`Failed to handle ${messageInfo}: connect ECONNREFUSED`) ||
              logMessages[7].startsWith(`Failed to handle ${messageInfo}: getaddrinfo ENOTFOUND`)
            )
            assert.ok(logMessages[8].startsWith('{ Error: connect ECONNREFUSED') ||
              logMessages[8].startsWith('{ Error: getaddrinfo ENOTFOUND')
            )
            done()
          }, 5000)
        })
    })
  })

  it('should handle message successfully - unknown keys', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            extraKey: 'extraKey'
          }
        }))
      }
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 11)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.ok(logMessages[6].startsWith('Submission was added with id:'))
          assert.equal(logMessages[10], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should handle message successfully', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 11)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.ok(logMessages[6].startsWith('Submission was added with id:'))
          assert.equal(logMessages[10], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })
})
