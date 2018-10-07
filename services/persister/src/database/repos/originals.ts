import { IDatabase, IMain } from 'pg-promise'
import sql from '../sql'

export class OriginalsRepository {
  constructor (db: any, pgp: IMain) {
    this.db = db
    this.pgp = pgp
  }

  private db: IDatabase<any> // eslint-disable-line no-undef
  private pgp: IMain // eslint-disable-line no-undef

  insert (values) {
    return this.db.none(sql.originals.insert, values)
  }
}
