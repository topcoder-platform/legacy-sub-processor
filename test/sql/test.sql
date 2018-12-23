
database common_oltp;
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132456, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (20, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (21, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132457, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132458, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124764, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124766, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124772, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124776, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124834, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124835, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124836, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124852, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124853, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124856, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124857, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124861, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124916, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (22770213, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (22719217, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (22719218, 21193, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (22873364, 21193, current, current);


INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132458, 20704, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124764, 20704, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124766, 20704, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124776, 20704, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132458, 20703, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124764, 20703, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124766, 20703, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (124776, 20703, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132456, 20703, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (132456, 20794, current, current);
INSERT INTO user_terms_of_use_xref(user_id, terms_of_use_id, create_date, modify_date) VALUES (22770213, 20794, current, current);


update terms_of_use set url='http://example.com/';

update security_groups set challenge_group_ind = 1 where group_id in (2000115, 10, 15471940, 14);

database corporate_oltp;
INSERT INTO informix.tc_direct_project (project_id,name,description,project_status_id,user_id, create_date,modify_date) VALUES (
1245,'Project 1','Project 1 descr',1,132456, current, current);
INSERT INTO informix.tc_direct_project (project_id,name,description,project_status_id,user_id, create_date,modify_date) VALUES (
1246,'Project 2','Project 2 descr',1,132456, current, current);
INSERT INTO informix.direct_project_account (direct_project_account_id,project_id,billing_account_id) VALUES (
1,1245, 1);
INSERT INTO informix.direct_project_account (direct_project_account_id,project_id,billing_account_id) VALUES (
21,1245, 3);
INSERT INTO informix.direct_project_account (direct_project_account_id,project_id,billing_account_id) VALUES (
22,1245,2);
INSERT INTO informix.direct_project_account (direct_project_account_id,project_id,billing_account_id) VALUES (
3,1246, 3);
INSERT INTO informix.user_permission_grant (user_permission_grant_id, user_id, resource_id, permission_type_id, is_studio)
VALUES(100, 132456, 1246, 3, 0);
INSERT INTO informix.user_permission_grant (user_permission_grant_id, user_id, resource_id, permission_type_id, is_studio)
VALUES(101, 132456, 1245, 3, 0);

database tcs_catalog;

INSERT INTO tcs_catalog:informix.project_milestone
(project_milestone_id, name, description, due_date, send_notifications, completed, project_id, completion_date)
VALUES(1, 'm1', 'm1', '2018-05-31 00:00:00.000', 'f', 'f', 1245, NULL);
INSERT INTO tcs_catalog:informix.comp_catalog
(component_id, current_version, short_desc, component_name, description, function_desc, create_time, status_id, root_category_id, modify_date, public_ind)
VALUES(2054, 1, 'NA', 'TEST CODE', 'NA', NULL, '2018-05-25 22:53:29.000', 102, 9926572, '2018-05-25 22:53:29.000', 0);
INSERT INTO tcs_catalog:informix.comp_catalog
(component_id, current_version, short_desc, component_name, description, function_desc, create_time, status_id, root_category_id, modify_date, public_ind)
VALUES(2055, 1, 'NA', 'Test F2F', 'NA', NULL, '2018-05-25 22:55:21.000', 102, 9926572, '2018-05-25 22:55:21.000', 0);
INSERT INTO tcs_catalog:informix.comp_catalog
(component_id, current_version, short_desc, component_name, description, function_desc, create_time, status_id, root_category_id, modify_date, public_ind)
VALUES(2056, 1, 'NA', 'Test Web Design', 'NA', NULL, '2018-05-25 22:58:22.000', 102, 27202915, '2018-05-25 22:58:22.000', 0);
INSERT INTO tcs_catalog:informix.comp_catalog
(component_id, current_version, short_desc, component_name, description, function_desc, create_time, status_id, root_category_id, modify_date, public_ind)
VALUES(2074, 1, 'NA', 'Test Web 2', 'NA', NULL, '2018-05-25 23:55:45.000', 102, 27202915, '2018-05-25 23:55:45.000', 0);
INSERT INTO tcs_catalog:informix.comp_catalog
(component_id, current_version, short_desc, component_name, description, function_desc, create_time, status_id, root_category_id, modify_date, public_ind)
VALUES(2075, 1, 'NA', 'Test Dev Component', 'NA', NULL, '2018-05-25 23:55:45.000', 102, 5801778, '2018-05-25 23:55:45.000', 0);
INSERT INTO tcs_catalog:informix.comp_versions
(comp_vers_id, component_id, version, version_text, create_time, phase_id, phase_time, price, comments, modify_date, suspended_ind)
VALUES(2020, 2054, 1, '1.0', '2018-05-25 22:53:29.000', 112, '1976-06-05 00:00:00.000', 0.00, '132456', '2018-05-25 22:53:29.000', 0);
INSERT INTO tcs_catalog:informix.comp_versions
(comp_vers_id, component_id, version, version_text, create_time, phase_id, phase_time, price, comments, modify_date, suspended_ind)
VALUES(2021, 2055, 1, '1.0', '2018-05-25 22:55:21.000', 112, '1976-06-05 00:00:00.000', 0.00, '132456', '2018-05-25 22:55:21.000', 0);
INSERT INTO tcs_catalog:informix.comp_versions
(comp_vers_id, component_id, version, version_text, create_time, phase_id, phase_time, price, comments, modify_date, suspended_ind)
VALUES(2022, 2056, 1, '1.0', '2018-05-25 22:58:22.000', 112, '1976-06-05 00:00:00.000', 0.00, '132456', '2018-05-25 22:58:22.000', 0);
INSERT INTO tcs_catalog:informix.comp_versions
(comp_vers_id, component_id, version, version_text, create_time, phase_id, phase_time, price, comments, modify_date, suspended_ind)
VALUES(2040, 2074, 1, '1.0', '2018-05-25 23:55:45.000', 112, '1976-06-05 00:00:00.000', 0.00, '132456', '2018-05-25 23:55:45.000', 0);
INSERT INTO tcs_catalog:informix.comp_versions
(comp_vers_id, component_id, version, version_text, create_time, phase_id, phase_time, price, comments, modify_date, suspended_ind)
VALUES(2041, 2075, 1, '1.0', '2018-05-25 23:55:45.000', 112, '1976-06-05 00:00:00.000', 0.00, '132456', '2018-05-25 23:55:45.000', 0);
INSERT INTO tcs_catalog:informix.comp_version_dates
(comp_version_dates_id, comp_vers_id, phase_id, posting_date, initial_submission_date, winner_announced_date, final_submission_date, estimated_dev_date, price, total_submissions, status_id, create_time, level_id, screening_complete_date, review_complete_date, aggregation_complete_date, phase_complete_date, production_date, aggregation_complete_date_comment, phase_complete_date_comment, review_complete_date_comment, winner_announced_date_comment, initial_submission_date_comment, screening_complete_date_comment, final_submission_date_comment, production_date_comment, modify_date)
VALUES(1000, 2020, 112, '1976-06-05', '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', 0.00, 0, 301, '2018-05-25 22:53:29', 100, '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-05-25 22:53:29');
INSERT INTO tcs_catalog:informix.comp_version_dates
(comp_version_dates_id, comp_vers_id, phase_id, posting_date, initial_submission_date, winner_announced_date, final_submission_date, estimated_dev_date, price, total_submissions, status_id, create_time, level_id, screening_complete_date, review_complete_date, aggregation_complete_date, phase_complete_date, production_date, aggregation_complete_date_comment, phase_complete_date_comment, review_complete_date_comment, winner_announced_date_comment, initial_submission_date_comment, screening_complete_date_comment, final_submission_date_comment, production_date_comment, modify_date)
VALUES(1001, 2021, 112, '1976-06-05', '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', 0.00, 0, 301, '2018-05-25 22:55:21', 100, '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-05-25 22:55:21');
INSERT INTO tcs_catalog:informix.comp_version_dates
(comp_version_dates_id, comp_vers_id, phase_id, posting_date, initial_submission_date, winner_announced_date, final_submission_date, estimated_dev_date, price, total_submissions, status_id, create_time, level_id, screening_complete_date, review_complete_date, aggregation_complete_date, phase_complete_date, production_date, aggregation_complete_date_comment, phase_complete_date_comment, review_complete_date_comment, winner_announced_date_comment, initial_submission_date_comment, screening_complete_date_comment, final_submission_date_comment, production_date_comment, modify_date)
VALUES(1002, 2022, 112, '1976-06-05', '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', 0.00, 0, 301, '2018-05-25 22:58:22', 100, '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-05-25 22:58:22');
INSERT INTO tcs_catalog:informix.comp_version_dates
(comp_version_dates_id, comp_vers_id, phase_id, posting_date, initial_submission_date, winner_announced_date, final_submission_date, estimated_dev_date, price, total_submissions, status_id, create_time, level_id, screening_complete_date, review_complete_date, aggregation_complete_date, phase_complete_date, production_date, aggregation_complete_date_comment, phase_complete_date_comment, review_complete_date_comment, winner_announced_date_comment, initial_submission_date_comment, screening_complete_date_comment, final_submission_date_comment, production_date_comment, modify_date)
VALUES(1020, 2040, 112, '1976-06-05', '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', 0.00, 0, 301, '2018-05-25 23:55:45', 100, '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-05-25 23:55:46');
INSERT INTO tcs_catalog:informix.comp_version_dates
(comp_version_dates_id, comp_vers_id, phase_id, posting_date, initial_submission_date, winner_announced_date, final_submission_date, estimated_dev_date, price, total_submissions, status_id, create_time, level_id, screening_complete_date, review_complete_date, aggregation_complete_date, phase_complete_date, production_date, aggregation_complete_date_comment, phase_complete_date_comment, review_complete_date_comment, winner_announced_date_comment, initial_submission_date_comment, screening_complete_date_comment, final_submission_date_comment, production_date_comment, modify_date)
VALUES(1021, 2041, 112, '1976-06-05', '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', 0.00, 0, 301, '2018-05-25 23:55:45', 100, '2000-02-01', '2000-02-01', '2000-02-01', '2000-02-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2018-05-25 23:55:46');
INSERT INTO tcs_catalog:informix.comp_documentation
(document_id, comp_vers_id, document_type_id, document_name, url)
VALUES(2021, 2020, 24, 'exception', '2054/2020/projectexception.txt');
INSERT INTO tcs_catalog:informix.comp_technology
(comp_tech_id, comp_vers_id, technology_type_id)
VALUES(2200, 2020, 27167847);
INSERT INTO tcs_catalog:informix.comp_technology
(comp_tech_id, comp_vers_id, technology_type_id)
VALUES(2201, 2020, 26951709);
INSERT INTO tcs_catalog:informix.comp_technology
(comp_tech_id, comp_vers_id, technology_type_id)
VALUES(2202, 2021, 27050144);
INSERT INTO tcs_catalog:informix.comp_technology
(comp_tech_id, comp_vers_id, technology_type_id)
VALUES(2203, 2021, 13);
INSERT INTO tcs_catalog:informix.comp_categories
(comp_categories_id, component_id, category_id)
VALUES(2020, 2054, 9926575);
INSERT INTO tcs_catalog:informix.comp_categories
(comp_categories_id, component_id, category_id)
VALUES(2021, 2055, 9926575);
INSERT INTO tcs_catalog:informix.comp_categories
(comp_categories_id, component_id, category_id)
VALUES(2022, 2056, 27202916);
INSERT INTO tcs_catalog:informix.comp_categories
(comp_categories_id, component_id, category_id)
VALUES(2040, 2074, 27202916);
INSERT INTO tcs_catalog:informix.component_inquiry
(component_inquiry_id, component_id, user_id, comment, agreed_to_terms, rating, phase, tc_user_id, version, create_time, project_id)
VALUES(27210568, 2055, 132458, NULL, 1, 0, 149, 132458, 1, '2018-05-25 22:55:21.000', 30005521);
INSERT INTO tcs_catalog:informix.component_inquiry
(component_inquiry_id, component_id, user_id, comment, agreed_to_terms, rating, phase, tc_user_id, version, create_time, project_id)
VALUES(27210569, 2055, 124916, NULL, 1, 0, 149, 124916, 1, '2018-05-25 22:55:21.000', 30005521);
INSERT INTO tcs_catalog:informix.component_inquiry
(component_inquiry_id, component_id, user_id, comment, agreed_to_terms, rating, phase, tc_user_id, version, create_time, project_id)
VALUES(27210570, 2055, 124776, NULL, 1, 0, 149, 124776, 1, '2018-05-25 22:55:21.000', 30005521);

INSERT INTO tcs_catalog:informix.project_studio_specification
(project_studio_spec_id, goals, target_audience, branding_guidelines, disliked_design_websites, other_instructions, winning_criteria, submitters_locked_between_rounds, round_one_introduction, round_two_introduction, colors, fonts, layout_and_size, contest_introduction, contest_description, content_requirements, general_feedback, create_user, create_date, modify_user, modify_date)
VALUES(1, '', '', '', '', '', '', 'f', 'round 1 info', 'roundd 2 info', '', '', '', 'intro', NULL, NULL, NULL, '132456', '2018-05-25 22:58:22.083', '132456', '2018-05-25 23:50:05.324');
INSERT INTO tcs_catalog:informix.project_studio_specification
(project_studio_spec_id, goals, target_audience, branding_guidelines, disliked_design_websites, other_instructions, winning_criteria, submitters_locked_between_rounds, round_one_introduction, round_two_introduction, colors, fonts, layout_and_size, contest_introduction, contest_description, content_requirements, general_feedback, create_user, create_date, modify_user, modify_date)
VALUES(21, '', '', '', '', '', '', 'f', 'round 1', 'routnd 2', '', '', '', 'intro', NULL, NULL, NULL, '132456', '2018-05-25 23:55:44.406', '132456', '2018-05-26 00:06:07.351');

INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005520, 1, 39, NULL, NULL, NULL, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 23:36:58.386', 1245);
INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005521, 1, 38, NULL, NULL, NULL, '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:21.782', 1245);
INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005522, 9, 17, 1, NULL, NULL, '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 23:50:05.268', 1245);
INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005530, 1, 17, 21, NULL, NULL, '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-26 00:06:07.266', 1245);
INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005540, 1, 2, NULL, NULL, NULL, '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-26 00:06:07.266', 1245);
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95235, 30005520, 1, 2, '2018-05-25 09:00:00.000', '2018-05-25 23:10:00.346', '2018-06-10 23:10:00.000', '2018-05-25 23:10:00.346', NULL, 172800000, '132456', '2018-05-25 22:53:29.130', '132456', '2018-05-25 23:36:58.506');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95236, 30005520, 2, 1, NULL, '2018-05-25 23:15:00.000', '2018-06-10 23:10:00.000', NULL, NULL, 431700000, '132456', '2018-05-25 22:53:29.130', '132456', '2018-05-25 23:36:58.506');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95237, 30005520, 4, 1, NULL, '2018-06-10 23:10:00.000', '2018-06-21 23:10:00.000', NULL, NULL, 172800000, '132456', '2018-05-25 22:53:29.130', '132456', '2018-05-25 23:36:58.506');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95238, 30005520, 5, 1, NULL, '2018-06-21 23:10:00.000', '2018-06-25 23:10:00.000', NULL, NULL, 86400000, '132456', '2018-05-25 22:53:29.130', '132456', '2018-05-25 23:36:58.506');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95239, 30005520, 6, 1, NULL, '2018-06-25 23:10:00.000', '2018-06-30 11:10:00.000', NULL, NULL, 43200000, '132456', '2018-05-25 22:53:29.130', '132456', '2018-05-25 23:36:58.506');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95243, 30005521, 1, 3, '2018-05-26 09:00:00.000', '2018-05-26 09:00:00.000', '2018-06-05 09:00:00.000', NULL, NULL, 864000000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95244, 30005521, 18, 3, NULL, '2018-05-25 22:55:45.167', '2018-05-30 17:00:00.000', '2018-05-25 22:55:45.167', NULL, 86400000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95245, 30005521, 2, 3, NULL, '2018-05-26 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95256, 30005522, 13, 1, '2018-05-25 22:58:00.000', '2018-05-25 22:58:00.000', '2018-05-27 22:58:00.000', NULL, NULL, 172800000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95257, 30005522, 14, 1, NULL, '2018-05-27 22:58:00.000', '2018-05-28 04:58:00.000', NULL, NULL, 21600000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95258, 30005522, 1, 1, '2018-05-26 09:00:00.000', '2018-05-28 04:58:00.000', '2018-05-31 04:58:00.000', NULL, NULL, 259200000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95259, 30005522, 15, 1, NULL, '2018-05-28 05:03:00.000', '2018-05-31 04:58:00.000', NULL, NULL, 258900000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95260, 30005522, 2, 1, NULL, '2018-05-28 05:03:00.000', '2018-06-03 04:58:00.000', NULL, NULL, 518100000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95261, 30005522, 16, 1, NULL, '2018-05-31 04:58:00.000', '2018-05-31 08:58:00.000', NULL, NULL, 14400000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95262, 30005522, 17, 1, NULL, '2018-05-31 08:58:00.000', '2018-06-02 08:58:00.000', NULL, NULL, 172800000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95263, 30005522, 3, 1, NULL, '2018-06-03 04:58:00.000', '2018-06-03 08:58:00.000', NULL, NULL, 14400000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95264, 30005522, 4, 1, NULL, '2018-06-03 08:58:00.000', '2018-06-09 08:58:00.000', NULL, NULL, 518400000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95265, 30005522, 11, 1, NULL, '2018-06-09 08:58:00.000', '2018-06-14 08:58:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 22:58:22.110', '132456', '2018-05-25 23:50:05.398');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95280, 30005530, 13, 3, '2018-05-25 23:55:00.000', '2018-05-25 23:55:00.000', '2018-05-27 23:55:00.000', NULL, NULL, 172800000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95281, 30005530, 14, 3, NULL, '2018-05-27 23:55:00.000', '2018-05-28 05:55:00.000', NULL, NULL, 21600000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95282, 30005530, 1, 3, '2018-05-26 00:00:00.000', '2018-05-28 05:55:00.000', '2018-05-31 05:55:00.000', NULL, NULL, 259200000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95283, 30005530, 15, 3, NULL, '2018-05-28 06:00:00.000', '2018-05-31 05:55:00.000', NULL, NULL, 258900000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95284, 30005530, 2, 3, NULL, '2018-05-28 06:00:00.000', '2018-06-03 05:55:00.000', NULL, NULL, 518100000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95285, 30005530, 16, 3, NULL, '2018-05-31 05:55:00.000', '2018-05-31 09:55:00.000', NULL, NULL, 14400000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95286, 30005530, 17, 3, NULL, '2018-05-31 09:55:00.000', '2018-06-02 09:55:00.000', NULL, NULL, 172800000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95287, 30005530, 3, 3, NULL, '2018-06-03 05:55:00.000', '2018-06-03 09:55:00.000', NULL, NULL, 14400000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95288, 30005530, 4, 3, NULL, '2018-06-03 09:55:00.000', '2018-06-09 09:55:00.000', NULL, NULL, 518400000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95289, 30005530, 11, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95300, 30005540, 1, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95301, 30005540, 2, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95302, 30005540, 3, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95303, 30005540, 4, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95304, 30005540, 5, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95305, 30005540, 6, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95306, 30005540, 7, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95307, 30005540, 8, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95308, 30005540, 9, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95309, 30005540, 10, 2, NULL, '2018-06-09 09:55:00.000', '2018-06-14 09:55:00.000', NULL, NULL, 432000000, '132456', '2018-05-25 23:55:44.479', '132456', '2018-05-26 00:06:07.420');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95235, 2, '0', '132456', '2018-05-25 22:53:29.144', '132456', '2018-05-25 22:53:29.144');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95237, 1, '30000418', '132456', '2018-05-25 22:53:29.158', '132456', '2018-05-25 23:09:47.278');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95237, 6, '2', '132456', '2018-05-25 22:53:29.158', '132456', '2018-05-25 22:53:29.158');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95238, 4, 'No', '132456', '2018-05-25 22:53:29.161', '132456', '2018-05-25 22:53:29.161');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95243, 2, '0', '132456', '2018-05-25 22:55:21.583', '132456', '2018-05-25 22:55:21.583');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95244, 1, '30000419', '132456', '2018-05-25 22:55:21.586', '132456', '2018-05-25 22:55:21.586');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95244, 6, '1', '132456', '2018-05-25 22:55:21.586', '132456', '2018-05-25 22:55:21.586');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95257, 1, '30000722', '132456', '2018-05-25 22:58:22.115', '132456', '2018-05-25 22:58:22.115');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95257, 6, '1', '132456', '2018-05-25 22:58:22.115', '132456', '2018-05-25 22:58:22.115');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95258, 2, '0', '132456', '2018-05-25 22:58:22.119', '132456', '2018-05-25 22:58:22.119');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95261, 1, '30000416', '132456', '2018-05-25 22:58:22.137', '132456', '2018-05-25 22:58:22.137');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95262, 1, '30000417', '132456', '2018-05-25 22:58:22.140', '132456', '2018-05-25 22:58:22.140');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95263, 1, '30000414', '132456', '2018-05-25 22:58:22.142', '132456', '2018-05-25 22:58:22.142');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95264, 1, '30000418', '132456', '2018-05-25 22:58:22.145', '132456', '2018-05-25 22:58:22.145');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95264, 6, '1', '132456', '2018-05-25 22:58:22.145', '132456', '2018-05-25 22:58:22.145');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95265, 1, '30000720', '132456', '2018-05-25 22:58:22.148', '132456', '2018-05-25 23:50:05.486');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95265, 6, '1', '132456', '2018-05-25 22:58:22.148', '132456', '2018-05-25 22:58:22.148');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95281, 1, '30000722', '132456', '2018-05-25 23:55:44.500', '132456', '2018-05-25 23:55:44.500');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95281, 6, '1', '132456', '2018-05-25 23:55:44.500', '132456', '2018-05-25 23:55:44.500');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95282, 2, '0', '132456', '2018-05-25 23:55:44.505', '132456', '2018-05-25 23:55:44.505');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95285, 1, '30000416', '132456', '2018-05-25 23:55:44.512', '132456', '2018-05-25 23:55:44.512');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95286, 1, '30000417', '132456', '2018-05-25 23:55:44.514', '132456', '2018-05-25 23:55:44.514');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95287, 1, '30000414', '132456', '2018-05-25 23:55:44.516', '132456', '2018-05-25 23:55:44.516');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95288, 1, '30000418', '132456', '2018-05-25 23:55:44.518', '132456', '2018-05-25 23:55:44.518');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95288, 6, '1', '132456', '2018-05-25 23:55:44.518', '132456', '2018-05-25 23:55:44.518');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95289, 1, '30000720', '132456', '2018-05-25 23:55:44.521', '132456', '2018-05-26 00:06:07.495');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95289, 6, '1', '132456', '2018-05-25 23:55:44.521', '132456', '2018-05-25 23:55:44.521');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95300, 2, '0', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95300, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95301, 3, '0', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95301, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95302, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95302, 1, '30000410', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95303, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95303, 1, '30000411', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95303, 6, '3', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95304, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95304, 4, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95305, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95306, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95307, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95308, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_criteria
(project_phase_id, phase_criteria_type_id, parameter, create_user, create_date, modify_user, modify_date)
VALUES(95309, 5, 'No', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95235, 95236, 1, 1, 300000, '132456', '2018-05-25 22:53:29.165', '132456', '2018-05-25 22:53:29.165');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95236, 95237, 0, 1, 0, '132456', '2018-05-25 22:53:29.165', '132456', '2018-05-25 22:53:29.165');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95237, 95238, 0, 1, 0, '132456', '2018-05-25 22:53:29.165', '132456', '2018-05-25 22:53:29.165');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95238, 95239, 0, 1, 0, '132456', '2018-05-25 22:53:29.165', '132456', '2018-05-25 22:53:29.165');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95245, 95244, 1, 1, 0, '132456', '2018-05-25 22:55:21.590', '132456', '2018-05-25 22:55:21.590');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95243, 95245, 1, 1, 300000, '132456', '2018-05-25 22:55:21.590', '132456', '2018-05-25 22:55:21.590');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95256, 95257, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95257, 95258, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95258, 95259, 1, 1, 300000, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95258, 95260, 1, 1, 300000, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95259, 95261, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95261, 95262, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95260, 95263, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95263, 95264, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95264, 95265, 0, 1, 0, '132456', '2018-05-25 22:58:22.151', '132456', '2018-05-25 22:58:22.151');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95280, 95281, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95281, 95282, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95282, 95283, 1, 1, 300000, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95282, 95284, 1, 1, 300000, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95283, 95285, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95285, 95286, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95284, 95287, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95287, 95288, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95288, 95289, 0, 1, 0, '132456', '2018-05-25 23:55:44.527', '132456', '2018-05-25 23:55:44.527');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95300, 95301, 1, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95301, 95302, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95302, 95303, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95303, 95304, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95304, 95305, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95305, 95306, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95307, 95308, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.phase_dependency
(dependency_phase_id, dependent_phase_id, dependency_start, dependent_start, lag_time, create_user, create_date, modify_user, modify_date)
VALUES(95308, 95309, 0, 1, 0, '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 1, '2020', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 2, '2054', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 3, '1', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 5, '9926572', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 6, 'TEST CODE', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 7, '1.0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 9, 'On', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 10, 'On', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 78, 'Development', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 11, 'On', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 79, 'COMMUNITY', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 12, 'Yes', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 13, 'No', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 14, 'Open', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 16, '350', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 26, 'Off', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 31, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 17, '', '132456', '2018-05-25 23:38:03.000', '132456', '2018-05-25 23:38:03.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 34, 'public', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 35, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 32, '1', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 33, '231', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 38, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 39, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 36, '350', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 37, '150', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 43, 'true', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 40, 'M', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 41, 'false', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 46, 'true', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 44, 'true', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 45, 'false', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 49, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 48, 'true', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 59, 'false', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 58, '132456', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 57, '0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 62, '05.25.2018 10:53 PM', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 61, '731.0', '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 1, '2021', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 2, '2055', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 3, '1', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 5, '9926572', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 6, 'Test F2F', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 7, '1.0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 9, 'On', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 10, 'On', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 78, 'Development', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 11, 'On', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 79, 'COMMUNITY', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 12, 'Yes', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 13, 'No', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 14, 'Open', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 16, '800', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 82, '1', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 26, 'Off', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 28, 'true', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 31, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 30, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 34, 'public', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 35, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 32, '1', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 33, '112', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 38, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 39, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 36, '800', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 37, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 43, 'true', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 40, 'M', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 41, 'false', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 46, 'true', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 44, 'false', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 45, 'false', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 49, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 48, 'true', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 59, 'false', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 58, '132456', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 57, '0', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 62, '05.25.2018 10:55 PM', '132456', '2018-05-25 22:55:21.000', '132456', '2018-05-25 22:55:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 61, '912.0', '132456', '2018-05-25 22:55:21.000', '132456', '2018-05-25 22:55:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 1, '2022', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 2, '2056', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 3, '1', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 5, '27202915', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 6, 'Test Web Design', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 7, '1.0', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 9, 'On', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:22.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 10, 'On', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 78, 'Design', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 11, 'On', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 79, 'INTERNAL', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 12, 'Yes', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 13, 'No', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 14, 'Open', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 16, '1250', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 26, 'Off', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 31, '0', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 1, '2040', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 34, 'public', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 35, '75', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 32, '1', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 33, '100', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 36, '1250', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 37, '250', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 43, 'true', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 41, 'false', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 46, 'true', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 44, 'false', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 45, 'true', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 51, '5', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 49, '0', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 48, 'false', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 53, 'true', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 52, 'true', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 59, 'false', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 58, '132456', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 57, '0', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 62, '05.25.2018 10:58 PM', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 61, '1775.0', '132456', '2018-05-25 22:58:21.000', '132456', '2018-05-25 22:58:21.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 17, '', '132456', '2018-05-25 23:09:46.000', '132456', '2018-05-25 23:09:46.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 4, '0', '132456', '2018-05-25 23:09:46.000', '132456', '2018-05-25 23:09:46.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 22, '05.30.2018 23:10 UTC', '132456', '2018-05-25 23:09:46.000', '132456', '2018-05-25 23:36:57.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 4, '33', '132456', '2018-05-25 23:38:03.000', '132456', '2018-05-25 23:38:03.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 22, '06.03.2018 04:58 UTC', '132456', '2018-05-25 23:38:03.000', '132456', '2018-05-25 23:38:03.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 2, '2074', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 3, '1', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 5, '27202915', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 6, 'Test Web 2', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 7, '1.0', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 9, 'On', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:45.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 10, 'On', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 78, 'Design', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 11, 'On', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 79, 'INTERNAL', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 12, 'Yes', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 13, 'No', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 14, 'Open', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 16, '1250', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 26, 'Off', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 31, '0', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 34, 'public', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 35, '75', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 32, '1', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 33, '100', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 36, '1250', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 37, '250', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 43, 'true', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 41, 'false', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 46, 'true', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 44, 'false', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 45, 'true', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 51, '5', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 49, '0', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 48, 'false', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 53, 'true', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 52, 'true', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 59, 'false', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 58, '132456', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 57, '0', '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-25 23:55:44.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 62, '05.25.2018 11:55 PM', '132456', '2018-05-25 23:55:45.000', '132456', '2018-05-25 23:55:45.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 61, '1675.0', '132456', '2018-05-25 23:55:45.000', '132456', '2018-05-25 23:55:45.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 17, '', '132456', '2018-05-26 00:06:06.000', '132456', '2018-05-26 00:06:06.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 4, '0', '132456', '2018-05-26 00:06:06.000', '132456', '2018-05-26 00:06:06.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 22, '06.03.2018 05:55 UTC', '132456', '2018-05-26 00:06:06.000', '132456', '2018-05-26 00:06:06.000');

INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 1, '2041', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 2, '2075', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 3, '1', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 4, '0', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 5, '5801778', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 6, 'Test Dev Component', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 7, '1.0', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 9, 'Off', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 10, 'On', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 11, 'On', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 12, 'Yes', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 13, 'Yes', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 14, 'Open', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 16, '0.0', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 26, 'On', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 29, 'On', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 41, 'true', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005540, 43, 'true', '132458', '2010-05-21 07:26:30.000', '132458', '2010-05-21 07:26:30.000');
INSERT INTO tcs_catalog:informix.project_platform
(project_id, project_platform_id, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 14, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_platform
(project_id, project_platform_id, create_user, create_date, modify_user, modify_date)
VALUES(30005520, 17, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_platform
(project_id, project_platform_id, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 10, '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_result
(user_id, project_id, old_rating, new_rating, raw_score, final_score, payment, placed, rating_ind, valid_submission_ind, create_date, modify_date, passed_review_ind, point_adjustment, rating_order)
VALUES(132458, 30005521, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-05-25 22:55:21.000', '2018-05-25 22:55:21.000', NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.project_result
(user_id, project_id, old_rating, new_rating, raw_score, final_score, payment, placed, rating_ind, valid_submission_ind, create_date, modify_date, passed_review_ind, point_adjustment, rating_order)
VALUES(124916, 30005521, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-05-25 22:55:21.000', '2018-05-25 22:55:21.000', NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.project_result
(user_id, project_id, old_rating, new_rating, raw_score, final_score, payment, placed, rating_ind, valid_submission_ind, create_date, modify_date, passed_review_ind, point_adjustment, rating_order)
VALUES(124776, 30005521, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-05-25 22:55:21.000', '2018-05-25 22:55:21.000', NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1000, 30005520, 1, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1001, 30005520, 2, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1002, 30005520, 3, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:53:28.000', '132456', '2018-05-25 22:53:28.000');
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1003, 30005521, 1, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1004, 30005521, 2, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:55:21.000', '132456', '2018-05-25 22:55:21.000');
INSERT INTO tcs_catalog:informix.project_spec
(project_spec_id, project_id, version, detailed_requirements, submission_deliverables, environment_setup_instruction, final_submission_guidelines, private_description, create_user, create_date, modify_user, modify_date)
VALUES(1005, 30005521, 3, NULL, '', '', NULL, NULL, '132456', '2018-05-25 22:55:21.000', '132456', '2018-05-25 22:55:21.000');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(1, 30005520, 1, 350, 15, 1, '132456', '2018-05-25 22:53:29.095', '132456', '2018-05-25 23:36:58.418');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(2, 30005520, 2, 150, 15, 1, '132456', '2018-05-25 22:53:29.104', '132456', '2018-05-25 23:36:58.428');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(3, 30005521, 1, 800, 15, 1, '132456', '2018-05-25 22:55:21.569', '132456', '2018-05-25 22:55:21.804');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(4, 30005522, 1, 1250, 15, 1, '132456', '2018-05-25 22:58:22.071', '132456', '2018-05-25 23:50:05.302');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(5, 30005522, 2, 250, 15, 1, '132456', '2018-05-25 22:58:22.074', '132456', '2018-05-25 23:50:05.307');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(6, 30005522, 3, 100, 15, 1, '132456', '2018-05-25 22:58:22.075', '132456', '2018-05-25 23:50:05.312');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(7, 30005522, 1, 50, 14, 5, '132456', '2018-05-25 22:58:22.076', '132456', '2018-05-25 23:50:05.318');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(21, 30005530, 1, 1250, 15, 1, '132456', '2018-05-25 23:55:44.373', '132456', '2018-05-26 00:06:07.334');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(22, 30005530, 2, 250, 15, 1, '132456', '2018-05-25 23:55:44.393', '132456', '2018-05-26 00:06:07.340');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(23, 30005530, 1, 50, 14, 5, '132456', '2018-05-25 23:55:44.395', '132456', '2018-05-26 00:06:07.344');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(55, 30005540, 1, 350, 15, 1, '132456', '2018-05-25 22:53:29.095', '132456', '2018-05-25 23:36:58.418');
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(56, 30005540, 2, 150, 15, 1, '132456', '2018-05-25 22:53:29.104', '132456', '2018-05-25 23:36:58.428');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125200, 13, 30005520, NULL, 132456, '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 23:37:01.627');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125201, 13, 30005520, NULL, 22770213, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(175201, 1, 30005520, NULL, 132458, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125202, 13, 30005521, NULL, 132456, '132456', '2018-05-25 22:55:21.597', '132456', '2018-05-25 22:55:21.597');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125203, 13, 30005521, NULL, 22770213, '132456', '2018-05-25 22:55:21.614', '132456', '2018-05-25 22:55:21.614');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125204, 1, 30005521, NULL, 132458, '132458', '2018-05-25 22:55:22.218', '132458', '2018-05-25 22:55:22.218');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125205, 1, 30005521, NULL, 124916, '124916', '2018-05-25 22:55:22.320', '124916', '2018-05-25 22:55:22.320');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125206, 1, 30005521, NULL, 124776, '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:45.140');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125207, 21, 30005521, 95244, 132456, '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125208, 13, 30005522, NULL, 132456, '132456', '2018-05-25 22:58:22.165', '132456', '2018-05-25 23:50:06.658');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125209, 13, 30005522, NULL, 22770213, '132456', '2018-05-25 22:58:22.180', '132456', '2018-05-25 23:50:06.709');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125210, 17, 30005522, NULL, 132456, '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 23:50:06.770');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125220, 13, 30005530, NULL, 132456, '132456', '2018-05-25 23:55:44.609', '132456', '2018-05-25 23:55:44.609');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125221, 13, 30005530, NULL, 22770213, '132456', '2018-05-25 23:55:44.647', '132456', '2018-05-25 23:55:44.647');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125222, 17, 30005530, NULL, 132456, '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.850');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125223, 18, 30005530, 95281, 132458, '132456', '2018-05-26 02:47:33.000', '132456', '2018-05-26 02:47:33.000');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125224, 1, 30005530, 95284, 124764, '132456', '2018-05-26 03:06:13.000', '132456', '2018-05-26 03:06:13.000');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125225, 1, 30005530, 95284, 124772, '132456', '2018-05-26 03:07:02.000', '132456', '2018-05-26 03:07:02.000');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125226, 13, 30005540, NULL, 132456, '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 23:37:01.627');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125227, 13, 30005540, NULL, 22770213, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125228, 1, 30005540, NULL, 132458, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');


INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125226, 6, '05.25.2018 10:53 PM', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125226, 2, 'heffan', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125226, 1, '132456', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125226, 8, 'N/A', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125227, 6, '05.25.2018 10:53 PM', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125227, 2, 'Applications', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125227, 1, '22770213', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125227, 8, 'N/A', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125228, 2, 'user', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125228, 1, '132458', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125228, 8, 'N/A', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');

INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125200, 6, '05.25.2018 10:53 PM', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125200, 2, 'heffan', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125200, 1, '132456', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125200, 8, 'N/A', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');

INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(175201, 2, 'user', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(175201, 1, '132458', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(175201, 8, 'N/A', '132456', '2018-05-25 22:53:29.218', '132456', '2018-05-25 22:53:29.218');


INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125201, 6, '05.25.2018 10:53 PM', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125201, 2, 'Applications', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125201, 1, '22770213', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125201, 8, 'N/A', '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 22:53:29.243');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125202, 6, '05.25.2018 10:55 PM', '132456', '2018-05-25 22:55:21.597', '132456', '2018-05-25 22:55:21.597');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125202, 2, 'heffan', '132456', '2018-05-25 22:55:21.597', '132456', '2018-05-25 22:55:21.597');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125202, 1, '132456', '132456', '2018-05-25 22:55:21.597', '132456', '2018-05-25 22:55:21.597');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125202, 8, 'N/A', '132456', '2018-05-25 22:55:21.597', '132456', '2018-05-25 22:55:21.597');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125203, 6, '05.25.2018 10:55 PM', '132456', '2018-05-25 22:55:21.614', '132456', '2018-05-25 22:55:21.614');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125203, 2, 'Applications', '132456', '2018-05-25 22:55:21.614', '132456', '2018-05-25 22:55:21.614');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125203, 1, '22770213', '132456', '2018-05-25 22:55:21.614', '132456', '2018-05-25 22:55:21.614');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125203, 8, 'N/A', '132456', '2018-05-25 22:55:21.614', '132456', '2018-05-25 22:55:21.614');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125204, 2, 'user', '132458', '2018-05-25 22:55:22.218', '132458', '2018-05-25 22:55:22.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125204, 6, '05.25.2018 10:55 PM', '132458', '2018-05-25 22:55:22.218', '132458', '2018-05-25 22:55:22.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125204, 1, '132458', '132458', '2018-05-25 22:55:22.218', '132458', '2018-05-25 22:55:22.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125204, 8, 'No', '132458', '2018-05-25 22:55:22.218', '132458', '2018-05-25 22:55:22.218');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125205, 2, 'Yoshi', '124916', '2018-05-25 22:55:22.320', '124916', '2018-05-25 22:55:22.320');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125205, 6, '05.25.2018 10:55 PM', '124916', '2018-05-25 22:55:22.320', '124916', '2018-05-25 22:55:22.320');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125205, 1, '124916', '124916', '2018-05-25 22:55:22.320', '124916', '2018-05-25 22:55:22.320');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125205, 8, 'No', '124916', '2018-05-25 22:55:22.320', '124916', '2018-05-25 22:55:22.320');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125206, 2, 'sandking', '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:22.395');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125206, 6, '05.25.2018 10:55 PM', '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:22.395');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125206, 1, '124776', '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:22.395');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125206, 8, 'No', '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:22.395');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 6, '05.25.2018 10:55 PM', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 2, 'heffan', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 1, '132456', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 8, 'N/A', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 15, 'true', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125207, 7, 'N/A', '132456', '2018-05-25 22:55:45.260', '132456', '2018-05-25 22:55:45.260');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125208, 6, '05.25.2018 10:58 PM', '132456', '2018-05-25 22:58:22.165', '132456', '2018-05-25 22:58:22.165');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125208, 2, 'heffan', '132456', '2018-05-25 22:58:22.165', '132456', '2018-05-25 22:58:22.165');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125208, 1, '132456', '132456', '2018-05-25 22:58:22.165', '132456', '2018-05-25 22:58:22.165');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125208, 8, 'N/A', '132456', '2018-05-25 22:58:22.165', '132456', '2018-05-25 22:58:22.165');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125209, 6, '05.25.2018 10:58 PM', '132456', '2018-05-25 22:58:22.180', '132456', '2018-05-25 22:58:22.180');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125209, 2, 'Applications', '132456', '2018-05-25 22:58:22.180', '132456', '2018-05-25 22:58:22.180');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125209, 1, '22770213', '132456', '2018-05-25 22:58:22.180', '132456', '2018-05-25 22:58:22.180');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125209, 8, 'N/A', '132456', '2018-05-25 22:58:22.180', '132456', '2018-05-25 22:58:22.180');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125210, 2, 'heffan', '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 22:58:22.688');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125210, 6, '05.25.2018 10:58 PM', '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 22:58:22.688');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125210, 1, '132456', '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 22:58:22.688');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125210, 8, 'N/A', '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 22:58:22.688');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125220, 6, '05.25.2018 11:55 PM', '132456', '2018-05-25 23:55:44.609', '132456', '2018-05-25 23:55:44.609');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125220, 2, 'heffan', '132456', '2018-05-25 23:55:44.609', '132456', '2018-05-25 23:55:44.609');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125220, 1, '132456', '132456', '2018-05-25 23:55:44.609', '132456', '2018-05-25 23:55:44.609');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125220, 8, 'N/A', '132456', '2018-05-25 23:55:44.609', '132456', '2018-05-25 23:55:44.609');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125221, 6, '05.25.2018 11:55 PM', '132456', '2018-05-25 23:55:44.647', '132456', '2018-05-25 23:55:44.647');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125221, 2, 'Applications', '132456', '2018-05-25 23:55:44.647', '132456', '2018-05-25 23:55:44.647');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125221, 1, '22770213', '132456', '2018-05-25 23:55:44.647', '132456', '2018-05-25 23:55:44.647');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125221, 8, 'N/A', '132456', '2018-05-25 23:55:44.647', '132456', '2018-05-25 23:55:44.647');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125222, 2, 'heffan', '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.557');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125222, 6, '05.25.2018 11:55 PM', '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.557');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125222, 1, '132456', '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.557');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125222, 8, 'N/A', '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.557');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125223, 1, '132458', '132456', '2018-05-26 03:03:05.000', '132456', '2018-05-26 03:03:05.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125223, 2, 'user', '132456', '2018-05-26 03:03:05.000', '132456', '2018-05-26 03:03:05.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125223, 6, '05.25.2018 11:55 PM', '132456', '2018-05-26 03:03:05.000', '132456', '2018-05-26 03:03:05.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125223, 8, 'N/A', '132456', '2018-05-26 03:03:05.000', '132456', '2018-05-26 03:03:05.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125224, 1, '124764', '132456', '2018-05-26 03:06:14.000', '132456', '2018-05-26 03:06:14.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125224, 2, 'Hung', '132456', '2018-05-26 03:06:14.000', '132456', '2018-05-26 03:06:14.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125224, 6, '05.25.2018 11:55 PM', '132456', '2018-05-26 03:06:14.000', '132456', '2018-05-26 03:06:14.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125224, 8, 'N/A', '132456', '2018-05-26 03:06:14.000', '132456', '2018-05-26 03:06:14.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125225, 1, '124772', '132456', '2018-05-26 03:07:02.000', '132456', '2018-05-26 03:07:02.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125225, 2, 'Partha', '132456', '2018-05-26 03:07:02.000', '132456', '2018-05-26 03:07:02.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125225, 6, '05.25.2018 11:55 PM', '132456', '2018-05-26 03:07:02.000', '132456', '2018-05-26 03:07:02.000');
INSERT INTO tcs_catalog:informix.resource_info
(resource_id, resource_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(125225, 8, 'N/A', '132456', '2018-05-26 03:07:02.000', '132456', '2018-05-26 03:07:02.000');
INSERT INTO tcs_catalog:informix.upload
(upload_id, project_id, project_phase_id, resource_id, upload_type_id, upload_status_id, parameter, upload_desc, create_user, create_date, modify_user, modify_date)
VALUES(91260, 30005521, 95245, 125206, 1, 1, 'e8560c0a_mock.zip', NULL, '124776', '2018-05-25 22:55:45.108', '132456', '2018-05-25 22:55:45.438');
INSERT INTO tcs_catalog:informix.upload
(upload_id, project_id, project_phase_id, resource_id, upload_type_id, upload_status_id, parameter, upload_desc, create_user, create_date, modify_user, modify_date)
VALUES(91261, 30005522, 95256, 125210, 1, 1, 'c5dd8561_specification6431827689655589331.txt', NULL, '132456', '2018-05-25 22:58:22.857', '132456', '2018-05-25 22:58:22.857');
INSERT INTO tcs_catalog:informix.upload
(upload_id, project_id, project_phase_id, resource_id, upload_type_id, upload_status_id, parameter, upload_desc, create_user, create_date, modify_user, modify_date)
VALUES(91270, 30005530, 95280, 125222, 1, 1, 'aa0d6281_specification2100387308896185926.txt', NULL, '132456', '2018-05-25 23:55:45.817', '132456', '2018-05-25 23:55:45.817');
INSERT INTO tcs_catalog:informix.upload
(upload_id, project_id, project_phase_id, resource_id, upload_type_id, upload_status_id, parameter, upload_desc, create_user, create_date, modify_user, modify_date)
VALUES(91271, 30005530, 95287, 125224, 1, 1, 'dummy.txt', NULL, '132456', '2018-05-26 03:22:52.000', '132456', '2018-05-26 03:22:52.000');
INSERT INTO tcs_catalog:informix.upload
(upload_id, project_id, project_phase_id, resource_id, upload_type_id, upload_status_id, parameter, upload_desc, create_user, create_date, modify_user, modify_date)
VALUES(91272, 30005530, 95283, 125224, 1, 1, 'dummy.txt', NULL, '132456', '2018-05-26 03:25:43.000', '132456', '2018-05-26 03:25:43.000');
INSERT INTO tcs_catalog:informix.submission
(submission_id, upload_id, submission_status_id, screening_score, initial_score, final_score, placement, submission_type_id, create_user, create_date, modify_user, modify_date, user_rank, mark_for_purchase, prize_id, file_size, view_count, system_file_name, thurgood_job_id)
VALUES(54480, 91260, 1, NULL, 100.00, 100.00, 1, 1, '124776', '2018-05-25 22:55:45.123', '132456', '2018-05-25 22:55:45.241', 1, 'f', 3, NULL, NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.submission
(submission_id, upload_id, submission_status_id, screening_score, initial_score, final_score, placement, submission_type_id, create_user, create_date, modify_user, modify_date, user_rank, mark_for_purchase, prize_id, file_size, view_count, system_file_name, thurgood_job_id)
VALUES(54481, 91261, 1, NULL, NULL, NULL, NULL, 2, '132456', '2018-05-25 22:58:22.860', '132456', '2018-05-25 22:58:22.860', 1, 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.submission
(submission_id, upload_id, submission_status_id, screening_score, initial_score, final_score, placement, submission_type_id, create_user, create_date, modify_user, modify_date, user_rank, mark_for_purchase, prize_id, file_size, view_count, system_file_name, thurgood_job_id)
VALUES(54490, 91270, 1, NULL, NULL, NULL, NULL, 2, '132456', '2018-05-25 23:55:45.838', '132456', '2018-05-25 23:55:45.838', 1, 'f', NULL, NULL, NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.submission
(submission_id, upload_id, submission_status_id, screening_score, initial_score, final_score, placement, submission_type_id, create_user, create_date, modify_user, modify_date, user_rank, mark_for_purchase, prize_id, file_size, view_count, system_file_name, thurgood_job_id)
VALUES(54491, 91271, 1, 100.00, 100.00, 100.00, 1, 1, '132456', '2018-05-26 03:22:52.000', '132456', '2018-05-26 03:22:52.000', NULL, NULL, 21, NULL, NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.submission
(submission_id, upload_id, submission_status_id, screening_score, initial_score, final_score, placement, submission_type_id, create_user, create_date, modify_user, modify_date, user_rank, mark_for_purchase, prize_id, file_size, view_count, system_file_name, thurgood_job_id)
VALUES(54492, 91272, 1, 100.00, 100.00, 100.00, 1, 3, '132456', '2018-05-26 03:25:43.000', '132456', '2018-05-26 03:25:43.000', NULL, NULL, 23, NULL, NULL, NULL, NULL);
INSERT INTO tcs_catalog:informix.resource_submission
(resource_id, submission_id, create_user, create_date, modify_user, modify_date)
VALUES(125206, 54480, '124776', '2018-05-25 22:55:22.395', '124776', '2018-05-25 22:55:45.140');
INSERT INTO tcs_catalog:informix.resource_submission
(resource_id, submission_id, create_user, create_date, modify_user, modify_date)
VALUES(125210, 54481, '132456', '2018-05-25 22:58:22.688', '132456', '2018-05-25 23:50:06.770');
INSERT INTO tcs_catalog:informix.resource_submission
(resource_id, submission_id, create_user, create_date, modify_user, modify_date)
VALUES(125222, 54490, '132456', '2018-05-25 23:55:45.557', '132456', '2018-05-25 23:55:45.850');
INSERT INTO tcs_catalog:informix.review
(review_id, resource_id, submission_id, project_phase_id, scorecard_id, committed, score, initial_score, create_user, create_date, modify_user, modify_date)
VALUES(71490, 125207, 54480, 95244, 30000419, 1, 100, 100.00, '125207', '2018-05-25 22:55:44.000', '125207', '2018-05-25 22:55:44.000');
INSERT INTO tcs_catalog:informix.review_auction
(review_auction_id, project_id, review_auction_type_id)
VALUES(1, 30005520, 5);
INSERT INTO tcs_catalog:informix.review_auction
(review_auction_id, project_id, review_auction_type_id)
VALUES(2, 30005521, 4);
INSERT INTO tcs_catalog:informix.review_item
(review_item_id, review_id, scorecard_question_id, upload_id, answer, sort, create_user, create_date, modify_user, modify_date)
VALUES(2186570, 71490, 30003115, NULL, '10', 0, '125207', '2018-05-25 22:55:44.000', '125207', '2018-05-25 22:55:44.000');

INSERT INTO tcs_catalog:informix.contest_milestone_xref
(contest_id, project_milestone_id, create_user, create_date, modify_user, modify_date)
VALUES(30005522, 1, '132456', '2018-05-25 22:58:22.231', '132456', '2018-05-25 22:58:22.231');
INSERT INTO tcs_catalog:informix.contest_milestone_xref
(contest_id, project_milestone_id, create_user, create_date, modify_user, modify_date)
VALUES(30005530, 1, '132456', '2018-05-25 23:55:44.819', '132456', '2018-05-25 23:55:44.819');

INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(24, 30005530, 1, 1000, 16, 1, '132456', current, '132456', current);
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(25, 30005530, 2, 500, 16, 1, '132456', current, '132456', current);
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(26, 30005522, 1, 900, 16, 1, '132456', current, '132456', current);
INSERT INTO tcs_catalog:informix.prize
(prize_id, project_id, place, prize_amount, prize_type_id, number_of_submissions, create_user, create_date, modify_user, modify_date)
VALUES(27, 30005522, 2, 450, 16, 1, '132456', current, '132456', current);

UPDATE id_sequences SET next_block_start = 60000 WHERE name = 'upload_id_seq';
UPDATE id_sequences SET next_block_start = 93000 WHERE name = 'submission_id_seq';

alter table upload add url lvarchar(1000);

database common_oltp;
update id_sequences set next_block_start = 100000 where name = 'project_phase_id_seq';
update id_sequences set next_block_start = 40005530 where name = 'project_id_seq';
update id_sequences set next_block_start = 1000 where name = 'prize_id_seq';
update id_sequences set next_block_start = 2000 where name = 'PROJECT_SPEC_ID_SEQ';
update id_sequences set next_block_start = 200000 where name = 'resource_id_seq';
update id_sequences set next_block_start = 5000 where name = 'COMPCATEGORY_SEQ';
update id_sequences set next_block_start = 3000 where name = 'TECHNOLOGY_SEQ';


database corporate_oltp;
INSERT INTO informix.tc_direct_project (project_id,name,description,project_status_id,user_id, create_date,modify_date) VALUES (
1247,'Project 3','Project 3 desc',1,132456, current, current);


database informixoltp;
INSERT INTO contest(contest_id, name) VALUES(2001, 'test contest 2001');
INSERT INTO round(round_id, contest_id, name, round_type_id) VALUES(2001, 2001, 'test round 2001', 13);
INSERT INTO round_segment(round_id, segment_id, start_time, end_time, status) VALUES(2001, 1, '2018-12-1 12:00:00', '2018-12-6 12:00:00', 'A');
INSERT INTO round_segment(round_id, segment_id, start_time, end_time, status) VALUES(2001, 5, '2018-12-15 12:00:00', '2018-12-25 12:00:00', 'A');

INSERT INTO problem(problem_id, name) VALUES(2001, 'test problem');
INSERT INTO component(component_id, problem_id, result_type_id, method_name, class_name) VALUES(2001, 2001, 1, 'test method', 'test class');
INSERT INTO division(division_id, division_desc) VALUES(100, 'test division');
INSERT INTO round_component(round_id, component_id, division_id) VALUES(2001, 2001, 100);

INSERT INTO round_registration(round_id, coder_id, timestamp) VALUES(2001, 132458, '2018-12-12 18:10:37');
INSERT INTO long_component_state(long_component_state_id, round_id, component_id, coder_id) VALUES(3001, 2001, 2001, 132458);
INSERT INTO long_compilation(long_component_state_id, open_time, language_id) VALUES(3001, 1543719058841, 1);

database tcs_catalog;
INSERT INTO project(project_id, project_status_id, project_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30054163, 1, 37, 132456, current, 132456, current, 1247);

INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30054163, 56, 2001, '132456', current, '132456', current);
INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30054163, 28, 'true', '132456', current, '132456', current);
