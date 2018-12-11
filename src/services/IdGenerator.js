/**
 * The ID generator service
 */
const logger = require('../common/logger')
const util = require('util')
const _ = require('lodash')
const Mutex = require('async-mutex').Mutex

const QUERY_GET_ID_SEQ = 'select next_block_start, block_size from id_sequences where name = @seqName@'
const QUERY_UPDATE_ID_SEQ = 'update id_sequences set next_block_start = @nextStart@ where name = @seqName@'

/**
 * Main class of IDGenerator
 */
class IDGenerator {
  /**
   * Constructor
   * @param {Informix} db database
   * @param {String} seqName sequence name
   */
  constructor (db, seqName) {
    this.db = db
    this.seqName = seqName
    this._availableId = 0
    this.mutex = new Mutex()
  }

  /**
   * Get next id
   */
  async getNextId () {
    const release = await this.mutex.acquire()
    try {
      --this._availableId
      if (this._availableId <= 0) {
        await this.getNextBlock()
        await this.updateNextBlock(this._nextId + this._availableId + 1)
      }
      return ++this._nextId
    } catch (e) {
      throw e
    } finally {
      release()
    }
  }

  /**
   * Fetch next block from id_sequence
   */
  async getNextBlock () {
    const result = await this.db.query(QUERY_GET_ID_SEQ, { seqName: this.seqName })
    if (!_.isArray(result) || _.isEmpty(result)) {
      throw new Error(`null or empty result for ${this.seqName}`)
    }
    this._nextId = --result[0][0]
    this._availableId = result[0][1]
  }

  /**
   * Update id_sequence
   * @param {Number} nextStart next start id
   */
  async updateNextBlock (nextStart) {
    try {
      await this.db.query(QUERY_UPDATE_ID_SEQ, {
        seqName: this.seqName,
        nextStart
      })
    } catch (e) {
      logger.error('Failed to update id sequence: ' + this.seqName)
      logger.error(util.inspect(e))
    }
  }
}

module.exports = IDGenerator
