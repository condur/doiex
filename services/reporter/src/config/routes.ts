import { Express } from 'express' // eslint-disable-line no-unused-vars
import * as reporter from '../controllers/reporter'

export let routes = (app: Express) => {
  app.get('/', reporter.get)
}
