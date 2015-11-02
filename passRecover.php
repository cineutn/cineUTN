<?php require("partials/header.php"); ?>

<div class="row paginaCompra">
   <form class="col-md-7" id="frmRecoverPass">
		<div class="form-group">
           <span id="spanTitulo">RECUPERACIÓN DE CONTRASEÑA</span>
        </div>
        <div class="form-group">
           <input  name="emailRecover" id="emailRecover" type="text" placeholder="Email" class="form-control">
        </div>
        <div class="form-group">
          	<button type="button" name="btnEnviarMail" id="btnEnviarMail" class="btn btn-primary pull-right">
          		<span class="glyphicon glyphicon-envelope"></span>
                <span class="">Enviar</span>
          	</button>
        </div>           		
   </form>       
</div>
	
<?php require("partials/footer.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css">
<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/passRecover.js"></script>