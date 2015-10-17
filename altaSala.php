<?php require("partials/header.php"); ?>

<div ng-app="app">
  <div class="container" ng-controller="altaSala as main">

        <div class="row" style="background-color:white">            
            <div class="col-md-1">              
                  <button type="button" class="btn btn-default btn-circle botonAzul" id="btnAddRow">
								<span style="color:white;" class="glyphicon glyphicon-plus"></span>
							</button>              
            </div>            
            <div class="col-md-11">
                <table class="table table-condensed">
                  <thead>
                    <tr>
                        <th>Sala</th>
						<th>Filas</th>    
						<th>Columnas</th>        
						<th>Accion</th>
						<th>Diagramar</th>  
                    </tr>
                  </thead>                    
                  <tbody>
                      <tr>    						       
						<td  class="tituloMediano">{{main.sala}}</td>
						<td  class="tituloMediano">
							<select id="Select1">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select>
						</td>          
						  <td  class="tituloMediano">     
							<select id="Select4">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
							</select>
						</td>            
						  <td><button type="button" class="btn btn-default btn-circle botonRojo"><i class="glyphicon glyphicon-remove textoBoton"></i></button></td>
						  <td><button onclick="location.href='esquemaSala.html'" class="botonAzul" type="button"><i class="glyphicon glyphicon-pencil textoBoton"></i></button></td>
					  </tr>
					  <tr>                 
                  </tbody>                    
                </table>
            </div> 
            
        </div>
    </div>
</div>
	
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<script src="assets/js/vendor/angular/angular.js"></script>
<link rel="stylesheet" href="assets/css/altaSala.css">   
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/altaSala.js"></script>




