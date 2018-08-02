# Topcoder - Submission Legacy Processor Application
---------------------

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
- `KAFKA_NEW_SUBMISSION_TOPIC` The topic from which the app consumes events
- `KAFKA_NEW_SUBMISSION_ORIGINATOR` The event originator
- `SUBMISSION_API_URL` The Submission API URL
- `SUBMISSION_TIMEOUT` The Submission API timeout
- `DB_NAME` legacy database name 'dbname@db_server_name'
- `DB_USERNAME` database username
- `DB_PASSWORD` database password
- `ID_SEQ_UPLOAD` upload database sequence
- `ID_SEQ_SUBMISSION` submission database sequence

> NOTE: ALL COMMANDS BELOW EXECUTE UNDER ```<legacy-sub-procecssor>``` directory

## Build Application Docker Image
We only need to do this once
```bash
docker-compose build lsp-app
```

## Run Kafka and Create Topic (if running kafka locally)

Build Kafka image:
```bash
docker-compose build kafka
```

Run Kafka server:
```bash
docker-compose up -d kafka
docker exec -ti kafka bash -c "kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic new-submission-topic"
```

## Install App Requirements
```bash
docker-compose up lsp-app-install
```

## Deployment
```bash
docker-compose up lsp-app
```

## Running Test
- Make sure you're running a clean database (you can take down tc-informix container and then up it again)
- Stop `legacy-sub-processor` application if it was running
- Install test data
```bash
docker cp test/sql/test.sql iif_innovator_c:/
docker exec -ti iif_innovator_c bash -c "source /home/informix/ifx_informixoltp_tcp.env && dbaccess - /test.sql"
```
- Run kafka container (and create topic if you haven't do this before)
- Run
```bash
docker-compose up lsp-app-test
```

## Docker Build

```bash
heroku login
heroku create
heroku container:push web --arg servername=<DATABASE_SERVER>
heroku container:release web
```

## Standard Code Style

- Check code style `npm run lint`
- Check code style with option to fix the errors `npm run lint:fix`
