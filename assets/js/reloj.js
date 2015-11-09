(function($){

    $(document).ready(function() {     
        setInterval(function(){ calcularTiempoDosFechas() }, 1000);
    });  
    
    function calcularTiempoDosFechas(){

        var fechaTermino = sessionStorage.getItem('fechaTermino');

        start_actual_time = new Date();

        end_actual_time = new Date(fechaTermino);

        var interval = end_actual_time - start_actual_time;

        var msecPerMinute = 1000 * 60;

        var MM = Math.floor(interval / msecPerMinute);
        
        interval = interval - (MM * msecPerMinute );

        var SS = Math.floor(interval / 1000 );

        //var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM)
        var formatted = ((MM < 10)?("0" + MM):MM) + ":" + ((SS < 10)?("0" + SS):SS);

        if (formatted == "00:00" || MM < 0 || SS < 0  ){
            window.location.href = "timeOut.php";
        }else{
            $("#relojCuentaAtras").text(formatted);
        }

    };
    
})(jQuery)