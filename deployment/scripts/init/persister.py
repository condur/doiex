#!/usr/bin/env python3

import logging
import os
import sys
from subprocess import call, Popen, PIPE

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] - %(levelname)s - %(message)s",
    datefmt="%I:%M:%S %p",
)


def script_execution_path(path):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(path)
    logging.info(f"working directory: {os.getcwd()}")


def remove_node_modules():
    call(["rm", "-rf", "node_modules"])
    logging.info("removed node_modules")


def npm_install():
    logging.info("npm install")
    process = Popen(
        ["npm", "install"], stdout=PIPE, stderr=PIPE, universal_newlines=True
    )
    out, err = process.communicate()
    if process.returncode == 0:
        logging.info("npm " + out.strip())
    else:
        logging.error(err)
        sys.exit()


def main():
    script_execution_path("../../../services/persister/")
    remove_node_modules()
    npm_install()


if __name__ == "__main__":
    main()
