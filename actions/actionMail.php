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
      $codigoQR = $request->codigoQR;      
      $codigo = $request->codigo;    
      $cine = $request->cine;
      $sala= $request->sala;
      $pelicula= $request->pelicula;
      $fecha= $request->fecha;
      $horario= $request->horario;
      $entradas= $request->entradas;
      $pagoTotal= $request->pagoTotal;

      //eliminamos data:image/png; y base64, de la cadena que tenemos
      //hay otras formas de hacerlo          
      //list(, $codigoQR) = explode(';', $codigoQR);
      //list(, $codigoQR) = explode(',', $codigoQR);
      //Decodificamos $Base64Img codificada en base64.
      $codigoQR = base64_decode($codigoQR);
      //escribimos la información obtenida en un archivo llamado 
      //unodepiera.png para que se cree la imagen correctamente
      $pathCodigo = '../assets/img/codigosQR/'.$codigo.'.png';

      file_put_contents($pathCodigo, $codigoQR);  
      
      $cuerpo ='
      <style type="text/css">
          .centrar{
            text-align: center;
          }

          #contenedorQR > * {
          display: block;
          }

          #contenedorQR {
              display: inline-block;
              vertical-align: middle;
              margin-left: 10px;
              margin-bottom: 10px;
              box-shadow: 0 0 16px rgba(0,0,0,0.5);
          }

          #imgCodigo{
            margin-bottom: 10px;
            vertical-align: middle;
          }

          #qrCode {
            text-align:center;
          }

          #tablaResumenCompra table{
            max-width:50%;
            margin: auto;
            text-align:center;
          }

          #codigoQR{
          background-image: url("'.$codigoQR.'"); 
          }
        
      </style>
      <div class="confirmarOperacion" id="contenedorVenta">
            <div class="container">
        <div class="row">
                          
          <div id="qrCode" >
            <img id="imgCodigo" src="../assets/img/subheaderbuy-all.jpg" width="350" height="117" />           
            <div id="contenedorQR"><img src="'.$pathCodigo.'" id="codigoQR" width="200" height="200" /></div>
          </div>
        </div>
        <div class="row">
           <p class="centrar">&#161;Gracias por elegir Cines
          UTN! La informaci&#243;n de tu compra se detalla a
          continuaci&#243;n. Esperamos<br />
          que tu experiencia en nuestro sistema de compras online
          haya resultado satisfactoria. &#161;Disfrut&#225; la
          pel&#237;cula!</p>
        </div>
        <div id="tablaResumenCompra" class="row">
          <table class="table table-condensed" style="margin:auto;"> 
            <tbody>
              <tr>
                <td>C&#243;digo de Retiro:</td>
                <td id="codigo" style="font-weight:bold;color:#BC1818;">'.$codigo.'</td>
              </tr>
              <tr>
                <td>Cine:</td>
                <td id="complejo">'.$cine.'</td>
              </tr>
              <tr>
                <td >Sala:</td>
                <td id="sala">'.$sala.'</td>
              </tr>
              <tr>
                <td >Pel&#237;cula:</td>
                <td id="pelicula">'.$pelicula.'</td>
              </tr>
              <tr>
                <td >Fecha:</td>
                <td id="fecha">'.$fecha.'</td>
              </tr>
              <tr>
                <td >Horario:</td>
                <td id="horario">'.$horario.'</td>
              </tr>
              <tr>
                <td >Entradas:</td>
                <td id="entradas">'.$entradas.'</td>
              </tr>           
              <tr>
                <td>Pago Total:</td>
                <td id="precioTotal">'.$pagoTotal.'</td>
              </tr>
              </tbody>
            </table>
        </div>
        <div class="row">       
          <table width="96%" align="center" border="0" cellpadding="0" cellspacing="0" style="color:#575756;font-size:14px;border-collapse:collapse;font-family:"Arial Narrow", Lucida Sans Unicode, Lucida Grande, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;">
            <tbody>
                    <tr>
                    <td class="ecxspecial">
                      <h4 style=
                      "font-weight:bold;color:#286cb4;text-align:center;">
                      ATENCI&#211;N NUEVAS NORMAS PARA TU SEGURIDAD</h4>
                    </td>
                    </tr>

                    <tr style="height:15px;">
                    <td></td>
                    </tr>

                    <tr>
                    <td></td>
                    </tr>

                    <tr>
                    <td style="text-align:center;">Compras con promociones:
                    record&#225; que deber&#225;s presentar la tarjeta y/o
                    cup&#243;n correspondiente para validar su descuento.</td>
                    </tr>

                    <tr style="height:15px;">
                    <td></td>
                    </tr>

                    <tr>
                    <td></td>
                    </tr>

                    <tr>
                    <td style="text-align:center;">Record&#225; que deber&#225;
                    presentarse indefectiblemente el titular de la tarjeta junto
                    a la misma y su DNI para obtener las entradas e ingresar a la
                    sala. Sin esta documentaci&#243;n las entradas obtenidas
                    carecen de valor. En caso de comprar entradas para menores de
                    edad, deber&#225; respetarse la pol&#237;tica de
                    clasificaci&#243;n de las pel&#237;culas para la edad del
                    espectador en cuesti&#243;n. Si la persona que asistir&#225;
                    a la funci&#243;n no cumple con la edad necesaria, seg&#250;n
                    la clasificaci&#243;n del film, el mismo deber&#225; ser
                    acompa&#241;ado por el adulto (Padre/Madre/Tutor o persona
                    autorizada mediante formulario Form. Menores/Res. 2890)
                    durante la proyecci&#243;n de la funci&#243;n, en caso de que
                    la cumpla deber&#225; ser acompa&#241;ado por el adulto hasta
                    el ingreso a la sala. Esto &#250;ltimo se debe a que
                    podr&#237;a ser requerida la documentaci&#243;n del titular
                    que compr&#243; las entradas por internet para el
                    ingreso.</td>
                    </tr>

                    <tr style="height:15px;">
                    <td></td>
                    </tr>

                    <tr>
                    <td></td>
                    </tr>

                    <tr height="20">
                    <td style="display:block;"></td>
                    </tr>
                  </tbody>
          </table>
        </div>
      </div>
      </div>';

      $mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->SMTPAuth = true;
      $mail->SMTPSecure = "ssl";
      $mail->Host = "smtp.gmail.com";
      $mail->Port = 465;
      $mail->Username = "cineutn@gmail.com";
      $mail->Password = "cineutn2015";
      $mail->CharSet = 'UTF-8';
      
      $mail->From = "cineutn@gmail.com";
      $mail->FromName = "Cines UTN";
      $mail->Subject = "UTN Cines";
      $mail->AltBody = "";
      $mail->MsgHTML($cuerpo);
      
      $mail->AddEmbeddedImage($codigoQR, "Filename.png", "base64", "image/png");

      //AddEmbeddedImage($path, $cid, $name, $encoding, $type, $disposition)
      //$mail->AddEmbeddedImage($codigoQR,'codigoQR','codigoQR', 'base64', "image/png");
      //$mail->AddEmbeddedImage( $resource ,'codigoQR');

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

