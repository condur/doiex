import request from 'request-promise'

/**
 * Send data to parser service
 * @param {Object} // data collected
 */
export let send  = (data) : request.RequestPromise => {
  // Http request options
  let options = {
    method: 'PUT',
    uri: 'http://' + process.env.SERVICE_PARSER_HOSTNAME + ':' + process.env.SERVICE_PARSER_PORT,
    body: data,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}