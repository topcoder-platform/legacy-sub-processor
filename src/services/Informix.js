/**
 * The informix service
 */
const _ = require('lodash')
const Informix = require('informix').Informix
const logger = require('../common/logger')
let instances = {}
const paramReg = /@(\w+?)@/ // sql param regex
class InformixService {
  constructor (opts) {
    let {database, username, password} = opts
    let key = `${database}-${username}-${password}`
    // cache instances to avoid create multi instance for same database,username
    if (instances[key]) {
      return instances[key]
    }
    this.db = new Informix(opts)
    instances[key] = this
    return this
  }

  /**
   * Create context for informix.
   */
  createContext () {
    return this.db.createContext()
  }

  /**
   * Process sql with params.
   * It will find param regex and replace with ? or value in param value if define replace=true as param value
   * @param sql the sql
   * @param params the sql params
   * @private
   */
  _processSql (sql, params) {
    let template = String(sql)
    const paramValues = []
    while (true) {
      let match = paramReg.exec(template)
      if (!match) {
        break
      }
      const paramName = match[1]
      const paramValue = params[paramName]
      const replace = _.isObject(paramValue) && !_.isUndefined(paramValue.replace)
      if (params.hasOwnProperty(paramName)) {
        template = template.replace(paramReg, replace ? paramValue.replace : '?')
      } else {
        throw new Error(`Not found param name ${paramName} in given params ${JSON.stringify(params)}.`)
      }
      if (!replace) {
        paramValues.push(paramValue)
      }
    }
    return [template, paramValues]
  }

  /**
   * Query with sql and params
   * @param{Object} conn the connection
   * @param{String} sql the sql
   * @param{Object} params the sql params
   */
  async query (conn, sql, params) {
    if (_.isString(conn) && _.isUndefined(sql)) {
      sql = conn
      conn = this.db
    } else if (_.isString(conn) && _.isObject(sql) && _.isUndefined(params)) {
      params = sql
      sql = conn
      conn = this.db
    }
    let fetchAll = sql.toLowerCase().startsWith('select')
    let cursor = null
    let stmt = null
    let result = null
    try {
      if (_.isObject(params)) {
        const [template, paramValues] = this._processSql(sql, params)
        logger.debug(`sql template '${template}' with param values [${paramValues.join()}]`)
        stmt = await conn.prepare(template)
        cursor = await stmt.exec(paramValues)
      } else {
        cursor = await conn.query(sql)
      }
      if (fetchAll) {
        result = await cursor.fetchAll()
      }
    } catch (e) {
      throw e
    } finally {
      if (cursor) {
        await cursor.close()
      }
      if (stmt) {
        await stmt.free()
      }
    }
    return result
  }
}

module.exports = InformixService
