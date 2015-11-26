$('title').html("Administradores");

var URI = {        
 
        COMPLEJOS : 'actions/actionComplejos.php?action=obtenerComplejo',
        PERSONAL : {
            url : 'actions/actionTabla.php?action=getAdmins',
            columns : [
                {   "data": "id"   
                },
                {   "data": "Nombre" },
                {   "data": "Apellido" },
                {   "data": "DNI" },
                {   "data": "Telefono" },
                {   "data": "Mail" },
                {   "data": "User" },
                {   "data": "Pass" },
                {   "data": "Complejo" },
                {   "data": "Borrado"},
                {   "data": "Fecha Modificacion"},
                {   "data": "Edicion",
                    "render" : function(data, type, full, meta){
                       var boton = '';
                       
                            boton='<span id="btnEdit'+full.id+'"  class="glyphicon glyphicon-pencil lapiz"></span><span id="btn'+full.id+'" class="glyphicon glyphicon-remove cruz"></span>'
                        
                        
                        return boton;
                    }
                }
                 
            ]
         },
        DELETE : 'actions/actionTabla.php?action=deletePersonal'
    };
    var URISELECTED=[];
    var table;
    
    $(document).ready(function() {
        
        
        
        
        
        
        
        $('<div class="form-group">					<label for="inputEmail3" class="col-sm-2 control-label">Complejo</label>					<div class="col-sm-10">						<select id="cmbComplejo" class="form-control"></select>					</div>				    </div>').insertAfter($('#modalSignup #generoMasculino').parent().parent().parent());
        
        $('<div class="form-group">					<label for="inputEmail3" class="col-sm-2 control-label">Complejo</label>					<div class="col-sm-10">						<select id="cmbComplejoEdit" class="form-control"></select>					</div>				    </div>').insertAfter($('#modalEdit #telefonoEdit').parent().parent());
        
        
         var selectComplejos =  $.ajax({
                url: URI.COMPLEJOS,
                type: 'POST' ,               
                dataType: 'json'
               
            })
        
         selectComplejos.done(function(response){
                
                response.data.forEach(function(item){
                    $('#cmbComplejo').append(
                        $('<option/>',{
                            value   :  item.idComplejo 
                        }).append(item.nombre)
                    );
                    
                    $('#cmbComplejoEdit').append(
                        $('<option/>',{
                            value   :  item.idComplejo 
                        }).append(item.nombre)
                    );
                    
                });
                
            }); 
        
        $('body').on('change','#cmbComplejo',function(){
           $('#complejo').val($( "#cmbComplejo option:selected" ).val());
        
        });
         $('body').on('change','#cmbComplejoEdit',function(){
            $('#complejoEdit').val($( "#cmbComplejoEdit option:selected" ).val());
        
        });
        
        URISELECTED.url=URI.PERSONAL.url+"&idComplejo="+sessionStorage.idcomplejo;
        URISELECTED.columns=URI.PERSONAL.columns;
        
        URI.PERSONAL.columns.forEach(function(e){
            $("#grid-basic thead tr").append(
                $('<th/>').append(e.data)
            );
 
        });
        
         table = $("#grid-basic")
             .DataTable({
                "ajax": URISELECTED.url,
                "columns": URISELECTED.columns,
                "language": {
                    "url": "assets/Spanish.json"
                    }
                })
             .on('xhr.dt', function ( e, settings, json, xhr ) {
             
                    
                    if($('#btnAgregar').attr('id')!='btnAgregar'){
                        $('#grid-basic_wrapper .col-sm-12').prepend('<div id="btnAgregar" class="pull-right addPersonal"><span class="glyphicon glyphicon-plus"></span>    </div>');  
                    }
             
             
                    $('#grid-basic_wrapper .col-sm-12').on('click','.addPersonal',function(event){
                        event.stopPropagation();
                        
                        $('#perfil').val('3');
                        
                        $('#modalSignup').modal('show');
                       
                        
                    });
                    
                    
                } );
        
        
        
        $('body').on('click','.lapiz',function(event){
            event.stopPropagation();
            $('#modalEdit .modal-body .alert-success').remove();
            
            data = {
                id : event.toElement.id.replace('btnEdit','')
            }
            var rowEdit=table.data().filter(function(x) { if(x.id==data.id)return x; });
            
            $('#cmbComplejoEdit').val(rowEdit[0].idComplejo)
            $('#complejoEdit').val(rowEdit[0].idComplejo);
            $('#perfilEdit').val('2');
            $('#idEdit').val(rowEdit[0].id);
            $('#emailEdit').val(rowEdit[0].Mail);
            $('#nombreEdit').val(rowEdit[0].Nombre);
            $('#apellidoEdit').val(rowEdit[0].Apellido);
            $('#dniEdit').val(rowEdit[0].DNI);
            $('#usuarioEdit').val(rowEdit[0].User);
            $('#passwordEdit').val(rowEdit[0].Pass);
            $('#passwordConfirmationEdit').val(rowEdit[0].Pass);
            $('#telefonoEdit').val(rowEdit[0].Telefono);
            
                    
            $('#modalEdit').modal('show');
            
            
            

        });
        $('body').on('click','.cruz',function(event){
            event.stopPropagation();

            data = {
                id : event.toElement.id.replace('btn','')
            }


            cambiarEstadoUsuario(data);

        });
        
         
        
    } );
   
    function cambiarEstadoUsuario(data){
        $.ajax({
            url : URI.DELETE,
            method : "GET",
            dataType : 'json',
            data : data,
            success : function(){
                
                table.ajax.reload();
            
            },
            error: function(result) {
                    alert("Error cambiando el estado");
                }
        });
    
    }