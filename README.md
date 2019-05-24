# Topcoder - Legacy Submission Processor Application
----------------------

## Requirements

- Docker Engine >= 17.x
- Docker-compose >= 1.17

## Configuration

The configuration can be found in the configuration file `./config/default.js`.
You can update the configuration file or set values to the corresponding environment variables.

- `LOG_LEVEL` The log level, e.g. `debug`, `info`, or 'error'
- `KAFKA_GROUP_ID` The client group ID for committing and fetching offsets. All clients sharing the same group ID belong to the same group
- `KAFKA_URL` The comma delimited list of initial brokers list
- `KAFKA_CLIENT_CERT` The client cert, can be (1) the path to the cert file, or (2) the cert content
- `KAFKA_CLIENT_CERT_KEY` The client cert key, can be (1) the path to the cert key file, or (2) the cert key content
- `KAFKA_NEW_SUBMISSION_TOPIC` The new submission topic from which the app consumes events
- `KAFKA_NEW_SUBMISSION_ORIGINATOR` The new submission event originator
- `KAFKA_UPDATE_SUBMISSION_TOPIC` The update submission topic from which the app consumes events
- `SUBMISSION_API_URL` The Submission API URL
- `SUBMISSION_TIMEOUT` The Submission API timeout
- `DB_NAME` legacy database name 'dbname@db_server_name'
- `DB_USERNAME` database username
- `DB_PASSWORD` database password
- `ID_SEQ_UPLOAD` upload database sequence
- `ID_SEQ_SUBMISSION` submission database sequence
- `AUTH0_URL` auth0 url
- `AUTH0_AUDIENCE` auth0 audience
- `TOKEN_CACHE_TIME` auth0 token cache time
- `AUTH0_PROXY_SERVER_URL` auth0 proxy server url
- `AUTH0_CLIENT_ID` auth0 client id
- `AUTH0_CLIENT_SECRET` auth0 client secret
- `CHALLENGE_INFO_API` The challenge info api template with {cid} gets replaced with challenge id
- `MM_CHALLENGE_SUBTRACK` The sub track of marathon match challenge 

 `./config/production.js`, `./config/staging.js`, `./config/test.js` will use same configuration variables as `./config/default.js` except `./config/test.js` will have new configurations for test only:
- `MOCK_API_PORT` The mock server port for submission && challenge api

## Validation
Follow the steps in [Validation.md](Validation.md)
