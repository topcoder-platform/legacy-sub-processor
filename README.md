# Topcoder - Submission Legacy Processor Application
---------------------

## Requirements
- NodeJS 8.x
- Kafka 1.1.0 with SSL enabled

## Configuration

The configuration can be found in the configuration file `./config/default.js`.
You can update the configuration file or set values to the corresponding environment variables.

- `LOG_LEVEL` The log level, e.g. `debug`, `info`, or 'error'
- `KAFKA_GROUP_ID` The client group ID for committing and fetching offsets. All clients sharing the same group ID belong to the same group
- `KAFKA_URL` The comma delimited list of initial brokers list
- `KAFKA_CLIENT_CERT` The client cert, can be (1) the path to the cert file, or (2) the cert content
- `KAFKA_CLIENT_CERT_KEY` The client cert key, can be (1) the path to the cert key file, or (2) the cert key content
- `KAFKA_NEW_SUBMISSION_TOPIC` The topic from which the app consumes events
- `KAFKA_NEW_SUBMISSION_ORIGINATOR` The event originator
- `SUBMISSION_API_URL` The Submission API URL

## Deployment

- Make sure that you configure the app correctly as above
- `cd tc-submission-legacy-processor`
- `npm i`
- `npm start`

## Standard Code Style

- Check code style `npm run lint`
- Check code style with option to fix the errors `npm run lint:fix`
