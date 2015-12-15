<?php 
    
    require("utils/request.php");    
    $request = new Request();
    $idSala = $request->idSala;
    require("partials/header.php"); 
?>

<div class="row butacas">
     
        <input type='hidden' id='idSala' value=<?php echo $idSala ?>></input>


	<div class="row butacas">
          
           
           <div class="row col-md-12" style="margin-top:10px;">              
           		<div class="col-md-12 compraPelicula sombra">
                <div class="col-md-9 explicacion">
                  <span id="lblExplicacion">Para seleccionar su butaca, haga click sobre una ubicación disponible. Esta pantalla es un indicador de la disposición de las ubicaciones en la sala, y no representa distancias reales.</span>
                </div>                
           			<div class="col-xs-8 col-md-4">
           				<img src="assets/img/butacaOcupada.png" />
						      <p style="font-size:medium; display:inline-block;">Butaca a excluir</p>	
           			</div>
					<div class="col-xs-8 col-md-4">
           				<img src="assets/img/butacaLibre.png" />
           				<p style="font-size:medium; display:inline-block;">Butaca de la sala</p>
           			</div>
           							
				</div>
	           	<div class="col-md-12">	               
	               <table class="esquema" id="esquemaSala">                    

            </table>
				</div>
				<div class="col-md-12 divBotonButacas">						
					<!--<button type="button" onclick="location.href='pagoEntradas.php';" class="btn btn-success btn-Confirmar pull-left">SIGUIENTE</button>-->
	                <button type="button"  id="btnGuardarSala" class="btn btn-success btn-Confirmar pull-right" style="margin-bottom:10px;">GUARDAR</button>
				</div>
           </div>       
			
		</div> 

       <!-- <div class="col-md-7">	               
            <table class="esquema" id="esquemaSala">                    

            </table>
        </div>	
        <div class="col-md-4" style="background-color:white;">
          <br /><br />
            <div>
                 <div><img src="assets/img/butacaOcupada.png" /><p style="font-size:medium;">Butaca a excluir</p></div>
            </div>
           <div >
                 <div><img src="assets/img/butacaLibre.png" /><p style="font-size:medium;">Butaca de la sala</p></div>
            </div>	
            <div class="divBotonButacas">					
                <button type="button" id="btnGuardarSala" class="btn btn-success btn-Confirmar pull-left">Guardar</button>
            </div>
         
        </div>-->
    
</div>
<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>
<?php require("partials/msgBox.php"); ?>

<link rel="stylesheet" href="assets/css/esquemaSala.css">
<script src="assets/js/esquemaSala.js"></script>