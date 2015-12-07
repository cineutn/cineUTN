<?php

    require("utils/request.php");
    $request = new Request();
    $nombrePelicula = $request->idPelicula;

    require("partials/header.php"); 
?>

    <input type='hidden' id='idPelicula' value='<?php echo $nombrePelicula ?>'></input>

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
    	
<?php require("partials/loading.php"); ?>
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/paginaInicio.css"> 
<script src="assets/js/vendor/bootstrap-treeview.js"></script>
<script src="assets/js/compraDesdeMosaico.js"></script>


