<?php
class Connection extends MySQLi {
     private static $instance = null ;
     const HOST = 'localhost';
     const USER = 'admin';
     const PASSWORD = '';       
     const DATABASE = 'cineutn';
         
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

class ConnectionCine extends MySQLi {
     private static $instance = null ;
     const HOST = 'localhost';
     const USER = 'root';
     const PASSWORD = 'admin';       
     const DATABASE = 'utncine';
         
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