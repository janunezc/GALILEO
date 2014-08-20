<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of da_iot_request
 *
 * @author janunezc
 */
class da_iot_request {

    public static function iot_request_LogEntry($request) {
        $sqlCommand = "INSERT INTO iot_status_log ("
                . "DID,"
                . "CMD,"
                . "USR, "
                . "PWD, "
                . "G01M, G01V,"
                . "G02M, G02V,"
                . "G03M, G03V,"
                . "G04M, G04V,"
                . "G05M, G05V,"
                . "G06M, G06V,"
                . "G07M, G07V,"
                . "G08M, G08V,"
                . "G09M, G09V,"
                . "G10M, G10V,"
                . "G11M, G11V,"
                . "G12M, G12V,"
                . "G13M, G13V,"
                . "A0M, A0V,"                
                . "A1M, A1V,"
                . "A2M, A2V,"
                . "A3M, A3V,"
                . "A4M, A4V,"
                . "A5M, A5V,"
                . "request_datetime)"
                . "VALUES ("
                . "'$request->DID',"
                . "'$request->CMD',"
                . "'$request->USR', "
                . "'$request->PWD', "
                . "'$request->G01M', '$request->G01V',"
                . "'$request->G02M', '$request->G02V',"
                . "'$request->G03M', '$request->G03V',"
                . "'$request->G04M', '$request->G04V',"
                . "'$request->G05M', '$request->G05V',"
                . "'$request->G06M', '$request->G06V',"
                . "'$request->G07M', '$request->G07V',"
                . "'$request->G08M', '$request->G08V',"
                . "'$request->G09M', '$request->G09V',"
                . "'$request->G10M', '$request->G10V',"
                . "'$request->G11M', '$request->G11V',"
                . "'$request->G12M', '$request->G12V',"
                . "'$request->G13M', '$request->G13V',"
                . "'$request->A0M',  '$request->A0V',"
                . "'$request->A1M',  '$request->A1V',"
                . "'$request->A2M',  '$request->A2V',"
                . "'$request->A3M',  '$request->A3V',"
                . "'$request->A4M',  '$request->A4V',"
                . "'$request->A5M',  '$request->A5V', '$request->datetime'); ";

        DA_Helper::executeNonParametricQuery($sqlCommand);
    }

}
