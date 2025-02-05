-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3309
-- Generation Time: Jan 16, 2025 at 11:00 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `itemdetails`
--

CREATE TABLE `itemdetails` (
  `itemId` int(100) UNSIGNED NOT NULL,
  `length` int(100) UNSIGNED NOT NULL,
  `width` int(100) UNSIGNED NOT NULL,
  `height` int(100) UNSIGNED NOT NULL,
  `unit` varchar(100) NOT NULL,
  `quantity` int(100) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemdetails`
--

INSERT INTO `itemdetails` (`itemId`, `length`, `width`, `height`, `unit`, `quantity`) VALUES
(1, 10, 4, 2, 'cm', 50),
(2, 10, 5, 2, 'cm', 20);

-- --------------------------------------------------------

--
-- Table structure for table `itemmaster`
--

CREATE TABLE `itemmaster` (
  `itemId` int(100) UNSIGNED NOT NULL,
  `itemCode` int(100) UNSIGNED NOT NULL,
  `itemName` varchar(1000) NOT NULL,
  `specification` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemmaster`
--

INSERT INTO `itemmaster` (`itemId`, `itemCode`, `itemName`, `specification`) VALUES
(1, 0, 'Updated Item1', 'New Specification'),
(2, 0, 'Sample Item', 'High Quality');

-- --------------------------------------------------------

--
-- Table structure for table `purchasedetails`
--

CREATE TABLE `purchasedetails` (
  `purchaseId` int(100) UNSIGNED NOT NULL,
  `itemId` int(100) UNSIGNED NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_order` varchar(1000) NOT NULL,
  `supplier` varchar(1000) NOT NULL,
  `challan` varchar(1000) NOT NULL,
  `quantity` int(100) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchasedetails`
--

INSERT INTO `purchasedetails` (`purchaseId`, `itemId`, `purchase_date`, `purchase_order`, `supplier`, `challan`, `quantity`) VALUES
(2, 1, '2025-01-16', 'UpdatedPO12345', 'UpdatedSupplier', 'UpdatedCH12345', 150),
(3, 2, '2025-01-15', 'PO12345', 'SupplierName', 'CH12345', 100),
(4, 2, '2025-01-15', 'PO12345', 'SupplierName', 'CH12345', 100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itemdetails`
--
ALTER TABLE `itemdetails`
  ADD KEY `fk_item` (`itemId`);

--
-- Indexes for table `itemmaster`
--
ALTER TABLE `itemmaster`
  ADD PRIMARY KEY (`itemId`);

--
-- Indexes for table `purchasedetails`
--
ALTER TABLE `purchasedetails`
  ADD PRIMARY KEY (`purchaseId`),
  ADD KEY `purchasedetails_ibfk_1` (`itemId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itemmaster`
--
ALTER TABLE `itemmaster`
  MODIFY `itemId` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `purchasedetails`
--
ALTER TABLE `purchasedetails`
  MODIFY `purchaseId` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `itemdetails`
--
ALTER TABLE `itemdetails`
  ADD CONSTRAINT `fk_item` FOREIGN KEY (`itemId`) REFERENCES `itemmaster` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchasedetails`
--
ALTER TABLE `purchasedetails`
  ADD CONSTRAINT `purchasedetails_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `itemmaster` (`itemId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
