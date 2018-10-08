import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as request from 'request-promise'
import * as datetime from '../helpers/datetime'

export let get = (req: Request, res: Response, next: NextFunction) => {
  // Validate documentNumber parameter
  if (!req.params.documentNumber) {
    let err = 'Bad request. Missing "documentNumber" parameter'
    res.status(400).send(err)
    return next(err)
  }

  var options = {
    uri: 'http://' + process.env.SERVICE_PERSISTER_HOSTNAME + ':' + process.env.SERVICE_PERSISTER_PORT,
    qs: {
        documentNumber: req.params.documentNumber // -> uri + '?documentNumber=xxxxx'
    },
    json: true // Automatically parses the JSON string in the response
  };
  request(options)
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
      res.send(document)
    })
    .catch(function (err) {
      res.sendStatus(500)
      return next(err)
    });
}
