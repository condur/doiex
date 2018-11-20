import request from 'request-promise'

/**
 * Send Documents to persister service
 * @param {Object} // data collected
 */
export let send = (documents) : request.RequestPromise => {
  // Http request options
  let options = {
    method: 'PUT',
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    body: documents,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}