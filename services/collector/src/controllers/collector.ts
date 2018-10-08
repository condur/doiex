import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as Ajv from 'ajv'
import * as schemaItem from '../schemas/item.json'
import * as schemaItems from '../schemas/items.json'
import * as parserService from '../model/parser'

/**
 * Validate the input data according to '../schemas/items.json' JSON Schema
 */
export let validate = (req: Request, res: Response, next : NextFunction) => {
  try {
    var ajv = new Ajv({allErrors: true})
    var validate = ajv.compile(schemaItems)
    var valid = validate(req.body)
    if (!valid) {
      res.send(validate.errors)
    }
    res.send('No errors')
  } catch (err){
    res.sendStatus(500)
    return next(err)
  }
}

/**
 * Accept the input data, validate each item in the list 
 * according to '../schemas/item.json' JSON Schema and return the invalid ones
 */
export let put = (req: Request, res: Response, next : NextFunction) => {
  try {
    var ajv = new Ajv()
    var validate = ajv.compile(schemaItem)
    var inputAccepted = []
    var inputRejected = []
    for (let item of req.body) {
      var valid = validate(item)
      if (valid) {
        inputAccepted.push(item)
      } else {
        inputRejected.push(item)
      }
    }
    res.send(inputRejected)
    parserService.send(inputAccepted)
  } catch (err){
    res.sendStatus(500)
    return next(err)
  }
}
