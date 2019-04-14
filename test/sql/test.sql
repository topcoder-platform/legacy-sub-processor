database tcs_catalog;

alter table upload add url lvarchar(1000);

INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005521, 1, 38, NULL, NULL, NULL, '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:21.782', null);

INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95243, 30005521, 1, 3, '2018-05-26 09:00:00.000', '2018-05-26 09:00:00.000', '2018-06-05 09:00:00.000', NULL, NULL, 864000000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95244, 30005521, 18, 3, NULL, '2018-05-25 22:55:45.167', '2018-05-30 17:00:00.000', '2018-05-25 22:55:45.167', NULL, 86400000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95245, 30005521, 2, 3, NULL, '2018-05-26 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');

INSERT INTO tcs_catalog:informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30005521, 28, 'true', '132456', '2018-05-25 22:55:20.000', '132456', '2018-05-25 22:55:20.000');

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


INSERT INTO tcs_catalog:informix.project_studio_specification
(project_studio_spec_id, goals, target_audience, branding_guidelines, disliked_design_websites, other_instructions, winning_criteria, submitters_locked_between_rounds, round_one_introduction, round_two_introduction, colors, fonts, layout_and_size, contest_introduction, contest_description, content_requirements, general_feedback, create_user, create_date, modify_user, modify_date)
VALUES(21, '', '', '', '', '', '', 'f', 'round 1', 'routnd 2', '', '', '', 'intro', NULL, NULL, NULL, '132456', '2018-05-25 23:55:44.406', '132456', '2018-05-26 00:06:07.351');
INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005530, 1, 17, 21, NULL, NULL, '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-26 00:06:07.266', null);

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


INSERT INTO tcs_catalog:informix.project
(project_id, project_status_id, project_category_id, project_studio_spec_id, project_mm_spec_id, project_sub_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30005540, 1, 2, NULL, NULL, NULL, '132456', '2018-05-25 23:55:44.000', '132456', '2018-05-26 00:06:07.266', null);

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

INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125227, 13, 30005540, NULL, 22770213, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125228, 1, 30005540, NULL, 132458, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');

UPDATE id_sequences SET next_block_start = 93000 WHERE name = 'upload_id_seq';
UPDATE id_sequences SET next_block_start = 60000 WHERE name = 'submission_id_seq';


database informixoltp;
INSERT INTO contest(contest_id, name) VALUES(2001, 'test contest 2001');
INSERT INTO round(round_id, contest_id, name, round_type_id) VALUES(2001, 2001, 'test round 2001', 13);
INSERT INTO round_segment(round_id, segment_id, start_time, end_time, status) VALUES(2001, 1, '2018-12-1 12:00:00', '2018-12-6 12:00:00', 'A');
INSERT INTO round_segment(round_id, segment_id, start_time, end_time, status) VALUES(2001, 5, '2018-12-15 12:00:00', '2018-12-25 12:00:00', 'A');

INSERT INTO problem(problem_id, name) VALUES(2001, 'test problem');
INSERT INTO component(component_id, problem_id, result_type_id, method_name, class_name) VALUES(2001, 2001, 1, 'test method', 'test class');
INSERT INTO division(division_id, division_desc) VALUES(100, 'test division');
INSERT INTO round_component(round_id, component_id, division_id) VALUES(2001, 2001, 100);

database tcs_catalog;
INSERT INTO project(project_id, project_status_id, project_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30054163, 1, 37, 132456, current, 132456, current, null);

INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95310, 30054163, 1, 3, '2018-05-26 09:00:00.000', '2018-05-26 09:00:00.000', '2018-06-05 09:00:00.000', NULL, NULL, 864000000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95311, 30054163, 2, 3, NULL, '2018-05-26 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95312, 30054163, 4, 3, NULL, '2018-05-27 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');

INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125231, 1, 30054163, NULL, 132458, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125232, 1, 30054163, NULL, 124916, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');

INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30054163, 56, 2001, '132456', current, '132456', current);
INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30054163, 28, 'true', '132456', current, '132456', current);


INSERT INTO project(project_id, project_status_id, project_category_id, create_user, create_date, modify_user, modify_date, tc_direct_project_id)
VALUES(30054164, 1, 37, 132456, current, 132456, current, null);

INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95320, 30054164, 1, 3, '2018-05-26 09:00:00.000', '2018-05-26 09:00:00.000', '2018-06-05 09:00:00.000', NULL, NULL, 864000000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95321, 30054164, 2, 3, NULL, '2018-05-26 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');
INSERT INTO tcs_catalog:informix.project_phase
(project_phase_id, project_id, phase_type_id, phase_status_id, fixed_start_time, scheduled_start_time, scheduled_end_time, actual_start_time, actual_end_time, duration, create_user, create_date, modify_user, modify_date)
VALUES(95322, 30054164, 4, 3, NULL, '2018-05-27 09:05:00.000', '2018-06-05 09:00:00.000', '2018-05-25 22:55:45.168', '2018-05-25 22:55:45.168', 863700000, '132456', '2018-05-25 22:55:21.580', '132456', '2018-05-25 22:55:45.206');

INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125241, 1, 30054164, NULL, 132458, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');
INSERT INTO tcs_catalog:informix.resource
(resource_id, resource_role_id, project_id, project_phase_id, user_id, create_user, create_date, modify_user, modify_date)
VALUES(125242, 1, 30054164, NULL, 124916, '132456', '2018-05-25 22:53:29.243', '132456', '2018-05-25 23:37:01.688');

INSERT INTO informix.project_info
(project_id, project_info_type_id, value, create_user, create_date, modify_user, modify_date)
VALUES(30054164, 28, 'true', '132456', current, '132456', current);
