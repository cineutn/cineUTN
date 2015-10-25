<?php require("partials/header.php"); ?>

<div class="row" style="background-color:white">            
    <div class="col-md-1">              
          <button type="button" class="btn btn-default btn-circle botonAzul" id="btnAddRow">
                        <span style="color:white;" class="glyphicon glyphicon-plus"></span>
                    </button>              
    </div>            
    <div class="col-md-11">
        <table class="table table-condensed tablaSala" >
          <thead>
            <tr>
               <th>Sala</th>
               <th>Filas</th>    
               <th>Columnas</th>        
               <th>Accion</th>
               <th>Diagramar</th>  
            </tr>
          </thead>                    
          <tbody id="rowSala" class="rowHide">
              <tr>    						       
                <td class="form-group">
                    <input name="nombreSala" id="nombreSala" placeholder="nombre sala" type="text" class="form-control">
                    <span class="help-block"></span>
                </td>
                <td class="form-group">
                   <input name="fila" id="fila" placeholder="fila" type="text" class="form-control">
                    <span class="help-block"></span>
                </td>          
                <td class="form-group">     
                    <input name="columna" id="columna" placeholder="columna" type="text" class="form-control">
                    <span class="help-block"></span>
                </td>            
                <td>
                    <button type="button" class="btn btn-default btn-circle botonVerde"><i class="glyphicon glyphicon-ok textoBoton"></i></button>
                </td>
                <td>
                   <button class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button>
                </td>
              </tr>                               
          </tbody>                    
        </table>
    </div>             
</div>
	
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/altaSala.css">   
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/altaSala.js"></script>




