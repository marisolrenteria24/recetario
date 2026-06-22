<?php

$conexion = new mysqli(
    "db",
    "mi_usuario",
    "mi_password_usuario",
    "mi_base_de_datos"
);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

echo "CONEXION EXITOSA A MYSQL";
?>