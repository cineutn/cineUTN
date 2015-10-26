<?php require("partials/header.php"); ?>

<div class="col-md-12">
    
    <div class="col-md-5">	               
        <table class="esquema" id="esquemaSala">                    

        </table>
    </div>	
	<div class="col-md-5 "  >
	  <div   class="row divLeyendaButacas">	
		<div>
			 <div><img src="assets/img/butacaOcupada.png" /><p style="font-size:medium;">Butaca a excluir</p></div>
		</div>
	   <div >
			 <div><img src="assets/img/butacaLibre.png" /><p style="font-size:medium;">Butaca de la sala</p></div>
		</div>	
		<div class="divBotonButacas">					
			<button type="button" class="btn btn-success btn-Confirmar pull-left">Guardar</button>
		</div>
	 </div>
	</div>
</div>
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/esquemaSala.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
