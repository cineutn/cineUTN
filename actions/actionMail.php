<?php

require("../utils/request.php");

function redirect($url){
   header('Location: ' . $url, true, 303);
   die();
}

function sendResponse($response){
    echo json_encode($response);
}

function sendMail($request){
      include("api/class.phpmailer.php");
      include("api/class.smtp.php");

      $mailCliente = $request->email;
      $nombre = $request->nombreCompleto;
      $mensajeHtml = $request->mensaje;

      $mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->SMTPAuth = true;
      $mail->SMTPSecure = "ssl";
      $mail->Host = "smtp.gmail.com";
      $mail->Port = 465;
      $mail->Username = "cineutn@gmail.com";
      $mail->Password = "cineutn2015";

      $mail->From = "cineutn@gmail.com";
      $mail->FromName = "Cines UTN";
      $mail->Subject = "UTN Cines";
      $mail->AltBody = "";
      $mail->MsgHTML($mensajeHtml);
      //$mail->AddAttachment("files/files.zip");
      //$mail->AddAttachment("files/img03.jpg");
      $mail->AddAddress($mailCliente, $nombre);
      $mail->IsHTML(true);

      if(!$mail->Send()) {
        sendResponse(array(
            "error" => true,
            "mensaje" => "Error al enviar el Email. ". $mail->ErrorInfo
        ));
      } else {
        sendResponse(array(
            "error" => false,
            "mensaje" => "El email fue enviado con exito. "
        ));
      }
}


$request = new Request();
$action = $request->action;
switch($action){
    case "enviar":
        sendMail($request);
        break;                
    default:
        sendMail($request);
        break;
}

?>