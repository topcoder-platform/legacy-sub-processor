# Topcoder - Submission Legacy Processor Application - Verification
------------

Please check [docs/Validation.md](/docs/Validation.md) and  [docs/Verification_with_DB.md](/docs/Verification_with_DB.md).

Please note currently you have to verify application with database or please check [docs/Verification_with_DB.md](/docs/Verification_with_DB.md) only.

I would recommend you to verify and test with docker otherwise you need to check related Dockerfile to have better understanding about how to setup environment properly(not recommend).


## Topcoder - Marathon Match - Legacy Processor
Please verify under linux or osx and I test under Ubuntu 18.04 and OSX 12 and windows may have issues to verify with docker.

Please check README.md and ensure you could run tests in docker environment successfully and you can check coverage folder to ensure 
`src/services/MarathonSubmissionService.js`,`src/services/NonMarathonSubmissionService.js`,`src/services/LegacySubmissionIdService.js` are fully tested.

## Setup data in direct
Only necessary MM challenge related test data updated in `./test/sql/test.sql` and you can also setup complete test data using direct application.

You can follow [docs/Verification_with_DB.md](/docs/Verification_with_DB.md) to setup MM challenge in direct app, choose Marathon Match under Data menu during creating challenge and create new project with billing account if error to save mm challenge, in last step you have to create as draft challenge,add user as Submitter and get match  submission phase id. 

Currently tc-direct have [issue to save Match Round ID](https://github.com/appirio-tech/direct-app/issues/341) or you may see such logs from command `docker-compose logs tc-direct` if you want to save in page and refresh page.
```bash 
         | 07:48:37,097 ERROR [ExceptionMappingInterceptor] Invalid action class configuration that references an unknown class named [saveDraftContestAction]
tc-direct_1            | java.lang.RuntimeException: Invalid action class configuration that references an unknown class named [saveDraftContestAction]
```

So you have to run such sql and replace <mm challenge id> with your new created mm challenge id.
```bash
database tcs_catalog;
INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(<mm challenge id>, 56, 2001, '132456', current, '132456', current);
```

Even you run sql direct app will still fail to show details page with such error
```bash 
 java.lang.NullPointerException
tc-direct_1            | 	at com.topcoder.direct.services.view.action.analytics.longcontest.MarathonMatchHelper.getMarathonMatchDetails(MarathonMatchHelper.java:115)
tc-direct_1            | 	at com.topcoder.direct.services.view.action.contest.launch.GetContestAction.executeAction(GetContestAction.java:476)
tc-direct_1            | 	at com.topcoder.direct.services.view.action.BaseDirectStrutsAction.execute(BaseDirectStrutsAction.java:305)
tc-direct_1            | 	at sun.reflect.GeneratedMethodAccessor553.invoke(Unknown Source)

```

Please check https://github.com/appirio-tech/direct-app/blob/dev/src/java/main/com/topcoder/direct/services/view/action/contest/launch/GetContestAction.java#L502

Even latest direct codes will comment out related codes to solve this issue so just leave direct page there.

## Run Legacy Submission Proc. app

Make sure related services started and test data prepared and start app with `NODE_ENV=mock` to mock challenge api otherwise new created mm challenge will still consider as non mm challenge
```bash
export NODE_ENV=mock
export DB_SERVER_NAME=informix
docker-compose up lsp-app
```

## Send Test data
From previous data setup I got:
- challengeId = 40005570
- memberId = 132458 (user)
- submissionPhaseId = 100024

Let's send mm submission with example = 0 event to kafka:

```bash
docker exec -ti lsp-app bash -c "npm run produce-test-event mm 40005570 132458 100024 0"
```

Let's send mm submission with example = 1 event to kafka:

```bash
docker exec -ti lsp-app bash -c "npm run produce-test-event mm 40005570 132458 100024 1"
```

or you can run sample mm submission message directly(valid if run `test/sql/test.sql`)
```bash
docker exec -ti lsp-app bash -c "npm run produce-test-event 9"
```


Please note currently processor will call challenge api to check whether challenge is MM challenge and default server api.topcoder-dev.com may not exist mm challenge created in local direct application.
So when we start app with NODE_ENV=mock it will use mock challenge api configurations and start mock challenge api server.

## Verify Database
Open your database explorer (**DBeaver** application, for instance). Connect to database informixoltp
Check table: `long_component_state`, `long_submission` or run below sql
```bash
select lcs.status_id,lcs.points, lcs.example_submission_number,lcs.submission_number,ls.*  from informixoltp:long_submission ls, informixoltp:long_component_state lcs where ls.long_component_state_id=lcs.long_component_state_id
```