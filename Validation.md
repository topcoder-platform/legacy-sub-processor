# Topcoder - Legacy Submission Processor Application - Validation
------------
> NOTE: ALL COMMANDS BELOW EXECUTE UNDER ```<legacy-sub-processor>``` directory

> Ignore any warnings about variables not being set

## Run Kafka and Create Topic

Build Kafka image:
```bash
docker-compose build kafka
```

Run Kafka server:
```bash
docker-compose up -d kafka
docker exec -ti kafka bash -c "kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic submission.notification.aggregate"
```

## Run Informix and Insert Test Data
Make sure you're running a clean database (you can take down and remove iif_innovator_c container and then up it again)
```bash
export DB_SERVER_NAME=informix

docker kill iif_innovator_c
docker rm iif_innovator_c

docker-compose up -d tc-informix

docker logs iif_innovator_c
# When you see log like following then informix is started (wait till these logs appear before proceeding further):
# starting rest listener on port 27018
# starting mongo listener on port 27017
```

**Then insert test data (which will be used by Unit Tests step and Verification step)**:
```bash
docker cp test/sql/test.sql iif_innovator_c:/
docker exec -ti iif_innovator_c bash -c "source /home/informix/ifx_informixoltp_tcp.env && dbaccess - /test.sql"
```

## Build Application Docker Image
We only need to do this once
```bash
export DB_SERVER_NAME=informix
docker-compose build lsp-app
```

## Install App dependencies
```bash
export DB_SERVER_NAME=informix
rm -rf node_modules && docker-compose run lsp-app-install
```

**Note**, if the ***legacy-processor-module*** is changed locally (e.g. during local dev and not pushed to git yet), then you need to delete it from *node_modules* and copy the local changed one to *node_modules*:

```bash
rm -rf ./node_modules/legacy-processor-module
cp -rf <path/to/legacy-processor-module> ./node_modules
# e.g cp -rf ../legacy-processor-module ./node_modules
```

## Standard Code Style

- Check code style `npm run lint`
- Check code style with option to fix the errors `npm run lint:fix`

## Run Unit Tests
- Stop `legacy-sub-processor` application if it was running: `docker stop lsp-app`
- Make sure kafka container running with topic created and informix container running with test data inserted. If not, follow steps in `Run Informix and Insert Test Data`
- Run unit tests:
```bash
docker-compose run lsp-app-test
```

## Start legacy-sub-processor

```bash
export DB_SERVER_NAME=informix
docker-compose up lsp-app
```

## Validating APM traces

After each test above in `Run Unit Tests` or after scenario listed below in `Verify with Test Data` you will see traces captured on the dashboards of datadog, lightstep and signalfx.

On DataDog, click on APM -> Trace list -> View the traces with type "Custom".

On LightStep, click on explorer -> select your service (component name) -> click Run

On SignalFX, click uAPM -> Traces

## Verify with Test Data

- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event different-topic"` and verify that the app doesn't consume this message (no log)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event null-message"` and verify that the app skips this message (log: `Skipped null or empty event`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event empty-message"` and verify that the app skips this message (log: `Skipped null or empty event`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event invalid-json"` and verify that the app skips this message (log: `Skipped Invalid message JSON`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event empty-json"` and verify that the app skips this message (log: `Skipped the message topic "undefined" doesn't match the Kafka topic submission.notification.aggregate`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event invalid-payload"` and verify that the app skips this message (log: `Skipped invalid event, reasons: "timestamp" must be...`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event wrong-topic"` and verify that the app skips this message (log: `Skipped the message topic "wrong-topic" doesn't match the Kafka topic submission.notification.aggregate`)
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event wrong-originator"` and verify that the app skips this message (log: `Skipped event from topic wrong-originator`)

- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event submission"` and verify that the app makes call to the Submission API successfully (log: `Successfully processed non MM message - Patched to the Submission API: id 111, patch: {"legacySubmissionId":60000}`) and the Mock API log (`docker logs mock-api`) like `Patch /submissions/111 with {"legacySubmissionId":60000}`.
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event final-fix"` and verify that the app has log like `final fix upload, only insert upload`, and it should only insert into `upload` table, but not `submission`/`resource_submission` table.
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event not-allow-multiple"` and verify that the app has log like `delete previous submission for challengeId...`.
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event update-url"` and verify that the app has log like `Successfully processed non MM message - Submission url updated...`.
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event no-challenge-props"` and verify that the app has error log like `Error: null or empty result get challenge properties...`.
- Run `docker exec -ti lsp-app bash -c "npm run produce-test-event mm-submission"` and verify that the app skips this message (log: `Skipped event for subTrack: DEVELOP_MARATHON_MATCH`).

## Verify Database
Open your database explorer (**DBeaver** application, for instance). Connect to database tcs_catalog
Check table: `upload`, `submission` and `resource_submission`

## Cleanup
After verification, run `docker-compose down` to take down and remove containers.
