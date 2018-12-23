#!/bin/bash
set -eo pipefail
ENV=$1
AWS_ACCOUNT_ID=$(eval "echo \$${ENV}_AWS_ACCOUNT_ID")
AWS_REGION=$(eval "echo \$${ENV}_AWS_REGION")
DB_SERVER_NAME=$(eval "echo \$${ENV}_DB_SERVER_NAME")
DB_SERVER_PORT=$(eval "echo \$${ENV}_DB_SERVER_PORT")

# Builds Docker image of the app.
TAG=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/legacy-sub-processor:$CIRCLE_SHA1

echo "================================"
echo "Creating lsp-asp images"
echo "================================"
docker-compose -f ecs-docker-compose.yml build --build-arg servername=${DB_SERVER_NAME} --build-arg port=${DB_SERVER_PORT} lsp-app
docker tag lsp-app:latest $TAG
echo "================================"
echo "lsp-asp images has created"
echo "Creating kafka and tc-informix"
echo "================================"
docker-compose -f ecs-docker-compose.yml up -d kafka
echo "================================"
echo "kafka has created"
echo "Creating kafka and tc-informix"
echo "================================"
docker-compose -f ecs-docker-compose.yml up -d tc-informix
echo "================================"
echo "tc-informix has created"
echo "Executing kafka topics"
echo "================================"
sleep 5
docker exec -ti kafka bash -c "kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic submission.notification.create"
docker exec -ti kafka bash -c "kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic submission.notification.update"
echo "================================"
echo "kafka topics has created"
echo "Copying sql file and setting env"
echo "================================"
docker cp test/sql/test.sql iif_innovator_c:/
sleep 10
echo "================================"
echo "copied sql file "
echo "setting env"
echo "================================"
docker exec -ti iif_innovator_c bash -c "source /home/informix/ifx_informixoltp_tcp.env && dbaccess - /test.sql"
echo "================================"
echo "env set"
echo "initiating test"
echo "================================"
docker-compose -f ecs-docker-compose.yml up --build lsp-app-test
echo "================================"
echo "test completed"
echo "================================"
#docker build -f ECSDockerfile -t $TAG .

# Copies "node_modules" from the created image, if necessary for caching.
docker create --name app $TAG

if [ -d node_modules ]
then
  # If "node_modules" directory already exists, we should compare
  # "package-lock.json" from the code and from the container to decide,
  # whether we need to re-cache, and thus to copy "node_modules" from
  # the Docker container.
  mv package-lock.json old-package-lock.json
  docker cp app:/app/package-lock.json package-lock.json
  set +eo pipefail
  UPDATE_CACHE=$(cmp package-lock.json old-package-lock.json)
  set -eo pipefail
else
  # If "node_modules" does not exist, then cache must be created.
  UPDATE_CACHE=1
fi

if [ "$UPDATE_CACHE" == 1 ]
then
  docker cp app:/app/node_modules .
fi
