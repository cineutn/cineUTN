<?php
class ConnectionCine extends MySQLi {
     private static $instance = null ;
     const HOST = 'db4free.net';
     const USER = 'utncine';
     const PASSWORD = 'cineutn2015';       
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