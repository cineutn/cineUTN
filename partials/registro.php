<div class="modal fade" id="modalSignup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel">Registrate</h4>
		  </div>
		  <div class="modal-body">
			<form id="signupform" role="form" class="form-horizontal">
                <input name="perfil" type="hidden" id="perfil"  value="cliente"> 
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
					<div class="col-sm-10">
					  <input type="email" class="form-control" name="email" id="email" placeholder="Email" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Nombre</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Apellido</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Apellido" required>
					</div>
			    </div>
                <div class="form-group">
					<label for="inputDni" class="col-sm-2 control-label">DNI</label>
					<div class="col-sm-10">
					  <input type="number" class="form-control" name="dni" id="dni" placeholder="DNI" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Fecha de nacimiento</label>
					<div class="col-sm-10">
					  <input type="date" name="fechaNacimiento" id="fechaNacimiento" class="form-control" placeholder="Fecha de nacimiento" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Usuario</label>
					<div class="col-sm-10">
					  <input type="text" name="usuario" id="usuario" class="form-control" placeholder="Usuario" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Password</label>
					<div class="col-sm-10">
					  <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Confirme password</label>
					<div class="col-sm-10">
					  <input type="password" name="passwordConfirmation" id="passwordConfirmation" class="form-control" placeholder="Confirma el Password"  data-toggle="tooltip" data-placement="right" title="Los passwords no coinciden" >
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Telefono</label>
					<div class="col-sm-10">
					  <input type="number" maxlength="10" name="telefono" id="telefono" class="form-control" placeholder="Cod area + numero sin 11" required>
					</div>
			    </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Genero</label>
					<div class="col-sm-10">
						<label class="radio-inline">
						  <input type="radio" name="genero" id="generoMasculino" value="masculino" required> Masculino
						</label>
						<label class="radio-inline">
						  <input type="radio" name="genero" id="generoFemenino" value="femenino" required> Femenino
						</label>
					</div>	
			    </div>	
                
			   <input type="submit" value="Registrar" class="btn btn-info btn-block">
                
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		  </div>
		</div>
	  </div>
	</div>

	
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/formRegistro.js"></script>
	