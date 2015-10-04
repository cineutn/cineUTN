<?php require("partials/header.php"); ?>

<div class="row detallesPelicula">
			<div class="col-md-6">
				<div class="titulo">					
                    <input id="Text7" type="text" class="form-control" placeholder=".:TITULO DE PELICULA:."/>
				</div>
				<div class="imagenPelicula">
					<img src="assets/img/UTNCineLogo.png">
				</div>
				<div>
					<div class="input-group">
					  <input type="text" class="form-control" placeholder=".:INGRESE IMAGEN DE LA PELICULA:.">
					  <span class="input-group-btn">
						<button class="btn btn-default" type="button">Browse</button>
					  </span>
					</div>					
					<div>
						<textarea class="form-control" rows="3" placeholder=".:SINOPSIS:."></textarea>
					</div>					
					<div class="fichaTecnica">
						<form>
						<table class="table">
							<tbody>
								<span>Ficha técnica </span>
								<tr>
									<th>
										<span>Genero: </span>
									</th>
									<TH>
										<input type="text"  class="form-group" placeholder=".:INDIQUE GENERO:." aria-describedby="sizing-addon3">
									</TH>
								</tr>
								<tr>
									<th>
										<span>Duracion: </span>
									</th>
									<TH>
										<input type="text" class="form-control" placeholder=".:INDIQUE DURACION:." aria-describedby="sizing-addon3">
									</TH>
								</tr>
								<tr>
									<th>
										<span>Actores: </span>
									</th>
									<TH>
										<input type="text" class="form-control" placeholder=".:INDIQUE ACTORES:." aria-describedby="sizing-addon3">
									</TH>
								</tr>
								<tr>
									<th>
										<span>Director: </span>
									</th>
									<TH>
										<input type="text" class="form-control" placeholder=".:INDIQUE DIRECTOR:." aria-describedby="sizing-addon3">
									</TH>
								</tr>
								<tr>
									<th>
										<span>Clasificación: </span>
									</th>
									<TH>
										<input type="text" class="form-control" placeholder=".:INDIQUE CLASIFICACION:." aria-describedby="sizing-addon3">
									</TH>
								</tr>
							</tbody>
						</table>
						<button type="submit" class="btn btn-default">Guardar</button>
						</form>						
					</div>                    
				</div>
			</div>
			<div class="col-md-6">		
				  <img class="imagenTrailer"  src="assets/img/trailer.jpg" />
                <br /><input id="Text8" type="text" class="form-control" PLACEHOLDER=".:INGRESE URL DEL TRAILER DE LA PELICULA:."/><br />
			</div>   
       </div>
	   
	   
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>

<link rel="stylesheet" href="assets/css/altaPelicula.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js\formRegistro.js"></script>