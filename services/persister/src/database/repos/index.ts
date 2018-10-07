import { OriginalsRepository } from './originals'
import { ResponsesRepository } from './responses'

// Database Interface Extensions:
interface IExtensions { // eslint-disable-line no-undef
  originals: OriginalsRepository, // eslint-disable-line no-undef
  responses: ResponsesRepository // eslint-disable-line no-undef
}

export {
  IExtensions, // eslint-disable-line no-undef
  OriginalsRepository, // eslint-disable-line no-undef
  ResponsesRepository // eslint-disable-line no-undef
}
