<?php require("partials/header.php"); ?>

<div class="row peliculas">
    <h2 class="peliculas-Titulo">PELICULAS</h2>
    <div class="col-xs-7 col-md-6 form-group">
        <input id="txtPelicula" type="text" class="form-control" placeholder="Ingrese una pelicula">
    </div>
    <button type="button" id="btnBuscarPelicula" class="btn btn-primary">
        <span class="glyphicon glyphicon-search"></span>
        <span>Buscar</span>
    </button>
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
                <input  name="idPelicula" id="idPelicula" type="hidden">
                <div id="checkCrear" class="form-group">
                    <div id="divCheckCrear" class="col-md-12">
                        <input class="" type="checkbox" id="rbCrearPelicula">    
                        <span>Crear la misma pelicula con distinto formato</span>    
                    </div>                    
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <input maxlength="100" name="tituloPelicula" id="tituloPelicula" type="text" placeholder="Titulo Pelicula" class="form-control">
                        <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                        <span class="help-block"></span>    
                    </div>                    
                </div>											
                <div class="form-group">
                    <div class="col-md-12">
                        <textarea name="sinopsisPelicula" id="sinopsisPelicula" cols="30" rows="10" class="form-control text-descripcion" placeholder="Sinopsis"></textarea>
                        <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                        <span class="help-block"></span>
                    </div>
                </div>
                <table class="table">	
                    <span>Ficha técnica </span>								
                    <tr>
                        <td style="width:25%">
                            <span>Genero: </span>
                        </td>
                        <td >
                            <div class="col-lg-12">
                                <input maxlength="50" name="generoPelicula" id="generoPelicula" type="text"  class="form-control" placeholder="Indique Genero">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>    
                            </div>                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Duracion: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">
                                <input name="duracionPelicula" id="duracionPelicula" type="text" class="form-control"  placeholder="Indique Duración">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Actores: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">
                                <input maxlength="150" name="actoresPelicula" id="actoresPelicula" type="text" class="form-control"  placeholder="Indique Actores">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Director: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">
                                <input maxlength="150" name="directorPelicula" id="directorPelicula" type="text" class="form-control" placeholder="Indique Director">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Clasificación: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">
                                <input maxlength="3" name="clasificacionPelicula" id="clasificacionPelicula" type="text" class="form-control"  placeholder="Indique Clasificación">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Fecha de Estreno: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">	
                                <input name="fechaEstrenoPelicula" id="fechaEstrenoPelicula" type="date" class="form-control"  placeholder="Indique fecha de estreno">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Trailer: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">       
                                <input maxlength="250" name="trailerPelicula" id="trailerPelicula" type="text" class="form-control"  placeholder="Ingrese la URL del Trailer">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
                        </td>
                    </tr>
                     <tr>
                        <td>
                            <span>Formato: </span>
                        </td>
                        <td>
                            <div class="col-lg-12">       
                                <select name="cmbFormato" id="cmbFormato" class="form-control"></select>
                                <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                                <span class="help-block"></span>
                            </div>
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
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/altaPelicula.css">																		
<script src="assets/js/vendor/jquery-1.11.3.min.js"/></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/vendor/bootstrap-confirmation.min.js"></script>
<script src="assets/js/uploadImage.js"></script>
<script src="assets/js/altaPelicula.js"></script>

