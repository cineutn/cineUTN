<?php require("partials/header.php"); ?>
 <link rel="stylesheet" href="assets/css/dataTables.bootstrap.min.css">
 <link rel="stylesheet" href="assets/css/buttons.bootstrap.min.css">
 <link rel="stylesheet" href="assets/css/tabla.css">

    <div id="menuReportes" class="row">
        <ul class="nav nav-pills">
            <li role="presentation"><a href="#">Fecha Desde: <input type="date" id="fechaDesde"></a></li>
            <li role="presentation"><a href="#">Fecha Hasta: <input type="date" id="fechaHasta"></a></li>
            <li role="presentation" class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                  Reportes <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">             
                    
                </ul>
            </li>
            <li role="presentation" id="botonesTabla">
                <a>
                                  </a>
            </li>
        </ul>
    </div>
 
         
    <div id="contenedorTabla" class="row">  
		 <table id="grid-basic" class="table table-condensed table-hover table-striped">
			<thead>
                <tr>
            
                </tr>
            </thead>
        </table> 
	</div>
	
	   
	   
	   
	
<?php require("partials/footer.php"); ?>

  
<script src="assets/js/jquery.dataTables.min.js"></script>
<script src="assets/js/dataTables.bootstrap.min.js"></script>
<script src="assets/js/dataTables.buttons.min.js"></script>
<script src="assets/js/buttons.bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/jszip.min.js"></script>


<script src="assets/js/buttons.html5.min.js"></script>
<script src="assets/js/buttons.print.min.js"></script>




<script src="assets/js/reportes.js"></script>

    
	
    
		
		
		
		
</script>