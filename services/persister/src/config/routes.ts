import { Express } from 'express' // eslint-disable-line no-unused-vars
import * as persister from '../controllers/persister'

export let routes = (app: Express) => {
  app.post('/', persister.post)
}
