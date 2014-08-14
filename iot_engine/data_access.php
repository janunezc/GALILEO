<?php

require_once './data_helper.php';
/**
 * Description of data_access
 *
 * @author janunezc
 */
class data_access {

    /**
     * REGISTERS A IOT REQUEST RESPONSE INTERACTION IN THE DATABASE
     * @param IOT_request $request
     * @param IOT_response $response
     */
    
    public static function LogIOTEntry($request,$response){
        $sqlCommand = "INSERT INTO iot_request_response_log ("
                . "device_id,"
                . "device_command,"
                . "iot_user, "
                . "iot_pwd, "
                . "request_pin01_mode, request_pin01_value,"
                . "request_pin02_mode, request_pin02_value,"
                . "request_pin03_mode, request_pin03_value,"
                . "request_pin04_mode, request_pin04_value,"
                . "request_pin05_mode, request_pin05_value,"
                . "request_pin06_mode, request_pin06_value,"
                . "request_pin07_mode, request_pin07_value,"
                . "request_pin08_mode, request_pin08_value,"
                . "request_pin09_mode, request_pin09_value,"
                . "request_pin10_mode, request_pin10_value,"
                . "request_pin11_mode, request_pin11_value,"
                . "request_pin12_mode, request_pin12_value,"
                . "request_pin13_mode, request_pin13_value,"
                . "request_datetime,"
                
                . "response_pin01_mode, response_pin01_value,"
                . "response_pin02_mode, response_pin02_value,"
                . "response_pin03_mode, response_pin03_value,"
                . "response_pin04_mode, response_pin04_value,"
                . "response_pin05_mode, response_pin05_value,"
                . "response_pin06_mode, response_pin06_value,"
                . "response_pin07_mode, response_pin07_value,"
                . "response_pin08_mode, response_pin08_value,"
                . "response_pin09_mode, response_pin09_value,"
                . "response_pin10_mode, response_pin10_value,"
                . "response_pin11_mode, response_pin11_value,"
                . "response_pin12_mode, response_pin12_value,"
                . "response_pin13_mode, response_pin13_value)"
                
                . "VALUES ("
                . "'$request->device_id',"
                . "'$request->device_command',"
                . "'$request->iot_user', "
                . "'$request->iot_pwd', "
                
                . "'$request->pin01_mode', '$request->pin01_value',"
                . "'$request->pin02_mode', '$request->pin02_value',"
                . "'$request->pin03_mode', '$request->pin03_value',"
                . "'$request->pin04_mode', '$request->pin04_value',"
                . "'$request->pin05_mode', '$request->pin05_value',"
                . "'$request->pin06_mode', '$request->pin06_value',"
                . "'$request->pin07_mode', '$request->pin07_value',"
                . "'$request->pin08_mode', '$request->pin08_value',"
                . "'$request->pin09_mode', '$request->pin09_value',"
                . "'$request->pin10_mode', '$request->pin10_value',"
                . "'$request->pin11_mode', '$request->pin11_value',"
                . "'$request->pin12_mode', '$request->pin12_value',"
                . "'$request->pin13_mode', '$request->pin13_value',"
                . "'$request->datetime',"
                
                . "'$response->pin01_mode', '$response->pin01_value',"
                . "'$response->pin02_mode', '$response->pin02_value',"
                . "'$response->pin03_mode', '$response->pin03_value',"
                . "'$response->pin04_mode', '$response->pin04_value',"
                . "'$response->pin05_mode', '$response->pin05_value',"
                . "'$response->pin06_mode', '$response->pin06_value',"
                . "'$response->pin07_mode', '$response->pin07_value',"
                . "'$response->pin08_mode', '$response->pin08_value',"
                . "'$response->pin09_mode', '$response->pin09_value',"
                . "'$response->pin10_mode', '$response->pin10_value',"
                . "'$response->pin11_mode', '$response->pin11_value',"
                . "'$response->pin12_mode', '$response->pin12_value',"
                . "'$response->pin13_mode', '$response->pin13_value') ; ";
        
        data_helper::ExecuteSQLNoQuery($sqlCommand);
        
    }
}
