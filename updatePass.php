<?php require("partials/header.php"); ?>

<div class="row paginaCompra">
   <form class="col-md-7" id="frmRecoverPass">
		<div class="form-group">
           <span id="spanTitulo">MODIFICAR CONTRASEÑA</span>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="12" name="passwordViejo" id="passwordViejo" type="password" placeholder="Contraseña" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="12" name="newPassword" id="newPassword" type="password" placeholder="Nueva contraseña" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-9">
              <input maxlength="12" name="newPassword2" id="newPassword2" type="password" placeholder="Reingrese nueva contraseña" class="form-control">
              <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
              <span class="help-block"></span>
          </div>      
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <button type="button" name="btnModificarPass" id="btnModificarPass" class="btn btn-primary pull-right">
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
<script src="assets/js/updatePass.js"></script>