<?php require("partials/header.php"); ?>

<div class="row" style="background-color:white">            
    <div class="col-md-1">              
          <button type="button" class="btn btn-default btn-circle botonVerde" id="btnAddRow">
             <span style="color:white;" class="glyphicon glyphicon-plus"></span>
         </button>              
    </div>            
    <div class="col-md-11">
        <table class="table table-condensed" id="contenedorSemanas" >
          <thead>
            <tr>
               <th>Semana número</th> 
               <th>Fecha Inicio</th> 
               <th>Cantidad de Funciones</th>                       
               <th>Cargar funciones</th>
               <th>Ver funciones</th>
               <th>Cerrar funciones</th>
            </tr>
          </thead>                    
          <tbody id="tablaSemana">              
                
          </tbody>                
        </table>
    </div>             
</div>

<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>
<?php require("partials/msgBox.php"); ?>
  
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<link rel="stylesheet" href="assets/css/semanaNueva.css">   
<script src="assets/js/semanaNueva.js"></script>




