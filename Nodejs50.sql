/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imageUrl` varchar(500) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Chats`;
CREATE TABLE `Chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text,
  `userIdSender` int NOT NULL,
  `deleted` tinyint NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userIdRecipient` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdSender` (`userIdSender`),
  KEY `userIdRecipient` (`userIdRecipient`),
  CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`),
  CONSTRAINT `Chats_ibfk_2` FOREIGN KEY (`userIdRecipient`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Foods`;
CREATE TABLE `Foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foodName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `foodId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `foodId` (`foodId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `Foods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Permissions`;
CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RolePermission`;
CREATE TABLE `RolePermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'xinchao', 'anhtuan', 'https://picsum.photos/seed/1/600/400', 15, 1, 0, 0, NULL, '2024-01-01 08:00:00', '2025-05-03 14:50:24'),
(2, NULL, 'Content about mastering React Query...', 'https://picsum.photos/seed/2/600/400', 32, 2, 0, 0, NULL, '2024-01-02 09:00:00', '2024-01-02 09:00:00'),
(3, NULL, 'Content about JavaScript tips...', 'https://picsum.photos/seed/3/600/400', 45, 1, 0, 0, NULL, '2024-01-03 10:00:00', '2024-01-03 10:00:00'),
(4, NULL, 'Comparison content...', 'https://picsum.photos/seed/4/600/400', 27, 3, 0, 0, NULL, '2024-01-04 11:00:00', '2024-01-04 11:00:00'),
(5, NULL, 'Content about TypeScript...', 'https://picsum.photos/seed/5/600/400', 12, 2, 0, 0, NULL, '2024-01-05 12:00:00', '2024-01-05 12:00:00'),
(6, NULL, 'Content about SQL joins...', 'https://picsum.photos/seed/6/600/400', 8, 3, 0, 0, NULL, '2024-01-06 13:00:00', '2024-01-06 13:00:00'),
(7, NULL, 'Extensions content...', 'https://picsum.photos/seed/7/600/400', 60, 1, 0, 0, NULL, '2024-01-07 14:00:00', '2024-01-07 14:00:00'),
(8, NULL, 'Content about React optimization...', 'https://picsum.photos/seed/8/600/400', 33, 2, 0, 0, NULL, '2024-01-08 15:00:00', '2024-01-08 15:00:00'),
(9, NULL, 'Content about API design...', 'https://picsum.photos/seed/9/600/400', 18, 3, 0, 0, NULL, '2024-01-09 16:00:00', '2024-01-09 16:00:00'),
(10, NULL, 'Predictions about web development...', 'https://picsum.photos/seed/10/600/400', 21, 1, 0, 0, NULL, '2024-01-10 17:00:00', '2024-01-10 17:00:00'),
(11, 'title', 'content', 'image1', 0, 6, 0, 0, NULL, '2025-04-22 10:47:29', '2025-04-22 10:47:29');
INSERT INTO `Chats` (`id`, `message`, `userIdSender`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`, `userIdRecipient`) VALUES
(1, 'sasd', 6, 0, NULL, '2025-04-21 08:03:56', '2025-04-21 08:03:56', 14),
(2, 'qweqw', 6, 0, NULL, '2025-04-21 08:04:02', '2025-04-21 08:04:02', 15),
(3, 'saas', 6, 0, NULL, '2025-04-21 08:04:03', '2025-04-21 08:04:03', 15),
(4, 'asdsa', 6, 0, NULL, '2025-04-21 08:04:05', '2025-04-21 08:04:05', 14),
(5, 'aaa', 6, 0, NULL, '2025-04-26 08:55:32', '2025-04-26 08:55:32', 16),
(6, 'ssss', 6, 0, NULL, '2025-04-26 08:55:48', '2025-04-26 08:55:48', 2),
(7, 'sss', 6, 0, NULL, '2025-04-26 08:55:51', '2025-04-26 08:55:51', 2),
(8, 'sss', 6, 0, NULL, '2025-04-26 08:55:55', '2025-04-26 08:55:55', 3);
INSERT INTO `Foods` (`id`, `foodName`, `description`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'gỏi kem', 'gỏi được làm từ kem', 0, 0, NULL, '2025-04-16 08:58:44', '2025-04-16 08:58:44'),
(2, 'gỏi gà', 'gỏi được làm từ gà', 0, 0, NULL, '2025-04-16 08:58:44', '2025-04-16 08:58:44'),
(3, 'gỏi vịt', 'gỏi được làm từ vịt', 0, 0, NULL, '2025-04-16 08:58:44', '2025-04-16 08:58:44'),
(4, 'gỏi cá', 'gỏi được làm từ cá', 0, 0, NULL, '2025-04-16 08:58:44', '2025-04-16 08:58:44'),
(5, 'gỏi heo', 'gỏi được làm từ heo', 0, 0, NULL, '2025-04-16 08:58:44', '2025-04-16 08:58:44');
INSERT INTO `Orders` (`id`, `userId`, `foodId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 0, 0, NULL, '2025-04-16 08:58:56', '2025-04-16 08:58:56'),
(2, 3, 1, 0, 0, NULL, '2025-04-16 08:58:56', '2025-04-16 08:58:56'),
(3, 2, 5, 0, 0, NULL, '2025-04-16 08:58:56', '2025-04-16 08:58:56'),
(4, 1, 3, 0, 0, NULL, '2025-04-16 08:58:56', '2025-04-16 08:58:56'),
(5, 3, 2, 0, 0, NULL, '2025-04-16 08:58:56', '2025-04-16 08:58:56');
INSERT INTO `Permissions` (`id`, `name`, `endpoint`, `method`, `module`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'READ ARTICLE', '/article/', 'GET', 'Articles', 0, 0, NULL, '2025-04-16 09:01:02', '2025-04-16 09:01:02'),
(2, 'CREATE ARTICLE', '/article/', 'POST', 'Articles', 0, 0, NULL, NULL, NULL),
(3, 'UPDATE ARTICLE', '/article/:id', 'PATCH', 'Articles', 0, 0, NULL, NULL, NULL),
(4, 'DELETE ARTICLE', '/article/:id', 'DELETE', 'Articles', 0, 0, NULL, NULL, NULL),
(5, 'READ USER', '/user/', 'GET', 'User', 0, 0, NULL, NULL, NULL);
INSERT INTO `RolePermission` (`id`, `roleId`, `permissionId`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 1, 0, 0, NULL, '2025-04-16 15:38:25', '2025-05-08 12:47:00');
INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_ADMIN', 'Quản Trị Hệ Thống', 1, 0, 0, NULL, '2025-04-16 08:58:35', '2025-04-16 08:58:35'),
(2, 'ROLE_USER', 'Người Dùng Hệ Thống', 1, 0, 0, NULL, '2025-04-16 08:58:35', '2025-04-16 08:58:35');
INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'A@gmail.com', 'Nguyen Van A', 'images/nyjxdvegarxposwqhswd', '1234', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 08:58:39', '2025-05-06 15:36:47'),
(2, 'B@gmail.com', 'Nguyen Van B', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 08:58:39', '2025-04-16 08:58:39'),
(3, 'C@gmail.com', 'Nguyen Van C', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 08:58:39', '2025-04-16 08:58:39'),
(4, 'D@gmail.com', 'Nguyen Van D', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 08:58:39', '2025-04-16 08:58:39'),
(5, 'E@gmail.com', 'Nguyen Van E', NULL, '1234', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 08:58:39', '2025-04-16 08:58:39'),
(6, 'anhtuan220903@gmail.com', 'Nguyen Anh Tuan', 'images/htexeyf9yrpgqv5kxogr', '$2b$10$Deh2ZISRgHYdVYV23Sy17OKGRjYUAohk8SXQlU4uquWrEMP/eRXhS', NULL, NULL, 2, 0, 0, NULL, '2025-04-16 09:14:12', '2025-04-26 08:46:08'),
(14, 'anhtuan220903000@gmail.com', 'Nguyễn Anh Tuấn', NULL, '$2b$10$4wCblC9k5Uw4h8IldZb0tepRmUgeHbQ1gpXGO6rtqhNQbRG/zJpxC', NULL, NULL, 2, 0, 0, NULL, '2025-04-19 07:33:53', '2025-04-19 07:33:53'),
(15, 'nguyenanhtuan.forwork@gmail.com', 'Anh Tuấn Nguyễn', 'https://lh3.googleusercontent.com/a/ACg8ocJBPvkY1XJ1atZtIuJQ6JJ40g4hDk65op9S1xa_wuSV5X7Btg=s96-c', NULL, NULL, '112732363954836088825', 2, 0, 0, NULL, '2025-04-19 07:56:26', '2025-04-19 07:56:26'),
(16, 'anhtuan22090311111@gmail.com', 'Nguyễn Anh Tuấn', NULL, '$2b$10$QlJ2C4uYSM.bDJyTIvUnf.LQFSKwmuc42ZHc9v8yj.woZCIa.l0xi', NULL, NULL, 2, 0, 0, NULL, '2025-04-24 10:41:40', '2025-04-24 10:41:40');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;