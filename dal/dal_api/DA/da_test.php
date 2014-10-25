<?php
/**
 * Description of da_iot_request
 *
 * @author janunezc
 */
class da_test {

    public static function LogEntry() {
        $sqlCommand = "INSERT INTO iotcr_db.device_json_event_log (
    device_id, 
    device_json_event_type_id, 
    device_json_data,
    device_json_create_datetime)
VALUES( 1,
        1,
        '{value:0}',
        '2014-10-25 11:08')";
        
        echo $sqlCommand;

        DA_Helper::executeNonParametricQuery($sqlCommand);
    }

}
