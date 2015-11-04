<?php require("partials/header.php"); ?>

<div class="row peliculas">
    <h2 class="peliculas-Titulo">PELICULAS</h2>
	<div id="btnAdd" class="pull-right addPelicula">
		<span class="glyphicon glyphicon-plus"/>   	
    </div>
    <div id="form-nuevaPelicula" class="contenedorPelicula hide">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra">
            <span id="iconCerrar" class="glyphicon  glyphicon glyphicon-remove pull-right iconCerrar"/>
        </div>	
        <form id="uploadForm" method="post" enctype="multipart/form-data">
            <div class="col-xs-9 col-sm-9 col-md-4 col-lg-4 uploadImagen">
                <div class="avatar">
                    <div class="avatar-content">
                        <img src="assets/img/persona.png" id="vistaPrevia" class="imagen-avatar hide">
                        <span id="iconAvatar" class="glyphicon  glyphicon-camera icon"></span>
                        <p id="textoAvatar">Añadir foto de la pelicula</p>
                    </div>
                    <div id="respuesta" class="alert"></div>
                 
                        <div class="row">
                            <div class="col-lg-12"> 
                                <label> Nombre el archivo: </label> 
                            </div>                    
                        </div>
                        <div class="row">
                             <div class="col-lg-12">
                                <input type="text" name="nombre_archivo" id="nombre_archivo" />
                            </div>
                        </div>
                         <div class="row">
                            <div class="col-lg-12">
                                <input id="archivo" class="file-imagen" name="archivo" type="file" accept="image/*" value="seleccionar imagen" />
                            </div>                    
                        </div>  
                        <div class="row">
                            <div class="col-lg-4">
                                <button type="button" id="boton_subir" value="Subir" class="btn btn-success">
                                    <span class="glyphicon glyphicon-open"></span>
                                    <span>Subir Imagen</span>
                                </button>
                            </div>
                            <div class="col-lg-10">
                                <progress id="barra_de_progreso" value="0" max="100"></progress>
                            </div>
                        </div>
                        
                        
                </div>
                <div id="archivos_subidos"></div>
            </div>
            <input type="hidden" id="nombreImagen"></input>
            <div class="col-xs-12 col-sm-9 col-md-8 col-lg-7">
                <div class="form-group">
                    <input  name="tituloPelicula" id="tituloPelicula" type="text" placeholder="Titulo Pelicula" class="form-control">
                </div>											
                <div class="form-group">
                    <input  name="sinopsisPelicula" id="sinopsisPelicula" type="text" placeholder="Sinopsis" class="form-control">
                </div>
                <table class="table">	
                    <span>Ficha técnica </span>								
                    <tr>
                        <td style="width:25%">
                            <span>Genero: </span>
                        </td>
                        <td >
                            <input  name="generoPelicula" id="generoPelicula" type="text"  class="form-control" placeholder="Indique Genero">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Duracion: </span>
                        </td>
                        <td>
                            <input name="duracionPelicula" id="duracionPelicula" type="text" class="form-control"  placeholder="Indique Duración">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Actores: </span>
                        </td>
                        <td>
                            <input name="actoresPelicula" id="actoresPelicula" type="text" class="form-control"  placeholder="Indique Actores">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Director: </span>
                        </td>
                        <td>
                            <input name="directorPelicula" id="directorPelicula" type="text" class="form-control" placeholder="Indique Director">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Clasificación: </span>
                        </td>
                        <td>
                            <input name="clasificacionPelicula" id="clasificacionPelicula" type="text" class="form-control"  placeholder="Indique Clasificación">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Fecha de Estreno: </span>
                        </td>
                        <td>			
                            <input name="fechaEstrenoPelicula" id="fechaEstrenoPelicula" type="date" class="form-control"  placeholder="Indique fecha de estreno">
                        </td>
                    </tr>															
                </table>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                <button id="btnAltaModificacion" class="btn btn-primary btn-AltaModificacion pull-right" type="button">
                    <span id="iconButton" class="glyphicon glyphicon-plus"></span>
                    <span id="btnText">Crear</span>
                </button>
            </div>
        </form>
    </div>
    <div id="contenedorPeliculas">									
    </div>
</div>

<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>										

<link rel="stylesheet" href="assets/css/altaPelicula.css">																		
<script src="assets/js/vendor/jquery-1.11.3.min.js"/></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/uploadImage.js"></script>
<script src="assets/js/altaPelicula.js"></script>

