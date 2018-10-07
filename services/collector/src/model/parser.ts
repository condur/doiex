import * as http from 'http'

// Http request options
const options = {
  hostname: process.env.SERVICE_PARSER_HOSTNAME,
  port: process.env.SERVICE_PARSER_PORT,
  path: '/',
  method: 'POST',
  headers: {
    'Connection': 'keep-alive',
    'Content-Type': 'application/json'
  }
}

/**
 * Send data to parser service
 * @param {Object} // data collected
 */
export let send = (data) => {
  if (process.env.NODE_ENV === 'production') {
    sendProductionData(data)
  } else {
    sendDevelopmentData(data)
  }
}

/**
 * Send data to parser service when the process.env.NODE_ENV == 'production'
 *
 * @private
 * @param {Object} data
 */
function sendProductionData (data) {
  const req = http.request(options, (res) => {
    if (res.statusCode !== 200) {
      console.log('Failed to send date, plese check the logs of Parser Service')
    }
  })
  req.write(JSON.stringify(data))
  req.end()
}

/**
 * Send data to parser service when the process.env.NODE_ENV != 'production'
 *
 * @private
 * @param {Object} data
 */
function sendDevelopmentData (data) {
  console.log('In NON-production mode the Parser Service is not called')
}
