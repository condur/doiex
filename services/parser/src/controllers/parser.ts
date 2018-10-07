import { Request, Response } from 'express' // eslint-disable-line no-unused-vars
import * as datetime from '../helpers/datetime'
import * as persisterService from '../model/persister'

export let post = (req: Request, res: Response) => {
  res.sendStatus(200)
  
  var input = []
  for (let original of req.body) {
    input.push({
      "documentType": "Response",
      "documentNumber": original.responseNumber,
      "originalDocumentNumber": original.originalInvoiceNumber,
      "status": original.status,
      "date": datetime.convert(original.date),
      "amount": Number(original.amount),
      "currency": original.currency
    })
  }
  persisterService.send(input)
}
