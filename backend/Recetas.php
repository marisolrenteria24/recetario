<?php

header("Content-Type: application/json");

include("../conexion.php");

$sql = "SELECT * FROM recetas";

$resultado = $conexion->query($sql);

$recetas = [];

while($fila = $resultado->fetch_assoc()){
    $recetas[] = $fila;
}

echo json_encode($recetas);

?>