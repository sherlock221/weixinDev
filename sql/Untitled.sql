CREATE DATABASE  IF NOT EXISTS `enterprisecloud` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `enterprisecloud`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: enterprisecloud
-- ------------------------------------------------------
-- Server version	5.6.17

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
-- Table structure for table `T_COMPANY`
--

DROP TABLE IF EXISTS `T_COMPANY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_COMPANY` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `CNAME` varchar(30) DEFAULT NULL,
  `CCONTENT` varchar(40) DEFAULT NULL,
  `CTYPE` varchar(2) DEFAULT NULL COMMENT '公司类型',
  `CRTTIME` datetime DEFAULT NULL,
  `USERID` int(11) DEFAULT NULL,
  `HOT` int(11) DEFAULT '0',
  `DELFLAG` varchar(2) DEFAULT '0',
  `UPTIME` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_COMPANY`
--

LOCK TABLES `T_COMPANY` WRITE;
/*!40000 ALTER TABLE `T_COMPANY` DISABLE KEYS */;
INSERT INTO `T_COMPANY` VALUES (1,'陕西三建02','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(2,'陕西三建03','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(3,'陕西三建08','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(4,'陕西三建04','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(5,'陕西三建01','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(6,'陕西三建06','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(7,'陕西三建07','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(8,'陕西三建012','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(9,'陕西三建011','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(10,'陕西三建010','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(11,'陕西三建014','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(12,'陕西三建05','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(13,'陕西三建015','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(14,'陕西三建016','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(15,'陕西三建09','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(16,'陕西三建013','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(17,'陕西三建020','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(18,'陕西三建019','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(19,'陕西三建018','这是一个公司!','2','2014-05-27 14:11:39',1,NULL,'0',NULL),(20,'陕西三建017','这是一个公司!','1','2014-05-27 14:11:39',1,NULL,'0',NULL),(21,'陕西三建02','这是一个公司!','2','2014-05-27 15:06:32',1,0,'0',NULL),(22,'陕西三建03','这是一个公司!','1','2014-05-27 15:06:32',1,0,'0',NULL),(23,'陕西三建06','这是一个公司!','2','2014-05-27 15:06:32',1,0,'0',NULL),(24,'陕西三建01','这是一个公司!','1','2014-05-27 15:06:32',1,0,'0',NULL),(25,'陕西三建08','这是一个公司!','2','2014-05-27 15:06:32',1,0,'0',NULL),(26,'陕西三建05','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(27,'陕西三建04','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(28,'陕西三建010','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(29,'陕西三建012','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(30,'陕西三建07','这是一个公司!','1','2014-05-27 15:06:32',1,0,'0',NULL),(31,'陕西三建015','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(32,'陕西三建014','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(33,'陕西三建016','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(34,'陕西三建09','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(35,'陕西三建011','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(36,'陕西三建018','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(37,'陕西三建019','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(38,'陕西三建013','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(39,'陕西三建020','这是一个公司!','2','2014-05-27 15:06:33',1,0,'0',NULL),(40,'陕西三建017','这是一个公司!','1','2014-05-27 15:06:33',1,0,'0',NULL),(41,'超级无度',NULL,'1','2014-05-27 16:28:52',1,0,'0',NULL),(42,'超级无敌',NULL,'1','2014-05-27 16:31:34',1,0,'0',NULL),(43,'哈哈',NULL,'1','2014-05-27 16:35:31',1,0,'0',NULL);
/*!40000 ALTER TABLE `T_COMPANY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_FEEDBACK`
--

DROP TABLE IF EXISTS `T_FEEDBACK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_FEEDBACK` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FEEDCONTENT` varchar(45) DEFAULT NULL,
  `CRTTIME` datetime DEFAULT NULL,
  `DELFALG` varchar(2) DEFAULT '0',
  `ISSEND` varchar(2) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_FEEDBACK`
--

LOCK TABLES `T_FEEDBACK` WRITE;
/*!40000 ALTER TABLE `T_FEEDBACK` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_FEEDBACK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_INVENTORY`
--

