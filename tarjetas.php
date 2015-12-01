<?php require("partials/header.php"); ?>

        <div class="row tarjetas">
            <h2 class="tarjeta-Titulo">TARJETAS</h2>
            <div id="btnAdd" class="pull-right addTarjeta">
                <span class="glyphicon glyphicon-plus"></span>    
            </div>
            <div id="form-Tarjeta" class="hide">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra">
                     <span id="iconCerrar" class="glyphicon glyphicon glyphicon-remove pull-right iconCerrar"></span>
                </div>
                <form method="post" id="formTarjeta">                    
                    <input id="idTarjeta" name="idTarjeta" type="hidden" class="hide" value="">
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <input maxlength="50" name="empresa" id="empresa" type="text" placeholder="Empresa" class="form-control">
                            <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                            <span class="help-block"></span> 
                        </div>                           
                    </div> 
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <input name="cantNumeros" id="cantNumeros" type="number" placeholder="Cantidad de digitos" class="form-control">
                            <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                            <span class="help-block"></span>    
                        </div>                             
                    </div>
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <input name="codigoSeguridad" id="codigoSeguridad" type="number" placeholder="Cantidad de digitos de seguridad" class="form-control">
                            <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                            <span class="help-block"></span>    
                        </div>                             
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                        <button id="btnAltaModificacion" class="btn btn-primary btn-AltaModificacion pull-right" type="button">
                            <span id="iconButton" class="glyphicon glyphicon-plus"></span>
                            <span id="btnText" class="">Crear</span>
                        </button>
                    </div>  
                </form>
             </div>
            <div id="contenedorTarjetas" class="precio">
               
            </div>
            
        </div>  

<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/tarjetas.css">
<script src="assets/js/vendor/bootstrap-confirmation.min.js"></script>
<script src="assets/js/tarjetas.js"></script>
