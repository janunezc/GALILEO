<?php

require_once './data_access.php';

$request = new stdClass();;
$request->device_id = "";
$request->device_command = "";

$request->iot_user = "";
$request->iot_pwd = "";
        
$request->pin01_mode = "";
$request->pin01_value = "";

$request->pin02_mode = "";
$request->pin02_value = "";

$request->pin03_mode = "";
$request->pin03_value = "";

$request->pin04_mode = "";
$request->pin04_value = "";

$request->pin05_mode = "";
$request->pin05_value = "";

$request->pin06_mode = "";
$request->pin06_value = "";

$request->pin07_mode = "";
$request->pin07_value = "";

$request->pin08_mode = "";
$request->pin08_value = "";

$request->pin09_mode = "";
$request->pin09_value = "";

$request->pin10_mode = "";
$request->pin10_value = "";

$request->pin11_mode = "";
$request->pin11_value = "";

$request->pin12_mode = "";
$request->pin12_value = "";

$request->pin13_mode = "";
$request->pin13_value = "";
$d1 = new DateTime();
$request->datetime = $d1->format("Y-m-d H:i:s.u");

$response = $request;

$response->response_message = "Thanks. " . $d1->format("Y-m-d H:i:s.u");

data_access::LogIOTEntry($request, $response);

echo json_encode($response);