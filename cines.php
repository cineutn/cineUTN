<?php require("partials/header.php"); ?>

        <div class="row cines">
            <iframe src="https://mapsengine.google.com/map/embed?mid=z0j6zZLgPLOA.kTuuiOfBYL9w" width="100%" height="300">    
            </iframe>
            <div id="btnAdd" class="pull-right addComplejo">
                <span class="glyphicon glyphicon-plus"></span>    
            </div>
            <div id="form-nuevoComplejo" class="form-nuevoComplejo hide">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra">
                     <span id="iconCerrar" class="glyphicon  glyphicon glyphicon-remove pull-right iconCerrar"></span>
                </div>
                <form id="uploadForm" method="post" enctype="multipart/form-data">
                    <div class="col-xs-9 col-sm-9 col-md-4 col-lg-3 uploadImagen">
                        <div class="avatar">
                            <div class="avatar-content">
                                <img src="assets/img/persona.png" id="vistaPrevia" class="imagen-avatar hide">
                                <span id="iconAvatar" class="glyphicon  glyphicon-camera icon icono"></span>
                                <p id="textoAvatar">Añadir foto <Br> del Complejo</p>
                            </div>
                            <div class="salas">
                                <img src="assets/img/sala2D.png" alt="" class="img-responsive sala">
                                <img src="assets/img/sala3D.png" alt="" class="img-responsive sala">
                                <img src="assets/img/salaXD.png" alt="" class="img-responsive sala">       
                            </div>
                            <input id="idComplejo" name="idComplejo" type="hidden" class="hide" value="">
                            <input id="archivo" class="file-imagen" name="imagen" type="file" value="seleccionar imagen" /><br/>
                            <button class="btn btn-primary btn-imagen" type="submit" name="action" value="Upload" >
                                <span class="glyphicon glyphicon-open"></span>
                                <span class="">Upload</span>
                            </button> 
                        </div>                                                       
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-7">
                            <input maxlength="50" name="nombreComplejo" id="nombreComplejo" type="text" placeholder="Nombre Complejo" class="form-control">    
                            <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                            <span class="help-block"></span> 
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-7">
                            <input maxlength="150" name="direccionComplejo" id="direccionComplejo" type="text" placeholder="Dirección" class="form-control">
                            <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                            <span class="help-block"></span> 
                        </div> 
                    </div> 
                    <div class="form-group">
                        <div class="col-xs-12 col-sm-9 col-md-8 col-lg-7">
                            <textarea name="descripcionComplejo" id="descripcionComplejo" cols="30" rows="10" placeholder="Decripción" class="form-control text-descripcion"></textarea>    
                            <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                            <span class="help-block"></span> 
                        </div>                                              
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group">
                            <button id="btnAltaModificacion" class="btn btn-primary btn-AltaModificacion pull-right" type="button">
                                <span id="iconButton" class="glyphicon glyphicon-plus"></span>
                                <span id="btnText" class="">Crear</span>
                            </button>
                    </div>  
                </form>    
            </div>
            <div id="contenedorCines">
            </div>
        </div>
        
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/cines.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/vendor/bootstrap-tooltip.js"></script>
<script src="assets/js/vendor/bootstrap-confirmation.js"></script>
<script src="assets/js/cines.js"></script>
