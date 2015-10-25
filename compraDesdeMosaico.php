<?php

    require("utils/request.php");
    $request = new Request();
    $idPelicula = $request->idPelicula;

    require("partials/header.php"); 
?>

    <input type='hidden' id='idPelicula' value=<?php echo $idPelicula ?>></input>

        <div class="row detallesPelicula">
			<div class="col-md-2">
				<div class="titulo" id="tituloPelicula">
				</div>
				<div class="imagenPelicula">
					<img src="">
				</div>
				<div>
					<div class="descripcionPelicula">
						 
					</div>
					<div class="fichaTecnica">
						<div>
							<ins>Ficha técnica</ins>
						</div>
						<p>
							
						</p>
					</div>
				</div>
			</div>
            
			<div class="col-md-6">
				<div class="titulo">
                    Trailer
				</div>
				<!-- 16:9 aspect ratio -->
				<div class="embed-responsive embed-responsive-16by9">
				  <iframe class="embed-responsive-item" src=""></iframe>
				</div> 
				
			</div>
            <div class="col-md-4">
                <div  id="tituloFunciones">
                    <ul class="list-group">
                        <li class="list-group-item"  style="color:undefined;background-color:red;">FUNCIONES</li>	
                    </ul>
                </div>
                <div  id="tree">
				
				
                </div>
            </div>
		</div>
    	
        <div class="modal" tabindex="-1" id="modalLoading" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Cargando...</h4>
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                                <span class="sr-only">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>	

<?php require("partials/footer.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css"> 
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/vendor/bootstrap-treeview.js"></script>
<script src="assets/js/compraDesdeMosaico.js"></script>


