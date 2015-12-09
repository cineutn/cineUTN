<?php require("partials/header.php"); ?>
 <link rel="stylesheet" href="assets/css/jquery.dataTables.min.css">
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
                    <li><a id="recaudacionXPelicula" href="#">Recaudacion por Peliculas</a></li>
                    <li><a href="#">Another action</a></li>
                </ul>
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
<script src="assets/js/reportesSuperadmin.js"></script>

    
	
    
		
		
		
		
</script>