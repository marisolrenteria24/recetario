<?php

$conexion = new mysqli(
    "db",
    "mi_usuario",
    "mi_password_usuario",
    "Sistema_recetarios"
);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8mb4");

?>