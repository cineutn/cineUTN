<?php 
    require("utils/request.php");    
    $request = new Request();
    $cantidadEntradas = $request->cantidadEntradas;
    $precio=$request->precio;

    require("partials/header.php");
?>

		<div class="row butacas">
            <input type='hidden' id='idCantidadEntradas' value=<?php echo $cantidadEntradas ?>></input>
            <input type='hidden' id='precio' value=<?php echo $precio ?>></input>
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
			           	<div>EL CLAN CASTELLANO (P16)</div>
			           	> DETALLE DE COMPRA >
			            	<a href="paginaCompra.php">1. ENTRADAS</a>
			           	>               
			           <b>2. BUTACAS</b>
			</div>
			<div class="col-md-5">	               
                <table class="esquema" id="esquemaSala">                    
                    
                </table>
			</div>
			<div class="col-md-6 compraPelicula" style="background-color:white;">
				<br /><br />
				<div>
					 <div><img src="assets/img/butacaOcupada.png" /><p style="font-size:medium;">Butaca ocupada</p></div>
				</div>
			    <div>
					 <div><img src="assets/img/butacaLibre.png" /><p style="font-size:medium;">Butaca disponible</p></div>
				</div>
				<div>
					 <div><img src="assets/img/butacaSeleccionada.png" /><p style="font-size:medium;">Su butaca</p></div>
				</div>
				<div class="divBotonButacas">
					
					<!--<button type="button" onclick="location.href='pagoEntradas.php';" class="btn btn-success btn-Confirmar pull-left">SIGUIENTE</button>-->
                    <button type="button" onclick="reservarButaca()" class="btn btn-success btn-Confirmar pull-left">SIGUIENTE</button>
				</div>
			</div>
		</div> 

<?php require("partials/footer.php"); ?>

<link rel="stylesheet" href="assets/css/ventaButacas.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/ventaButaca.js"></script>
