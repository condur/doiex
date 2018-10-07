import { Express } from 'express' // eslint-disable-line no-unused-vars
import * as collector from '../controllers/collector'

export let routes = (app: Express) => {
  app.put('/', collector.put)
  app.post('/validate', collector.validate)
}
