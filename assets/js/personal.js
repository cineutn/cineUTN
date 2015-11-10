var URI = {        
 
    
        PERSONAL : {
            url : 'actions/actionTabla.php?action=getPersonal',
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
                {   "data": "Total Ventas" },
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
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    }
                })
             .on('xhr.dt', function ( e, settings, json, xhr ) {
             
                    
                    if($('#btnAgregar').attr('id')!='btnAgregar'){
                        $('#grid-basic_wrapper .col-sm-12').prepend('<div id="btnAgregar" class="pull-right addPersonal"><span class="glyphicon glyphicon-plus"></span>    </div>');  
                    }
             
             
                    $('#grid-basic_wrapper .col-sm-12').on('click','.addPersonal',function(event){
                        event.stopPropagation();
                        
                        $('#perfil').val('2');
                        $('#complejo').val(sessionStorage.idcomplejo);
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
            
            $('#perfil').val('2');
            $('#complejo').val(sessionStorage.idcomplejo);
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