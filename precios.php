<?php require("partials/header.php"); ?>

        <div class="row precios">
            <h2 class="precios-Titulo">Valor de las Entradas</h2>
            <h4 class="precios-Descripcion">Horario de apertura de la Boletería es de 12:00hs y hasta la ultima función del día.</h4>
            <div id="btnAdd" class="pull-right addPrecio" data-toggle="tooltipCartelera" title="Crear Precio">
                <span class="glyphicon glyphicon-plus"></span>    
            </div>
            <div id="form-Precio" class="hide">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra">
                     <span id="iconCerrar" class="glyphicon glyphicon glyphicon-remove pull-right iconCerrar"></span>
                </div>
                <form method="post" id="formPrecio">                    
                    <input id="idPrecio" name="idPrecio" type="hidden" class="hide" value="">
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <select name="idFormato" id="comboFormato" class="form-control"></select>
                            <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                            <span class="help-block"></span>
                        </div>                             
                    </div>
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <input maxlength="50" name="descripcionPrecio" id="descripcionPrecio" type="text" placeholder="Decripción" class="form-control">
                            <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                            <span class="help-block"></span> 
                        </div>                           
                    </div> 
                    <div class="form-group controles">
                        <div class="col-md-7">
                            <input  name="valorPrecio" id="valorPrecio" type="number" placeholder="Valor" class="form-control">
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
            <div id="contenedorPrecios" class="precio">
               
            </div>
            
        </div>  

<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/precios.css">
<script src="assets/js/vendor/bootstrap-tooltip.js"></script>
<script src="assets/js/vendor/bootstrap-confirmation.min.js"></script>
<script src="assets/js/precios.js"></script>