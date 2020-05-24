-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: startupdb
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Current Database: `startupdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `startupdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `startupdb`;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(1000) NOT NULL,
  `area` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'meridian towers, nad x roads','shanti nagar','vizag','andhra pradesh'),(2,'gowlidoddi','padmasri gardens','hyderbad','telangana'),(3,'gachibowli','dlf center','hyderbad','telangana'),(4,'madapur','dmart','hyderbad','telangana'),(5,'banjara hills','shepard stories','hyderbad','telangana');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendence`
--

DROP TABLE IF EXISTS `attendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendence` (
  `date_of_attendence` datetime NOT NULL,
  `period_id` varchar(20) NOT NULL,
  `student_id` int NOT NULL,
  `attended` char(4) NOT NULL DEFAULT 'Y',
  `attendence_marked` char(4) DEFAULT 'N',
  PRIMARY KEY (`date_of_attendence`),
  KEY `student_id` (`student_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `attendence_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `attendence_ibfk_2` FOREIGN KEY (`period_id`) REFERENCES `periods` (`period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendence`
--

LOCK TABLES `attendence` WRITE;
/*!40000 ALTER TABLE `attendence` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` varchar(20) NOT NULL,
  `period_id` varchar(20) NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `periods` (`period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homeroom_teachers`
--

DROP TABLE IF EXISTS `homeroom_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homeroom_teachers` (
  `class_id` varchar(20) NOT NULL,
  `teacher_id` int NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `homeroom_teachers_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `homeroom_teachers_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homeroom_teachers`
--

LOCK TABLES `homeroom_teachers` WRITE;
/*!40000 ALTER TABLE `homeroom_teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `homeroom_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homework`
--

DROP TABLE IF EXISTS `homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homework` (
  `class_id` varchar(20) NOT NULL,
  `period_id` varchar(20) NOT NULL,
  `date_created` varchar(15) NOT NULL,
  `homework_content` text NOT NULL,
  PRIMARY KEY (`class_id`,`period_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `homework_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `homework_ibfk_2` FOREIGN KEY (`period_id`) REFERENCES `periods` (`period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homework`
--

LOCK TABLES `homework` WRITE;
/*!40000 ALTER TABLE `homework` DISABLE KEYS */;
/*!40000 ALTER TABLE `homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutes`
--

DROP TABLE IF EXISTS `institutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutes` (
  `institute_id` varchar(20) NOT NULL,
  `address_id` int NOT NULL,
  `password` varchar(200) NOT NULL,
  `institute_name` varchar(500) NOT NULL,
  `institute_principal` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `education_type` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `date_of_creation` varchar(15) NOT NULL,
  `time_of_creation` varchar(15) NOT NULL,
  PRIMARY KEY (`institute_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `institutes_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutes`
--

LOCK TABLES `institutes` WRITE;
/*!40000 ALTER TABLE `institutes` DISABLE KEYS */;
INSERT INTO `institutes` VALUES ('INS001',1,'$2a$10$e3Thqz9eX1HOab6lWRuvJOZtEl1.fbVgzrFknmNAOPeIEKK0y5AZC','Brilliant minds','diwakar',NULL,'school','9966258428','5/5/2020','2:56:32 PM'),('INS002',2,'$2a$10$/4PjkWgynXqBuQNcRfvHyeGKi1nX0P.uS2Te42nzirv8i.AEC6ENK','SFS School','kovidh',NULL,'school','9501891589','5/5/2020','3:14:45 PM'),('INS003',3,'$2a$10$nMc9e7xRfpNXAz5UqbMYAufoJshAL03827Ynzx2Q1lBpfu59QPDVC','Delhi Public School','sanjay',NULL,'school','9501891589','5/5/2020','3:20:28 PM'),('INS004',4,'$2a$10$MJei31U8E/6X4Rx/88vPBuIrceHKWBR5uJMkBcrriijdBlDDnpx0S','Vishaka Valley','vamsi',NULL,'school','123456789','5/5/2020','11:19:16 PM'),('INS005',5,'$2a$10$wbkj8xtlNetwq2GmjDaxuOoSKnDlpHJdLws/urSGoCYr5QHN1y7sK','sri chaitanya  jr college','goutham',NULL,'college','1212121212','5/6/2020','12:11:18 AM');
/*!40000 ALTER TABLE `institutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_addresses`
--

DROP TABLE IF EXISTS `parent_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_addresses` (
  `parent_id` int NOT NULL,
  `address_id` int NOT NULL,
  `date_address_from` varchar(15) NOT NULL,
  `date_address_to` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`date_address_from`,`parent_id`,`address_id`),
  KEY `parent_id` (`parent_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `parent_addresses_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`parent_id`),
  CONSTRAINT `parent_addresses_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_addresses`
--

LOCK TABLES `parent_addresses` WRITE;
/*!40000 ALTER TABLE `parent_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parents` (
  `parent_id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(40) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` char(4) DEFAULT NULL,
  `dob` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `date_of_creation` varchar(15) NOT NULL,
  `time_of_creation` varchar(15) NOT NULL,
  PRIMARY KEY (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periods`
--

DROP TABLE IF EXISTS `periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periods` (
  `period_id` varchar(20) NOT NULL,
  `subject_id` varchar(20) NOT NULL,
  `teacher_id` int NOT NULL,
  `period_code` varchar(20) DEFAULT NULL,
  `period_name` varchar(100) NOT NULL,
  `date_from` varchar(15) DEFAULT NULL,
  `date_to` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`period_id`),
  KEY `subject_id` (`subject_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `periods_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `periods_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periods`
--

LOCK TABLES `periods` WRITE;
/*!40000 ALTER TABLE `periods` DISABLE KEYS */;
/*!40000 ALTER TABLE `periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `result_id` varchar(20) NOT NULL,
  `student_id` int NOT NULL,
  `percentage` decimal(10,0) NOT NULL,
  `total` int NOT NULL,
  `date_created` varchar(15) NOT NULL,
  `teacher_comments` text,
  `parent_response` char(4) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`result_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_addresses`
--

DROP TABLE IF EXISTS `student_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_addresses` (
  `student_id` int NOT NULL,
  `address_id` int NOT NULL,
  `date_from` varchar(15) NOT NULL,
  `date_to` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`date_from`,`student_id`,`address_id`),
  KEY `address_id` (`address_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_addresses_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`),
  CONSTRAINT `student_addresses_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_addresses`
--

LOCK TABLES `student_addresses` WRITE;
/*!40000 ALTER TABLE `student_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_classes`
--

DROP TABLE IF EXISTS `student_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_classes` (
  `class_id` varchar(20) NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`student_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `student_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_classes`
--

LOCK TABLES `student_classes` WRITE;
/*!40000 ALTER TABLE `student_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_institutes`
--

DROP TABLE IF EXISTS `student_institutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_institutes` (
  `student_id` int NOT NULL,
  `institute_id` varchar(20) NOT NULL,
  `date_from` varchar(15) NOT NULL,
  `date_to` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`date_from`,`student_id`,`institute_id`),
  KEY `institute_id` (`institute_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_institutes_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`institute_id`),
  CONSTRAINT `student_institutes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_institutes`
--

LOCK TABLES `student_institutes` WRITE;
/*!40000 ALTER TABLE `student_institutes` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_institutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_parents`
--

DROP TABLE IF EXISTS `student_parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_parents` (
  `parent_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`parent_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_parents_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parents` (`parent_id`),
  CONSTRAINT `student_parents_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_parents`
--

LOCK TABLES `student_parents` WRITE;
/*!40000 ALTER TABLE `student_parents` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(40) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` char(4) DEFAULT NULL,
  `dob` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `date_of_creation` varchar(15) NOT NULL,
  `time_of_creation` varchar(15) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (10000,'pizzaboy','1@3$','dekkala','','diwakar','M','13/08/1995',NULL,'9966258428','5/5/20','14:36');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_results`
--

DROP TABLE IF EXISTS `subject_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_results` (
  `sub_result_id` varchar(20) NOT NULL,
  `student_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `subject_id` varchar(20) NOT NULL,
  `marks` int NOT NULL,
  `date_created` varchar(15) NOT NULL,
  PRIMARY KEY (`sub_result_id`),
  KEY `student_id` (`student_id`),
  KEY `teacher_id` (`teacher_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `subject_results_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`),
  CONSTRAINT `subject_results_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_results`
--

LOCK TABLES `subject_results` WRITE;
/*!40000 ALTER TABLE `subject_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` varchar(20) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(40) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `gender` char(4) DEFAULT NULL,
  `dob` varchar(15) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `date_of_creation` varchar(15) NOT NULL,
  `time_of_creation` varchar(15) NOT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetable` (
  `period_id` varchar(20) NOT NULL,
  `day` varchar(25) NOT NULL,
  `starts_at` varchar(15) NOT NULL,
  `ends_at` varchar(15) NOT NULL,
  `timeslot_description` varchar(50) NOT NULL,
  PRIMARY KEY (`period_id`),
  CONSTRAINT `timetable_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `periods` (`period_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetable`
--

LOCK TABLES `timetable` WRITE;
/*!40000 ALTER TABLE `timetable` DISABLE KEYS */;
/*!40000 ALTER TABLE `timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'startupdb'
--

--
-- Current Database: `startupdb_views`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `startupdb_views` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `startupdb_views`;

--
-- Temporary view structure for view `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!50001 DROP VIEW IF EXISTS `addresses`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `addresses` AS SELECT 
 1 AS `address_id`,
 1 AS `address`,
 1 AS `area`,
 1 AS `city`,
 1 AS `state`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `attendence`
--

DROP TABLE IF EXISTS `attendence`;
/*!50001 DROP VIEW IF EXISTS `attendence`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `attendence` AS SELECT 
 1 AS `date_of_attendence`,
 1 AS `period_id`,
 1 AS `student_id`,
 1 AS `attended`,
 1 AS `attendence_marked`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!50001 DROP VIEW IF EXISTS `classes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `classes` AS SELECT 
 1 AS `class_id`,
 1 AS `period_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `homeroom_teachers`
--

DROP TABLE IF EXISTS `homeroom_teachers`;
/*!50001 DROP VIEW IF EXISTS `homeroom_teachers`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `homeroom_teachers` AS SELECT 
 1 AS `class_id`,
 1 AS `teacher_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `homework`
--

DROP TABLE IF EXISTS `homework`;
/*!50001 DROP VIEW IF EXISTS `homework`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `homework` AS SELECT 
 1 AS `class_id`,
 1 AS `period_id`,
 1 AS `date_created`,
 1 AS `homework_content`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `institutes`
--

DROP TABLE IF EXISTS `institutes`;
/*!50001 DROP VIEW IF EXISTS `institutes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `institutes` AS SELECT 
 1 AS `institute_id`,
 1 AS `address_id`,
 1 AS `password`,
 1 AS `institute_name`,
 1 AS `institute_principal`,
 1 AS `email`,
 1 AS `education_type`,
 1 AS `phone_number`,
 1 AS `date_of_creation`,
 1 AS `time_of_creation`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `parent_addresses`
--

DROP TABLE IF EXISTS `parent_addresses`;
/*!50001 DROP VIEW IF EXISTS `parent_addresses`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `parent_addresses` AS SELECT 
 1 AS `parent_id`,
 1 AS `address_id`,
 1 AS `date_address_from`,
 1 AS `date_address_to`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!50001 DROP VIEW IF EXISTS `parents`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `parents` AS SELECT 
 1 AS `parent_id`,
 1 AS `login_id`,
 1 AS `password`,
 1 AS `first_name`,
 1 AS `middle_name`,
 1 AS `last_name`,
 1 AS `gender`,
 1 AS `dob`,
 1 AS `phone_number`,
 1 AS `date_of_creation`,
 1 AS `time_of_creation`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `periods`
--

DROP TABLE IF EXISTS `periods`;
/*!50001 DROP VIEW IF EXISTS `periods`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `periods` AS SELECT 
 1 AS `period_id`,
 1 AS `subject_id`,
 1 AS `teacher_id`,
 1 AS `period_code`,
 1 AS `period_name`,
 1 AS `date_from`,
 1 AS `date_to`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `results`
--

DROP TABLE IF EXISTS `results`;
/*!50001 DROP VIEW IF EXISTS `results`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `results` AS SELECT 
 1 AS `result_id`,
 1 AS `student_id`,
 1 AS `percentage`,
 1 AS `total`,
 1 AS `date_created`,
 1 AS `teacher_comments`,
 1 AS `parent_response`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `student_addresses`
--

DROP TABLE IF EXISTS `student_addresses`;
/*!50001 DROP VIEW IF EXISTS `student_addresses`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_addresses` AS SELECT 
 1 AS `student_id`,
 1 AS `address_id`,
 1 AS `date_from`,
 1 AS `date_to`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `student_classes`
--

DROP TABLE IF EXISTS `student_classes`;
/*!50001 DROP VIEW IF EXISTS `student_classes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_classes` AS SELECT 
 1 AS `class_id`,
 1 AS `student_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `student_institutes`
--

DROP TABLE IF EXISTS `student_institutes`;
/*!50001 DROP VIEW IF EXISTS `student_institutes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_institutes` AS SELECT 
 1 AS `student_id`,
 1 AS `institute_id`,
 1 AS `date_from`,
 1 AS `date_to`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `student_parents`
--

DROP TABLE IF EXISTS `student_parents`;
/*!50001 DROP VIEW IF EXISTS `student_parents`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student_parents` AS SELECT 
 1 AS `parent_id`,
 1 AS `student_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `students`
--

DROP TABLE IF EXISTS `students`;
/*!50001 DROP VIEW IF EXISTS `students`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `students` AS SELECT 
 1 AS `student_id`,
 1 AS `login_id`,
 1 AS `password`,
 1 AS `first_name`,
 1 AS `middle_name`,
 1 AS `last_name`,
 1 AS `gender`,
 1 AS `dob`,
 1 AS `email`,
 1 AS `phone_number`,
 1 AS `date_of_creation`,
 1 AS `time_of_creation`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `subject_results`
--

DROP TABLE IF EXISTS `subject_results`;
/*!50001 DROP VIEW IF EXISTS `subject_results`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `subject_results` AS SELECT 
 1 AS `sub_result_id`,
 1 AS `student_id`,
 1 AS `teacher_id`,
 1 AS `subject_id`,
 1 AS `marks`,
 1 AS `date_created`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!50001 DROP VIEW IF EXISTS `subjects`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `subjects` AS SELECT 
 1 AS `subject_id`,
 1 AS `subject_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!50001 DROP VIEW IF EXISTS `teachers`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `teachers` AS SELECT 
 1 AS `teacher_id`,
 1 AS `login_id`,
 1 AS `password`,
 1 AS `first_name`,
 1 AS `middle_name`,
 1 AS `last_name`,
 1 AS `gender`,
 1 AS `dob`,
 1 AS `phone_number`,
 1 AS `date_of_creation`,
 1 AS `time_of_creation`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `timetable`
--

DROP TABLE IF EXISTS `timetable`;
/*!50001 DROP VIEW IF EXISTS `timetable`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `timetable` AS SELECT 
 1 AS `period_id`,
 1 AS `day`,
 1 AS `starts_at`,
 1 AS `ends_at`,
 1 AS `timeslot_description`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'startupdb_views'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_students` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_students`(IN user_details JSON, OUT message VARCHAR(50), OUT result INT)
BEGIN
DECLARE i_password varchar(60) DEFAULT NULL;
DECLARE i_first_name VARCHAR(100) DEFAULT NULL;
DECLARE i_middle_name VARCHAR(100) DEFAULT NULL;
DECLARE i_last_name VARCHAR(100) DEFAULT NULL;
DECLARE i_gender CHAR(4) DEFAULT NULL;
DECLARE i_dob VARCHAR(15) DEFAULT NULL;
DECLARE i_date_from VARCHAR(15) DEFAULT NULL;
DECLARE i_date_to VARCHAR(15) DEFAULT NULL;
DECLARE i_email VARCHAR(100) DEFAULT NULL;
DECLARE i_phone_number VARCHAR(15) DEFAULT NULL;
DECLARE i_date_of_creation VARCHAR(15) DEFAULT NULL;
DECLARE i_time_of_creation VARCHAR(15) DEFAULT NULL;
DECLARE temp_student_id INT DEFAULT NULL;
DECLARE i_institute_id VARCHAR(20) DEFAULT NULL;

SET i_password = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.password'));
SET i_first_name = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.first_name'));
SET i_middle_name = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.middle_name'));
SET i_last_name = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.last_name'));
SET i_gender = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.gender'));
SET i_dob = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.dob'));
SET i_date_from = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.date_from'));
SET i_date_to = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.date_to'));
SET i_email = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.email'));
SET i_phone_number = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.phone_number'));
SET i_date_of_creation = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.date_of_creation'));
SET i_time_of_creation = JSON_UNQUOTE(JSON_EXTRACT(user_details,'$.time_of_creation'));
SET i_institute_id = JSON_UNQUOTE(JSON_EXTRACT(user_details, '$.institute_id'));

INSERT INTO students (password, first_name, middle_name, last_name, gender, dob, email, phone_number, date_of_creation, time_of_creation)
VALUES (
i_password,
i_first_name,
i_middle_name,
i_last_name,
i_gender,
i_dob,
i_email,
i_phone_number,
date_of_creation,
time_of_creation );

SET temp_student_id = ( SELECT student_id 
						FROM students 
						WHERE fist_name = i_first_name
						AND last_name = i_last_name);

IF (temp_student_id) THEN
	INSERT INTO student_institutes (student_id, institute_id, date_from, date_to)
    VALUES (
    temp_student_id,
    i_institute_id,
    i_date_from,
    i_date_to );
    
    SET i_institute_id = (SELECT SUBSTR(i_institute_id, 1, 3));
    
    INSERT INTO students (login_id)
    VALUES (CONCACT(i_institute_id, temp_student_id));
    
    SET message = "Success";
    SET result = 1;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_institute_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_institute_id`(IN user_institute_id VARCHAR(20), OUT user_details JSON )
BEGIN

DECLARE institute_details JSON DEFAULT NULL;
DECLARE address_details JSON DEFAULT NULL;
DECLARE i_address_id INT DEFAULT NULL;
SET i_address_id = 0;

IF EXISTS (SELECT institute_id FROM institutes WHERE institute_id = user_institute_id ) THEN
	SET institute_details = (
    SELECT 
	JSON_OBJECT(
		'institute_id',
		institute_id,
        'password',
        password,
		'institute_name',
		institute_name,
		'head_of_the_institute',
		institute_principal,
		'email',
		email, 
		'phone_number',
		phone_number,
		'date_of_creation',
		date_of_creation, 
		'time_of_creation',
		time_of_creation)
		FROM institutes
		WHERE institute_id = user_institute_id );
        
	SET i_address_id = (
    SELECT address_id
    FROM institutes
    WHERE institute_id = user_institute_id );
    
    SET address_details = (
    SELECT JSON_OBJECT(
    'address',
    address,
    'area',
    area,
    'city',
    city,
    'state',
    state
    )
	FROM addresses
	INNER JOIN institutes
	ON addresses.address_id = institutes.address_id
	WHERE institutes.address_id = i_address_id);

	SET user_details = JSON_ARRAY(JSON_OBJECT('status', true), institute_details, address_details);

ELSE 
	SET user_details = JSON_OBJECT("status", false);
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_management_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_management_details`(IN institute_details JSON, OUT message VARCHAR(80), OUT success INT)
BEGIN
DECLARE i_address varchar(1000) DEFAULT NULL;
DECLARE i_area VARCHAR(100) DEFAULT NULL;
DECLARE i_state VARCHAR(50) DEFAULT NULL;
DECLARE i_city VARCHAR(50) DEFAULT NULL;
DECLARE i_institute_id VARCHAR(20) DEFAULT NULL;
DECLARE i_password VARCHAR(200) DEFAULT NULL;
DECLARE i_institute_name VARCHAR(500) DEFAULT NULL;
DECLARE i_email VARCHAR(100) DEFAULT NULL;
DECLARE i_institute_principal VARCHAR(100) DEFAULT NULL;
DECLARE i_education_type VARCHAR(100) DEFAULT NULL;
DECLARE i_phone_number VARCHAR(15) DEFAULT NULL;
DECLARE i_date_of_creation VARCHAR(15) DEFAULT NULL;
DECLARE i_time_of_creation VARCHAR(15) DEFAULT NULL;

SET i_address = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.address'));
SET i_area = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.area'));
SET i_state = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.state'));
SET i_city = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.city'));
SET i_institute_id = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.institute_id'));
SET i_password = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.password'));
SET i_institute_name = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.institute_name'));
SET i_institute_principal = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.institute_principal'));
SET i_email = JSON_UNQUOTE(JSON_EXTRACT(institute_details, '$.email'));
SET i_education_type = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.education_type'));
SET i_phone_number = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.phone_number'));
SET i_date_of_creation = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.date_of_creation'));
SET i_time_of_creation = JSON_UNQUOTE(JSON_EXTRACT(institute_details,'$.time_of_creation'));
SET success = 1;

IF EXISTS (SELECT address_id FROM startupdb.addresses WHERE address = i_address) THEN
    SET success = 0;
END IF ;

IF EXISTS (SELECT institute_id FROM startupdb.institutes WHERE institute_id = i_institute_id OR institute_principal = i_institute_principal) THEN
    SET success = -1;
END IF ;

IF success = 1 then
    INSERT INTO addresses (address, area, state, city)
    VALUES (i_address, i_area, i_state, i_city);

    INSERT INTO institutes (institute_id, address_id, password, institute_name, institute_principal, email, education_type, phone_number, date_of_creation, time_of_creation)
    VALUES (
    i_institute_id,
    (SELECT address_id FROM startupdb_views.addresses WHERE address = i_address),
    i_password,
    i_institute_name,
    i_institute_principal,
    i_email,
    i_education_type,
    i_phone_number,
    i_date_of_creation,
    i_time_of_creation);
    
    SET message = "Registration Done.";
ELSEIF success = 0 then
    SET message = "Address already exists. Please check the details.";
ELSEIF success = -1 then
    SET message = "Institute already exists. Please check the details.";
ELSE
    SET message = "Details already exist. Please check Address and Institute details.";
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_procedure`()
BEGIN
IF EXISTS (SELECT institute_id FROM institutes where institute_id = "INS001") THEN
    SELECT 1;
ELSE
	SELECT 2;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Current Database: `startupdb`
--

USE `startupdb`;

--
-- Current Database: `startupdb_views`
--

USE `startupdb_views`;

--
-- Final view structure for view `addresses`
--

/*!50001 DROP VIEW IF EXISTS `addresses`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `addresses` AS select `startupdb`.`addresses`.`address_id` AS `address_id`,`startupdb`.`addresses`.`address` AS `address`,`startupdb`.`addresses`.`area` AS `area`,`startupdb`.`addresses`.`city` AS `city`,`startupdb`.`addresses`.`state` AS `state` from `startupdb`.`addresses` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `attendence`
--

/*!50001 DROP VIEW IF EXISTS `attendence`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `attendence` AS select `startupdb`.`attendence`.`date_of_attendence` AS `date_of_attendence`,`startupdb`.`attendence`.`period_id` AS `period_id`,`startupdb`.`attendence`.`student_id` AS `student_id`,`startupdb`.`attendence`.`attended` AS `attended`,`startupdb`.`attendence`.`attendence_marked` AS `attendence_marked` from `startupdb`.`attendence` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `classes`
--

/*!50001 DROP VIEW IF EXISTS `classes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `classes` AS select `startupdb`.`classes`.`class_id` AS `class_id`,`startupdb`.`classes`.`period_id` AS `period_id` from `startupdb`.`classes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `homeroom_teachers`
--

/*!50001 DROP VIEW IF EXISTS `homeroom_teachers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `homeroom_teachers` AS select `startupdb`.`homeroom_teachers`.`class_id` AS `class_id`,`startupdb`.`homeroom_teachers`.`teacher_id` AS `teacher_id` from `startupdb`.`homeroom_teachers` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `homework`
--

/*!50001 DROP VIEW IF EXISTS `homework`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `homework` AS select `startupdb`.`homework`.`class_id` AS `class_id`,`startupdb`.`homework`.`period_id` AS `period_id`,`startupdb`.`homework`.`date_created` AS `date_created`,`startupdb`.`homework`.`homework_content` AS `homework_content` from `startupdb`.`homework` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `institutes`
--

/*!50001 DROP VIEW IF EXISTS `institutes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `institutes` AS select `startupdb`.`institutes`.`institute_id` AS `institute_id`,`startupdb`.`institutes`.`address_id` AS `address_id`,`startupdb`.`institutes`.`password` AS `password`,`startupdb`.`institutes`.`institute_name` AS `institute_name`,`startupdb`.`institutes`.`institute_principal` AS `institute_principal`,`startupdb`.`institutes`.`email` AS `email`,`startupdb`.`institutes`.`education_type` AS `education_type`,`startupdb`.`institutes`.`phone_number` AS `phone_number`,`startupdb`.`institutes`.`date_of_creation` AS `date_of_creation`,`startupdb`.`institutes`.`time_of_creation` AS `time_of_creation` from `startupdb`.`institutes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `parent_addresses`
--

/*!50001 DROP VIEW IF EXISTS `parent_addresses`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `parent_addresses` AS select `startupdb`.`parent_addresses`.`parent_id` AS `parent_id`,`startupdb`.`parent_addresses`.`address_id` AS `address_id`,`startupdb`.`parent_addresses`.`date_address_from` AS `date_address_from`,`startupdb`.`parent_addresses`.`date_address_to` AS `date_address_to` from `startupdb`.`parent_addresses` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `parents`
--

/*!50001 DROP VIEW IF EXISTS `parents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `parents` AS select `startupdb`.`parents`.`parent_id` AS `parent_id`,`startupdb`.`parents`.`login_id` AS `login_id`,`startupdb`.`parents`.`password` AS `password`,`startupdb`.`parents`.`first_name` AS `first_name`,`startupdb`.`parents`.`middle_name` AS `middle_name`,`startupdb`.`parents`.`last_name` AS `last_name`,`startupdb`.`parents`.`gender` AS `gender`,`startupdb`.`parents`.`dob` AS `dob`,`startupdb`.`parents`.`phone_number` AS `phone_number`,`startupdb`.`parents`.`date_of_creation` AS `date_of_creation`,`startupdb`.`parents`.`time_of_creation` AS `time_of_creation` from `startupdb`.`parents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `periods`
--

/*!50001 DROP VIEW IF EXISTS `periods`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `periods` AS select `startupdb`.`periods`.`period_id` AS `period_id`,`startupdb`.`periods`.`subject_id` AS `subject_id`,`startupdb`.`periods`.`teacher_id` AS `teacher_id`,`startupdb`.`periods`.`period_code` AS `period_code`,`startupdb`.`periods`.`period_name` AS `period_name`,`startupdb`.`periods`.`date_from` AS `date_from`,`startupdb`.`periods`.`date_to` AS `date_to` from `startupdb`.`periods` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `results`
--

/*!50001 DROP VIEW IF EXISTS `results`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `results` AS select `startupdb`.`results`.`result_id` AS `result_id`,`startupdb`.`results`.`student_id` AS `student_id`,`startupdb`.`results`.`percentage` AS `percentage`,`startupdb`.`results`.`total` AS `total`,`startupdb`.`results`.`date_created` AS `date_created`,`startupdb`.`results`.`teacher_comments` AS `teacher_comments`,`startupdb`.`results`.`parent_response` AS `parent_response` from `startupdb`.`results` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_addresses`
--

/*!50001 DROP VIEW IF EXISTS `student_addresses`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_addresses` AS select `startupdb`.`student_addresses`.`student_id` AS `student_id`,`startupdb`.`student_addresses`.`address_id` AS `address_id`,`startupdb`.`student_addresses`.`date_from` AS `date_from`,`startupdb`.`student_addresses`.`date_to` AS `date_to` from `startupdb`.`student_addresses` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_classes`
--

/*!50001 DROP VIEW IF EXISTS `student_classes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_classes` AS select `startupdb`.`student_classes`.`class_id` AS `class_id`,`startupdb`.`student_classes`.`student_id` AS `student_id` from `startupdb`.`student_classes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_institutes`
--

/*!50001 DROP VIEW IF EXISTS `student_institutes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_institutes` AS select `startupdb`.`student_institutes`.`student_id` AS `student_id`,`startupdb`.`student_institutes`.`institute_id` AS `institute_id`,`startupdb`.`student_institutes`.`date_from` AS `date_from`,`startupdb`.`student_institutes`.`date_to` AS `date_to` from `startupdb`.`student_institutes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student_parents`
--

/*!50001 DROP VIEW IF EXISTS `student_parents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student_parents` AS select `startupdb`.`student_parents`.`parent_id` AS `parent_id`,`startupdb`.`student_parents`.`student_id` AS `student_id` from `startupdb`.`student_parents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `students`
--

/*!50001 DROP VIEW IF EXISTS `students`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `students` AS select `startupdb`.`students`.`student_id` AS `student_id`,`startupdb`.`students`.`login_id` AS `login_id`,`startupdb`.`students`.`password` AS `password`,`startupdb`.`students`.`first_name` AS `first_name`,`startupdb`.`students`.`middle_name` AS `middle_name`,`startupdb`.`students`.`last_name` AS `last_name`,`startupdb`.`students`.`gender` AS `gender`,`startupdb`.`students`.`dob` AS `dob`,`startupdb`.`students`.`email` AS `email`,`startupdb`.`students`.`phone_number` AS `phone_number`,`startupdb`.`students`.`date_of_creation` AS `date_of_creation`,`startupdb`.`students`.`time_of_creation` AS `time_of_creation` from `startupdb`.`students` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `subject_results`
--

/*!50001 DROP VIEW IF EXISTS `subject_results`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `subject_results` AS select `startupdb`.`subject_results`.`sub_result_id` AS `sub_result_id`,`startupdb`.`subject_results`.`student_id` AS `student_id`,`startupdb`.`subject_results`.`teacher_id` AS `teacher_id`,`startupdb`.`subject_results`.`subject_id` AS `subject_id`,`startupdb`.`subject_results`.`marks` AS `marks`,`startupdb`.`subject_results`.`date_created` AS `date_created` from `startupdb`.`subject_results` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `subjects`
--

/*!50001 DROP VIEW IF EXISTS `subjects`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `subjects` AS select `startupdb`.`subjects`.`subject_id` AS `subject_id`,`startupdb`.`subjects`.`subject_name` AS `subject_name` from `startupdb`.`subjects` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teachers`
--

/*!50001 DROP VIEW IF EXISTS `teachers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teachers` AS select `startupdb`.`teachers`.`teacher_id` AS `teacher_id`,`startupdb`.`teachers`.`login_id` AS `login_id`,`startupdb`.`teachers`.`password` AS `password`,`startupdb`.`teachers`.`first_name` AS `first_name`,`startupdb`.`teachers`.`middle_name` AS `middle_name`,`startupdb`.`teachers`.`last_name` AS `last_name`,`startupdb`.`teachers`.`gender` AS `gender`,`startupdb`.`teachers`.`dob` AS `dob`,`startupdb`.`teachers`.`phone_number` AS `phone_number`,`startupdb`.`teachers`.`date_of_creation` AS `date_of_creation`,`startupdb`.`teachers`.`time_of_creation` AS `time_of_creation` from `startupdb`.`teachers` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `timetable`
--

/*!50001 DROP VIEW IF EXISTS `timetable`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `timetable` AS select `startupdb`.`timetable`.`period_id` AS `period_id`,`startupdb`.`timetable`.`day` AS `day`,`startupdb`.`timetable`.`starts_at` AS `starts_at`,`startupdb`.`timetable`.`ends_at` AS `ends_at`,`startupdb`.`timetable`.`timeslot_description` AS `timeslot_description` from `startupdb`.`timetable` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-24 17:51:39
