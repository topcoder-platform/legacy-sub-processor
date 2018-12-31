/**
 * Mocha tests of the Topcoder - Submission Legacy Processor Application.
 */
process.env.NODE_ENV = 'test'
require('../src/bootstrap')
const path = require('path')
const fs = require('fs')
const Joi = require('joi')
const should = require('should')
const Kafka = require('no-kafka')
const config = require('config')
const _ = require('lodash')
const sqlParams = require('./test_files/sqlParams')
const logger = require('../src/common/logger')
const constant = require('../src/common/constant')
// Start mock submission api
const {
  sampleSubmission,
  sampleUpdateSubmission,
  sampleFinalFixSubmission,
  sampleStudioSubmission,
  sampleNotAllowMultipleSubmission,
  sampleNoChallengePropertiesSubmission,
  sampleLegacyUpdateSubmission,
  submissionUrl,
  mockSubmissionApi
} = require('./mock-submission-api')
// Start mock server for challenge api and code url
const { mockServer } = require('./mock-api')
const Informix = require('../src/services/Informix')
// force to use in this way in test to make sure single instance work properly for same database/username/password
const informix = new Informix({
  database: config.DB_NAME,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  pool: {
    min: 0,
    max: 10
  }
})
const prepare = fs.readFileSync(path.join(__dirname, './sql/prepare.sql'), 'utf-8')
/**
 * Sleep with time from input
 * @param time the time input
 */
async function sleep (time) {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

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

// The good sample message
const sampleUpdateMessage = {
  ...header,
  topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
  payload: {
    ...sampleUpdateSubmission
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

// The good legacy submission update sample message
const sampleLegacyUpdateMessage = {
  ...header,
  topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC,
  timestamp: '2018-11-11T00:00:00',
  payload: {
    ...sampleLegacyUpdateSubmission
  }
}

// The good mm sample message
// see https://apps.topcoder.com/forums/?module=Thread&threadID=927839&start=0
// The MM url coming from Kafka will point to the member submission. This will be inserted into the database.
// isExample come from Kafka message. This will have to be added when Submission API handles MM challenges
const sampleMMMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 113,
    challengeId: 30054163,
    memberId: 132458,
    resource: 'submission',
    url: submissionUrl,
    type: 'Contest Submission',
    submissionPhaseId: 95308,
    isExample: 0
  }
}

// The bad invalid typeId mm review sample message
const sampleMMReviewInvalidTypeIdMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 118,
    resource: 'review',
    typeId: 'bcf2b43b-20df-44d1-afd3-7fc9787213e',
    type: 'Contest Submission',
    score: 90,
    metadata: {
      testType: 'provisional',
      testCases: [
        'DPK.CP001_A549_24H_X1_B42',
        'LITMUS.KD017_A549_96H_X1_B42'
      ]
    }
  }
}

// The bad invalid score mm review sample message
const sampleMMReviewInvalidScoreMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 118,
    resource: 'review',
    typeId: 'bcf2b43b-20df-44d1-afd3-7fc9798dfcae',
    type: 'Contest Submission',
    score: -90,
    metadata: {
      testType: 'provisional',
      testCases: [
        'DPK.CP001_A549_24H_X1_B42',
        'LITMUS.KD017_A549_96H_X1_B42'
      ]
    }
  }
}

// The good mm review provisional sample message
const sampleMMReviewProvisionalMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 1,
    resource: 'review',
    submissionId: 118,
    typeId: 'bcf2b43b-20df-44d1-afd3-7fc9798dfcae',
    score: 90,
    metadata: {
      testType: 'provisional',
      testCases: [
        'DPK.CP001_A549_24H_X1_B42',
        'LITMUS.KD017_A549_96H_X1_B42'
      ]
    }
  }
}

// The good mm review final sample message
const sampleMMReviewFinalMessage = {
  topic: config.KAFKA_NEW_SUBMISSION_TOPIC,
  originator: config.KAFKA_NEW_SUBMISSION_ORIGINATOR,
  timestamp: '2018-02-16T00:00:00',
  'mime-type': 'application/json',
  payload: {
    id: 1,
    resource: 'review',
    submissionId: 118,
    typeId: 'bcf2b43b-20df-44d1-afd3-7fc9798dfcae',
    score: 97.5,
    metadata: {
      testType: 'final',
      testCases: [
        'DPK.CP001_A549_24H_X1_B42',
        'LITMUS.KD017_A549_96H_X1_B42'
      ]
    }
  }
}

const options = {
  connectionString: config.KAFKA_URL,
  groupId: config.KAFKA_GROUP_ID,
  ssl: {
    cert: config.KAFKA_CLIENT_CERT,
    key: config.KAFKA_CLIENT_CERT_KEY
  }
}
const producer = new Kafka.Producer(options)

