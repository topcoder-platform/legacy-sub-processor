
const SUBMISSION_TYPE = {
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
  'Deleted': 5
}

const PHASE_TYPE = {
  'Submission': 2,
  'Final Fix': 9,
  'Specification Submission': 13
}

const CHALLENGE_TYPE = {
  'Component': 1,
  'Application': 2,
  'Studio': 3
}

const COMPONENT_STATE = {
  // could add more from https://github.com/appirio-tech/tc1-tcnode/blob/master/tc-common/src/main/java/com/topcoder/web/common/model/algo/ComponentState.java
  NOT_CHALLENGED: 130 // Submitted
}

module.exports = {
  SUBMISSION_TYPE,
  SUBMISSION_STATUS,
  UPLOAD_TYPE,
  UPLOAD_STATUS,
  PHASE_TYPE,
  CHALLENGE_TYPE,
  COMPONENT_STATE
}
