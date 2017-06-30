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
  `thoiDiemDanhGia` datetime DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDanhGia`,`idNguoiDuocDanhGia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdanhgia`
--

LOCK TABLES `chitietdanhgia` WRITE;
/*!40000 ALTER TABLE `chitietdanhgia` DISABLE KEYS */;
INSERT INTO `chitietdanhgia` VALUES (1,1412262,0,1,'chất lượng tốt, 1 điểm cộng','2017-06-29 06:38:35');
/*!40000 ALTER TABLE `chitietdanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choxacnhanmail`
--

DROP TABLE IF EXISTS `choxacnhanmail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choxacnhanmail` (
  `idNguoiDung` int(11) NOT NULL,
  `passWord` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `verifycode` varchar(128) DEFAULT NULL,
  `hoTen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idNguoiDung`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choxacnhanmail`
--

LOCK TABLES `choxacnhanmail` WRITE;
/*!40000 ALTER TABLE `choxacnhanmail` DISABLE KEYS */;
/*!40000 ALTER TABLE `choxacnhanmail` ENABLE KEYS */;
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
  `biCam` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`,`giaDau`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachdaugia`
--

LOCK TABLES `danhsachdaugia` WRITE;
/*!40000 ALTER TABLE `danhsachdaugia` DISABLE KEYS */;
INSERT INTO `danhsachdaugia` VALUES (1,2,6000000,'2017-06-21 00:25:25',0),(1,5,7000000,'2017-06-21 00:35:25',0),(1,1412262,13000000,'2017-06-21 00:45:25',0),(2,3,24000000,'2017-06-21 00:55:25',0),(2,6,27000000,'2017-06-21 01:15:25',0),(2,11,31000000,'2017-06-21 01:25:25',0),(3,1,14000000,'2017-06-21 01:35:25',0),(3,1,22000000,'2017-06-24 11:31:32',0),(3,4,17000000,'2017-06-21 01:45:25',0),(3,10,18000000,'2017-06-21 01:55:25',0),(3,11,21000000,'2017-06-21 02:05:25',0),(3,12,22000000,'2017-06-21 10:44:48',1),(3,12,23000000,'2017-06-23 16:45:23',1),(3,12,25000000,'2017-06-24 12:02:26',1),(3,12,26000000,'2017-06-24 12:03:50',1),(3,1412262,23000000,'2017-06-24 12:01:06',0),(3,1412262,25000000,'2017-06-24 12:02:26',0),(4,6,3000000,'2017-06-21 02:15:25',0),(4,1412262,3500000,'2017-06-21 02:25:25',0),(5,1,1100000,'2017-06-21 02:35:25',0),(6,1412262,500000,'2017-06-21 02:45:25',0),(7,0,140000,'2017-06-21 02:55:25',0),(7,13,160000,'2017-06-21 07:40:06',1),(8,5,700000,'2017-06-21 03:15:25',0),(9,4,10000000,'2017-06-21 03:25:25',0),(9,12,11000000,'2017-06-24 16:02:21',0),(10,9,650000,'2017-06-21 03:45:25',0),(10,12,700000,'2017-06-21 07:43:50',0),(10,12,750000,'2017-06-21 10:50:12',0),(11,7,30000,'2017-06-21 03:55:25',0),(12,8,350000,'2017-06-21 04:25:25',0),(12,13,400000,'2017-06-21 15:00:15',0),(13,1,8000000,'2017-06-21 07:29:56',0),(13,8,7000000,'2017-06-21 05:25:25',0),(14,3,110000,'2017-06-26 22:53:24',0),(14,7,120000,'2017-06-26 23:00:17',0),(16,1412262,600000,'2017-06-27 17:23:19',0),(18,11,1500000,'2017-06-29 17:03:37',0),(18,1412065,800000,'2017-06-29 16:59:36',0),(18,1412262,900000,'2017-06-29 17:01:25',0);
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
  `nhanXetNguoiBan` int(11) DEFAULT NULL,
  `nhanXetNguoiMua` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`,`idNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachdaugiathang`
--

LOCK TABLES `danhsachdaugiathang` WRITE;
/*!40000 ALTER TABLE `danhsachdaugiathang` DISABLE KEYS */;
INSERT INTO `danhsachdaugiathang` VALUES (1,1412262,13000000,1,0),(6,1412262,500000,0,NULL),(12,13,400000,0,NULL),(18,11,1500000,0,0);
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
INSERT INTO `danhsachyeuthich` VALUES (1,1412262),(3,4),(3,6),(3,1412262),(6,1412262),(11,1412262),(12,1412262);
/*!40000 ALTER TABLE `danhsachyeuthich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daugiatudong`
--

DROP TABLE IF EXISTS `daugiatudong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daugiatudong` (
  `idSanPham` int(11) NOT NULL,
  `idNguoiDung` int(11) DEFAULT NULL,
  `giaMax` int(11) DEFAULT NULL,
  `thoiDiemDauGia` datetime DEFAULT NULL,
  PRIMARY KEY (`idSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daugiatudong`
--

LOCK TABLES `daugiatudong` WRITE;
/*!40000 ALTER TABLE `daugiatudong` DISABLE KEYS */;
INSERT INTO `daugiatudong` VALUES (9,12,13000000,'2017-06-24 16:02:21');
/*!40000 ALTER TABLE `daugiatudong` ENABLE KEYS */;
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
INSERT INTO `nguoidung` VALUES (-99,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(0,'cfcd208495d565ef66e7dff9f98764da','Le Van A','null','loserabandonkingdom@gmail.com',6,2,'0000-00-00 00:00:00',1),(1,'c4ca4238a0b923820dcc509a6f75849b','Le Van B',NULL,'loserabandonkingdom@gmail.com',10,1,'0000-00-00 00:00:00',0),(2,'c81e728d9d4c2f636f067f89cc14862c','Le Van C',NULL,'loserabandonkingdom@gmail.com',8,2,'0000-00-00 00:00:00',0),(3,'eccbc87e4b5ce2fe28308fd9f2a7baf3','Le Van D',NULL,'loserabandonkingdom@gmail.com',13,3,'2017-07-06 18:40:34',1),(4,'a87ff679a2f3e71d9181a67b7542122c','Le Van E',NULL,'loserabandonkingdom@gmail.com',5,1,'2017-07-06 18:06:41',1),(5,'e4da3b7fbbce2345d7772b0674a318d5','Le Van F',NULL,'loserabandonkingdom@gmail.com',2,8,'2017-07-06 18:40:36',1),(6,'1679091c5a880faf6fb5e6087eb1b2dc','Le Van G',NULL,'loserabandonkingdom@gmail.com',0,0,'2017-07-06 18:40:38',1),(7,'8f14e45fceea167a5a36dedd4bea2543','Le Van H',NULL,'loserabandonkingdom@gmail.com',10,1,'2017-07-06 18:40:41',1),(8,'c9f0f895fb98ab9159f51fd0297e236d','Le Van I',NULL,'loserabandonkingdom@gmail.com',5,2,'0000-00-00 00:00:00',0),(9,'9','Le Van J',NULL,'loserabandonkingdom@gmail.com',5,6,'0000-00-00 00:00:00',0),(10,'d3d9446802a44259755d38e6d163e820','Le Van K',NULL,'loserabandonkingdom@gmail.com',8,3,'0000-00-00 00:00:00',0),(11,'6512bd43d9caa6e02c990b0a82652dca','Le Van L',NULL,'loserabandonkingdom@gmail.com',7,1,'0000-00-00 00:00:00',0),(12,'c20ad4d76fe97759aa27a0c99bff6710','Le Van M',NULL,'loserabandonkingdom@gmail.com',8,1,'0000-00-00 00:00:00',0),(13,'c51ce410c124a10e0db5e4b97fc2af39','Le Van N',NULL,'loserabandonkingdom@gmail.com',9,0,'2017-07-04 18:58:21',1),(1111,'b59c67bf196a4758191e42f76670ceba','Admin',NULL,'admin@gmail.com',0,0,'0000-00-00 00:00:00',2),(12345,'12345','Le Reagan',NULL,'loserabandonkingdom@gmail.com',0,0,'0000-00-00 00:00:00',0),(1412065,'827ccb0eea8a706c4c34a16891f84e7b','Loi Vien Cuong',NULL,'loiviencuong@gmail.com',0,0,'2017-07-04 12:30:31',1),(1412262,'827ccb0eea8a706c4c34a16891f84e7b','Lê Anh Khôi',NULL,'loserabandonkingdom@gmail.com',0,0,'2017-07-04 11:00:32',1),(1412265,'b198020984221c136fde719f152b4112','Bùi Chí Kiên',NULL,'kienbui@gmail.com',0,0,'0000-00-00 00:00:00',0),(1412294,'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thiên Long',NULL,'longnguyen@gmail.com',0,0,'0000-00-00 00:00:00',0),(1412304,'827ccb0eea8a706c4c34a16891f84e7b','Trương Hữu Luân',NULL,'truongluan@gmail.com',0,0,'0000-00-00 00:00:00',0);
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
  `tuDongGiaHan` tinyint(1) DEFAULT NULL,
  `urlImage1` varchar(512) DEFAULT NULL,
  `urlImage2` varchar(512) DEFAULT NULL,
  `urlImage3` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`idSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Iphone 5s',13000000,15000000,0,1412262,'2017-01-20 05:30:00','2017-03-20 10:30:00',1000000,'sanpham_1','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',1,3,1,1,'#image#sanpham_1#1.jpg','#image#sanpham_1#2.jpg','#image#sanpham_1#3.jpg'),(2,'Xe Air Black',31000000,40000000,1,11,'2017-03-20 05:30:00','2017-07-20 05:30:00',1000000,'sanpham_2','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,3,4,0,'#image#sanpham_2#1.jpg','#image#sanpham_2#2.jpg','#image#sanpham_2#3.jpg'),(3,'Cap xach my',25000000,40000000,2,1412262,'2017-03-20 05:30:00','2017-07-20 05:30:00',1000000,'sanpham_3','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,11,3,0,'#image#sanpham_3#1.jpg','#image#sanpham_3#2.jpg','#image#sanpham_3#3.jpg'),(4,'Xe dap',3500000,4000000,5,6,'2017-03-20 05:30:00','2017-08-20 05:30:00',500000,'sanpham_4','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,2,4,0,'#image#sanpham_4#1.jpg','#image#sanpham_4#2.jpg','#image#sanpham_4#3.jpg'),(5,'Giay nike',1100000,2000000,2,1,'2017-03-20 05:30:00','2017-07-20 05:30:00',100000,'sanpham_5','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,1,3,1,'#image#sanpham_5#1.jpg','#image#sanpham_5#2.jpg','#image#sanpham_5#3.jpg'),(6,'Mu bao hiem aa',500000,500000,8,1412262,'2017-03-20 05:30:00','2017-06-20 05:30:00',50000,'sanpham_6','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',1,1,2,0,'#image#sanpham_6#1.jpg','#image#sanpham_6#2.jpg','#image#sanpham_6#3.jpg'),(7,'Chuot Khong Day',140000,300000,2,0,'2017-03-20 05:30:00','2017-09-20 05:30:00',20000,'sanpham_7','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,2,1,0,'#image#sanpham_7#1.jpg','#image#sanpham_7#2.jpg','#image#sanpham_7#3.jpg'),(8,'Ban Phim Game Thu',700000,1500000,2,5,'2017-03-20 05:30:00','2017-07-20 05:30:00',200000,'sanpham_8','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,1,1,0,'#image#sanpham_8#1.jpg','#image#sanpham_8#2.jpg','#image#sanpham_8#3.jpg'),(9,'Laptop Dell',11000000,17000000,7,12,'2017-03-20 05:30:00','2017-08-20 05:30:00',1000000,'sanpham_9','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,2,1,1,'#image#sanpham_9#1.jpg','#image#sanpham_9#2.jpg','#image#sanpham_9#3.jpg'),(10,'Giay Addidas',750000,950000,6,12,'2017-03-20 05:30:00','2017-09-20 10:30:00',50000,'sanpham_10','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,3,3,1,'#image#sanpham_10#1.jpg','#image#sanpham_10#2.jpg','#image#sanpham_10#3.jpg'),(11,'Mieng lot chuot',30000,50000,3,7,'2017-03-20 05:30:00','2017-09-20 10:30:00',5000,'sanpham_11','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,1,1,1,'#image#sanpham_11#1.jpg','#image#sanpham_11#2.jpg','#image#sanpham_11#3.jpg'),(12,'Con chuot quang',400000,400000,3,13,'2017-03-20 05:30:00','2017-06-20 10:30:00',50000,'sanpham_12','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',1,2,1,1,'#image#sanpham_12#1.jpg','#image#sanpham_12#2.jpg','#image#sanpham_12#3.jpg'),(13,'Apple Watch',8000000,14000000,7,1,'2017-06-15 17:00:00','2017-07-15 05:00:00',1000000,'sanpham_13','&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,2,1,0,'#image#sanpham_13#1.jpg','#image#sanpham_13#2.jpg','#image#sanpham_13#3.jpg'),(14,'Diamond Coffee Cup',120000,400000,1412262,7,'2017-06-23 01:05:48','2017-07-27 01:05:48',10000,NULL,'&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,2,1,0,'#image#sanpham_14#1.jpg','#image#sanpham_14#2.jpg','#image#sanpham_14#3.jpg'),(15,'Đần Piano Roland RF265',12000000,20000000,1412262,NULL,'2017-06-23 09:01:26','2017-07-27 21:49:00',2000000,NULL,'&lt;p&gt;This is a best choice for you VND&lt;/p&gt;&lt;p style=&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-23 08:30:02&lt;/p&gt;&lt;/br&gt;',0,0,1,0,'#image#sanpham_15#1.jpg','#image#sanpham_15#2.jpg','#image#sanpham_15#3.jpg'),(16,'Giầy Ninja Lead',600000,2000000,1412065,1412262,'2017-06-27 12:33:30','2017-07-28 19:50:30',100000,NULL,'&lt;p&gt;Giầy xịn, chưa qua sử dụng, nhập từ &lt;strong&gt;Japan&lt;&#x2F;strong&gt;&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-27 12:33:30&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;&lt;p&gt;Th&amp;ocirc;ng số kỹ thuật : cao su&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size:10px;&quot;&gt;Update Time : 2017-06-27 12:34:40&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,1,3,1,'#image#sanpham_16#1.jpg','#image#sanpham_16#2.jpg','#null'),(17,'Quạt Máy HitaChi',1000000,3000000,13,NULL,'2017-06-27 19:04:49','2017-06-30 19:04:49',500000,NULL,'&lt;p&gt;Quạt cho mua n&amp;oacute;ng&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-27 19:04:49&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,1,1,'#image#sanpham_17#1.jpg','#image#sanpham_17#2.jpg','##null'),(18,'Quạt Panasonic',900000,1500000,13,1412262,'2017-06-27 19:12:00','2017-06-30 19:13:00',100000,NULL,'&lt;p&gt;Chưa c&amp;oacute; m&amp;ocirc; tả&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-27 19:12:00&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',1,2,2,1,'#image#sanpham_18#1.jpg','#image#sanpham_18#2.jpg','##null'),(19,'Bộ ấm chén cao cấp',800000,1600000,1412262,NULL,'2017-06-29 17:47:50','2017-07-04 17:47:50',100000,NULL,'&lt;p&gt;Bộ ấm ch&amp;eacute;n cao cấp xuất xứ từ l&amp;ograve; gốm B&amp;aacute;t Tr&amp;agrave;ng, đạt ti&amp;ecirc;u chuẩn quốc tế ISO:9001&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 17:47:50&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,2,1,'#image#sanpham_19#1.jpg','#image#sanpham_19#2.jpg','#image#sanpham_19#3.jpg'),(20,'Bộ dụng cụ điện',3000000,5000000,4,NULL,'2017-06-29 18:08:22','2017-07-03 18:08:22',200000,NULL,'&lt;p&gt;Bộ dụng cụ xuất sứ từ Đức, bao gồm:&lt;br &#x2F;&gt;K&amp;eacute;o, Cờ-lo, ...&lt;br &#x2F;&gt;&lt;br &#x2F;&gt;&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 18:08:22&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,2,1,'#image#sanpham_20#1.jpg','#image#sanpham_20#2.jpg','#image#sanpham_20#3.jpg'),(21,'Bộ Tủ Bếp Hiện Đại',12000000,20000000,4,NULL,'2017-06-29 18:24:13','2017-07-04 18:24:13',1000000,NULL,'&lt;p&gt;Bộ tủ bếp được sản xuất từ gỗ keo tự nhi&amp;ecirc;n, chống nước, nấm mốc&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 18:24:13&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,2,1,'#image#sanpham_21#1.jpg','#image#sanpham_21#2.jpg','#image#sanpham_21#3.jpg'),(22,'Xe xích lô đời mới',10000000,18000000,5,NULL,'2017-06-29 18:44:15','2017-07-04 18:44:15',1000000,NULL,'&lt;p&gt;Xe x&amp;iacute;ch l&amp;ocirc; đời mới sản xuất tại Th&amp;aacute;i Lan&lt;br &#x2F;&gt;C&amp;oacute; thể chở đến 5 người&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 18:44:15&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,4,1,'#image#sanpham_22#1.jpg','#image#sanpham_22#2.jpg','#image#sanpham_22#3.jpg'),(23,'Du thuyền châu Âu',200000000,400000000,6,NULL,'2017-06-29 18:48:02','2017-07-04 18:48:02',20000000,NULL,'&lt;p&gt;Du thuyền đi khắp thế giới, chất lượng 5 sao&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 18:48:02&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,4,0,'#image#sanpham_23#1.jpg','#image#sanpham_23#2.jpg','#image#sanpham_23#3.jpg'),(24,'Xe Cào Cào giá rẻ',5000000,12000000,7,NULL,'2017-06-29 18:51:23','2017-07-03 18:51:23',1000000,NULL,'&lt;p&gt;Xe c&amp;agrave;o c&amp;agrave;o đ&amp;atilde; qua sử dụng , vượt địa h&amp;igrave;nh cực tốt&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 18:51:23&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,4,1,'#image#sanpham_24#1.jpg','#image#sanpham_24#2.jpg','#image#sanpham_24#3.jpg'),(25,'Áo Phông Nam',300000,500000,1412065,NULL,'2017-06-29 19:07:09','2017-07-03 19:07:09',50000,NULL,'&lt;p&gt;&amp;Aacute;o Ph&amp;ocirc;ng nam quyến rũ , full size, 3 m&amp;agrave;u : đen, trắng, kem&lt;&#x2F;p&gt;&lt;p style&#x3D;&quot;color:blue;font-size: 10px;&quot;&gt;Update Time : 2017-06-29 19:07:09&lt;&#x2F;p&gt;&lt;&#x2F;br&gt;',0,0,3,0,'#image#sanpham_25#1.jpg','#image#sanpham_25#2.jpg','#image#sanpham_25#3.jpg');
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

-- Dump completed on 2017-06-29 19:08:06
