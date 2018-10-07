#!/bin/bash
cd "${0%/*}" # change to the directory this script is in (bin)
cd ../../../../services/persister/
docker build -t doiex/persister .
