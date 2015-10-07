<?php require("partials/header.php"); ?>

        <div class="row precios">
            <h2 class="precios-Titulo">Valor de las Entradas</h2>
            <h4 class="precios-Descripcion">Horario de apertura de la Boletería es de 12:00hs y hasta la ultima función del día.</h4>
            <div id="btnAdd" class="pull-right addPrecio">
                <span class="glyphicon glyphicon-plus"></span>    
            </div>
            <form method="post" id="formPrecio">
                <div class=" col-md-12 sombra"></div>
                <input id="idPrecio" name="idPrecio" type="hidden" class="hide" value="">
                <div class="col-md-8 form-group controles">
                    <select name="idFormato" id="comboFormato" class="form-control"></select>
                </div>
                <div class="col-md-8 form-group controles">
                    <input  name="descripcionPrecio" id="descripcionPrecio" type="text" placeholder="Decripción" class="form-control">
                </div> 
                <div class="col-md-8 form-group controles">
                    <input  name="valorPrecio" id="valorPrecio" type="number" placeholder="Valor" class="form-control">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                        <button id="btnAltaModificacion" class="btn btn-primary btn-AltaModificacion pull-right" type="button">
                            <span id="iconButton" class="glyphicon glyphicon-plus"></span>
                            <span id="btnText" class="">Crear</span>
                        </button>
                </div>  
            </form>
            <div id="contenedorPrecios" class="precio">
                <div class=" col-md-12 sombra"></div>
                <h3 class="precios-Titulo col-md-12">Sala 2D</h3>
                <div class="col-md-3 ">
                    <input id="idPrecio" name="idPrecio" type="hidden" class="hide" value="">
                    <ul class="columna-Precio">
                        <li class="columna-Titulo">
                            <h3>DIA <br> MIERCOLES</h3>
                        </li>
                        <li class="columna-Detalle">
                            50
                            <span class="simbolo">$</span>
                            <span class="detalle-texto">Por Persona</span>
                        </li>
                        <li class="columna-footer">
                            <div id="btnUpdate" class="updatePrecio">
                                <span class="glyphicon glyphicon-pencil"></span>    
                            </div>
                            <div id="btnRemove" class="removePrecio">
                                <span class="glyphicon glyphicon-remove"></span>    
                            </div>                            
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <ul class="columna-Precio">
                        <li class="columna-Titulo">
                            <h3>ADULTOS <br> TODOS LOS DIAS</h3>
                        </li>
                        <li class="columna-Detalle">
                            100
                            <span class="simbolo">$</span>
                            <span class="detalle-texto">Por Persona</span>
                        </li>
                        <li class="columna-footer">
                            <div id="btnUpdate" class="updatePrecio">
                                <span class="glyphicon glyphicon-pencil"></span>    
                            </div>
                            <div id="btnRemove" class="removePrecio">
                                <span class="glyphicon glyphicon-remove"></span>    
                            </div>                            
                        </li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <ul class="columna-Precio">
                        <li class="columna-Titulo">
                            <h3>MENORES HASTA 12 AÑOS O MAYORES DE 65 AÑOS</h3>
                        </li>
                        <li class="columna-Detalle">
                            65
                            <span class="simbolo">$</span>
                            <span class="detalle-texto">Por Persona</span>
                        </li>
                        <li class="columna-footer">
                            <div id="btnUpdate" class="updatePrecio">
                                <span class="glyphicon glyphicon-pencil"></span>    
                            </div>
                            <div id="btnRemove" class="removePrecio">
                                <span class="glyphicon glyphicon-remove"></span>    
                            </div>                            
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>  

<?php require("partials/footer.php"); ?>

<link rel="stylesheet" href="assets/css/precios.css">
<script src="assets/js/precios.js"></script>
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>

