<?php require("partials/header.php"); ?>

		<div class="row ">
			<div class="panel panel-default">
			  <div class="panel-heading" class="tituloLarge"><b>Alta de salas</b></div>  
			  <!-- Table -->
				<table class="table">
					<thead>
					  <tr>    
						<th>
							<button type="button" class="btn btn-default btn-circle botonAzul">
								<span style="color:white;" class="glyphicon glyphicon-plus"></span>
							</button>
						</th>
						<th class="tituloLarge">Sala</th>
						<th class="tituloLarge">Filas</th>    
						<th class="tituloLarge">Columnas</th>        
						<th class="tituloLarge">Accion</th>
						<th class="tituloMediano">Diagramar</th>        
					  </tr>
					</thead>
					<tbody>
					  <tr>    
						<td></td>        
						<td  class="tituloMediano">Sala 1</td>
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
						<td></td>     
						<td  class="tituloMediano">Sala 2</td>
						<td  class="tituloMediano"><select id="Select2">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select></td> 
						  <td  class="tituloMediano">
							<select id="Select5">
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
						  <td><button type="button" class="btn btn-default btn-circle botonVerde"><i class="glyphicon glyphicon-ok textoBoton"></i></button></td>
						  <td></td>
					  </tr>
					  <tr>            
						 <td></td>
						<td  class="tituloMediano">Sala 3</td>
						<td  class="tituloMediano"><select id="Select3">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
							</select></td> 
						  <td  class="tituloMediano">
							<select id="Select6">
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
						  <td><button type="button" class="btn btn-default btn-circle botonVerde"><i class="glyphicon glyphicon-ok textoBoton"></i></button></td>
						  <td></td>
					  </tr>
					</tbody>
				 </table>
			</div>
	
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/altaSala.css">   
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js\formRegistro.js"></script>
