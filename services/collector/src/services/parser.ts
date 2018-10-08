import * as request from 'request-promise'

/**
 * Send data to parser service
 * @param {Object} // data collected
 */
export let send = (data) => {
  if (process.env.NODE_ENV === 'production') {
    return sendProductionData(data)
  } else {
    return sendDevelopmentData(data)
  }
}

/**
 * Send data to parser service when the process.env.NODE_ENV == 'production'
 *
 * @private
 * @param {Object} data
 */
function sendProductionData (data) {
  // Http request options
  let options = {
    method: 'PUT',
    uri: 'http://' + process.env.SERVICE_PARSER_HOSTNAME + ':' + process.env.SERVICE_PARSER_PORT,
    body: data,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}

/**
 * Send data to parser service when the process.env.NODE_ENV != 'production'
 *
 * @private
 * @param {Object} data
 */
function sendDevelopmentData (data) {
  console.log('In NON-production mode the Parser Service is not called')
  return
}
