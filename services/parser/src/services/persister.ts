import * as request from 'request-promise'

/**
 * Send Documents to persister service
 * @param {Object} // data collected
 */
export let send = (documents) => {
  if (process.env.NODE_ENV === 'production') {
    return sendDocsProduction(documents)
  } else {
    return sendDocsDevelopment(documents)
  }
}

/**
 * Send Documents to persister service
 * when the process.env.NODE_ENV == 'production'
 *
 * @private
 * @param {Object} documents
 */
function sendDocsProduction (documents) {
  // Http request options
  let options = {
    method: 'PUT',
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    body: documents,
    json: true // Automatically parses the JSON string in the response
  }
  return request(options)
}

/**
 * Send Documents to persister service
 * when the process.env.NODE_ENV != 'production'
 *
 * @private
 * @param {Object} documents
 */
function sendDocsDevelopment (documents) {
  console.log('In NON-production mode the Persister Service is not called')
}
