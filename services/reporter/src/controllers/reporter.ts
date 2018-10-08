import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as persister from  '../model/persister'

/**
 * Get the document based on document number
 *
 * @param {String} documentNumber
 */
export let get = (req: Request, res: Response, next: NextFunction) => {
  // Validate documentNumber parameter
  if (!req.params.documentNumber) {
    let err = 'Bad request. Missing "documentNumber" parameter'
    res.status(400).send(err)
    return next(err)
  }

  persister.get(req.params.documentNumber)
    .then(document => {
      res.send(document)
    })
    .catch(function (err) {
      res.sendStatus(500)
      return next(err)
    });
}
