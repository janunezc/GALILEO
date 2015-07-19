<?php

require_once ('./DA/da_conf.php');
require_once ("./DA/da_helper.php");
require_once './DA/da_test.php';


$deviceID = $_GET["device_id"];
$sender = $_GET["sender"];
$value = $_GET["value"];
$jsonObject = '{"value":"'.$value.'"}';

echo ("Logging Dummy Data for Device ID: $deviceID sent by $sender");

da_test::LogEntry($deviceID,$jsonObject);


