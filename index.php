<?php require("partials/header.php"); ?>

        <div class="row menuFiltros">
            <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2 filtro">
                <label>COMPLEJO</label>
                <select class="form-control" id="cmbComplejos">
                	<option value="0">Seleccioná un complejo</option>
                </select>
            </div>
             <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2 filtro">
                <label>PELICULA</label>
                <select class="form-control" id="cmbPeliculas">
                    <option value="0">Seleccioná una pelicula</option>
                </select>
            </div> 
            <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2 filtro">
                <label>DIA</label>
                <select class="form-control" id="cmbDias">
                    <option value="0">Seleccioná un dia</option>
                </select>
            </div>
             <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2 filtro">
                <label>HORARIO</label>
                <select class="form-control"id="cmbHorarios">
                    <option value="0">Seleccioná un horario</option>
                </select>
            </div>
            <button type="submit" name="action" class="btn btn-primary pull-right">Comprar Entrada</button>
        </div>

        <div class="row">
            <div id="contenedorPeliculas" class="col-md-12 contenedorPeliculas">
               
            </div>
        </div>
	
<?php require("partials/footer.php"); ?>


<link rel="stylesheet" href="assets/css/paginaInicio.css">   
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/index.js"></script>