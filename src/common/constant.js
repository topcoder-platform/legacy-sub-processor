
const SUBMISSION_TYPE = {
  'challengesubmission': { id: 1, roleId: 1 },
  'Contest Submission': { id: 1, roleId: 1 },
  'Specification Submission': { id: 2, roleId: 17 },
  'Checkpoint Submission': { id: 3, roleId: 1 },
  'Studio Final Fix Submission': { id: 4, roleId: 1 }
}

const UPLOAD_TYPE = {
  'Submission': 1,
  'Final Fix': 3
}
const UPLOAD_STATUS = {
  'Active': 1,
  'Deleted': 2
}

const SUBMISSION_STATUS = {
  'Active': 1,
  'Deleted': 5 }

module.exports = {
  SUBMISSION_TYPE,
  SUBMISSION_STATUS,
  UPLOAD_TYPE,
  UPLOAD_STATUS
}
