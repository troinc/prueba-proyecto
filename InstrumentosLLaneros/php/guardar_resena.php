<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
include '../conexion.php';
include 'Resena.php';

if (!isset($_SESSION['cod_cli'])) {
    echo json_encode(["status" => "error", "message" => "Usuario no autenticado"]);
    exit();
}

$cod_cli = $_SESSION['cod_cli'];
$cod_prod = isset($_POST['cod_prod']) ? trim($_POST['cod_prod']) : null;
$desc_res = isset($_POST['desc_res']) ? trim($_POST['desc_res']) : "";
$calif_res = isset($_POST['calif_res']) ? intval($_POST['calif_res']) : 0;

if (!$desc_res || $calif_res < 1 || $calif_res > 5) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos o inválidos."]);
    exit();
}

$resena = new Resena($conexion);
$result = $resena->addReview($cod_cli, $cod_prod, $desc_res, $calif_res);

if ($result === true) {
    echo json_encode(["status" => "success", "message" => "Reseña guardada correctamente."]);
} else {
    echo json_encode(["status" => "error", "message" => $result]);
}

$conexion->close();
?>
