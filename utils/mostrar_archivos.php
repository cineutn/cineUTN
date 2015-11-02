<?php
$directorio_escaneado = scandir('../assets/img/peliculas');
$archivos = array();
foreach ($directorio_escaneado as $item) {
    if ($item != '.' and $item != '..') {
        $archivos[] = $item;
    }
}
echo json_encode($archivos);
?>