/**
 * Expect count of table rows with params
 * @param table the table
 * @param count the rows to expect
 * @param params the sql params
 */
async function expectTable (table, count, params) {
  // error to process TEXT column in where clause of select statement so have to use in this way
  const textColumns = ['submissionText', 'submission_text']
  let tableParams = _.merge({}, sqlParams[table], _.omit(params, textColumns))
  params = params || {}
  const checkParams = _.pick(params, textColumns)
  const names = Object.keys(checkParams)
  let sql = `select ${names.length ? names.join() : '*'} from ${table}`
  if (!_.isEmpty(tableParams)) {
    sql += ` where ${Object.keys(tableParams).map((k) => {
      const v = tableParams[k]
      if (_.isNull(v)) {
        return `${k} is null`
      } else {
        return `${k}=@${k}@`
      }
    }).join(' and ')}`
  }
  const result = await informix.query(sql, tableParams)
  should.equal(result.length, count, `Table ${table} got wrong expect count result expect ${count} actual ${result.length}`)
  if (count && names.length) {
    for (let i = 0; i < names.length; i++) {
      should.equal(result[0][i], checkParams[names[i]], `Table ${table} got wrong expect column ${names[i]} expect ${checkParams[names[i]]} actual ${result[0][i]}`)
    }
  }
}
describe('Topcoder - Submission Legacy Processor Application', () => {
  // Inject the logger to validate the message
  let logMessages = []
  let consumer
  ['debug', 'error', 'warn'].forEach((level) => {
    logger[level] = (message) => {
      logMessages.push(message)
      // logger.info(`Guri has ${message}`)
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
    await startServer(mockSubmissionApi, config.MOCK_SUBMISSION_API_PORT)
    await startServer(mockServer, config.MOCK_SERVER_PORT)
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
    try {
      // currently error to process TEXT column in where clause of select statement so even pass param rightly it will throw error
      // I add here to test no param found in params error too
      await informix.query('select * from long_submission where submission_text=@submission_text@', { test: 'text' })
      throw new Error('should throw error')
    } catch (e) {
      e.message.should.match(/Not found param name submission_text in given params/)
    }
  })

  after(async () => {
    // close server
    await closeServer(mockSubmissionApi)
    await closeServer(mockServer)
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
    await informix.query(prepare)
    logMessages = []
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
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "timestamp" must be a number of milliseconds or valid date string, "id" must be a positive number, "id" must be a string, "challengeId" must be a number, "memberId" must be a number, "url" must be a valid uri, "type" must be a string')
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
    should.equal(logMessages[1], 'Skipped invalid event, reasons: "resource" must be one of [submission], "resource" must be one of [review]')
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

  it('should log error if the submission-api is unreachable', async () => {
    await closeServer(mockSubmissionApi)
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    const results = await producer.send(m)
    await waitJob()
    await startServer(mockSubmissionApi, config.MOCK_SUBMISSION_API_PORT)
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}: connect ECONNREFUSED`) ||
      x.startsWith(`Failed to handle ${messageInfo}: getaddrinfo ENOTFOUND`)
    ))
    should.ok(logMessages.find(x => x.startsWith('{ Error: connect ECONNREFUSED') || x.startsWith('{ Error: getaddrinfo ENOTFOUND')))
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}`)))
  })

  it('should handle message successfully - unknown keys', async () => {
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
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(15)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('id with key legacySubmissionId has value')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle new submission message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(15)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('id with key legacySubmissionId has value')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle final fix message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleFinalFixMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(13)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('id with key legacyUploadId has value')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle update submission message successfully', async () => {
    const m = { topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleUpdateMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Uploaded submission updated legacy submission id')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle update submission message(newer with legacySubmissionId) successfully', async () => {
    const url = sampleLegacyUpdateMessage.payload.url
    await expectTable('upload', 0, {
      url
    })
    logMessages = []
    const m = { topic: config.KAFKA_UPDATE_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleLegacyUpdateMessage) } }
    const results = await producer.send(m)
    await waitJob()
    const messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Uploaded submission updated legacy submission id')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    await expectTable('upload', 1, {
      url
    })
  })

  it('should handle new studio submission message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleStudioMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle new not allow multiple submission message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleNotAllowMultipleMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    // send second time
    results = await producer.send(m)
    await waitJob()
    messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('delete previous submission')))
  })

  it('should handle new submission without challenge properties message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleNoChallengePropertiesMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(7)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}`)))
    should.ok(logMessages.find(x => x.includes('null or empty result get challenge properties')))
  })

  it('should handle new submission(not found subTrack) message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(_.merge({}, sampleFinalFixMessage, { payload: { challengeId: 60005521 } })) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
  })

  it('should handle new mm challenge submission(not found challenge in database) message successfully', async () => {
    await expectTable('informixoltp:long_component_state', 1, {
      points: null,
      status_id: null,
      submission_number: null,
      example_submission_number: null,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 0, {
      example: 0
    })
    sampleMMMessage.payload.isExample.should.equal(0)
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(_.merge({}, sampleMMMessage, { payload: { challengeId: 30054378 } })) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(8)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.ok(logMessages.find(x => x.startsWith(`Failed to handle ${messageInfo}`)))
    should.ok(logMessages.find(x => x.includes('null or empty result get mm challenge properties')))
  })

  it('should handle new mm challenge submission(isExample=0) message successfully', async () => {
    await expectTable('informixoltp:long_component_state', 1, {
      points: null,
      status_id: null,
      submission_number: null,
      example_submission_number: null,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 0, {
      example: 0
    })
    sampleMMMessage.payload.isExample.should.equal(0)
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMMMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    await expectTable('informixoltp:long_component_state', 1, {
      points: 0,
      status_id: constant.COMPONENT_STATE.NOT_CHALLENGED,
      submission_number: 1,
      example_submission_number: null,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 1, {
      submission_number: 1,
      submission_text: sampleMMMessage.payload.url,
      submit_time: Joi.attempt(sampleMMMessage.timestamp, Joi.date()).getTime(),
      submission_points: 0,
      example: 0
    })
    // process second time
    results = await producer.send(m)
    await waitJob()
    messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    await expectTable('informixoltp:long_component_state', 1, {
      points: 0,
      status_id: constant.COMPONENT_STATE.NOT_CHALLENGED,
      submission_number: 2,
      example_submission_number: null,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 1, {
      submission_number: 2,
      submission_text: sampleMMMessage.payload.url,
      submit_time: Joi.attempt(sampleMMMessage.timestamp, Joi.date()).getTime(),
      submission_points: 0,
      example: 0
    })
  })

  it('should handle new mm challenge(isExample=1) submission message successfully', async () => {
    await expectTable('informixoltp:long_component_state', 1, {
      points: null,
      status_id: null,
      submission_number: null,
      example_submission_number: null,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 0)
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(_.merge({}, sampleMMMessage, { payload: { isExample: 1 } })) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(10)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of non MM challenge submission message')))
    should.ok(logMessages.find(x => x.startsWith('Successful Processing of MM challenge submission message')))
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    await expectTable('informixoltp:long_component_state', 1, {
      points: null,
      status_id: constant.COMPONENT_STATE.NOT_CHALLENGED,
      submission_number: null,
      example_submission_number: 1,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 1, {
      submission_number: 1,
      submission_text: sampleMMMessage.payload.url,
      submit_time: Joi.attempt(sampleMMMessage.timestamp, Joi.date()).getTime(),
      submission_points: 0,
      example: 1
    })
    const points = 2
    await informix.query(`update informixoltp:long_component_state set points=${points} 
    where long_component_state_id=${sqlParams['informixoltp:long_component_state'].long_component_state_id}`)
    // process second time
    results = await producer.send(m)
    await waitJob()
    messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    await expectTable('informixoltp:long_component_state', 1, {
      points, // no updates for points
      status_id: constant.COMPONENT_STATE.NOT_CHALLENGED,
      submission_number: null,
      example_submission_number: 2,
      coder_id: sampleMMMessage.payload.memberId
    })
    await expectTable('informixoltp:long_submission', 1, {
      submission_number: 2,
      submission_text: sampleMMMessage.payload.url,
      submit_time: Joi.attempt(sampleMMMessage.timestamp, Joi.date()).getTime(),
      submission_points: 0,
      example: 1
    })
  })

  it('should skip invalid typeId mm challenge submission', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMMReviewInvalidTypeIdMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(2)
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Skipped Invalid typeId')))
  })

  it('should throw error for invalid score mm challenge submission', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMMReviewInvalidScoreMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(2)
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('Skipped invalid event, reasons: "score" must be larger than or equal to 0')))
  })

  it('should handle (review provisional) mm challenge submission message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMMReviewProvisionalMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[logMessages.length - 1], `Completed handling ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('updated submission score with params')))
  })

  it('should handle (review final) mm challenge submission message successfully', async () => {
    const m = { topic: config.KAFKA_NEW_SUBMISSION_TOPIC, message: { value: JSON.stringify(sampleMMReviewFinalMessage) } }
    logMessages = []
    let results = await producer.send(m)
    await waitJob()
    let messageInfo = `message from topic ${results[0].topic}, partition ${results[0].partition}, offset ${results[0].offset}: ${m.message.value}`
    logMessages.length.should.be.greaterThanOrEqual(3)
    should.equal(logMessages[0], `Received ${messageInfo}`)
    should.ok(logMessages.find(x => x.startsWith('updated submission score with params')))
  })
})
