<?php require("partials/header.php"); ?>

<div class="row paginaCompra">
   <form class="col-md-7" id="frmRecoverPass">
		<div class="form-group">
           <span id="spanTitulo">RECUPERACIÓN DE CONTRASEÑA</span>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input  name="emailRecover" id="emailRecover" type="email" placeholder="Email" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>         
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <button type="button" name="btnEnviarMail" id="btnEnviarMail" class="btn btn-primary pull-right">
              <span class="glyphicon glyphicon-envelope"></span>
              <span class="">Enviar</span>
            </button>
          </div>          	
        </div>           		
   </form>       
</div>
	
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css">
<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/passRecover.js"></script>