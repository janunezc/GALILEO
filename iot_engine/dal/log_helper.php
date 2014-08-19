<?php
/**
 * Description of data_helper
 *
 * @author janunezc
 */
class data_helper {
    public static function ExecuteSQLNoQuery($sqlCommand){
        file_put_contents("log.sql", $sqlCommand,FILE_APPEND);
    }
}
