FROM node:10.14

# -------------------------------------------------------------------------------------
# Default Environment Variables
# -------------------------------------------------------------------------------------
ENV NODE_ENV production

ENV COLL_APP_HOME /opt/collector
ENV COLL_USER collector

# -------------------------------------------------------------------------------------
# Setup OS
# -------------------------------------------------------------------------------------
RUN set -x \
  && apt-get update \
  && rm -rf /var/lib/apt/lists/*

# -------------------------------------------------------------------------------------
# Create user
# -------------------------------------------------------------------------------------
RUN mkdir -p ${COLL_APP_HOME} \
  && useradd -d "${COLL_APP_HOME}" -c "Collector" -s /usr/sbin/nologin "${COLL_USER}" \
  && chown --recursive -v ${COLL_USER}:${COLL_USER} ${COLL_APP_HOME}

# -------------------------------------------------------------------------------------
# Set the working directory
# -------------------------------------------------------------------------------------
WORKDIR ${COLL_APP_HOME}

# -------------------------------------------------------------------------------------
# Copy the package.json and npm-shrinkwrap.json files and install dependencies
# -------------------------------------------------------------------------------------
COPY package.json npm-shrinkwrap.json ./
RUN npm install

# -------------------------------------------------------------------------------------
# Copy the application files
# -------------------------------------------------------------------------------------
COPY ./bin   ./

# -------------------------------------------------------------------------------------
# Setup application user
# -------------------------------------------------------------------------------------
USER ${COLL_USER}

# -------------------------------------------------------------------------------------
# Expose application port number
# -------------------------------------------------------------------------------------
EXPOSE 3000

# -------------------------------------------------------------------------------------
# Launch Doiex Collector Service
# -------------------------------------------------------------------------------------
CMD ["node", "app.js"]
