#!/bin/bash
docker service update --no-resolve-image --force \
       --image doiex/reporter:${REPORTER_DOCKER_IMAGE_TAG} \
       doiex_reporter
