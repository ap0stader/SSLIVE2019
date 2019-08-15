DROP DATABASE IF EXISTS `sslive`;
CREATE DATABASE `sslive`;
DROP TABLE IF EXISTS `sslive`.`feedback`;
CREATE TABLE `sslive`.`feedback` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `text` text COLLATE utf8mb4_unicode_ci,
  `ip` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ua` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `engine` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `os` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `osVersion` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;