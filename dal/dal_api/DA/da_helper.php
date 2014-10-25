<?php

/**
 * Description of DAHelper
 *
 * @author janunezc
 */
class DA_Helper { 
    
    /**
     * Ejecuta un comando SQL y devuelve el recurso (resource) correspondiente
     * @param string $SQLCommand
     * @return resource
     */
    public static function executeNonParametricQuery($SQLCommand){
        $dbURL  = DAConf::$databaseURL;
        $dbName = DAConf::$databaseName;
        $dbUsr  = DAConf::$databaseUName;
        $dbPwd  = DAConf::$databasePWord;

        $dbConn = mysql_connect($dbURL,$dbUsr,$dbPwd);
        $db = mysql_select_db($dbName,$dbConn);
        mysql_query("SET CHARACTER SET 'utf8'");
        mysql_query("SET collation_connection = 'utf8_spanish_ci'");
        $result = mysql_query($SQLCommand);

        if (mysql_errno()!=0){
            throw new Exception(mysql_error()." - ".$SQLCommand, "1");
        }
        return $result;
    }

    public static function mysqli_connect(){
        $dbURL  = DAConf::$databaseURL;
        $dbName = DAConf::$databaseName;
        $dbUsr  = DAConf::$databaseUName;
        $dbPwd  = DAConf::$databasePWord;
        return mysqli_connect($dbURL,$dbUsr,$dbPwd,$dbName);
    }

    public static function mysqli_close($link,$stmt){
        mysqli_stmt_close($stmt);
        mysqli_close($link);
    }

    public static function mysqli_stmt_init($link,$command){
        $stmt = mysqli_stmt_init($link);
        mysqli_stmt_prepare($stmt, $command);
        return $stmt;
    }
    
    private static function mysqli_setUTF8($link){
        mysqli_query($link, "SET character_set_client='utf8'");
        mysqli_query($link, "SET character_set_connection='utf8'");
        mysqli_query($link, "SET character_set_database='utf8'");
        mysqli_query($link, "SET character_set_results='utf8'");
        mysqli_query($link, "SET character_set_server='utf8'");
        mysqli_query($link, "SET character_set_system='utf8'");
    }
}
