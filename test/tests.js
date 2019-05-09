/**
 * Mocha tests of the Topcoder - Submission Legacy Processor Application.
 */
process.env.NODE_ENV = 'test'
require('legacy-processor-module/bootstrap')

const Axios = require('axios')
const config = require('config')
const Kafka = require('no-kafka')
const should = require('should')

const _ = require('lodash')

const logger = require('legacy-processor-module/common/logger')
const {getKafkaOptions} = require('legacy-processor-module/KafkaConsumer')
const {patchSubmission} = require('legacy-processor-module/LegacySubmissionIdService')
const {sleep, expectTable, clearSubmissions} = require('legacy-processor-module/test/TestHelper')

const {
  sampleSubmission,
  sampleFinalFixSubmission,
  sampleStudioSubmission,
  sampleNotAllowMultipleSubmission,
  sampleNoChallengePropertiesSubmission,
  mockApi
} = require('legacy-processor-module/mock/mock-api')

// Default timeout
const timeout = 1000
const header = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json'
}
// The good sample message
const sampleMessage = {
  ...header,
  payload: {
    ...sampleSubmission
  }
}

// The good final fix sample message
const sampleFinalFixMessage = {
  ...header,
  payload: {
    ...sampleFinalFixSubmission
  }
}

// The good studio sample message
const sampleStudioMessage = {
  ...header,
  payload: {
    ...sampleStudioSubmission
  }
}

// The good not allow multiple submission sample message
const sampleNotAllowMultipleMessage = {
  ...header,
  payload: {
    ...sampleNotAllowMultipleSubmission
  }
}

// The good no challenge properties sample message
const sampleNoChallengePropertiesMessage = {
  ...header,
  payload: {
    ...sampleNoChallengePropertiesSubmission
  }
}

const options = getKafkaOptions()
const producer = new Kafka.Producer(options)

