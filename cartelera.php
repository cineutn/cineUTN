<?php require("partials/header.php"); ?>

<div class="row peliculas">
    <h2 class="peliculas-Titulo">CARTELERA</h2>
    <div class="col-xs-7 col-md-6 form-group">
        <select class="form-control" id="cmbComplejo">
            <option value="0">Seleccioná un complejo</option>
        </select>
    </div>
    <button type="button" id="btnBuscarCartelera" class="btn btn-primary">
        <span class="glyphicon glyphicon-search"></span>
        <span>Buscar</span>
    </button>
    <div id="contenedorPeliculas">                                  
    </div>
</div>

<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?> 
<?php require("partials/registro.php"); ?>                                      
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/altaPelicula.css">                                                                      
<script src="assets/js/cartelera.js"></script>