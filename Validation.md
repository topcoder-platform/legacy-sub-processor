# Topcoder - Submission Legacy Processor Application - Verification
------------

## Setup Kafka

- Download Kafka v1.1.0: https://kafka.apache.org/downloads
- Extract the downloaded file to a directory
- To enable SSL, copy the following lines to the end of `<your-kafka-directory>/config/server.properties`

    ```
    listeners=plaintext://localhost:9092,ssl://localhost:9093
    ssl.truststore.location=<absolute-path-to-server.truststore.jks>
    ssl.truststore.password=test1234
    ssl.keystore.location=<absolute-path-to-server.keystore.jks>
    ssl.keystore.password=test1234
    ssl.key.password=test1234
    ```

    Replace `<absolute-path-to-server.truststore.jks>` to the absolute path to the file `tc-submission-legacy-processor/test/kafka-ssl/server.truststore.jks`
    Replace `<absolute-path-to-server.truststore.jks>` to the absolute path to the file `tc-submission-legacy-processor/test/kafka-ssl/server.keystore.jks`

- Example on my Windows PC:

    ```
    listeners=plaintext://localhost:9092,ssl://localhost:9093
    ssl.truststore.location=D:/Others/tc-submission-legacy-processor/tc-submission-legacy-processor/test/kafka-ssl/server.truststore.jks
    ssl.truststore.password=test1234
    ssl.keystore.location=D:/Others/tc-submission-legacy-processor/tc-submission-legacy-processor/test/kafka-ssl/server.keystore.jks
    ssl.keystore.password=test1234
    ssl.key.password=test1234
    ```

## Start ZooKeeper

- `cd <your-kafka-directory>`
- For Linux: `bin/zookeeper-server-start.sh config/zookeeper.properties`
- For Windows: `bin\windows\zookeeper-server-start.bat config\zookeeper.properties`

## Start Kafka

- `cd <your-kafka-directory>`
- For Linux: `bin/kafka-server-start.sh config/server.properties`
- For Windows: `bin\windows\kafka-server-start.bat config/server.properties`

## Create Test Topics in Kafka

- `cd <your-kafka-directory>`
- For Linux:
    ```
    bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic different-topic
    bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic new-submission-topic
    ```
- For Windows:
    ```
    bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic different-topic
    bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic new-submission-topic
    ```

## Run Unit Tests

- `cd tc-submission-legacy-processor`
- `npm i`
- `npm test`

The detailed test coverage report (html) is generated to `./coverage` directory

## Manual Verification

### Start the Mock Submission API

- `cd tc-submission-legacy-processor`
- `npm i`
- `npm run mock-submission-api`

### Start the Application in Test Environment

- `cd tc-submission-legacy-processor`
- For Linux: 
    ```
    export NODE_ENV=test
    npm start
    ```
- For Windows: 
    ```
    set NODE_ENV=test
    npm start
    ```

### Send Test Events and Verify

- `cd tc-submission-legacy-processor`
- For Linux: `export NODE_ENV=test`
- For Windows: `set NODE_ENV=test`
- Run `npm run produce-test-event 0` and verify that the app doesn't consume this message (no log)
- Run `npm run produce-test-event 1` and verify that the app skips this message (log: `Skipped null or empty event`)
- Run `npm run produce-test-event 2` and verify that the app skips this message (log: `Skipped null or empty event`)
- Run `npm run produce-test-event 3` and verify that the app skips this message (log: `Skipped non well-formed JSON message: ...`)
- Run `npm run produce-test-event 4` and verify that the app skips this message (log: ` Skipped invalid event, reasons: "topic" is required ...`)
- Run `npm run produce-test-event 5` and verify that the app skips this message (log: `Skipped invalid event, reasons: "timestamp" must be...`)
- Run `npm run produce-test-event 6` and verify that the app skips this message (log: `Skipped event from topic wrong-topic`)
- Run `npm run produce-test-event 7` and verify that the app skips this message (log: `Skipped event from topic wrong-originator`)
- Run `npm run produce-test-event 8` and verify that the app makes call to the Submission API successfully (log: `Updated to the Submission API: id 111, ...`) and the Mock Submission API receives `PUT /submissions/111` request with request body like `{"id":111,"legacySubmissionId":1531219317896}`. `legacySubmissionId` is current epoch in the current implementation.
