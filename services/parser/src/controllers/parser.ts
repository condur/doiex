import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as datetime from '../helpers/datetime'
import * as persisterService from '../services/persister'

export let put = (req: Request, res: Response, next: NextFunction) => {
  let documents = []
  for (let original of req.body) {
    if (original.hasOwnProperty('responseNumber')) {
      documents.push({
        'documentType': 'Response',
        'documentNumber': original.responseNumber,
        'originalDocumentNumber': original.originalInvoiceNumber,
        'status': original.status,
        'date': datetime.convert(original.date),
        'amount': Number(original.amount),
        'currency': original.currency
      })
    } else {
      documents.push({
        'documentType': 'Invoice',
        'documentNumber': original.invoiceNumber,
        'originalDocumentNumber': '',
        'status': '',
        'date': datetime.convert(original.date),
        'amount': Number(original.amount),
        'currency': original.currency
      })
    }
  }

  persisterService.send(documents)
    .then(result => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.sendStatus(500)
      return next(err)
    })
}
