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
    submission: {
      id: 111,
      challengeId: 1234,
      memberId: 4321,
      url: 'http://content.topcoder.com/some/path',
      type: 'ContestSubmission'
    }
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
    }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 3)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "timestamp" must be a number of milliseconds or valid date string, "id" must be a positive number, "challengeId" must be a number, "memberId" must be a number, "url" must be a valid uri, "type" must be a string')
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

  it('should skip message with null id value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submission: {
              id: null
            }
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
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "id" must be a number')
          assert.equal(logMessages[2], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })

  it('should skip message with zero id value', (done) => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            submission: {
              id: 0
            }
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
          assert.equal(logMessages[1], 'Skipped invalid event, reasons: "id" must be a positive number')
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
            submission: {
              challengeId: null
            }
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
            submission: {
              challengeId: 0
            }
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
            submission: {
              memberId: null
            }
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
            submission: {
              memberId: 0
            }
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
            submission: {
              url: null
            }
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
            submission: {
              url: 'invalid'
            }
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
            submission: {
              type: null
            }
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
            submission: {
              type: ''
            }
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

  it('should log error if the submission-api is unreachable', (done) => {
    mockSubmissionApi.close(() => {
      const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
      producer.send(m)
        .then((results) => {
          setTimeout(() => {
            const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
            assert.equal(logMessages.length, 3)
            assert.equal(logMessages[0], `Received ${messageInfo}`)
            assert.equal(logMessages[1], `Failed to handle ${messageInfo}: connect ECONNREFUSED 127.0.0.1:3000`)
            assert.ok(logMessages[2].startsWith('{ Error: connect ECONNREFUSED'))

            mockSubmissionApi.listen(3000)

            done()
          }, 2000)
        })
    })
  })

  it('should handle message successfully', (done) => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    producer.send(m)
      .then((results) => {
        setTimeout(() => {
          const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
          assert.equal(logMessages.length, 5)
          assert.equal(logMessages[0], `Received ${messageInfo}`)
          // mock-submission-api called
          assert.equal(logMessages[1], 'PUT /submissions/111')
          assert.ok(logMessages[2].startsWith('{"id":111,"legacySubmissionId":'))
          assert.ok(logMessages[3].startsWith('Updated to the Submission API: id 111, legacy submission id'))
          assert.equal(logMessages[4], `Completed handling ${messageInfo}`)

          done()
        }, 2000)
      })
  })
})