function sendMailRecover($request){
      include("api/class.phpmailer.php");
      include("api/class.smtp.php");
            
      $mailCliente = $request->email;
      $nombre = $request->nombre;
      $Password = $request->contraseña;

      $cuerpo ='
        Hola '.$nombre.'
        <br>
        <br>
        Recibimos una solicitud de reenvío de contraseña del usuario a esta dirección.
        Los datos son los siguientes: 
        <br>
        Contraseña: '.$Password.'  
        <br>
        <br>
        Atentamente
        <br>
        UTN Cines.- 
        <br>
        <br>
        Notificacion de UTN Cines.
      
      ';

      $mail = new PHPMailer();
      $mail->IsSMTP();
      $mail->SMTPAuth = true;
      $mail->SMTPSecure = "ssl";
      $mail->Host = "smtp.gmail.com";
      $mail->Port = 465;
      $mail->Username = "cineutn@gmail.com";
      $mail->Password = "cineutn2015";
      $mail->CharSet = 'UTF-8';

      $mail->From = "cineutn@gmail.com";
      $mail->FromName = "Cines UTN";
      $mail->Subject = "Notificación de UTN Cines";
      $mail->AltBody = "";
      $mail->MsgHTML($cuerpo);
      
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
        return true;
      }
}

$request = new Request();
$action = $request->action;
switch($action){
    case "enviar":
        sendMail($request);
        break;
    case "recover":
        sendMailRecover($request);
        break;                
    default:
        sendMail($request);
        break;
}

?>