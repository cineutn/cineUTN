<?php require("partials/header.php"); ?>

       <div class="row paginaCompra">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
               	<div>EL CLAN CASTELLANO (P16)</div>
               	> DETALLE DE COMPRA >
                	<a href="paginaCompra.php">1. ENTRADAS</a>
               	>               
              		<a href="ventaButacas.php">2. BUTACAS</a>
               	>
               <b>3. PAGOS</b>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 ">
               <img src="assets/img/pelicula3.jpg" class="img-responsive" alt="Responsive image">
            </div>
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">PELICULA</label>
                        <span class="datos">EL CLAN CASTELLANO (P16)</span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato">CINE</label>
                       <span class="datos">UTN FRA</span>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">DIA</label>
                        <span class="datos">Lunes 14 Septiembre</span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <label class="tituloDato">HORARIO</label>
                        <span class="datos">14:00</span>                      
                    </div>
                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                       <label class="tituloDato">SALA</label>
                       <span class="datos">Pantalla 10</span>
                    </div>
                </div>
           	</div>
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">TIPO</label>
                        <span class="datos">2 X ADULTOS</span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato">BUTACAS</label>
                       <span class="datos">M-5 M-6</span>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">TOTAL</label>
                        <span class="datos">$200.00</span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 dato-PrecioTotal pull-right">
                       <label class="tituloDato">PRECIO TOTAL</label>
                       <span class="datos">$200.00.-</span>
                    </div>
                </div>
           </div>
        </div>
        <div class="row confirmarOperacion">
            <div class="sombra"></div>            
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 datos-Compra">
                <input type="radio">    
                <div class="btn-opcion">
                    <span>COMPRAR ENTRADA</span>
                </div>
                <input type="radio">    
                <div class="btn-opcion">
                    <span>RESERVAR ENTRADA</span>
                </div>
            </div>
            <form class="form-horizontal" method="post" action="actions/actions.php" id="form-Registro">        <div class="row datos-Compra">
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>MEDIO DE PAGO :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <select name="fechaMes" id="" class="form-control input-datosCompra">
                                    <option value="1">Visa</option>
                                    <option value="2">Mastercard</option>
                                    <option value="3">American Express</option>
                                    <option value="4">Tarjeta Naranja</option>
                                </select>                                
                            </div>
                        </div>                    
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>EMAIL :</span>  
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">         
                                <input value=""  name="email" id="nombreCompleto" placeholder="Email" type="text" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>

                        </div>
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                 <span>NOMBRE DEL TITULAR :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                               
                                <input name="nombre" id="nombre" placeholder="Nombre" type="text" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>NÚMERO DE TARJETA :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <input value="" name="tarjeta" id="tarjeta" placeholder="Numero de tarjeta" type="text" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>CÓDIGO DE SEGURIDAD :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <input value="" name="codigoSeguridad" id="codigoSeguridad" placeholder="Codigo de Seguridad" class="form-control input-datosCompra" type="text">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>FECHA DE VENCIMIENTO :</span>
                            </div>
                            <div class="col-xs-5 col-md-5 col-lg-5">                                
                                <select name="fechaMes" id="" class="form-control select-Fecha">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>/
                                <select name="fechaAño" id="" class="form-control select-Fecha">
                                    <option value="1">2015</option>
                                    <option value="2">2016</option>
                                    <option value="3">2017</option>
                                    <option value="4">2018</option>
                                    <option value="5">2019</option>
                                    <option value="6">2020</option>
                                    <option value="1">2021</option>                                    
                                </select>                                
                            </div>
                        </div>                        
                    </div>                      
            </form>            
        </div>
        <div class="row confirmarOperacion">
            <div class="sombra"></div>
            <div class="precioTotal">PRECIO TOTAL: $200.00.-</div>
            <button type="button" class="btn btn-success btn-Confirmar"   onclick="location.href='resumenCompra.html';" >CONFIRMAR OPERACION</button>    
            <div class="sombra"></div>        
        </div>
		
<?php require("partials/footer.php"); ?>

<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>

