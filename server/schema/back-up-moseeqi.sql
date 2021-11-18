-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: moseeqi
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `added`
--

DROP TABLE IF EXISTS `added`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `added` (
  `pname` varchar(45) NOT NULL,
  `sname` varchar(45) NOT NULL,
  `creator_number` varchar(45) NOT NULL,
  `creator_username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pname`,`sname`,`creator_number`),
  KEY `creator_number_idx` (`creator_number`),
  KEY `added_sname_idx` (`sname`),
  KEY `creator_username_idx` (`creator_username`),
  CONSTRAINT `added_creator_username` FOREIGN KEY (`creator_username`) REFERENCES `user` (`username`),
  CONSTRAINT `added_pname` FOREIGN KEY (`pname`) REFERENCES `playlist` (`pname`),
  CONSTRAINT `added_sname` FOREIGN KEY (`sname`) REFERENCES `music` (`sname`),
  CONSTRAINT `creator_number` FOREIGN KEY (`creator_number`) REFERENCES `playlist` (`creator_phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `follower_phone_number` varchar(45) NOT NULL,
  `follower_username` varchar(45) DEFAULT NULL,
  `followed_phone_number` varchar(45) NOT NULL,
  `followed_username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`follower_phone_number`,`followed_phone_number`),
  KEY `follower_username_idx` (`follower_username`),
  KEY `followed_phone_number_idx` (`followed_phone_number`),
  KEY `followed_username_idx` (`followed_username`),
  CONSTRAINT `followed_phone_number` FOREIGN KEY (`followed_phone_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `followed_username` FOREIGN KEY (`followed_username`) REFERENCES `user` (`username`),
  CONSTRAINT `follower_phone_number` FOREIGN KEY (`follower_phone_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `follower_username` FOREIGN KEY (`follower_username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `username` varchar(45) NOT NULL,
  `sname` varchar(45) NOT NULL,
  PRIMARY KEY (`username`,`sname`),
  KEY `sname_idx` (`sname`),
  CONSTRAINT `likes_sname` FOREIGN KEY (`sname`) REFERENCES `music` (`sname`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listens`
--

DROP TABLE IF EXISTS `listens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listens` (
  `phone_number` varchar(45) NOT NULL,
  `sname` varchar(45) NOT NULL,
  PRIMARY KEY (`phone_number`,`sname`),
  KEY `sname_idx` (`sname`),
  CONSTRAINT `phonenumber` FOREIGN KEY (`phone_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `sname` FOREIGN KEY (`sname`) REFERENCES `music` (`sname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music` (
  `sname` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `like_count` int(10) unsigned zerofill DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `music_file` blob,
  `promoted` tinyint DEFAULT NULL,
  PRIMARY KEY (`sname`,`phone_number`),
  KEY `phone_number_idx` (`phone_number`),
  CONSTRAINT `phone_number` FOREIGN KEY (`phone_number`) REFERENCES `user` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `pname` varchar(45) NOT NULL,
  `creator_phone_number` varchar(45) NOT NULL,
  `creator_username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pname`,`creator_phone_number`),
  KEY `creator_username_idx` (`creator_phone_number`),
  CONSTRAINT `creator_username` FOREIGN KEY (`creator_phone_number`) REFERENCES `user` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supports`
--

DROP TABLE IF EXISTS `supports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supports` (
  `supporter_phone_number` varchar(45) NOT NULL,
  `supportee_phone_number` varchar(45) NOT NULL,
  `supporter_username` varchar(45) NOT NULL,
  `supportee_username` varchar(45) NOT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`supporter_phone_number`,`supportee_phone_number`),
  KEY `supportee_phone_number_idx` (`supportee_phone_number`),
  KEY `supporter_username_idx` (`supporter_username`),
  KEY `supportee_username_idx` (`supportee_username`),
  CONSTRAINT `supportee_phone_number` FOREIGN KEY (`supportee_phone_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `supportee_username` FOREIGN KEY (`supportee_username`) REFERENCES `user` (`username`),
  CONSTRAINT `supporter_phone_number` FOREIGN KEY (`supporter_phone_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `supporter_username` FOREIGN KEY (`supporter_username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `phone_number` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `follower_count` int(10) unsigned zerofill DEFAULT NULL,
  `profile_picture` blob,
  `type` varchar(45) DEFAULT NULL,
  `earnings` int DEFAULT NULL,
  PRIMARY KEY (`phone_number`,`email`,`username`),
  KEY `username_idx` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `pname` varchar(45) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `user_number` varchar(45) NOT NULL,
  PRIMARY KEY (`pname`,`user_number`),
  KEY `user_number_idx` (`user_number`),
  CONSTRAINT `user_number` FOREIGN KEY (`user_number`) REFERENCES `user` (`phone_number`),
  CONSTRAINT `views_pname` FOREIGN KEY (`pname`) REFERENCES `playlist` (`pname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 16:05:10
