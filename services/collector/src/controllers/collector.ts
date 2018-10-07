import { Request, Response } from 'express' // eslint-disable-line no-unused-vars
import * as Ajv from 'ajv'
import * as schemaItem from '../schemas/item.json'
import * as schemaItems from '../schemas/items.json'
import * as parserService from '../model/parser'

export let validate = (req: Request, res: Response) => {
  var ajv = new Ajv({allErrors: true})
  var validate = ajv.compile(schemaItems)
  var valid = validate(req.body)
  if (!valid) {
    res.send(validate.errors)
    return
  }
  res.send('No errors')
}

export let put = (req: Request, res: Response) => {
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
}
