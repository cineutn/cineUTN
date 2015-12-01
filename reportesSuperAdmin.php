<?php require("partials/header.php"); ?>
 <link rel="stylesheet" href="assets/css/jquery.dataTables.min.css">
 <link rel="stylesheet" href="assets/css/tabla.css">

    <div id="menuReportes" class="row">
        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Dropdown
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </div>
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