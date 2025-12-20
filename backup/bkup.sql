BEGIN TRANSACTION;CREATE TABLE coding_attempts (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    attempt_time TIMESTAMP NOT NULL,
    minutes_taken INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ("Easy", "Medium", "Hard")),
    needed_help TEXT NOT NULL CHECK (needed_help IN ("Yes", "No", "Kinda")),
    notes TEXT,
    FOREIGN KEY (problem_id) REFERENCES coding_problems(id)
);INSERT INTO "coding_attempts" VALUES(1,1,'2025-11-29 14:57:00',10,'Easy','No','');INSERT INTO "coding_attempts" VALUES(2,2,'2025-11-29 15:00:00',20,'Easy','Kinda','');INSERT INTO "coding_attempts" VALUES(3,2,'2025-11-29 15:00:00',10,'Easy','No','');INSERT INTO "coding_attempts" VALUES(4,2,'2025-11-29 15:01:00',10,'Easy','No','');INSERT INTO "coding_attempts" VALUES(5,1,'2025-12-20 15:02:00',10,'Easy','No','');INSERT INTO "coding_attempts" VALUES(6,3,'2025-11-29 15:03:00',25,'Hard','Yes','');INSERT INTO "coding_attempts" VALUES(7,4,'2025-11-29 15:04:00',5,'Easy','No','');INSERT INTO "coding_attempts" VALUES(8,5,'2025-11-29 15:05:00',5,'Medium','Kinda','');INSERT INTO "coding_attempts" VALUES(9,6,'2025-11-29 15:06:00',20,'Easy','Kinda','');INSERT INTO "coding_attempts" VALUES(10,7,'2025-11-29 15:11:00',25,'Hard','Yes','');INSERT INTO "coding_attempts" VALUES(11,8,'2025-11-30 15:31:00',20,'Medium','Kinda','');INSERT INTO "coding_attempts" VALUES(12,9,'2025-11-30 15:35:00',20,'Hard','Yes','');INSERT INTO "coding_attempts" VALUES(13,10,'2025-12-20 15:36:00',1,'Easy','No','');INSERT INTO "coding_attempts" VALUES(14,11,'2025-11-30 15:39:00',20,'Medium','Yes','');INSERT INTO "coding_attempts" VALUES(15,12,'2025-11-30 15:44:00',30,'Medium','Kinda','');INSERT INTO "coding_attempts" VALUES(16,13,'2025-11-30 15:44:00',50,'Hard','Yes','');INSERT INTO "coding_attempts" VALUES(17,14,'2025-12-20 15:45:00',20,'Medium','Kinda','');INSERT INTO "coding_attempts" VALUES(18,15,'2025-12-20 16:25:00',15,'Medium','Yes','My solution was close, but I needed slight LLM help...');INSERT INTO "coding_attempts" VALUES(19,16,'2025-12-20 16:50:00',15,'Hard','Yes','');INSERT INTO "coding_attempts" VALUES(20,17,'2025-12-20 17:42:00',44,'Hard','Kinda','');INSERT INTO "coding_attempts" VALUES(21,18,'2025-12-20 18:31:00',40,'Hard','Yes','');CREATE TABLE coding_problem_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (problem_id) REFERENCES coding_problems(id),
    FOREIGN KEY (tag_id) REFERENCES coding_tags(id)
);INSERT INTO "coding_problem_tags" VALUES(1,1,1);INSERT INTO "coding_problem_tags" VALUES(2,2,1);INSERT INTO "coding_problem_tags" VALUES(3,2,3);INSERT INTO "coding_problem_tags" VALUES(4,1,4);INSERT INTO "coding_problem_tags" VALUES(5,3,5);INSERT INTO "coding_problem_tags" VALUES(6,3,1);INSERT INTO "coding_problem_tags" VALUES(7,4,1);INSERT INTO "coding_problem_tags" VALUES(8,4,6);INSERT INTO "coding_problem_tags" VALUES(9,5,1);INSERT INTO "coding_problem_tags" VALUES(10,5,6);INSERT INTO "coding_problem_tags" VALUES(11,6,1);INSERT INTO "coding_problem_tags" VALUES(12,6,6);INSERT INTO "coding_problem_tags" VALUES(13,7,7);INSERT INTO "coding_problem_tags" VALUES(14,7,1);INSERT INTO "coding_problem_tags" VALUES(15,8,1);INSERT INTO "coding_problem_tags" VALUES(16,8,4);INSERT INTO "coding_problem_tags" VALUES(17,9,5);INSERT INTO "coding_problem_tags" VALUES(18,9,1);INSERT INTO "coding_problem_tags" VALUES(19,10,1);INSERT INTO "coding_problem_tags" VALUES(20,10,6);INSERT INTO "coding_problem_tags" VALUES(21,11,1);INSERT INTO "coding_problem_tags" VALUES(22,11,6);INSERT INTO "coding_problem_tags" VALUES(23,12,3);INSERT INTO "coding_problem_tags" VALUES(24,12,1);INSERT INTO "coding_problem_tags" VALUES(25,13,8);INSERT INTO "coding_problem_tags" VALUES(26,14,1);INSERT INTO "coding_problem_tags" VALUES(27,14,6);INSERT INTO "coding_problem_tags" VALUES(28,15,9);INSERT INTO "coding_problem_tags" VALUES(29,15,10);INSERT INTO "coding_problem_tags" VALUES(30,15,4);INSERT INTO "coding_problem_tags" VALUES(31,15,11);INSERT INTO "coding_problem_tags" VALUES(32,16,12);INSERT INTO "coding_problem_tags" VALUES(33,16,10);INSERT INTO "coding_problem_tags" VALUES(34,16,13);INSERT INTO "coding_problem_tags" VALUES(35,17,14);INSERT INTO "coding_problem_tags" VALUES(36,17,10);INSERT INTO "coding_problem_tags" VALUES(37,17,15);INSERT INTO "coding_problem_tags" VALUES(38,17,11);INSERT INTO "coding_problem_tags" VALUES(39,18,10);INSERT INTO "coding_problem_tags" VALUES(40,18,4);INSERT INTO "coding_problem_tags" VALUES(41,18,11);INSERT INTO "coding_problem_tags" VALUES(42,19,16);CREATE TABLE coding_problems (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    url TEXT
);INSERT INTO "coding_problems" VALUES(1,'nc_permutations_in_string','');INSERT INTO "coding_problems" VALUES(2,'nc_2_sorted_linked_lists','');INSERT INTO "coding_problems" VALUES(3,'nc_search_in_rotated_sorted_array','');INSERT INTO "coding_problems" VALUES(4,'nc_same_binary_tree','');INSERT INTO "coding_problems" VALUES(5,'nc_subtree_of_another_tree','');INSERT INTO "coding_problems" VALUES(6,'nc_count_good_nodes_in_binary_tree','');INSERT INTO "coding_problems" VALUES(7,'nc_largest_rectangle_in_histogram','');INSERT INTO "coding_problems" VALUES(8,'nc_longest_substring_without_repeating','');INSERT INTO "coding_problems" VALUES(9,'nc_minimum_in_rotated_sorted_array','');INSERT INTO "coding_problems" VALUES(10,'nc_invert_binary_tree','');INSERT INTO "coding_problems" VALUES(11,'nc_balanced_binary_tree','');INSERT INTO "coding_problems" VALUES(12,'nc_copy_linked_list_with_random_pointer','');INSERT INTO "coding_problems" VALUES(13,'wt_cars_at_station','');INSERT INTO "coding_problems" VALUES(14,'nc_valid_binary_search_tree','');INSERT INTO "coding_problems" VALUES(15,'lc_len_of_longest_alphabetical_continuous_substring','');INSERT INTO "coding_problems" VALUES(16,'lc_count_number_of_fair_pairs','');INSERT INTO "coding_problems" VALUES(17,'lc_minimum_ops_to_make_special_number','');INSERT INTO "coding_problems" VALUES(18,'lc_longest_substring_of_all_vowels_in_order','');INSERT INTO "coding_problems" VALUES(19,'dummy_problem_1','');CREATE TABLE coding_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE
);INSERT INTO "coding_tags" VALUES(1,'neetcode');INSERT INTO "coding_tags" VALUES(3,'linked_list');INSERT INTO "coding_tags" VALUES(4,'sliding_window');INSERT INTO "coding_tags" VALUES(5,'binary_search');INSERT INTO "coding_tags" VALUES(6,'tree');INSERT INTO "coding_tags" VALUES(7,'stack');INSERT INTO "coding_tags" VALUES(8,'winton');INSERT INTO "coding_tags" VALUES(9,'one_pass');INSERT INTO "coding_tags" VALUES(10,'leetcode');INSERT INTO "coding_tags" VALUES(11,'greedy');INSERT INTO "coding_tags" VALUES(12,'2_pointer');INSERT INTO "coding_tags" VALUES(13,'monotonic');INSERT INTO "coding_tags" VALUES(14,'math');INSERT INTO "coding_tags" VALUES(15,'irrelevant');INSERT INTO "coding_tags" VALUES(16,'dummy1');CREATE TABLE sysdesign_attempts (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    attempt_time TIMESTAMP NOT NULL,
    minutes_taken INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ("Easy", "Medium", "Hard")),
    needed_help TEXT NOT NULL CHECK (needed_help IN ("Yes", "No", "Kinda")),
    notes TEXT,
    FOREIGN KEY (problem_id) REFERENCES sysdesign_problems(id)
);CREATE TABLE sysdesign_problem_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    problem_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (problem_id) REFERENCES sysdesign_problems(id),
    FOREIGN KEY (tag_id) REFERENCES sysdesign_tags(id)
);CREATE TABLE sysdesign_problems (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    url TEXT
);CREATE TABLE sysdesign_tags (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE
);CREATE INDEX idx_coding_problem_id ON coding_problem_tags (problem_id);CREATE INDEX idx_coding_tag_id ON coding_problem_tags (tag_id);CREATE INDEX idx_coding_attempt_problem_id ON coding_attempts (problem_id);CREATE INDEX idx_coding_attempt_time ON coding_attempts (attempt_time);CREATE INDEX idx_sysdesign_problem_id ON sysdesign_problem_tags (problem_id);CREATE INDEX idx_sysdesign_tag_id ON sysdesign_problem_tags (tag_id);CREATE INDEX idx_sysdesign_attempt_problem_id ON sysdesign_attempts (problem_id);CREATE INDEX idx_sysdesign_attempt_time ON sysdesign_attempts (attempt_time);COMMIT;