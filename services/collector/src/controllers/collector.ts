import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as parserService from '../services/parser'

/**
 * Accept the input data
 */
export let put = (req: Request, res: Response, next : NextFunction) => {
  parserService.send(req.body)
    .then(response =>{
      res.sendStatus(200)
    })
    .catch(err => {
      res.sendStatus(500)
      return next(err)
    })
}
