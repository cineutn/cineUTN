<?php require("partials/header.php"); ?>
 <link rel="stylesheet" href="assets/js/vendor/jquery.bootgrid/jquery.bootgrid.min.css">
 <link rel="stylesheet" href="assets/css/tabla.css">

 
         
    <div id="contenedorTabla" class="row">  
		 <table id="grid-basic" class="table table-condensed table-hover table-striped">
			<thead>
				<tr>
					<th data-column-id="id" data-type="numeric">ID</th>
					<th data-column-id="sender">Sender</th>
					<th data-column-id="received" data-order="desc">Received</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>11238</td>
					<td>dafdfg@pingpong.com</td>
					<td>14.10.2013</td>
				</tr>
				<tr>
					<td>10231</td>
					<td>eduasdgsdgdsgrdo@pingpong.com</td>
					<td>14.10.2013</td>
				</tr>
				<tr>
					<td>12238</td>
					<td>eduaasasadrdo@pingpong.com</td>
					<td>14.10.2013</td>
				</tr>
				<tr>
					<td>103338</td>
					<td>eduawewewewerdo@pingpong.com</td>
					<td>14.10.2013</td>
				</tr>
			   
				</tbody>
			</table> 
	</div>
	
	   
	   
	   
	
<?php require("partials/footer.php"); ?>

  
<script src="assets/js/vendor/jquery-1.11.3.min.js"></script>
<script src="assets/js/vendor/bootstrap.min.js"></script>
<script src="assets/js/usuarios.js"></script>
<script src="assets/js/vendor/jquery.bootgrid/jquery.bootgrid.min.js"></script>
<script type="text/javascript">
	$("#grid-basic").bootgrid();	
		
		
		
		
</script>