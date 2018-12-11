UPDATE informixoltp:long_component_state SET points=NULL, status_id=NULL, submission_number=NULL, example_submission_number=NULL WHERE long_component_state_id=3001 AND round_id=2001 AND component_id=2001 AND coder_id=132458;
DELETE FROM informixoltp:long_submission WHERE long_component_state_id=3001;
UPDATE upload SET url='http://content.topcoder.com/some/path' WHERE upload_id=60000;