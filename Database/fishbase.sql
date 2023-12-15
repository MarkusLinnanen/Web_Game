-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fishbase
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Constants`
--

DROP TABLE IF EXISTS `Constants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Constants` (
  `FishAmount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Constants`
--

LOCK TABLES `Constants` WRITE;
/*!40000 ALTER TABLE `Constants` DISABLE KEYS */;
/*!40000 ALTER TABLE `Constants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bait`
--

DROP TABLE IF EXISTS `bait`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bait` (
  `name` varchar(20) NOT NULL DEFAULT '',
  `price` int(11) DEFAULT NULL,
  `imageLink` varchar(100) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bait`
--

LOCK TABLES `bait` WRITE;
/*!40000 ALTER TABLE `bait` DISABLE KEYS */;
INSERT INTO `bait` VALUES ('',NULL,NULL,NULL),('Big Lure',40,'/images/shop/bait/bigLure.png','Big lures are great for you guessed it, catching big fish. However smaller fish may not be as interested in it since it could be too big to swallow.'),('Small Lure',20,'/images/shop/bait/smallLure.png','Small lures are good for all kinds of fish due to it\'s size. But bigger fish may not be as interested in it.'),('Worms',10,'/images/shop/bait/worms.png','Worms are a great live bait for catching everything whether it\'s small, big, freshwater or saltwater fish. It\'s a popular bait used my many anglers.');
/*!40000 ALTER TABLE `bait` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caught`
--

DROP TABLE IF EXISTS `caught`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caught` (
  `fish` varchar(100) DEFAULT NULL,
  `caught` tinyint(1) NOT NULL DEFAULT 0,
  `player` varchar(30) DEFAULT NULL,
  KEY `caught_FK_1` (`player`),
  KEY `caught_FK` (`fish`),
  CONSTRAINT `caught_FK` FOREIGN KEY (`fish`) REFERENCES `fish` (`name`),
  CONSTRAINT `caught_FK_1` FOREIGN KEY (`player`) REFERENCES `player` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caught`
--

LOCK TABLES `caught` WRITE;
/*!40000 ALTER TABLE `caught` DISABLE KEYS */;
INSERT INTO `caught` VALUES ('Atlantic Halibut',1,'john'),('Atlantic Mackerel',1,'john'),('Atlantic Pollock',0,'john'),('Atlantic Salmon',0,'john'),('Brown Trout',0,'john'),('Chub',0,'john'),('Common Barbel',0,'john'),('Common Bleak',0,'john'),('Common Bream',0,'john'),('Common Carp',0,'john'),('Common Minnow',0,'john'),('Common Roach',0,'john'),('European Bitterling',0,'john'),('European Eel',0,'john'),('European Grayling',0,'john'),('European Perch',0,'john'),('European Seabass',0,'john'),('Lake Trout',0,'john'),('Lake Whitefish',0,'john'),('Largemouth Bass',0,'john'),('Marble Trout',0,'john'),('Mediterranean Barbel',0,'john'),('Northern Pike',0,'john'),('Norwegian Atlantic Cod',0,'john'),('Norwegian Haddock',0,'john'),('Prussian Carp',0,'john'),('Pumpkinseed',0,'john'),('Tench',0,'john'),('Wels Catfish',0,'john'),('Zander',0,'john');
/*!40000 ALTER TABLE `caught` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `name` varchar(20) NOT NULL,
  `imageLink` char(100) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('Finland','images/country/suomi.png'),('Germany','images/country/saksa.png'),('Italy','images/country/italia.png'),('Norway','images/country/norja.png'),('Spain','images/country/espanja.png');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fish`
--

DROP TABLE IF EXISTS `fish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fish` (
  `name` varchar(100) NOT NULL,
  `imageLink` varchar(100) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `scientificName` varchar(100) DEFAULT NULL,
  `wikipediaLink` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `fish_FK` (`country`),
  CONSTRAINT `fish_FK` FOREIGN KEY (`country`) REFERENCES `country` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fish`
--

LOCK TABLES `fish` WRITE;
/*!40000 ALTER TABLE `fish` DISABLE KEYS */;
INSERT INTO `fish` VALUES ('Atlantic Halibut','images/fishes/Norway/Atlantic_Halibut.png','Norway',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Atlantic Mackerel','images/fishes/Norway/Atlantic_Mackerel.png','Norway',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Atlantic Pollock','images/fishes/Norway/Atlantic_Pollock.png','Norway',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Atlantic Salmon','images/fishes/Germany/Atlantic_Salmon.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Brown Trout','images/fishes/Germany/Brown_Trout.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Chub','images/fishes/Italy/Chub.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Barbel','images/fishes/Italy/Common_Barbel.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Bleak','images/fishes/Germany/Common_Bleak.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Bream','images/fishes/Finland/Common_Bream.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Carp','images/fishes/Germany/Common_Carp.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Minnow','images/fishes/Germany/Common_Minnow.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Common Roach','images/fishes/Finland/Common_Roach.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('European Bitterling','images/fishes/Italy/European_Bitterling.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('European Eel','images/fishes/Italy/European_Eel.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('European Grayling','images/fishes/Germany/European_Grayling.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('European Perch','images/fishes/Finland/European_Perch.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('European Seabass','images/fishes/Spain/European_Seabass.png','Spain',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Lake Trout','images/fishes/Finland/Lake_Trout.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Lake Whitefish','images/fishes/Finland/Lake_Whitefish.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Largemouth Bass','images/fishes/Spain/Largemouth_Bass.png','Spain',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Marble Trout','images/fishes/Italy/Marble_Trout.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Mediterranean Barbel','images/fishes/Spain/Mediterranean_Barbel.png','Spain',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Northern Pike','images/fishes/Finland/Northern_Pike.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Norwegian Atlantic Cod','images/fishes/Norway/Norwegian_Atlantic_Cod.png','Norway',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Norwegian Haddock','images/fishes/Norway/Norwegian_Haddock.png','Norway',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Prussian Carp','images/fishes/Germany/Prussian_Carp.png','Germany',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Pumpkinseed','images/fishes/Spain/Pumpkinseed.png','Spain',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Tench','images/fishes/Spain/Tench.png','Spain',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Wels Catfish','images/fishes/Italy/Wels_Catfish.png','Italy',NULL,NULL,'https://en.wikipedia.org/wiki/Tench'),('Zander','images/fishes/Finland/Zander.png','Finland',NULL,NULL,'https://en.wikipedia.org/wiki/Tench');
/*!40000 ALTER TABLE `fish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `player` varchar(30) NOT NULL DEFAULT 'dave',
  `smallLure` int(11) DEFAULT 0,
  `bigLure` int(11) DEFAULT 0,
  `worms` int(11) DEFAULT 0,
  `normalLine` int(11) DEFAULT 0,
  `wornLine` int(11) DEFAULT 0,
  `strongLine` int(11) DEFAULT 0,
  KEY `Inventory_FK` (`player`),
  CONSTRAINT `Inventory_FK` FOREIGN KEY (`player`) REFERENCES `player` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('john',0,0,0,0,0,0);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `line`
--

DROP TABLE IF EXISTS `line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line` (
  `name` varchar(20) NOT NULL DEFAULT '',
  `breakPercent` float DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `imageLink` varchar(100) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `line`
--

LOCK TABLES `line` WRITE;
/*!40000 ALTER TABLE `line` DISABLE KEYS */;
INSERT INTO `line` VALUES ('',NULL,NULL,NULL,NULL),('Normal line',0.2,30,'/images/shop/fishingLine/normal.png','Normal fishing line is your regular go to line that is not too cheap or expensive, and it\'s fairly durable.'),('Strong line',0.1,50,'/images/shop/fishingLine/expensive.png','Strong thick fishing line is a bit more expensive, it\'s durability and quality makes up for it. So if you can afford it - you should buy it.'),('Worn line',0.3,20,'/images/shop/fishingLine/cheap.png','Worn fishing line is exactly what it sounds like. The down side of using worn fishing line is it\'s durability, since it\'s more likely to break.');
/*!40000 ALTER TABLE `line` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `name` varchar(30) NOT NULL,
  `poleCond` float DEFAULT 100,
  `poleStrAmount` int(11) DEFAULT 20,
  `bait` varchar(20) DEFAULT 'Worms',
  `line` varchar(20) NOT NULL DEFAULT 'Normal line',
  `luck` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Neutral',
  `location` varchar(20) NOT NULL DEFAULT 'Finland',
  `money` int(11) NOT NULL DEFAULT 100,
  PRIMARY KEY (`name`),
  KEY `player_FK` (`location`),
  KEY `player_FK_1` (`line`),
  KEY `player_FK_3` (`bait`),
  CONSTRAINT `player_FK` FOREIGN KEY (`location`) REFERENCES `country` (`name`),
  CONSTRAINT `player_FK_1` FOREIGN KEY (`line`) REFERENCES `line` (`name`),
  CONSTRAINT `player_FK_3` FOREIGN KEY (`bait`) REFERENCES `bait` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7 COLLATE=swe7_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('john',100,20,'','','Neutral','Norway',117);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-15 15:09:05
