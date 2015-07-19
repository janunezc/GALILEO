<?php

/**
 * Description of da_iot_request
 *
 * @author janunezc
 */
class da_test {

    public static function LogEntry($deviceID, $jsonData) {
        
$fechaActual = new DateTime();
$fechaString = $fechaActual->format("Y-m-d H:i:s.u");       

        $sqlCommand = "INSERT INTO iotcr_db.device_json_event_log (
    device_id, 
    device_json_event_type_id, 
    device_json_data,
    device_json_create_datetime)
    VALUES( $deviceID,
        1,
        '$jsonData',
        '$fechaString')";

        echo $sqlCommand;

        DA_Helper::executeNonParametricQuery($sqlCommand);
    }

}
