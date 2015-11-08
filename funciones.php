<?php 
    require("utils/request.php"); 
    $request = new Request();
    $numeroSemana = $request->numeroSemana;    
    require("partials/header.php"); ?>

<div class="row colorFondo posicion">
    <input type='hidden' id='nroSemana' value=<?php echo $numeroSemana ?>></input>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">    
        <div class=" col-md-4">
            <ul class="nav nav-pills nav-stacked peliculasLista">
                <li role="presentation" class="active"><a>Pelicula/Formato</a></li>
                <li id="contenedorPeliculas" ></li>
            </ul>
      </div>
       <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked salasLista">
              <li role="presentation" class="active"><a>Sala</a></li>
                <li id="contenedorSalas" ></li>
           </ul>
      </div>   
      <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked semanaLista">
              <li class="active"><a>Día</a></li>
                <li id="contenedorSemana" ></li>          
            </ul>
      </div>
       <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" class="active"><a>Horario</a></li>
                <ul class="nav nav-pills nav-stacked" id="contenedorHorarios"></ul>
            </ul>
        </div>		
    </div>   
 </div>
  <div class="modal" tabindex="-1" id="modalLoading" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Cargando...</h4>
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                                <span class="sr-only">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/funciones.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/funciones.js"></script>