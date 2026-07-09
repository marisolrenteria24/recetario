<?php

header("Content-Type: application/json; charset=UTF-8");

include("../conexion.php");

$sql = "SELECT * FROM recetas";

$resultado = $conexion->query($sql);

$recetas = [];

while ($fila = $resultado->fetch_assoc()) {
    $recetas[] = $fila;
}

echo json_encode($recetas, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$conexion->close();

?>