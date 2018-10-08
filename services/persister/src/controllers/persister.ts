import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as db from '../database'

export let post = (req: Request, res: Response, next: NextFunction) => {
  try {
    for (let original of req.body) {
      db.originals.insert(original)
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
  // Validate documentNumber query parameter
  if (!req.query.documentNumber) {
    let err = 'Bad request. Missing "documentNumber" query parameter'
    res.status(400).send(err)
    return next(err)
  }

  db.originals.select(req.query.documentNumber)
    .then(document => {
      res.send(document)    
    })
    .catch(err => {
      res.sendStatus(500)     
      return next(err)
    })
}
