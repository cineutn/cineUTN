<?php require("partials/header.php"); ?>

       <div class="row paginaCompra">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 path">
               <div id="detalleCompra">EL CLAN CASTELLANO (P16)</div>
               > DETALLE DE COMPRA >
               <b>1. ENTRADAS</b>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" id="imagenPelicula">
               <!--<img id="imagenPelicula" src="" class="img-responsive" alt="Responsive image">-->
            </div>
            <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 datosPelicula">
                <input id="idTipoFuncion" name="idPelicula" type="hidden" class="hide" value="">
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato" >PELICULA</label>
                        <span class="datos" id="tituloPelicula"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       <label class="tituloDato">CINE</label>
                       <span class="datos" id="complejo"></span>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <label class="tituloDato">DIA</label>
                        <span class="datos" id="diaFuncion"></span>
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <label class="tituloDato" >HORARIO</label>
                        <span class="datos" id="horarioFuncion"></span>   
                    </div>
                    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                       <label class="tituloDato">SALA</label>
                       <span class="datos" id="sala"></span>
                    </div>
                </div>
           </div>
       </div>
        <div class="row poster">
            <div class="sombra"></div>            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="columnaEntradas">
                                <span class="tablaTitulo">ENTRADAS</span>
                            </th>
                            <th class="columnaCantidad">
                                <span class="tablaTitulo">CANTIDAD</span>
                            </th>
                            <th class="columnaPrecio">
                                <span class="tablaTitulo">PRECIO</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="filaImpar">
                            <th class="columnaEntradas">
                                <img src="assets/img/Adultos.png">
                                ADULTO
                            </th class="columnaCantidad">
                            <th>
                                <select name="" id="" class="form-control comboCantidad">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </th>
                            <th class="columnaPrecio">
                                $100.00
                            </th>
                        </tr>
                        <tr class="filaPar">
                            <th class="columnaEntradas">
                                <img src="assets/img/Jubilados.png" alt="">
                                JUBILADO WEB
                            </th>
                            <th class="columnaCantidad">
                                <select name="" id="" class="form-control comboCantidad">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </th class="columnaPrecio">
                            <th class="columnaPrecio">$64.00</th>
                        </tr>
                        <tr class="filaImpar">
                            <th class="columnaEntradas">
                                 <img src="assets/img/menores.png" alt="">
                                MENOR WEB
                            </th>
                            <th class="columnaCantidad">
                                <select name="" id="" class="form-control comboCantidad">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </th class="columnaPrecio">
                            <th class="columnaPrecio">$64.00</th>
                        </tr>
                    </tbody>
                </table>
            </div>
           <div class="sombra ">
                <button type="button" onclick="location.href='ventaButacas.php';" class="btn btn-success btn-Confirmar pull-right">SIGUIENTE</button> 
           </div>
		</div>

 <?php require("partials/footer.php"); ?>
          
<link rel="stylesheet" href="assets/css/paginaCompra.css"> 
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/peliculaCompra.js"></script>

