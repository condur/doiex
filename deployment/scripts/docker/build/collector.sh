#!/bin/bash
cd "${0%/*}" # change to the directory this script is in (bin)
cd ../../../../services/collector/
docker build -t doiex/collector .
