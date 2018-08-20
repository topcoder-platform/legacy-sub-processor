# Topcoder - Submission Legacy Processor - Online Review Integration

## Requirement

- Docker Engine >= 17.x
- Docker-compose >= 1.17
- Database explorer for Informix (i.e DBeaver)

## Note About Informix CSDK and Docker

Getting and installing Informix CSDK is quite challenging. I can't find valid address to get this (except we're an active IBM customer).

The only way to get this is by installing developer version Informix db i.e Informix Innovator-C.
This is not a simple task too.

So instead of getting all those stuffs. I'm choosing to use IBM's docker image for Informix innovator-C.
And setting up node environment on top of it.
Kafka and other related service are also on docker environment.


## Build docker image for Kafka and Legacy Submission Processor

```bash
cd <to legacy-sub-processor>
docker-compose build kafka
docker-compose build lsp-app
```

NOTE. All docker-compose command must be issued under ```legacy-sub-processor``` directory

## Running Related Service

```bash
docker-compose up -d tc-direct run-online-review kafka
```
You should wait for a while until all service has been runned.

## Edit ```hosts``` file
Add this line to your hosts file:

```bash
<localhost/docker machine ip> cockpit.cloud.topcoder.com
```
## Insert Test data to database

```bash
cd <submission>
docker cp sql/test.sql iif_innovator_c:/
docker exec -ti iif_innovator_c bash -c "source /home/informix/ifx_informixoltp_tcp.env && dbaccess - /test.sql"
```

## Create and setup new challenge
Open [https://cockpit.cloud.topcoder.com/direct/launch/home](https://cockpit.cloud.topcoder.com/direct/launch/home)
Login as 'heffan/password'

Create a dev challenge like Code. Fill all required fields, don't forget to pick billing account.
For start date choose a date on the PAST(say 3 days before).
[see screenshot](https://drive.google.com/file/d/1EK2F3tnXYCe3U1IjFz1msBoNCLaOPugI/view?usp=drivesdk)

On last wizard clik 'SUBMIT AND LAUNCH CHALLENGE'. After challenge has been created click 'Edit' button.

See the challenge id on url like ```https://cockpit.cloud.topcoder.com/direct/contest/detail?projectId=30005520```.
30005520 is the challengeId (it might be different in different local setup)

Open Online Review [http://cockpit.cloud.topcoder.com/review](http://cockpit.cloud.topcoder.com/review)
Open challenge that we've cerated before ```http://cockpit.cloud.topcoder.com/review/actions/ViewProjectDetails?pid={challengeId}```
Change pid to your challengeId above.
Click 'Edit project' button
On edit project page set:
- forum Id: 0
- Add resource:
    - Role: Submitter
    - Name: Yoshi
- Save
[see screenshot](https://drive.google.com/file/d/13OELZLIbFPS1WdENGOcfSzC3TsTSJhPT/view?usp=drivesdk)

You can stop direct-app and online review container, by issuing

```bash
docker-compose stop tc-direct run-online-review
```

## Getting submission phase id
Open your database explorer, execute this query agains tcs_catalog database

```sql
select project_phase_id from project_phase where project_id=<challengeId> and phase_type_id=2
```
Change challengeId with your challenge id above. The result is your submission phase id

## Create Kafka topic

```bash
docker exec -ti kafka bash -c "kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic new-submission-topic"
```

## Installing Legacy Submission Proc. app requirements

```bash
docker-compose up lsp-app-install
```

## Run Legacy Submission Proc. app
```bash
docker-compose up lsp-app
```

## Send Test data
From previous data setup I got:
- challengeId = 30005520
- memberId = 124916 (Yoshi)
- submissionPhaseId = 95236

Let's send event to kafka:

```bash
docker exec -ti lsp-app bash -c "npm run produce-test-event 30005520 132458 95236"
```

[screenshot](https://drive.google.com/file/d/1qfduKglVW0WbtqU4Oym9H7s4zpT87VZo/view?usp=drivesdk)

You'll lsp-app log like:
[screenshot](https://drive.google.com/file/d/1nVjru_26f0A92FpXywBG9X910-Wc0fxN/view?usp=drivesdk)

## Verify Database
Open your database explorer (**DBeaver** application, for instance). Connect to database tcs_catalog
Open table: upload, submission and resource_submission
