<?php require("partials/header.php"); ?>

<?php 

	$varCodigo = isset($_POST["codigoVenta"]) ? $_POST["codigoVenta"] : ' ';
	$varEmail = isset($_POST["mailVenta"]) ? $_POST["mailVenta"] : ' ';
 ?>

       <div class="row paginaCompra">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
               <div>TITULO PELICULA</div>
               	> DETALLE DE COMPRA >
                	<a href="paginaCompra.php">1. ENTRADAS</a>
               	>               
              		<a href="ventaButacas.php">2. BUTACAS</a>
               	>
              		<a href="pagoEntradas.php">3. PAGOS</a>
               	>
               <b>4. CONFIRMACION</b></b>
            </div>   
       <div class="confirmarOperacion" id="contenedorVenta">
       		<input name="ventaID" id="ventaID" type="hidden" value="">
       		<input name="emailUser" id="emailUser" type="hidden" value=<?php echo $varEmail; ?>>
            <div class="container">
				<div class="row">
													
					<div id="qrCode" >
						<img id="imgCodigo" src="assets/img/subheaderbuy-all.jpg" width="350" height="117" />						
						<div id="contenedorQR"></div>
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
					<table class="table table-condensed"> 
						<tbody>
							<tr>
							  <td>C&#243;digo de Retiro:</td>
							  <td id="codigo" style="font-weight:bold;color:#BC1818;"><?php echo $varCodigo; ?></td>
							</tr>
							<tr>
							  <td>Cine:</td>
							  <td id="complejo"></td>
							</tr>
							<tr>
							  <td >Sala:</td>
							  <td id="sala"></td>
							</tr>
							<tr>
							  <td >Pel&#237;cula:</td>
							  <td id="pelicula"></td>
							</tr>
							<tr>
							  <td >Fecha:</td>
							  <td id="fecha"></td>
							</tr>
							<tr>
							  <td >Horario:</td>
							  <td id="horario"></td>
							</tr>
							<tr>
							  <td >Entradas:</td>
							  <td id="entradas"></td>
							</tr>					  
							<tr>
							  <td>Pago Total:</td>
							  <td id="precioTotal"></td>
							</tr>
						  </tbody>
						</table>
				</div>
				<div class="row">				
					<table width="96%" align="center" border="0" cellpadding="0" cellspacing="0" style="color:#575756;font-size:14px;border-collapse:collapse;font-family:'Arial Narrow', Lucida Sans Unicode, Lucida Grande, 'Gill Sans', 'Gill Sans MT', 'Myriad Pro', Myriad, 'DejaVu Sans Condensed', 'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, 'Helvetica Neue', Helvetica, Arial, sans-serif;">
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
	    </div>        
    </div>
	
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>
    
 	<link rel="stylesheet" href="assets/css/paginaInicio.css">
    <link rel="stylesheet" href="assets/css/paginaCompra.css">   
    <script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
	<script src="assets/js/vendor/jquery.qrcode-0.12.0.js"></script>
	<script src="assets/js/resumenCompra.js"></script>