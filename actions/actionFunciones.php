<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

    
$request = new Request();
$action = $request->action;
switch($action){                  
   // case "obtenerPeliculas":
     //   obtenerPeliculas($request);
       // break;    
        
}
