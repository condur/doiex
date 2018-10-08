import * as request from 'request-promise'
import * as datetime from '../helpers/datetime'

/**
 * Get data from persister service
 *
 * @param {String} documentNumber
 */
export let get = (documentNumber) => {
  if (process.env.NODE_ENV === 'production') {
    return getProductionData(documentNumber)
  } else {
    return getDevelopmentData(documentNumber)
  }
}

/**
 * Get data from persister service when the process.env.NODE_ENV == 'production'
 *
 * @private
 * @param {String} documentNumber
 */
function getProductionData (documentNumber) {
  // Http request options
  var options = {
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    qs: {
        documentNumber: documentNumber // -> uri + '?documentNumber=xxxxx'
    },
    json: true // Automatically parses the JSON string in the response
  };
  return request(options)
    .then(original => {
      let document = {
        "original": {
          "documentType": original.document_type,
          "documentNumber": original.document_number,
          "date": original.date,
          "amount": original.amount,
          "currency": original.currency
        },
        "responses": [
          {
            "documentType": "Response",
            "documentNumber": original.document_number,
            "originalDocumentNumber": original.original_document_number,
            "status": original.status,
            "date": datetime.getUnixTime(original.date),
            "amount": original.amount,
            "currency": original.currency
          }
        ]
      }
      return Promise.resolve(document)
    })
}

/**
 * Get data from persister service when the process.env.NODE_ENV != 'production'
 *
 * @private
 * @param {String} documentNumber
 */
function getDevelopmentData (documentNumber) {
  console.log('In NON-production mode the Persister Service is not called')
}
