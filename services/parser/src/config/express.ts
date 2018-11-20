import expressjs from 'express' // eslint-disable-line no-unused-vars
import * as bodyParser from 'body-parser'
import { logger } from '../middlewares/logger'

export let express = (app: expressjs.Express) => {
  // ---------------------------------------------------------------------------------------------
  // Parse incoming request bodies in a middleware before your handlers,
  // available under the req.body property.
  // ---------------------------------------------------------------------------------------------
  app.use(bodyParser.json())

  // -----------------------------------------------------------------------------------------------
  // Configure the app server to log all the requests.
  // Note: The logger is not recording static files access.
  // -----------------------------------------------------------------------------------------------
  app.use(logger)
}
