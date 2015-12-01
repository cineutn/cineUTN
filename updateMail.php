<?php require("partials/header.php"); ?>

<div class="row paginaCompra">
   <form class="col-md-7" id="frmRecoverPass">
		<div class="form-group">
           <span id="spanTitulo">MODIFICAR EMAIL</span>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="12" name="passValidar" id="passValidar" type="password" placeholder="Contraseña" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="100" name="emailViejo" id="emailViejo" type="email" placeholder="Email" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="100" name="newEmail" id="newEmail" type="email" placeholder="Nuevo email" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="100" name="newEmail2" id="newEmail2" type="email" placeholder="Reingrese nuevo email" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>      
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <button type="button" name="btnModificarEmail" id="btnModificarEmail" class="btn btn-primary pull-right">
              <span class="glyphicon glyphicon-pencil"></span>
              <span class="">Modificar</span>
            </button>
          </div>          	
        </div>           		
   </form>       
</div>
	
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css">
<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/updateMail.js"></script>