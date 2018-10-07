#!/bin/bash
cd "${0%/*}" # change to the directory this script is in (bin)
cd ../../../../services/parser/
docker build -t doiex/parser .
