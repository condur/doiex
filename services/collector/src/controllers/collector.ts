import { Request, Response, NextFunction } from 'express' // eslint-disable-line no-unused-vars
import * as Ajv from 'ajv'
import * as schema_item from '../schemas/item.json'
import * as schema_items from '../schemas/items.json'

export let validate = (req: Request, res: Response, next: NextFunction) => {
  var ajv = new Ajv({allErrors: true});
  var validate = ajv.compile(schema_items);
  var valid = validate(req.body);
  if (!valid){
      res.send(JSON.stringify(validate.errors))
      return
  }
  res.send("No errors")
}

export let post = (req: Request, res: Response, next: NextFunction) => {
  var ajv = new Ajv();
  var validate = ajv.compile(schema_item);
  var input_accepted = new Array();
  var input_rejected = new Array();
  for (let item of req.body) {
    var valid = validate(item);
    if (valid){
      input_accepted.push(item)
    } else{
      input_rejected.push(item)
    }
  }
  res.send(input_rejected)
}
