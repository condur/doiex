#!/bin/bash
docker service update --no-resolve-image --force \
       --image doiex/persister:${PERSISTER_DOCKER_IMAGE_TAG} \
       doiex_persister
