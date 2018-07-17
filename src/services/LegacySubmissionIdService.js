/**
 * The service to generate the legacy submission ids.
 */
/**
 * Generate the legacy submission id.
 * @returns {Number} the new legacy submission id
 */
function generate () {
  // Just return the current epoch for now.
  // Should be replaced by the real business logic to generate new legacy submisison ids.
  return new Date().getTime()
}

module.exports = {
  generate
}
