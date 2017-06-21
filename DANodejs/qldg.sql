-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: qldg
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `chitietdanhgia`
--

DROP TABLE IF EXISTS `chitietdanhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chitietdanhgia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDanhGia` int(11) NOT NULL,
  `idNguoiDuocDanhGia` int(11) NOT NULL,
  `congHayTru` tinyint(4) DEFAULT NULL,
  `nhanXet` varchar(2048) DEFAULT NULL,
  `thoiDiemDanhGia` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDanhGia`,`idNguoiDuocDanhGia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdanhgia`
--

LOCK TABLES `chitietdanhgia` WRITE;
/*!40000 ALTER TABLE `chitietdanhgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietdanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachdaugia`
--

DROP TABLE IF EXISTS `danhsachdaugia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachdaugia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `giaDau` int(11) NOT NULL,
  `thoiDiemDauGia` datetime DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`,`giaDau`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachdaugia`
--

LOCK TABLES `danhsachdaugia` WRITE;
/*!40000 ALTER TABLE `danhsachdaugia` DISABLE KEYS */;
INSERT INTO `danhsachdaugia` VALUES (1,2,6000000,'2017-06-21 00:25:25'),(1,5,7000000,'2017-06-21 00:35:25'),(1,1412262,13000000,'2017-06-21 00:45:25'),(2,3,24000000,'2017-06-21 00:55:25'),(2,6,27000000,'2017-06-21 01:15:25'),(2,11,31000000,'2017-06-21 01:25:25'),(3,1,14000000,'2017-06-21 01:35:25'),(3,4,17000000,'2017-06-21 01:45:25'),(3,10,18000000,'2017-06-21 01:55:25'),(3,11,21000000,'2017-06-21 02:05:25'),(3,12,22000000,'2017-06-21 10:44:48'),(4,6,3000000,'2017-06-21 02:15:25'),(4,1412262,3500000,'2017-06-21 02:25:25'),(5,1,1100000,'2017-06-21 02:35:25'),(6,1412262,500000,'2017-06-21 02:45:25'),(7,0,140000,'2017-06-21 02:55:25'),(7,13,160000,'2017-06-21 07:40:06'),(8,5,700000,'2017-06-21 03:15:25'),(9,4,10000000,'2017-06-21 03:25:25'),(10,9,650000,'2017-06-21 03:45:25'),(10,12,700000,'2017-06-21 07:43:50'),(10,12,750000,'2017-06-21 10:50:12'),(11,7,30000,'2017-06-21 03:55:25'),(12,8,350000,'2017-06-21 04:25:25'),(13,1,8000000,'2017-06-21 07:29:56'),(13,8,7000000,'2017-06-21 05:25:25');
/*!40000 ALTER TABLE `danhsachdaugia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachdaugiathang`
--

DROP TABLE IF EXISTS `danhsachdaugiathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachdaugiathang` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `giaThang` int(11) DEFAULT NULL,
  `nhanxet` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachdaugiathang`
--

LOCK TABLES `danhsachdaugiathang` WRITE;
/*!40000 ALTER TABLE `danhsachdaugiathang` DISABLE KEYS */;
INSERT INTO `danhsachdaugiathang` VALUES (6,1412262,500000,0);
/*!40000 ALTER TABLE `danhsachdaugiathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachxinduocban`
--

DROP TABLE IF EXISTS `danhsachxinduocban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachxinduocban` (
  `idNguoiDung` int(11) NOT NULL,
  `thoiDiemXinDuocBan` datetime NOT NULL,
  PRIMARY KEY (`idNguoiDung`,`thoiDiemXinDuocBan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachxinduocban`
--

LOCK TABLES `danhsachxinduocban` WRITE;
/*!40000 ALTER TABLE `danhsachxinduocban` DISABLE KEYS */;
INSERT INTO `danhsachxinduocban` VALUES (1412262,'2017-06-20 16:17:06'),(1412262,'2017-06-20 23:50:09');
/*!40000 ALTER TABLE `danhsachxinduocban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachyeuthich`
--

DROP TABLE IF EXISTS `danhsachyeuthich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danhsachyeuthich` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachyeuthich`
--

LOCK TABLES `danhsachyeuthich` WRITE;
/*!40000 ALTER TABLE `danhsachyeuthich` DISABLE KEYS */;
INSERT INTO `danhsachyeuthich` VALUES (1,1412262),(3,1412262),(6,1412262),(7,1412262),(11,1412262),(12,1412262);
/*!40000 ALTER TABLE `danhsachyeuthich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsumota`
--

DROP TABLE IF EXISTS `lichsumota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lichsumota` (
  `proId` int(11) NOT NULL,
  `thoiDiemCapNhat` datetime NOT NULL,
  `noiDungCapNhat` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`proId`,`thoiDiemCapNhat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsumota`
--

LOCK TABLES `lichsumota` WRITE;
/*!40000 ALTER TABLE `lichsumota` DISABLE KEYS */;
/*!40000 ALTER TABLE `lichsumota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsuragia`
--

DROP TABLE IF EXISTS `lichsuragia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lichsuragia` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `thoiDiemRaGia` datetime NOT NULL,
  `giaDau` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`,`thoiDiemRaGia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsuragia`
--

LOCK TABLES `lichsuragia` WRITE;
/*!40000 ALTER TABLE `lichsuragia` DISABLE KEYS */;
/*!40000 ALTER TABLE `lichsuragia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loai` (
  `idLoaiSanPham` int(11) NOT NULL AUTO_INCREMENT,
  `tenLoaiSanPham` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idLoaiSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
INSERT INTO `loai` VALUES (1,'Công Nghệ'),(2,'Gia dụng'),(3,'Thời Trang'),(4,'Xe Cộ'),(5,'Khác');
/*!40000 ALTER TABLE `loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoidung` (
  `idNguoiDung` int(11) NOT NULL,
  `passWord` varchar(128) DEFAULT NULL,
  `hoTen` varchar(45) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `diemDanhGiaCong` int(11) DEFAULT NULL,
  `diemDanhGiaTru` int(11) DEFAULT NULL,
  `thoiDiemKetThucRaoBan` datetime DEFAULT NULL,
  `viTri` int(11) DEFAULT NULL,
  PRIMARY KEY (`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` VALUES (0,'cfcd208495d565ef66e7dff9f98764da','Le Van A','null','null',5,2,'0000-00-00 00:00:00',1),(1,'c4ca4238a0b923820dcc509a6f75849b','Le Van B',NULL,NULL,10,1,'0000-00-00 00:00:00',0),(2,'c81e728d9d4c2f636f067f89cc14862c','Le Van C',NULL,NULL,2,8,'0000-00-00 00:00:00',0),(3,'eccbc87e4b5ce2fe28308fd9f2a7baf3','Le Van D',NULL,NULL,4,4,'0000-00-00 00:00:00',0),(4,'a87ff679a2f3e71d9181a67b7542122c','Le Van E',NULL,NULL,3,1,NULL,0),(5,'e4da3b7fbbce2345d7772b0674a318d5','Le Van F',NULL,NULL,2,8,NULL,0),(6,'1679091c5a880faf6fb5e6087eb1b2dc','Le Van G',NULL,NULL,0,0,NULL,0),(7,'8f14e45fceea167a5a36dedd4bea2543','Le Van H',NULL,NULL,10,1,NULL,0),(8,'c9f0f895fb98ab9159f51fd0297e236d','Le Van I',NULL,NULL,5,2,NULL,0),(9,'9','Le Van J',NULL,NULL,5,6,NULL,0),(10,'d3d9446802a44259755d38e6d163e820','Le Van K',NULL,NULL,2,3,NULL,0),(11,'6512bd43d9caa6e02c990b0a82652dca','Le Van L',NULL,NULL,7,1,NULL,0),(12,'c20ad4d76fe97759aa27a0c99bff6710','Le Van M',NULL,NULL,8,1,NULL,0),(13,'c51ce410c124a10e0db5e4b97fc2af39','Le Van N',NULL,NULL,9,0,NULL,0),(1111,'b59c67bf196a4758191e42f76670ceba','Admin',NULL,'admin@gmail.com',0,0,NULL,2),(1412262,'827ccb0eea8a706c4c34a16891f84e7b','Lê Anh Khôi',NULL,'leanhkhoi1996@gmail.com',0,0,NULL,NULL),(1412265,'b198020984221c136fde719f152b4112','Bùi Chí Kiên',NULL,'kienbui@gmail.com',0,0,NULL,0),(1412294,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thiên Long',NULL,'longnguyen@gmail.com',0,0,NULL,0),(1412304,'827ccb0eea8a706c4c34a16891f84e7b','Trương Hữu Luân',NULL,'truongluan@gmail.com',0,0,NULL,0);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanpham` (
  `idSanPham` int(11) NOT NULL AUTO_INCREMENT,
  `tenSanPham` varchar(255) DEFAULT NULL,
  `giaHienTai` int(11) DEFAULT NULL,
  `giaMuaNgay` int(11) DEFAULT NULL,
  `idNguoiBan` int(11) DEFAULT NULL,
  `idNguoiGiaCaoNhat` int(11) DEFAULT NULL,
  `thoiDiemDang` datetime DEFAULT NULL,
  `thoiDiemKetThuc` datetime DEFAULT NULL,
  `buocGia` int(11) DEFAULT NULL,
  `urlImage` varchar(512) DEFAULT NULL,
  `moTa` varchar(2048) DEFAULT NULL,
  `tinhTrang` int(11) DEFAULT NULL,
  `luotBid` int(11) DEFAULT NULL,
  `loai` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Iphone 5s',13000000,15000000,0,1412262,'2017-01-20 05:30:00','2017-03-20 10:30:00',1000000,'sanpham_1','null',0,3,1),(2,'Xe Air Black',31000000,40000000,1,11,'2017-03-20 05:30:00','2017-07-20 05:30:00',1000000,'sanpham_2',NULL,0,3,4),(3,'Cap xach my',22000000,40000000,2,12,'2017-03-20 05:30:00','2017-07-20 05:30:00',1000000,'sanpham_3',NULL,0,5,3),(4,'Xe dap',3500000,4000000,5,6,'2017-03-20 05:30:00','2017-08-20 05:30:00',500000,'sanpham_4',NULL,0,2,4),(5,'Giay nike',1100000,2000000,2,1,'2017-03-20 05:30:00','2017-07-20 05:30:00',100000,'sanpham_5',NULL,0,1,3),(6,'Mu bao hiem aa',500000,500000,8,1412262,'2017-03-20 05:30:00','2017-08-20 05:30:00',50000,'sanpham_6',NULL,1,1,2),(7,'Chuot Khong Day',160000,300000,2,13,'2017-03-20 05:30:00','2017-09-20 05:30:00',20000,'sanpham_7',NULL,0,2,1),(8,'Ban Phim Game Thu',700000,1500000,2,5,'2017-03-20 05:30:00','2017-07-20 05:30:00',200000,'sanpham_8',NULL,0,1,1),(9,'Laptop Dell',10000000,17000000,7,4,'2017-03-20 05:30:00','2017-08-20 05:30:00',1000000,'sanpham_9',NULL,0,1,1),(10,'Giay Addidas',750000,950000,6,12,'2017-03-20 05:30:00','2017-09-20 10:30:00',50000,'sanpham_10',NULL,0,3,3),(11,'Mieng lot chuot',30000,50000,3,7,'2017-03-20 05:30:00','2017-09-20 10:30:00',5000,'sanpham_11',NULL,0,1,1),(12,'Con chuot quang',350000,400000,3,8,'2017-03-20 05:30:00','2017-10-20 10:30:00',50000,'sanpham_12',NULL,0,1,1),(13,'Apple Watch',8000000,14000000,7,1,'2017-06-15 17:00:00','2017-07-15 05:00:00',1000000,'sanpham_13',NULL,0,2,1);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'qldg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-21 11:07:10
