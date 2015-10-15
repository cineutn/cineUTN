<?php
class ConnectionCine extends MySQLi {
     private static $instance = null ;
     const HOST = 'sql3.freesqldatabase.com';
     const USER = 'sql393132';
     const PASSWORD = 'uW2!nJ9!';       
     const DATABASE = 'sql393132';
         
     private function __construct($host, $user, $password, $database){ 
         parent::__construct($host, $user, $password, $database);
     }

     public static function getInstance(){
         if (self::$instance == null){
             self::$instance = new self(self::HOST, self::USER, self::PASSWORD, self::DATABASE);
             self::$instance->query("SET NAMES 'utf8'");
         }
         return self::$instance ;
     }
}