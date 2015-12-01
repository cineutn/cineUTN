<div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLoginLabel">
	<div class="modal-dialog"  role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Ingresar a tu Cuenta</h4>
			</div>
		  	<div class="modal-body">
				<form method="post" name="login_form" id="login_form">
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
						<input name="idLogin" id="idLogin" type="text" class="form-control" value="" placeholder="Usuario">                                        
					</div>            
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input name="passwordLogin" id="passwordLogin" type="password" class="form-control" placeholder="Password">
					</div>				 			  
				  	<p>
				  		<button type="submit" class="btn btn-primary">Entrar</button>
						<a href="passRecover.php">Olvidaste tu Contraseña?</a>
				  </p>
				</form>
		  	</div> 
		  	<div class="modal-footer">
				<button  class="btn btn-default" data-dismiss="modal">Cerrar</button>
		  	</div>
		</div>
	</div>
</div>

