/**
 * The mock configuration.
 */
const MOCK_SERVER_PORT = 3003
module.exports = {
  MOCK_SERVER_PORT,
  LOG_LEVEL: 'debug',
  CHALLENGE_INFO_API: `http://localhost:${MOCK_SERVER_PORT}/challenges?filter=id={cid}`
}
