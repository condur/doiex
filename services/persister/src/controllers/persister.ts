import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as db from '../database'

export let put = (req: Request, res: Response, next: NextFunction) => {
  try {
    for (let document of req.body) {
      db.documents.insert(document)
        .catch(err => {
          if (err.code !== '23505') { // UNIQUENESS_VIOLATION
            throw err
          }
        })
    }
  } catch (err) {
    res.sendStatus(500)
    return next(err)
  }
  res.sendStatus(200)
}

export let get = (req: Request, res: Response, next: NextFunction) => {
  db.documents.select()
    .then(docs => {
      res.send(docs)
    })
    .catch(err => {
      res.sendStatus(500)
      return next(err)
    })
}
