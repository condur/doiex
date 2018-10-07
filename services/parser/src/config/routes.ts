import { Express } from 'express' // eslint-disable-line no-unused-vars
import * as parser from '../controllers/parser'

export let routes = (app: Express) => {
  app.post('/', parser.post)
}
