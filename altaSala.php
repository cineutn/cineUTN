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
          <tbody id="tablaSala">
              <tr id="rowSala" class="rowHide">    						       
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
                   <!--<button class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button>-->
                </td>
              </tr>             
          </tbody>    
            <tbody id="salas">            
            </tbody>
        </table>
    </div>             
</div>
	


<div class="modal fade" id="modalEliminarSala" tabindex="-1" role="dialog" aria-labelledby="modalLoginLabel">
	<div class="modal-dialog"  role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="eliminarSalaLabel">Eliminar Sala</h4>
			</div>			
		  	<div class="modal-body">               
                    <span>Si elimina la sala tambien eliminara el esquema de la misma.</span></br>
                    <span>Desea Continuar?</span></br>
		  	</div>
      	  <div class="modal-footer">
				<button type="button" class="btn btn-default" id="elinarSala" >Aceptar</button>
				<button  class="btn btn-default" data-dismiss="modal">Cancelar</button>
		  	</div>
		</div>
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




