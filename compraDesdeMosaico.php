<?php require("partials/header.php"); ?>

        <div class="row detallesPelicula">
			<div class="col-md-3">
				<div class="titulo">
					EL CLAN 
				</div>
				<div class="imagenPelicula">
					<img src="assets/img/pelicula3.jpg">
				</div>
				<div>
					<div class="descripcionPelicula">
						El Clan es la nueva película de Pablo Trapero protagonizada por Guillermo Francella y Peter Lanzani. Ellos serán Arquímedes y Alejandro Puccio, dos hombres que en la década de los 80 conmocionaron a la Argentina. 
					</div>
					<div class="fichaTecnica">
						<div>
							<ins>Ficha técnica</ins>
						</div>
						<p>
							Genero: Drama <br>
							Duración: 110min <br>
							Actores: Peter Lanzani,Guillermo Francella<br>
							Director: Pablo Trapero<br>
							Clasificación: P16<br> 
							  <br>
						</p>
					</div>
				</div>
			</div>
			<div class="col-md-9">
				
				<!-- 16:9 aspect ratio -->
				<div class="embed-responsive embed-responsive-16by9">
				  <iframe class="embed-responsive-item" src="http://www.youtube.com/embed/n7kpI79cPBk"></iframe>
				</div> 
				
			</div>
		</div>
		<div class="row compraPelicula">
			<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
			   <div class="panel panel-default col-md-3">
					<ul class="nav nav-pills nav-stacked">
					  <li role="presentation" class="active"><a>Complejo</a></li>
					  <li class="opcionSeleccionada"><a>Complejo 1</a></li>
					</ul>
			  </div>
			  <div class="panel panel-default col-md-3">
					<ul class="nav nav-pills nav-stacked">
					  <li class="active"><a>Día</a></li>
					  <li><a href="#">Lunes</a></li>
					  <li><a href="#">Martes</a></li>
					  <li class="opcionSeleccionada"><a href="#">Miercoles</a></li>
					  <li><a href="#">Jueves</a></li>
					  <li><a href="#">Viernes</a></li>
					  <li><a href="#">Sabado</a></li>
					  <li><a href="#">Domingo</a></li>

					</ul>
			  </div>
			   <div class="panel panel-default col-md-3">
					<ul class="nav nav-pills nav-stacked">
					  <li role="presentation" class="active"><a>Formato</a></li>
					  <li class="opcionSeleccionada"><a href="#">2d Subtitulado</a></li>
					  <li><a href="#">2d Doblado</a></li>
					</ul>
			  </div>
			   <div class="panel panel-default col-md-3">
					<ul class="nav nav-pills nav-stacked">
					  <li role="presentation" class="active"><a>Horario</a></li>
					  <li role="presentation"><a href="#">15:00</a></li>
					  <li class="opcionSeleccionada">
						<a data-toggle="modal" href="#modalLogin">17:00 <button class="btn btn-default btn-sm pull-right btn-seleccionado" >Comprar</button></a>
						
				      </li>
					</ul>
			  </div>
			</div>
		</div>
		
<?php require("partials/footer.php"); ?>
     
	<!-- Modal de login-->
	
	<div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel">Ingresar a tu Cuenta</h4>
		  </div>
		  <div class="modal-body">
			<form method="post" action='' name="login_form">
				<div style="margin-bottom: 25px" class="input-group">
					<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
					<input id="login-username" type="text" class="form-control" name="username" value="" placeholder="Usuario">                                        
				</div>            
				<div style="margin-bottom: 25px" class="input-group">
					<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
					<input id="login-password" type="password" class="form-control" name="password" placeholder="password">
				</div>
			 
			  
			  <p>
				<button type="button"  onclick="location.href='paginaCompra.html';" class="btn btn-primary">
					Entrar
				</button>
				<a href="#">Olvidaste tu Contraseña?</a>
			  </p>
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		  </div>
		</div>
	  </div>
	</div>	

<link rel="stylesheet" href="assets/css/paginaInicio.css"> 
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>

