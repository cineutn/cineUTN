<?php require("partials/header.php"); ?>

<?php 

     require("utils/request.php");    
    $request = new Request();
   
    $varIdFuncionDetalle=$request->idFuncionDetalle;

 ?>

       <div class="row paginaCompra">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
               	<div>TITULO PELICULA</div>
               	> DETALLE DE COMPRA >
                	<a href="paginaCompra.php">1. ENTRADAS</a>
               	>               
              		<a href="ventaButacas.php">2. BUTACAS</a>
               	>
               <b>3. PAGOS</b>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 ">               
               <img id="imagenPelicula" src="" class="img-responsive" alt="Responsive image">
            </div>
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <div class="row">
                    <input name="idFuncionDetalle" id="idFuncionDetalle"  type="hidden" value=<?php echo $varIdFuncionDetalle; ?> >
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">PELICULA</label>
                        <span class="datos" id="tituloPelicula"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato"> CINE</label>
                       <span class="datos" id="nombreCine"></span>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">DIA</label>
                        <span class="datos" id="diaFuncion"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <label class="tituloDato">HORARIO</label>
                        <span class="datos" id="horarioFuncion"></span>                      
                    </div>
                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                       <label class="tituloDato">SALA</label>
                       <span class="datos" id="sala"></span>
                    </div>
                </div>
           	</div>            
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <label class="tituloDato">TIPO</label>
                        <span class="datos" id="cantidadEntradas"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato">BUTACAS</label>
                       <span class="datos" id="butacas"></span>
                    </div>                   
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 dato-PrecioTotal pull-right">
                       <label class="tituloDato">PRECIO TOTAL</label>
                       <span class="datos" id="montoTotal"></span>
                    </div>
                </div>
           </div>
           <?php require("partials/reloj.php"); ?> 
        </div>
        <div class="row confirmarOperacion">
            <div class="sombra"></div>            
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 datos-Compra">
                <input type="radio" id="rbCompra">    
                <div class="btn-opcion">
                    <span>COMPRAR ENTRADA</span>
                </div>
                <input type="radio" id="rbReserva">    
                <div class="btn-opcion">
                    <span>RESERVAR ENTRADA</span>
                </div>
            </div>
            <form class="form-horizontal" method="post" action="actions/actions.php" id="form-Registro">        
            <div class="row datos-Compra">
                        <div class="form-group" id="divTipoPago">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>TIPO DE PAGO :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <select name="comboTipo" id="comboTipo" class="form-control input-datosCompra">
                                    <option value="Tarjeta">Tarjeta</option>
                                    <option value="Efectivo">Efectivo</option>
                                </select>
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                             
                            </div>
                        </div>   
                        <div class="form-group" id="divMedioPago">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>MEDIO DE PAGO :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <select name="comboTarjetas" id="comboTarjetas" class="form-control input-datosCompra">
                                   
                                </select>
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                             
                            </div>
                        </div>                    
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>EMAIL :</span>  
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">         
                                <input value="" name="emailCliente" id="emailCliente" placeholder="Email" type="email" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                 <span>NOMBRE DEL TITULAR :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                               
                                <input name="nombreTitular" id="nombreTitular" placeholder="Nombre" type="text" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>
                        </div>
                        <div class="form-group" id="divNumeroTarjeta">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>NÚMERO DE TARJETA :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <input value="" name="numeroTarjeta" id="numeroTarjeta" placeholder="Numero de tarjeta" type="text" class="form-control input-datosCompra">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                        
                            </div>
                        </div>
                        <div class="form-group" id="divCodigoSeguridad">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>CÓDIGO DE SEGURIDAD :</span>
                            </div>
                            <div class="col-xs-7 col-md-7 col-lg-7">                                
                                <input value="" name="codigoSeguridad" id="codigoSeguridad" placeholder="Codigo de Seguridad" class="form-control input-datosCompra" type="text">
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>
                            </div>
                        </div>
                        <div class="form-group" id="divFechaVencimiento">
                            <div class="col-xs-3 col-md-3 col-lg-3">
                                <span>FECHA DE VENCIMIENTO :</span>
                            </div>                          
                            <div class="col-xs-5 col-md-5 col-lg-5">                                
                                <select name="cmbMes" id="cmbMes" class="form-control select-Mes">
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
                                </select>
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                /
                                <select name="cmbAño" id="cmbAño" class="form-control select-Anio">
                                                                        
                                </select>
                                <span class="hide glyphicon glyphicon-remove form-control-feedback icon"></span>
                                <span class="help-block"></span>                           
                            </div>
                        </div>
                                         
                    </div>                      
            </form>            
        </div>
        <div class="row confirmarOperacion">
            <div class="sombra"></div>
            <div class="precioTotal">PRECIO TOTAL: $
                <span id="precioTotal"></span>
                .-
            </div>
            <button type="button" id="btnComprar" class="btn btn-success btn-Confirmar">CONFIRMAR OPERACION</button>           
            <div class="sombra"></div>        
        </div>
        <form method="Post" action="resumenCompra.php" id="formCodigo">
            <input name="codigoVenta" id="codigoVenta" type="hidden">
            <input name="mailVenta" id="mailVenta" type="hidden">
        </form>
		
<?php require("partials/footer.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/paginaCompra.css">     
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/reloj.js"></script>
<script src="assets/js/pagoEntradas.js"></script>
