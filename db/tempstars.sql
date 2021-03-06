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
-- Table structure for table `ACL`
--

DROP TABLE IF EXISTS `ACL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AccessToken`
--

DROP TABLE IF EXISTS `AccessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccessToken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BlockedDentist`
--

DROP TABLE IF EXISTS `BlockedDentist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BlockedDentist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hygienistId` int(11) NOT NULL,
  `dentistId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`hygienistId`,`dentistId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `BlockedHygienist`
--

DROP TABLE IF EXISTS `BlockedHygienist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BlockedHygienist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dentistId` int(11) NOT NULL,
  `hygienistId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Dentist`
--

DROP TABLE IF EXISTS `Dentist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dentist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `practiceName` varchar(100) DEFAULT NULL,
  `businessOwner` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `postalCode` varchar(7) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  `regionId` int(11) DEFAULT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `billingStatus` int(11) DEFAULT NULL COMMENT 'current, pastdue',
  `stripeCustomerId` varchar(100) DEFAULT NULL,
  `isComplete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stripeCustomerId_UNIQUE` (`stripeCustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DentistDetail`
--

DROP TABLE IF EXISTS `DentistDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DentistDetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dentistId` int(11) NOT NULL,
  `primaryContact` varchar(100) NOT NULL,
  `parking` varchar(100) NOT NULL,
  `payment` varchar(100) NOT NULL,
  `hygienistArrival` varchar(100) NOT NULL,
  `radiography` varchar(100) NOT NULL,
  `ultrasonic` varchar(100) NOT NULL,
  `avgApptTime` varchar(100) NOT NULL,
  `charting` varchar(100) NOT NULL,
  `software` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dentistId_UNIQUE` (`dentistId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DentistEvaluation`
--

DROP TABLE IF EXISTS `DentistEvaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DentistEvaluation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobId` int(11) NOT NULL,
  `overall` int(11) NOT NULL,
  `friendliness` int(11) NOT NULL,
  `cleanliness` int(11) NOT NULL,
  `organization` int(11) NOT NULL,
  `favourite` tinyint(1) NOT NULL,
  `block` tinyint(1) NOT NULL,
  `privateNotes` text NOT NULL,
  `publicComments` text NOT NULL,
  `createdOn` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobId_index` (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FavouriteDentist`
--

DROP TABLE IF EXISTS `FavouriteDentist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FavouriteDentist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hygienistId` int(11) NOT NULL,
  `dentistId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hygienistId_favDentistId_index` (`hygienistId`,`dentistId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FavouriteHygienist`
--

DROP TABLE IF EXISTS `FavouriteHygienist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FavouriteHygienist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dentistId` int(11) NOT NULL,
  `hygienistId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`dentistId`,`hygienistId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Hygienist`
--

DROP TABLE IF EXISTS `Hygienist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hygienist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `postalCode` varchar(7) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  `regionId` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `CDHONumber` varchar(20) DEFAULT NULL,
  `starScore` float DEFAULT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `resumeUrl` varchar(255) DEFAULT NULL,
  `showForHire` tinyint(1) DEFAULT NULL,
  `lastJobIdViewed` int(11) DEFAULT NULL,
  `isComplete` tinyint(1) DEFAULT NULL,
  `location` point DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HygienistEvaluation`
--

DROP TABLE IF EXISTS `HygienistEvaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HygienistEvaluation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobId` int(11) DEFAULT NULL,
  `overall` int(11) NOT NULL,
  `puctuallity` int(11) NOT NULL,
  `presentation` int(11) NOT NULL,
  `clinicalSkill` int(11) NOT NULL,
  `connection` int(11) NOT NULL,
  `communication` int(11) NOT NULL,
  `favourite` tinyint(1) NOT NULL,
  `block` tinyint(1) NOT NULL,
  `privateNotes` text NOT NULL,
  `publicComments` text NOT NULL,
  `createdOn` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Invoice`
--

DROP TABLE IF EXISTS `Invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobId` int(11) NOT NULL,
  `totalHours` decimal(4,2) NOT NULL,
  `totalUnpaidHours` decimal(4,2) NOT NULL,
  `totalBillableHours` decimal(4,2) DEFAULT NULL,
  `hourlyRate` int(11) NOT NULL,
  `totalInvoiceAmt` decimal(6,2) NOT NULL,
  `hygienistMarkedPaid` tinyint(1) NOT NULL,
  `dentistMarkedPaid` tinyint(1) NOT NULL,
  `sent` tinyint(1) NOT NULL,
  `createdOn` datetime NOT NULL,
  `sentOn` datetime NOT NULL,
  `paidOn` datetime NOT NULL,
  `manualHygienistId` int(11) NOT NULL,
  `manualDentistId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`jobId`),
  KEY `index3` (`manualHygienistId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Job`
--

DROP TABLE IF EXISTS `Job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dentistId` int(11) NOT NULL,
  `hygienistId` int(11) NOT NULL,
  `postedOn` datetime NOT NULL,
  `bookedOn` datetime NOT NULL,
  `completedOn` datetime NOT NULL,
  `hourlyRate` decimal(6,2) NOT NULL,
  `status` int(11) NOT NULL,
  `cascadeInterval` int(11) NOT NULL,
  `modifiedOn` datetime NOT NULL,
  `dentistRating` float DEFAULT NULL,
  `hygienistRating` float DEFAULT NULL,
  `dentistBilled` tinyint(1) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `dentistPrivateNotes` text,
  `hygienistPrivateNotes` text,
  PRIMARY KEY (`id`),
  KEY `index2` (`dentistId`),
  KEY `index3` (`hygienistId`),
  KEY `index4` (`startDate`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sendTime` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `sentOn` datetime DEFAULT '0000-00-00 00:00:00',
  `jobId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `attempts` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid_index` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PartialOffer`
--

DROP TABLE IF EXISTS `PartialOffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PartialOffer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobId` int(11) NOT NULL,
  `hygienistId` int(11) NOT NULL,
  `offeredStartTime` datetime NOT NULL,
  `offeredEndTime` datetime NOT NULL,
  `status` int(11) NOT NULL COMMENT 'offered, accepted, declined, canceled, changed',
  `createdOn` datetime DEFAULT NULL,
  `modifiedOn` datetime NOT NULL,
  `statusChangeOn` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`jobId`),
  KEY `index3` (`hygienistId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PostalCode`
--

DROP TABLE IF EXISTS `PostalCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PostalCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prefix` varchar(7) NOT NULL,
  `regionId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`regionId`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Region`
--

DROP TABLE IF EXISTS `Region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `rate` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RoleMapping`
--

DROP TABLE IF EXISTS `RoleMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Shift`
--

DROP TABLE IF EXISTS `Shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobId` int(11) NOT NULL,
  `shiftDate` date NOT NULL,
  `postedStart` datetime NOT NULL,
  `postedEnd` datetime NOT NULL,
  `actualStart` datetime NOT NULL,
  `actualEnd` datetime NOT NULL,
  `totalHours` decimal(4,2) NOT NULL,
  `unpaidHours` decimal(4,2) NOT NULL,
  `billableHours` decimal(4,2) DEFAULT NULL,
  `modifiedOn` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index2` (`jobId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `credentials` text,
  `challenges` text,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  `status` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL,
  `dentistId` int(11) DEFAULT NULL,
  `hygienistId` int(11) DEFAULT NULL,
  `registrationId` varchar(512) DEFAULT NULL,
  `platform` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billing` (
  `lastBillDate` date NOT NULL,
  PRIMARY KEY (`lastBillDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-15 15:06:00
