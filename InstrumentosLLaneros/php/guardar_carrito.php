<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include '../conexion.php';
include 'Carrito.php';

if (!isset($_SESSION['cod_cli'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$cod_cli = $_SESSION['cod_cli'];
$cod_prod = isset($_POST['cod_prod']) ? trim($_POST['cod_prod']) : null;
$cantidad = isset($_POST['cantidad']) ? intval($_POST['cantidad']) : 1;
$precio_unitario = isset($_POST['precio_unitario']) ? floatval($_POST['precio_unitario']) : null;

if (!$cod_prod || !$precio_unitario) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
    exit();
}

$carrito = new Carrito($conexion);
$result = $carrito->addItem($cod_cli, $cod_prod, $cantidad, $precio_unitario);

if ($result === true) {
    echo json_encode(["status" => "success", "message" => "Producto agregado al carrito correctamente."]);
} else {
    echo json_encode(["status" => "error", "message" => $result]);
}

$conexion->close();
?>
