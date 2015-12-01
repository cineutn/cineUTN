<?php
    require("utils/request.php");    
    $request = new Request();
    $numeroSemana = $request->numeroSemana;
    
require("partials/header.php"); ?>

<div class="row" style="background-color:white"> 
  <button type="button" id="btnVolver" class="btn btn-primary glyphicon glyphicon-arrow-left">     
      <span>Volver</span>
  </button>
  <input type='hidden' id='nroSemana' value= <?php echo $numeroSemana ?> ></input>
    <div class="col-md-12" id="funcionesSemana">    
    </div> 

</div>

<?php require("partials/footer.php"); ?>
<!-- Modal forms-->
<?php require("partials/login.php"); ?>	
<?php require("partials/registro.php"); ?>
<?php require("partials/msgBox.php"); ?>
  

<script src="assets/js/funciesSala.js"></script>