describe('Topcoder - Submission Legacy Processor Application', () => {
  // Inject the logger to validate the message
  let logMessages = []
  let consumer
  ['debug', 'info', 'error', 'warn'].forEach((level) => {
    logger[level] = (message) => {
      logMessages.push(message)
    }
  })
  /**
   * Wait job finish with completed handing or failed to handle found in log messages
   */
  const waitJob = async () => {
    // will not loop forever for timeout configuration of mocha
    while (true) {
      // sleep at first to ensure consume message
      await sleep(timeout)
      // break if completed handing or failed to handle
      if (logMessages.find(x => x.includes('Completed handling') || x.includes('Failed to handle'))) {
        break
      }
    }
  }
  /**
   * Start http server with port
   * @param {Object} server the server
   * @param {Number} port the server port
   */
  const startServer = (server, port) => new Promise((resolve) => {
    server.listen(port, () => {
      resolve()
    })
  })

  /**
   * Close http server
   */
  const closeServer = (server) => new Promise((resolve) => {
    server.close(() => {
      resolve()
    })
  })
  before(async () => {
    await startServer(mockApi, config.MOCK_API_PORT)
    // consume not processed messages before test
    const groupConsumer = new Kafka.GroupConsumer(options)
    await groupConsumer.init([{
      subscriptions: [config.KAFKA_NEW_SUBMISSION_TOPIC, config.KAFKA_UPDATE_SUBMISSION_TOPIC],
      handler: (messageSet, topic, partition) =>
        Promise.each(messageSet, (m) =>
          groupConsumer.commitOffset({ topic, partition, offset: m.offset }))
    }])
    await sleep(2000)
    await groupConsumer.end()
    await producer.init()
    // Start the app
    consumer = require('../index')
    // Make sure producer, consumer has enough time to initialize
    await sleep(5000)
  })

  after(async () => {
    await clearSubmissions()
    // close server
    await closeServer(mockApi)
    try {
      await producer.end()
    } catch (err) {
      // ignore
    }
    try {
      await consumer.end()
    } catch (err) {
      // ignore
    }
  })

  beforeEach(async () => {
    logMessages = []
  })

  it('Should setup healthcheck with check on kafka connection', async () => {
    const healthcheckEndpoint = `http://localhost:${process.env.PORT || 3000}/health`
    let result = await Axios.get(healthcheckEndpoint)
    should.equal(result.status, 200)
    should.deepEqual(result.data, { checksRun: 1 })
  })

  it('should not consume message from a different topic', async () => {
    await producer.send({ topic: 'different-topic', message: { value: 'message' } })
    await sleep(timeout)
    // no logs after wait sometime
    should.equal(logMessages.length, 0)
  })

  it('should skip message with null value', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: null } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped null or empty event')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null string value', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: 'null' } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped null or empty event')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with empty value', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '' } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped null or empty event')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with non-well-formed JSON string value', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: 'abc' } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped non well-formed JSON message: Unexpected token a in JSON at position 0')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with empty JSON string', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: '{}' } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "topic" is required, "originator" is required, "timestamp" is required, "mime-type" is required, "payload" is required')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with invalid timestamp and payload value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          timestamp: 'invalid date',
          payload: {
            id: 0,
            challengeId: 'a',
            memberId: 'b',
            url: 'invalid url',
            type: null,
            submissionPhaseId: 333
          }
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "timestamp" must be a number of milliseconds or valid date string, "id" must be a positive number, "id" must be a string, "challengeId" must be a number, "memberId" must be a number, "type" must be a string, "url" must be a valid uri')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with wrong topic value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          topic: 'wrong-topic'
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped event from topic wrong-topic')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with wrong originator value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          originator: 'wrong-originator'
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped event from originator wrong-originator')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with wrong resource value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            resource: 'review'
          }
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped event from resource review')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with invalid resource value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            resource: 'review_test'
          }
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "resource" must be one of [submission], "resource" must be one of [review], "resource" must be one of [reviewSummation]')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null id value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            id: null
          }
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "id" must be a number, "id" must be a string')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with zero id value', async () => {
    const m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            id: 0
          }
        }))
      }
    }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "id" must be a positive number, "id" must be a string')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null challengeId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "challengeId" must be a number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with zero challengeId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "challengeId" must be a positive number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null memberId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "memberId" must be a number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with zero memberId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "memberId" must be a positive number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null url value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "url" must be a string')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with invalid url value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "url" must be a valid uri')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null type value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "type" must be a string')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with empty type value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "type" is not allowed to be empty')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with null submissionPhaseId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionPhaseId" must be a number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip message with zero submissionPhaseId value', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "submissionPhaseId" must be a positive number')
    should.equal(logMessages[2], `Completed handling ${messageInfo}`)
  })

  it('should skip new submission(not found subTrack) message', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(_.merge({}, sampleMessage, { payload: { challengeId: 60005521 } })) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(5)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Skipped event for subTrack: ')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should skip new submission of MM challenge message', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(_.merge({}, sampleMessage, { payload: { challengeId: 30054163 } })) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(5)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Skipped event for subTrack: DEVELOP_MARATHON_MATCH')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle new submission message successfully', async () => {
    await clearSubmissions()

    let m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(6)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Patched to the Submission API: id ${sampleMessage.payload.id}`)))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: sampleMessage.payload.url
    })
    await expectTable('submission', 1)
    await expectTable('resource_submission', 1)

    // Send another one with extra keys
    m = {
      topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          payload: {
            extraKey: 'extraKey'
          }
        }))
      }
    }
    await producer.send(m)
    await waitJob()

    await expectTable('upload', 2, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: sampleMessage.payload.url
    })
    await expectTable('submission', 2)
    await expectTable('resource_submission', 2)
  })

  it('should handle final fix message successfully', async () => {
    await clearSubmissions()

    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleFinalFixMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(6)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Patched to the Submission API: id ${sampleFinalFixMessage.payload.id}`)))
    should.ok(logMessages.find(x => x.includes('{"legacyUploadId":')))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleFinalFixMessage.payload.challengeId,
      project_phase_id: sampleFinalFixMessage.payload.submissionPhaseId,
      url: sampleFinalFixMessage.payload.url
    })
    await expectTable('submission', 0)
    await expectTable('resource_submission', 0)
  })

  it('should handle new studio submission message successfully', async () => {
    await clearSubmissions()

    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleStudioMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(6)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Patched to the Submission API: id ${sampleStudioMessage.payload.id}`)))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleStudioMessage.payload.challengeId,
      project_phase_id: sampleStudioMessage.payload.submissionPhaseId,
      url: sampleStudioMessage.payload.url
    })
    await expectTable('submission', 1)
    await expectTable('resource_submission', 1)
  })

  it('should handle new submission message which not allow multiple submissions successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleNotAllowMultipleMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(6)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Patched to the Submission API: id ${sampleNotAllowMultipleMessage.payload.id}`)))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleNotAllowMultipleMessage.payload.challengeId,
      project_phase_id: sampleNotAllowMultipleMessage.payload.submissionPhaseId,
      upload_status_id: 1
    })

    // send second time
    logMessages = []
    results = await producer.send(m)
    await waitJob()
    messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    should.ok(logMessages.find(x => x.startsWith(`Patched to the Submission API: id ${sampleNotAllowMultipleMessage.payload.id}`)))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleNotAllowMultipleMessage.payload.challengeId,
      project_phase_id: sampleNotAllowMultipleMessage.payload.submissionPhaseId,
      upload_status_id: 1
    })
  })

  it('should log error for new submission without challenge properties', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleNoChallengePropertiesMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(4)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}`)))
    should.ok(logMessages.find(x => x.includes('Error: null or empty result get challenge properties')))
  })

  it('should log error if the submission-api is unreachable', async () => {
    await closeServer(mockApi)
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    const results = await producer.send(m)
    await waitJob()
    await startServer(mockApi, config.MOCK_API_PORT)
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}: connect ECONNREFUSED`) ||
      x.startsWith(`Failed to handle ${messageInfo}: getaddrinfo ENOTFOUND`)
    ))
    should.ok(logMessages.find(x => x.startsWith('{ Error: connect ECONNREFUSED') || x.startsWith('{ Error: getaddrinfo ENOTFOUND')))
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}`)))
  })

  it('should handle update submission message successfully', async () => {
    await clearSubmissions()

    await producer.send({ topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } })
    await waitJob()

    await patchSubmission(sampleMessage.payload.id, {legacySubmissionId: null})

    await expectTable('upload', 1, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: sampleMessage.payload.url
    })

    const updatedUrl = 'http://content.topcoder.com/some/path/updated'
    const m = {
      topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
          payload: {
            url: updatedUrl
          }
        }))
      }
    }

    logMessages = []
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(4)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('no valid submission id')))
    should.ok(logMessages.find(x => x.startsWith('Submission url updated, legacy submission id : 0')))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: updatedUrl
    })
  })

  it('should handle update submission message(newer with legacySubmissionId) successfully', async () => {
    await clearSubmissions()

    await producer.send({ topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } })
    await waitJob()

    await expectTable('upload', 1, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: sampleMessage.payload.url
    })

    const updatedUrl = 'http://content.topcoder.com/some/path/legacyupdated'
    const m = {
      topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
      message: {
        value: JSON.stringify(_.merge({}, sampleMessage, {
          topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
          payload: {
            url: updatedUrl
          }
        }))
      }
    }

    logMessages = []
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(4)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.not.exist(logMessages.find(x => x.startsWith('no valid submission id')))
    should.ok(logMessages.find(x => x.startsWith('Submission url updated, legacy submission id')))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)

    await expectTable('upload', 1, {
      project_id: sampleMessage.payload.challengeId,
      project_phase_id: sampleMessage.payload.submissionPhaseId,
      url: updatedUrl
    })
  })
})
