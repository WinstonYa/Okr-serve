/*
 Navicat Premium Data Transfer

 Source Server         : database
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : localhost:3306
 Source Schema         : okr-koa

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 20/05/2020 21:47:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for keyresult
-- ----------------------------
DROP TABLE IF EXISTS `keyresult`;
CREATE TABLE `keyresult`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `objective_id` int(11) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '成就名称',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp(0) NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of keyresult
-- ----------------------------
INSERT INTO `keyresult` VALUES (1, 1, '打开速度快 30%', 1, '2020-05-06 19:56:30', '2020-05-20 21:45:22');
INSERT INTO `keyresult` VALUES (2, 1, '感知上也很快', 1, '2020-05-06 19:56:50', '2020-05-06 19:56:55');
INSERT INTO `keyresult` VALUES (43, 19, '启动浏览器', 1, '2020-05-20 16:28:44', '2020-05-20 21:42:49');

-- ----------------------------
-- Table structure for objective
-- ----------------------------
DROP TABLE IF EXISTS `objective`;
CREATE TABLE `objective`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '目标',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp(0) NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of objective
-- ----------------------------
INSERT INTO `objective` VALUES (1, 1, '我想让网站打开速度快一些', 1, '2020-05-06 19:53:24', '2020-05-20 21:45:14');
INSERT INTO `objective` VALUES (19, 1, '开机', 1, '2020-05-20 16:28:44', '2020-05-20 17:09:04');

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `status` int(11) NULL DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp(0) NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES (1, 1, '图片资源压缩和代理', 0, '2020-05-06 20:04:23', NULL);
INSERT INTO `todo` VALUES (2, 1, 'JavaScript 代码压缩', 0, '2020-05-06 20:04:25', '2020-05-09 14:27:11');
INSERT INTO `todo` VALUES (3, 1, '替换提及较大的资源库', 0, '2020-05-06 20:04:28', NULL);
INSERT INTO `todo` VALUES (4, 1, '添加 Loading', 0, '2020-05-06 20:04:30', NULL);
INSERT INTO `todo` VALUES (20, 1, '已经打开网页', 0, '2020-05-20 16:28:58', '0000-00-00 00:00:00');
INSERT INTO `todo` VALUES (21, 1, '已经开始编译', 0, '2020-05-20 16:29:17', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for todo_keyresult
-- ----------------------------
DROP TABLE IF EXISTS `todo_keyresult`;
CREATE TABLE `todo_keyresult`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NULL DEFAULT NULL COMMENT 'todo_id',
  `keyresult_id` int(11) NULL DEFAULT NULL COMMENT 'keyresult',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_keyresult
-- ----------------------------
INSERT INTO `todo_keyresult` VALUES (0, 3, 1);
INSERT INTO `todo_keyresult` VALUES (3, 2, 1);
INSERT INTO `todo_keyresult` VALUES (14, 1, 1);
INSERT INTO `todo_keyresult` VALUES (15, 4, 1);
INSERT INTO `todo_keyresult` VALUES (34, 20, 43);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'name',
  `open_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'open_id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Winston Wong', 'o4AiY5Ir1JmbvuU2tZCyoPud_6AU');

SET FOREIGN_KEY_CHECKS = 1;
