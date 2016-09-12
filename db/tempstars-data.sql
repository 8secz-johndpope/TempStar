-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: localhost    Database: tempstars
-- ------------------------------------------------------
-- Server version	5.6.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `PostalCode`
--

LOCK TABLES `PostalCode` WRITE;
/*!40000 ALTER TABLE `PostalCode` DISABLE KEYS */;
INSERT INTO `PostalCode` VALUES (1,'M0',1),(2,'M1',1),(3,'M2',1),(4,'M3',1),(5,'M4',1),(6,'M5',1),(7,'M6',1),(8,'M7',1),(9,'L0',2),(10,'L1',2),(11,'L3',2),(12,'L4',2),(13,'L5',2),(14,'L6',2),(15,'L7',2),(16,'L8',2),(17,'L9',2),(18,'N1',2),(19,'N2',2),(20,'N3',2),(21,'K1',2),(22,'K2',2),(23,'K3',2),(24,'K4',2),(25,'K7',2),(26,'M8',2),(27,'M9',2),(28,'N0',3),(29,'N4',3),(30,'N5',3),(31,'N6',3),(32,'N7',3),(33,'N8',3),(34,'N9',3),(35,'K0',3),(36,'K5',3),(37,'K6',3),(38,'K8',3),(39,'K9',3),(40,'P3',3),(41,'P0',4),(42,'P1',4),(43,'P2',4),(44,'P4',4),(45,'P5',4),(46,'P6',4),(47,'P7',4),(48,'P8',4),(49,'P9',4),(50,'L2',2);
/*!40000 ALTER TABLE `PostalCode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Region`
--

LOCK TABLES `Region` WRITE;
/*!40000 ALTER TABLE `Region` DISABLE KEYS */;
INSERT INTO `Region` VALUES (1,'Zone 1',36.00),(2,'Zone 2',35.00),(3,'Zone 3',34.00),(4,'Zone 4',33.00);
/*!40000 ALTER TABLE `Region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (4,'dentist',NULL,'2016-08-10 23:15:54','2016-08-10 23:15:54'),(5,'admin',NULL,'2016-08-10 23:15:54','2016-08-10 23:15:54'),(6,'hygienist',NULL,'2016-08-10 23:15:54','2016-08-10 23:15:54');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-11 22:54:42
