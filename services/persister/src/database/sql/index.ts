import { QueryFile, TQueryFileOptions } from 'pg-promise' // eslint-disable-line no-unused-vars
import * as path from 'path'

export default {
  originals: {
    insert: sql('originals/insert.sql'),
    select: sql('originals/select.sql')
  }
}

function sql (file: string): QueryFile {
  const fullPath: string = path.join(__dirname, 'src/database/sql/', file)

  const options: TQueryFileOptions = {

    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true
  }

  const qf: QueryFile = new QueryFile(fullPath, options)

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error)
  }
  return qf
}
