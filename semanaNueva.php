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
               <th>Funciones Activas</th>                       
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

<div class="modal fade" id="modalEliminarFunciones" tabindex="-1" role="dialog" aria-labelledby="modalLoginLabel">
	<div class="modal-dialog"  role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="eliminarFuncionesLabel">Eliminar Funcion</h4>
			</div>			
		  	<div class="modal-body">  
                    <input type='hidden' id='idFuncionesEliminar' value=""></input>
                    <span>Esta por dar de baja las funciones de la semana.</span><br/>
                    <span>Desea continuar?</span>                    
		  	</div>
      	  <div class="modal-footer">
				<button type="button" class="btn btn-default" id="elinarFuncion" >Aceptar</button>
				<button  class="btn btn-default" data-dismiss="modal">Cancelar</button>
		  	</div>
		</div>
	</div>
</div>

<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>
<?php require("partials/msgBox.php"); ?>
  

<link rel="stylesheet" href="assets/css/semanaNueva.css">   
<script src="assets/js/semanaNueva.js"></script>




