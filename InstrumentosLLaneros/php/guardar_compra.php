<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include '../conexion.php';

// Se asume que el usuario ya está autenticado y su id está en la sesión
if (!isset($_SESSION['cod_cli'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$cod_cli = $_SESSION['cod_cli'];
// Recibir los datos del producto
$cod_prod = isset($_POST['cod_prod']) ? $_POST['cod_prod'] : null;
$cantidad = isset($_POST['cantidad']) ? $_POST['cantidad'] : 1;
$precio = isset($_POST['precio']) ? $_POST['precio'] : null;

if (!$cod_prod || !$precio) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
    exit();
}

$sql = "INSERT INTO compras (cod_cli, cod_prod, cantidad, precio) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Error en la consulta: ".$conexion->error]);
    exit();
}
$stmt->bind_param("iiid", $cod_cli, $cod_prod, $cantidad, $precio);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Compra registrada con éxito."]);
} else {
    echo json_encode(["status" => "error", "message" => "No se pudo registrar la compra."]);
}
$stmt->close();
$conexion->close();
?>
