<?php 
    require("utils/request.php"); 
    $request = new Request();
    $numeroSemana = $request->numeroSemana;    
    require("partials/header.php"); ?>

<div class="row colorFondo posicion">
    <input type='hidden' id='nroSemana' value=<?php echo $numeroSemana ?>></input>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">    
        <div class=" col-md-4">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" class="active"><a>Pelicula/Formato</a></li>
                <li id="contenedorPeliculas" ></li>
            </ul>
      </div>
       <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
              <li role="presentation" class="active"><a>Sala</a></li>
                <li id="contenedorSalas" ></li>
           </ul>
      </div>   
      <div class="col-md-4">
            <ul class="nav nav-pills nav-stacked">
              <li class="active"><a>Día</a></li>
                <li id="contenedorSemana" ></li>
              <!--<li  class="opcionSeleccionada"><a href="#">Jueves</a></li>
              <li class="opcionSeleccionada"><a href="#">Viernes</a></li>
              <li class="opcionSeleccionada"><a href="#">Sabado</a></li>
              <li class="opcionSeleccionada"><a href="#">Domingo</a></li>
              <li class="opcionSeleccionada"><a href="#">Lunes</a></li>
              <li class="opcionSeleccionada"> <a href="#">Martes</a></li>
              <li class="opcionSeleccionada"><a href="#">Mierocles</a></li>-->
            </ul>
      </div>
       <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
            <li role="presentation" class="active"><a>Horario</a></li>
            <li role="presentation"><a href="#">
                <button type="button" class="btn btn-default btn-circle botonAzul"><i class="glyphicon glyphicon-pencil textoBoton"></i></button> 13:00</a>
            </li>
            <li class="opcionSeleccionada"><a href="#">
                <button type="button" class="btn btn-default btn-circle botonAzul"><i  class="glyphicon glyphicon-pencil textoBoton" ></i></button> 15:00</i></a>
           </li>
            <li class="opcionSeleccionada"><a href="#">
                <button type="button" class="btn btn-default btn-circle botonAzul"><i class="glyphicon glyphicon-pencil textoBoton"></i></button> 17:00</a>
            </li>
            <li><a href="#"><button type="button" class="btn btn-default btn-circle botonAzul"><i class="glyphicon glyphicon-pencil textoBoton"></i></button> 19:00</a></li>
            <li><a href="#"><button type="button" class="btn btn-default btn-circle botonAzul"><i class="glyphicon glyphicon-pencil textoBoton"></i></button> 20:00</a></li>
            <li><a href="#"><button type="button" class="btn btn-default btn-circle botonAzul"><i class="glyphicon glyphicon-pencil textoBoton"></i></button> 22:00</a></li>
            </ul>
              </div>		
    </div>   
 </div>
        <!--<div class="col-md-1"  >			   
               <div class="row" >
                    <input class="btn btn-success btn-Confirmar" id="Button3" type="button" value="Guardar" />
                </div> 
        </div>-->   



<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/funciones.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/funciones.js"></script>