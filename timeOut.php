<?php require("partials/header.php"); ?>

<div class="row paginaCompra">
      <div class="form-group">
        <div class="col-md-5 errorDetalles">
          <span id="lblMensaje">Lo sentimos, pero la sesión ha caducado. Usted puede empezar nuevamente haciendo click en el botón de abajo.</span>
        </div>           
      </div>  
      <div class="form-group">
          <div class="col-md-12" style="margin-bottom:10px; margin-left:45%;">
            <button type="button" name="btnVolver" id="btnVolver" class="btn btn-primary" >
              <span class="glyphicon glyphicon-home"></span>
              <span class=""> VOLVER A HOME</span>
            </button>
          </div>            
      </div>  
</div>
	
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css">
<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/timeOut.js"></script>