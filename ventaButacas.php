<?php 
    require("utils/request.php");    
    $request = new Request();
    $cantidadEntradas = $request->cantidadEntradas;
    $precio=$request->precio;
    $idFuncionDetalle=$request->idFuncionDetalle;



    require("partials/header.php");
?>

		<div class="row butacas">
            <input type='hidden' id='idCantidadEntradas' value=<?php echo $cantidadEntradas ?>></input>
            <input type='hidden' id='idFuncionDetalle' value=<?php echo $idFuncionDetalle ?>></input>
            <input type='hidden' id='precio' value=<?php echo $precio ?>></input>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
			           	<div>EL CLAN CASTELLANO (P16)</div>
			           	> DETALLE DE COMPRA >
			            	<a href="paginaCompra.php">1. ENTRADAS</a>
			           	>               
			           <b>2. BUTACAS</b>
			</div>
			<input type='hidden' id='idFuncionDetalle' value= <?php echo $idFuncionDetalle ?> ></input>
			<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" id="imagenPelicula">               
            </div>
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <input id="idTipoFuncion" name="idPelicula" type="hidden" class="hide" value="">                
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato" >PELICULA</label>
                        <span class="datos" id="tituloPelicula"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato">CINE</label>
                       <span class="datos" id="complejo"></span>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">DIA</label>
                        <span class="datos" id="diaFuncion"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <label class="tituloDato" >HORARIO</label>
                        <span class="datos" id="horarioFuncion"></span>   
                    </div>
                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                       <label class="tituloDato">SALA</label>
                       <span class="datos" id="sala"></span>
                    </div>
                </div>
           </div>
            <?php require("partials/reloj.php"); ?> 
           <div class="row col-md-12" style="margin-top:10px;">              
           		<div class="col-md-12 compraPelicula sombra">
                <div class="col-md-9 explicacion">
                  <span id="lblExplicacion">Para seleccionar su butaca, haga click sobre una ubicación disponible. Esta pantalla es un indicador de la disposición de las ubicaciones en la sala, y no representa distancias reales.</span>
                </div>                
           			<div class="col-xs-8 col-md-4">
           				<img src="assets/img/butacaOcupada.png" />
						      <p style="font-size:medium; display:inline-block;">Butaca ocupada</p>	
           			</div>
					<div class="col-xs-8 col-md-4">
           				<img src="assets/img/butacaLibre.png" />
           				<p style="font-size:medium; display:inline-block;">Butaca disponible</p>
           			</div>
           			<div class="col-xs-8 col-md-4">
           				<img src="assets/img/butacaSeleccionada.png" />
           				<p style="font-size:medium; display:inline-block;">Su butaca</p>
           			</div>						
				</div>
	           	<div class="col-md-12">	               
	                <table class="esquema" id="esquemaSala" style="margin-left:30%;">                    
	                    
	                </table>
				</div>
				<div class="col-md-12 divBotonButacas">						
					<!--<button type="button" onclick="location.href='pagoEntradas.php';" class="btn btn-success btn-Confirmar pull-left">SIGUIENTE</button>-->
	                <button type="button" onclick="reservarButaca()" class="btn btn-success btn-Confirmar pull-right" style="margin-bottom:10px;">SIGUIENTE</button>
				</div>
           </div>       
			
		</div> 

<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/ventaButacas.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/reloj.js"></script>
<script src="assets/js/ventaButaca.js"></script>
