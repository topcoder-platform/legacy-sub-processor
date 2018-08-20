/**
 * The IDgenerator service
 */
const logger = require('../common/logger')
const util = require('util')
const _ = require('lodash')
const Mutex = require('async-mutex').Mutex
const Informix = require('informix').Informix

const QUERY_GET_ID_SEQ = 'select next_block_start, block_size from id_sequences where name = ":seqName"'
const QUERY_UPDATE_ID_SEQ = 'update id_sequences set next_block_start = :nextStart where name = ":seqName"'

/**
 * Main class of IDGenerator
 */
class IDGenerator {
  /**
   * Constructor
   * @param {Informix} dbOpts database options
   * @param {String} seqName sequence name
   */
  constructor (dbOpts, seqName) {
    this.db = new Informix(dbOpts)
    this.seqName = seqName
    this._availableId = 0
    this.mutex = new Mutex()
  }

  /**
   * Get next id
   */
  getNextId () {
    var self = this
    return this.mutex.acquire()
      .then(async (release) => {
        --self._availableId
        if (self._availableId <= 0) {
          try {
            await self.getNextBlock()
          } catch (e) {
            release()
            throw e
          }
          self.updateNextBlock(self._nextId + self._availableId + 1)
        }
        release()
        return ++self._nextId
      })
  }

  /**
   * Fetch next block from id_sequence
   */
  getNextBlock () {
    var self = this
    return this.db.query(QUERY_GET_ID_SEQ.replace(/:seqName/g, this.seqName))
      .then((cursor) => {
        return cursor.fetchAll({close: true})
      })
      .then((result) => {
        if (!_.isArray(result) || _.isEmpty(result)) {
          throw new Error('null or empty result for ' + self.seqName)
        }
        self._nextId = --result[0][0]
        self._availableId = result[0][1]
      })
  }

  /**
   * Update id_sequence
   * @param {Number} nextStart next start id
   */
  updateNextBlock (nextStart) {
    var self = this
    return this.db.query(QUERY_UPDATE_ID_SEQ.replace(/:nextStart/g, nextStart)
      .replace(/:seqName/g, self.seqName))
      .then((cursor) => {
        return cursor.close()
      })
      .catch(e => {
        logger.error('Failed to update id sequence: ' + self.seqName)
        logger.error(util.inspect(e))
      })
  }
}

module.exports = IDGenerator
