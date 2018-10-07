#!/bin/bash
docker service update --no-resolve-image --force \
       --image doiex/parser:${PARSER_DOCKER_IMAGE_TAG} \
       doiex_parser