DROP TABLE IF EXISTS `T_INVENTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_INVENTORY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `INUMBER` int(11) DEFAULT NULL,
  `IPRICE` decimal(11,3) DEFAULT NULL,
  `ITOTAL` decimal(11,3) DEFAULT NULL,
  `ICRTDATE` varchar(20) DEFAULT NULL,
  `DELFLAG` varchar(2) DEFAULT '0',
  `ICOMPANY` int(11) DEFAULT NULL,
  `ITYPE` int(11) DEFAULT NULL COMMENT '清单类型',
  `IPRODUCT` int(11) DEFAULT NULL,
  `ISTANDARD` varchar(120) DEFAULT NULL,
  `USERID` int(11) DEFAULT NULL,
  `UPTIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_INVENTORY`
--

LOCK TABLES `T_INVENTORY` WRITE;
/*!40000 ALTER TABLE `T_INVENTORY` DISABLE KEYS */;
INSERT INTO `T_INVENTORY` VALUES (1,100,3.500,350.000,'2014-05-27','0',1,1,1,'10寸',1,NULL),(2,100,3.500,350.000,'2014-05-27','0',1,1,1,'11寸',1,NULL),(3,100,3.500,350.000,'2014-05-27','0',1,1,1,'10寸',1,NULL),(4,100,3.500,350.000,'2014-05-27','0',1,1,1,'11寸',1,NULL),(5,100,3.500,350.000,'2014-05-27','0',1,1,1,'10寸',1,NULL),(6,100,3.500,350.000,'2014-05-27','0',1,1,1,'11寸',1,NULL);
/*!40000 ALTER TABLE `T_INVENTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_PRODUCT`
--

DROP TABLE IF EXISTS `T_PRODUCT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_PRODUCT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRONAME` varchar(40) DEFAULT NULL,
  `PROLETTERS` varchar(20) DEFAULT NULL,
  `PROCONTENT` varchar(30) DEFAULT NULL,
  `PROSTANDARD` varchar(30) DEFAULT NULL,
  `CRTTIME` datetime DEFAULT NULL,
  `USERID` int(11) DEFAULT NULL,
  `HOT` int(11) DEFAULT '0',
  `DELFLAG` varchar(2) DEFAULT '0',
  `UPTIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_PRODUCT`
--

LOCK TABLES `T_PRODUCT` WRITE;
/*!40000 ALTER TABLE `T_PRODUCT` DISABLE KEYS */;
INSERT INTO `T_PRODUCT` VALUES (1,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(3,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(4,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(5,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(6,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(7,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(8,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(9,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(10,'管钳','gq','dddddd','30寸,20寸,10寸','2014-05-27 13:54:08',1,0,'0',NULL),(11,'梳子','sz',NULL,'10,30,100','2014-05-27 16:14:15',1,0,'0',NULL);
/*!40000 ALTER TABLE `T_PRODUCT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_RIGHTS`
--

DROP TABLE IF EXISTS `T_RIGHTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_RIGHTS` (
  `ID` int(11) NOT NULL,
  `RNAME` varchar(30) DEFAULT NULL,
  `RNUM` varchar(30) DEFAULT NULL,
  `DELFLAG` varchar(2) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_RIGHTS`
--

LOCK TABLES `T_RIGHTS` WRITE;
/*!40000 ALTER TABLE `T_RIGHTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `T_RIGHTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_ROLE`
--

DROP TABLE IF EXISTS `T_ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_ROLE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLENAME` varchar(20) DEFAULT NULL COMMENT '角色名称',
  `ROLENUM` int(11) DEFAULT NULL COMMENT '角色编号',
  `DELFLAG` varchar(2) DEFAULT '0',
  `CRTTIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_ROLE`
--

LOCK TABLES `T_ROLE` WRITE;
/*!40000 ALTER TABLE `T_ROLE` DISABLE KEYS */;
INSERT INTO `T_ROLE` VALUES (1,'管理员',1000011,'0','2014-05-27 13:02:57'),(2,'游客',1000012,'0','2014-05-27 13:02:57');
/*!40000 ALTER TABLE `T_ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `T_USERS`
--

DROP TABLE IF EXISTS `T_USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_USERS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(40) DEFAULT NULL,
  `CRTTIME` datetime DEFAULT NULL,
  `DELFLAG` varchar(2) NOT NULL DEFAULT '0',
  `ISLOCK` varchar(2) DEFAULT '0',
  `LASTLOGINTIME` datetime DEFAULT NULL,
  `LOGINNUM` int(11) DEFAULT '0',
  `ROLEID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_USERS`
--

LOCK TABLES `T_USERS` WRITE;
/*!40000 ALTER TABLE `T_USERS` DISABLE KEYS */;
INSERT INTO `T_USERS` VALUES (1,'大王','4QrcOUm6Wau+VuBX8g+IPg==','2014-05-27 13:43:32','0','0',NULL,0,1);
/*!40000 ALTER TABLE `T_USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-27 18:01:56
