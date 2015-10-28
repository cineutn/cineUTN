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
                        <input  name="nombreComplejo" id="nombreComplejo" type="text" placeholder="Nombre Complejo" class="form-control">    
                        <span class="hide glyphicon glyphicon-remove form-control-feedback iconoError"></span>
                        <span class="help-block"></span> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-xs-12 col-sm-9 col-md-8 col-lg-7">
                        <input  name="direccionComplejo" id="direccionComplejo" type="text" placeholder="Dirección" class="form-control">
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
                <div class="cine">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>
                    <div class="col-xs-9 col-sm-9 col-md-4 col-lg-3">               
                        <img src="assets/img/UTNFRA.jpg" alt="" class="img-responsive complejo">
                        <div class="salas">
                            <img src="assets/img/sala2D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/sala3D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/salaXD.png" alt="" class="img-responsive sala">       
                        </div>                                        
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-8 col-lg-9 ">
                        <h2 class="cine-titulo"> UTN Avellaneda</h2>
                        <h4> Avenida Mitre 750 - 2do piso. Avellaneda.</h4>
                        <p>Cine UNT Avellaneda está ubicado en la Facultad Regional de Avellaneda. Dispone de 12 salas con capacidad total de 3.132 butacas, siete de las cuales poseen tecnología digital 3D y XD. A su vez, cuenta con Servicio de Cumpleaños para que sus hijos puedan festejar junto a sus amigos y familiares con toda la magia del cine.</p>
                    </div>    
                </div>
                <div class="cine">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>
                    <div class="col-xs-9 col-sm-9 col-md-4 col-lg-3 ">             
                        <img src="assets/img/UTNdominico.jpg" alt="" class="img-responsive complejo">
                        <div class="salas">
                            <img src="assets/img/sala2D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/sala3D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/salaXD.png" alt="" class="img-responsive sala">       
                        </div>                                        
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-8 col-lg-9 ">
                        <h2 class="cine-titulo"> UTN Dominico</h2>
                        <h4> Av. Ramón Franco 5050, 1874 Villa Dominico, Buenos Aires</h4>
                        <p>Cine UTN Dominico está ubicado en la Facultad Regional de Dominico. Dispone de 10 salas con capacidad total de 1.956 butacas, ocho de las cuales poseen tecnología digital 3D y XD. A su vez, posee dos exclusivas Sala Premium Class con boletería y lobby independiente, servicio de gastronomía gourmet opcional para disfrutar durante la proyección de la película. En las salas PREMIUM CLASS las butacas son de máximo confort, auto-reclinables, con apoya pies y apoya cabeza, a lo cual se suma un sistema de mesas de apoyo para el servicio gastronómico cada 2 butacas y un timbre para solicitar la atención del personal..</p>
                        <div class="pull-right lapiz">
                            <span class="glyphicon glyphicon-pencil"></span>    
                        </div>                        
                    </div>    
                </div>
                <div class="cine">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sombra"></div>
                    <div class="col-xs-9 col-sm-9 col-md-4 col-lg-3 ">               
                        <img src="assets/img/UTNlugano.jpg" alt="" class="img-responsive complejo">
                        <div class="salas">
                            <img src="assets/img/sala2D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/sala3D.png" alt="" class="img-responsive sala">
                            <img src="assets/img/salaXD.png" alt="" class="img-responsive sala">       
                        </div>                                        
                    </div>
                    <div class="col-xs-9 col-sm-9 col-md-8 col-lg-9 ">
                        <h2 class="cine-titulo"> UTN Lugano</h2>
                        <h4>Mozart 2300, C1407IVT CABA</h4>
                        <p>Cine UTN Lugano es un nuevo concepto en entretenimiento. Sus salas, están pensadas para brindar el máximo confort. Sus espacios amplios entre butacas, sus mesas de apoyo, un lobby diferencial para reducir los tiempos de espera y un restó con una oferta gastronómica variada y especial diseñada por el reconocido chef Martín Molteni, hacen que estas nuevas salas sean el mejor lugar para disfrutar del entretenimiento en familia o con amigos. El sector PREMIUM CLASS cuenta con dos salas de 96 y 64 espectadores; ambas con tecnologia 3D, el Restó Premium tiene una capacidad para 100 personas sentadas; cómodos sillones individuales en cuero; mesas en wenge; butacones en chenille; exclusivas alfombras y carpetas, pantallas de LCD con imágenes de nuestros exquisitos platos; barra con asientos para el encuentro informal y sanitarios exclusivos.</p>
                    </div>    
                </div>
            </div>
        </div>
<?php require("partials/footer.php"); ?>
    
<link rel="stylesheet" href="assets/css/cines.css">
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/cines.js"></script>
