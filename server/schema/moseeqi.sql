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
  `p_name` varchar(45) NOT NULL,
  `s_name` varchar(45) NOT NULL,
  `p_ph` varchar(45) NOT NULL,
  `s_ph` varchar(45) NOT NULL,
  PRIMARY KEY (`p_name`,`s_name`,`p_ph`,`s_ph`),
  KEY `creator_number_idx` (`p_ph`),
  KEY `added_sname_idx` (`s_name`),
  KEY `creator_username_idx` (`s_ph`),
  CONSTRAINT `added_creator_username` FOREIGN KEY (`s_ph`) REFERENCES `user` (`username`),
  CONSTRAINT `added_pname` FOREIGN KEY (`p_name`) REFERENCES `playlist` (`pname`),
  CONSTRAINT `added_sname` FOREIGN KEY (`s_name`) REFERENCES `music` (`sname`),
  CONSTRAINT `creator_number` FOREIGN KEY (`p_ph`) REFERENCES `playlist` (`creator_phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `added`
--

LOCK TABLES `added` WRITE;
/*!40000 ALTER TABLE `added` DISABLE KEYS */;
/*!40000 ALTER TABLE `added` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `s_name` varchar(45) NOT NULL,
  `s_ph` varchar(45) NOT NULL,
  `liker_ph` varchar(45) NOT NULL,
  PRIMARY KEY (`s_name`,`s_ph`,`liker_ph`),
  KEY `s_ph_idx` (`s_ph`),
  KEY `liker_ph_idx` (`liker_ph`),
  CONSTRAINT `liker_ph` FOREIGN KEY (`liker_ph`) REFERENCES `user` (`phone_number`) ON DELETE RESTRICT,
  CONSTRAINT `s_name` FOREIGN KEY (`s_name`) REFERENCES `music` (`sname`) ON DELETE CASCADE,
  CONSTRAINT `s_ph` FOREIGN KEY (`s_ph`) REFERENCES `music` (`phone_number`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `listens`
--

LOCK TABLES `listens` WRITE;
/*!40000 ALTER TABLE `listens` DISABLE KEYS */;
/*!40000 ALTER TABLE `listens` ENABLE KEYS */;
UNLOCK TABLES;

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
  `music_path` varchar(300) DEFAULT NULL,
  `promoted` tinyint DEFAULT NULL,
  PRIMARY KEY (`sname`,`phone_number`),
  KEY `phone_number_idx` (`phone_number`),
  CONSTRAINT `phone_number` FOREIGN KEY (`phone_number`) REFERENCES `user` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music`
--

LOCK TABLES `music` WRITE;
/*!40000 ALTER TABLE `music` DISABLE KEYS */;
INSERT INTO `music` VALUES ('','01234','okb',0000000000,'','/data/01234/music/',0),('2002','03131462112','ahmad',0000000000,'','/data/03131462112/music/2002',0),('anime-music-box_aoi-shiori.mp3','03131462112','ahmad',0000000000,'','/data/03131462112/music/anime-music-box_aoi-shiori.mp3',0),('Fall-2021 (2).png','03131462112','ahmad',0000000000,'','${__dirname}/uploads/music/${file.name}',0),('Heather','03131462112','ahmad',0000000000,'','/data/03131462112/music/Heather',0),('Out of Touch','03131462112','ahmad',0000000000,'','/data/03131462112/music/Out of Touch',0),('OwO','03131462112','ahmad',0000000000,'','/data/03131462112/music/OwO',0),('parhlekuch.mp3','0321','okb',0000000000,'','/data/0321/music/parhlekuch.mp3',0);
/*!40000 ALTER TABLE `music` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES ('abcd','03131462112',NULL),('ahmad smex','123456',NULL),('Playlist01','03131462112',NULL);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `supports`
--

LOCK TABLES `supports` WRITE;
/*!40000 ALTER TABLE `supports` DISABLE KEYS */;
/*!40000 ALTER TABLE `supports` ENABLE KEYS */;
UNLOCK TABLES;

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
  `password` varchar(45) NOT NULL,
  `follower_count` int unsigned NOT NULL DEFAULT '0',
  `profile_picture` blob,
  `type` varchar(45) DEFAULT '1',
  `earnings` int DEFAULT '0',
  PRIMARY KEY (`phone_number`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  KEY `username_idx` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('03131462111','test1@l.com','test1','1',0,NULL,'1',0),('03131462112','abc@xyz.com','ahmad','abc',0,NULL,'1',0),('03131462115','2@lums.edu.pk','ahmad','abc',0,NULL,'1',0),('0313146233','asd@fgh.com','asd','abc',0,NULL,'1',0),('0327462112','2222@lums.edu.pk','031314','abc',0,NULL,'1',0),('121231134','ashd@sd.com','msamadbkj','abc',0,NULL,'1',0),('123454527','exp@xom.com','saad','abc',0,NULL,'1',0),('123456','demonspark0@gmail.com','omer','123',0,NULL,'1',0),('1234567','saloo@gmail.com','saloo','123',0,NULL,'1',0),('89134961376','23100@lums.edu.pk','zinkon_123','123',0,NULL,'1',0),('8914961','23100@lums.edu.com','z','123',0,NULL,'1',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-14 16:53:11
