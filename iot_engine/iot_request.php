<?php

require_once './dal/da_conf.php';
require_once './dal/da_helper.php';
require_once './dal/da_iot_request.php';

$request = new stdClass();;
$request->device_id = "GALILEO-01";
$request->device_command = "LOG";

$request->iot_user = "joe";
$request->iot_pwd = "doe";
        
$request->pin01_mode = "INPUT";
$request->pin01_value = "1";

$request->pin02_mode = "INPUT";
$request->pin02_value = "0";

$request->pin03_mode = "INPUT";
$request->pin03_value = "0";

$request->pin04_mode = "INPUT";
$request->pin04_value = "0";

$request->pin05_mode = "INPUT";
$request->pin05_value = "0";

$request->pin06_mode = "INPUT";
$request->pin06_value = "0";

$request->pin07_mode = "INPUT";
$request->pin07_value = "0";

$request->pin08_mode = "INPUT";
$request->pin08_value = "0";

$request->pin09_mode = "INPUT";
$request->pin09_value = "0";

$request->pin10_mode = "INPUT";
$request->pin10_value = "0";

$request->pin11_mode = "INPUT";
$request->pin11_value = "0";

$request->pin12_mode = "INPUT";
$request->pin12_value = "0";

$request->pin13_mode = "INPUT";
$request->pin13_value = "0";
$d1 = new DateTime();
$request->datetime = $d1->format("Y-m-d H:i:s.u");

$response = $request;

$response->response_message = "Thanks. " . $d1->format("Y-m-d H:i:s.u");

da_iot_request::iot_request_response_log_LogEntry($request, $response);

echo json_encode($response);