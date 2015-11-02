<?php
if (isset($_FILES['archivo'])) {
    $archivo = $_FILES['archivo'];
    $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
    $time= date('Y-m-d');
    
    $nombre = "{$_POST['nombre_archivo']}_$time.$extension";
    if (move_uploaded_file($archivo['tmp_name'], "../assets/img/peliculas/$nombre")) {
        echo 1;
    } else {
        echo 0;
    }
}
?>
