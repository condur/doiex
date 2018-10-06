#!/bin/bash
docker service update --no-resolve-image --force \
       --image doiex/collector:${COLLECTOR_DOCKER_IMAGE_TAG} \
       doiex_collector
