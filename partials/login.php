<div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Ingresar a tu Cuenta</h4>
			</div>
		  	<div class="modal-body">
				<form method="post" action="actions/actions.php" name="login_form">
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
						<input name="idLogin" id="userId" type="text" class="form-control" value="" placeholder="Usuario">                                        
					</div>            
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input name="passwordLogin" id="password" type="password" class="form-control" placeholder="Password">
					</div>				 			  
				  	<p>
				  		<button type="submit" class="btn btn-primary">Entrar</button>
						<a href="#">Olvidaste tu Contraseña?</a>
				  </p>
				</form>
		  	</div>
		  	<div class="modal-footer">
				<button type="submit" name="action" value="validar" class="btn btn-default" data-dismiss="modal">Cerrar</button>
		  	</div>
		</div>
	</div>
</div>	