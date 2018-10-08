import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as datetime from '../helpers/datetime'
import * as persisterService from  '../services/persister'

/**
 * Get the all documents
 *
 */
export let get = (req: Request, res: Response, next: NextFunction) => {
  persisterService.get()
    .then(docs => {
      let documents = []
      for (let original of docs) {
        let document = {
          "original": {
            "documentType": original.i_document_type,
            "documentNumber": original.i_document_number,
            "date": datetime.getUnixTime(original.i_date),
            "amount": original.i_amount,
            "currency": original.i_currency
          },
          "responses": [
            {
              "documentType": original.r_document_type,
              "documentNumber": original.r_document_number,
              "originalDocumentNumber": original.r_original_document_number,
              "status": original.r_status,
              "date": datetime.getUnixTime(original.r_date),
              "amount": original.r_amount,
              "currency": original.r_currency
            }
          ]
        }
        documents.push(document)
      }
      res.send(documents)
    })
    .catch(function (err) {
      res.sendStatus(500)
      return next(err)
    });
}
