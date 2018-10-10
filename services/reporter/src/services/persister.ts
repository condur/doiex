import * as request from 'request-promise'

/**
 * Get all documents from persister service
 *
 */
export let get = () => {
  if (process.env.NODE_ENV === 'production') {
    return getProductionData()
  } else {
    return getDevelopmentData()
  }
}

/**
 * Get data from persister service when the process.env.NODE_ENV == 'production'
 *
 * @private
 */
function getProductionData () {
  // Http request options
  var options = {
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}

/**
 * Get data from persister service when the process.env.NODE_ENV != 'production'
 *
 * @private
 */
function getDevelopmentData () {
  console.log('In NON-production mode the Persister Service is not called')
}
