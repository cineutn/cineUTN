<?php
if (isset($_POST['archivo'])) {
    $archivo = $_POST['archivo'];
    if (file_exists("../assets/img/peliculas/$archivo")) {
        unlink("../assets/img/peliculas/$archivo");
        echo 1;
    } else {
        echo 0;
    }
}
?>
