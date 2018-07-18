/**
 * The default configuration.
 */
module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // The client group ID for committing and fetching offsets.
  // All clients sharing the same group ID belong to the same group.
  KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'tc-submission-legacy-processor',

  // The comma delimited list of initial brokers list
  KAFKA_URL: process.env.KAFKA_URL || 'ssl://localhost:9093',

  // The client cert, can be (1) the path to the cert file, or (2) the cert content
  KAFKA_CLIENT_CERT: process.env.KAFKA_CLIENT_CERT || './test/kafka-ssl/client.crt',

  // The client cert key, can be (1) the path to the cert key file, or (2) the cert key content
  KAFKA_CLIENT_CERT_KEY: process.env.KAFKA_CLIENT_CERT || './test/kafka-ssl/client.key',

  // The topic from which the app consumes events
  KAFKA_NEW_SUBMISSION_TOPIC: process.env.KAFKA_NEW_SUBMISSION_TOPIC || 'submission',

  // The event originator
  KAFKA_NEW_SUBMISSION_ORIGINATOR: process.env.KAFKA_NEW_SUBMISSION_ORIGINATOR || 'challenge',

  // The Submission API URL
  SUBMISSION_API_URL: process.env.SUBMISSION_API_URL || 'http://localhost:3000'
}
