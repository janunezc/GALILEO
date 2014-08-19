--
-- Database: `iot_engine_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `iot_request_response_log`
--

CREATE TABLE IF NOT EXISTS `iot_request_response_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `device_command` varchar(100) COLLATE utf8_bin NOT NULL,
  `iot_user` int(11) NOT NULL,
  `iot_pwd` int(11) NOT NULL,
  `request_pin01_mode` varchar(50) NOT NULL,
  `request_pin01_value` int(11) NOT NULL,
  `request_pin02_mode` varchar(50) NOT NULL,
  `request_pin02_value` int(11) NOT NULL,
  `request_pin03_mode` varchar(50) NOT NULL,
  `request_pin03_value` int(11) NOT NULL,
  `request_pin04_mode` varchar(50) NOT NULL,
  `request_pin04_value` int(11) NOT NULL,
  `request_pin05_mode` varchar(50) NOT NULL,
  `request_pin05_value` int(11) NOT NULL,
  `request_pin06_mode` varchar(50) NOT NULL,
  `request_pin06_value` int(11) NOT NULL,
  `request_pin07_mode` varchar(50) NOT NULL,
  `request_pin07_value` int(11) NOT NULL,
  `request_pin08_mode` varchar(50) NOT NULL,
  `request_pin08_value` int(11) NOT NULL,
  `request_pin09_mode` varchar(50) NOT NULL,
  `request_pin09_value` int(11) NOT NULL,
  `request_pin10_mode` varchar(50) NOT NULL,
  `request_pin10_value` int(11) NOT NULL,
  `request_pin11_mode` varchar(50) NOT NULL,
  `request_pin11_value` int(11) NOT NULL,
  `request_pin12_mode` varchar(50) NOT NULL,
  `request_pin12_value` int(11) NOT NULL,
  `request_pin13_mode` varchar(50) NOT NULL,
  `request_pin13_value` int(11) NOT NULL,
  `request_datetime` varchar(100) NOT NULL,

  `response_pin01_mode` varchar(50) NOT NULL,
  `response_pin01_value` int(11) NOT NULL,
  `response_pin02_mode` varchar(50) NOT NULL,
  `response_pin02_value` int(11) NOT NULL,
  `response_pin03_mode` varchar(50) NOT NULL,
  `response_pin03_value` int(11) NOT NULL,
  `response_pin04_mode` varchar(50) NOT NULL,
  `response_pin04_value` int(11) NOT NULL,
  `response_pin05_mode` varchar(50) NOT NULL,
  `response_pin05_value` int(11) NOT NULL,
  `response_pin06_mode` varchar(50) NOT NULL,
  `response_pin06_value` int(11) NOT NULL,
  `response_pin07_mode` varchar(50) NOT NULL,
  `response_pin07_value` int(11) NOT NULL,
  `response_pin08_mode` varchar(50) NOT NULL,
  `response_pin08_value` int(11) NOT NULL,
  `response_pin09_mode` varchar(50) NOT NULL,
  `response_pin09_value` int(11) NOT NULL,
  `response_pin10_mode` varchar(50) NOT NULL,
  `response_pin10_value` int(11) NOT NULL,
  `response_pin11_mode` varchar(50) NOT NULL,
  `response_pin11_value` int(11) NOT NULL,
  `response_pin12_mode` varchar(50) NOT NULL,
  `response_pin12_value` int(11) NOT NULL,
  `response_pin13_mode` varchar(50) NOT NULL,
  `response_pin13_value` int(11) NOT NULL,
  PRIMARY KEY (`log_id`),
  UNIQUE KEY `log_id` (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='LOG of Request Response Interactions' AUTO_INCREMENT=1 ;

