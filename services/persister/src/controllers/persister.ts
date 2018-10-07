import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as db from '../database'

export let post = (req: Request, res: Response, next: NextFunction) => {
  try {
    for (let item of req.body) {
      db.originals.insert(item.original)
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
