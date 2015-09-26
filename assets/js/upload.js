(function($){
    
    var files;
    var URI = {
        UPLOAD : 'actions/imagenes.php?action=subir',
        LIST : 'actions/imagenes.php?action=listar'
    };

    $('input[type=file]').on('change', prepareUpload);
    $('form').on('submit', uploadFiles);
    
    
    function prepareUpload(event){
        files = event.target.files;
        console.log(files);
    };
    
    function uploadFiles(event){
        event.stopPropagation();
        event.preventDefault();

        var data = new FormData();
        
        $.each(files, function(key, value){
            data.append(key, value);
        });

        $.ajax({
            url: URI.UPLOAD,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false
        }).done(function(response){
            console.log(response);
        });
    };
    
})(jQuery)