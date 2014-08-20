<?php
/**
 * http://localhost:8080/iot_engine/iot_request.php?DID=GALILEO1&CMD=LOG&USR=ROOT&PWD=&G01M=OUTPUT&G02M=OUTPUT&G03M=OUTPUT&G04M=OUTPUT&G05M=OUTPUT&G06M=OUTPUT&G07M=OUTPUT&G08M=OUTPUT&G09M=OUTPUT&G10M=OUTPUT&G11M=OUTPUT&G12M=OUTPUT&G13M=OUTPUT&G01V=0&G02V=0&G03V=0&G04V=0&G05V=0&G06V=0&G07V=0&G08V=0&G09V=0&G10V=0&G11V=0&G12V=0&G13V=0&A0M=OUTPUT&A0V=0&A1M=OUTPUT&A1V=0&A2M=OUTPUT&A2V=0&A3M=OUTPUT&A3V=0&A4M=OUTPUT&A4V=0&A5M=OUTPUT&A5V=0
 */

require_once './be/be_DeviceStatus.php';
require_once './dal/da_conf.php';
require_once './dal/da_helper.php';
require_once './dal/da_iot_request.php';


$request = new be_DeviceStatus();

$request->DID = filter_input(INPUT_GET, "DID");
$request->CMD = filter_input(INPUT_GET, "CMD");

$request->USR = filter_input(INPUT_GET, "USR");
$request->PWD = filter_input(INPUT_GET, "PWD");

$request->G01M = filter_input(INPUT_GET, 'G01M');
$request->G01V = filter_input(INPUT_GET, 'G01V');
$request->G02M = filter_input(INPUT_GET, 'G02M');
$request->G02V = filter_input(INPUT_GET, 'G02V');
$request->G03M = filter_input(INPUT_GET, 'G03M');
$request->G03V = filter_input(INPUT_GET, 'G03V');
$request->G04M = filter_input(INPUT_GET, 'G04M');
$request->G04V = filter_input(INPUT_GET, 'G04V');
$request->G05M = filter_input(INPUT_GET, 'G05M');
$request->G05V = filter_input(INPUT_GET, 'G05V');
$request->G06M = filter_input(INPUT_GET, 'G06M');
$request->G06V = filter_input(INPUT_GET, 'G06V');
$request->G07M = filter_input(INPUT_GET, 'G07M');
$request->G07V = filter_input(INPUT_GET, 'G07V');
$request->G08M = filter_input(INPUT_GET, 'G08M');
$request->G08V = filter_input(INPUT_GET, 'G08V');
$request->G09M = filter_input(INPUT_GET, 'G09M');
$request->G09V = filter_input(INPUT_GET, 'G09V');
$request->G10M = filter_input(INPUT_GET, 'G10M');
$request->G10V = filter_input(INPUT_GET, 'G10V');
$request->G11M = filter_input(INPUT_GET, 'G11M');
$request->G11V = filter_input(INPUT_GET, 'G11V');
$request->G12M = filter_input(INPUT_GET, 'G12M');
$request->G12V = filter_input(INPUT_GET, 'G12V');
$request->G13M = filter_input(INPUT_GET, 'G13M');
$request->G13V = filter_input(INPUT_GET, 'G13V');

$request->A0M = filter_input(INPUT_GET, 'A0M');
$request->A0V = filter_input(INPUT_GET, 'A0V');
$request->A1M = filter_input(INPUT_GET, 'A1M');
$request->A1V = filter_input(INPUT_GET, 'A1V');
$request->A2M = filter_input(INPUT_GET, 'A2M');
$request->A2V = filter_input(INPUT_GET, 'A2V');
$request->A3M = filter_input(INPUT_GET, 'A3M');
$request->A3V = filter_input(INPUT_GET, 'A3V');
$request->A4M = filter_input(INPUT_GET, 'A4M');
$request->A4V = filter_input(INPUT_GET, 'A4V');
$request->A5M = filter_input(INPUT_GET, 'A5M');
$request->A5V = filter_input(INPUT_GET, 'A5V');

$d1 = new DateTime();
$request->datetime = $d1->format("Y-m-d H:i:s.u");

da_iot_request::iot_request_LogEntry($request);

echo json_encode($request);
