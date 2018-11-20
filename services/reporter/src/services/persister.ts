import request from 'request-promise'

/**
 * Get all documents from persister service
 *
 */
export let get = (): request.RequestPromise => {
  // Http request options
  var options = {
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}