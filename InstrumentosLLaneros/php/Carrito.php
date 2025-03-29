<?php
class Carrito {
    private $conexion;
    
    public function __construct($conexion) {
        $this->conexion = $conexion;
    }
    
    public function addItem($cod_cli, $cod_prod, $cantidad, $precio_unitario, $estado_ped = 'pendiente') {
        // Generar número de pedido único
        $num_ped = uniqid('ped_', true);
        // Fecha actual
        $fec_compra = date('Y-m-d');
        $sql = "INSERT INTO compras (num_ped, fec_compra, estado_ped, cod_cli, cod_prod, cantidad, precio_unitario)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        if (!$stmt) {
            return "Error en la consulta: " . $this->conexion->error;
        }
        // Tipos: s - string, i - integer, d - double
        $stmt->bind_param("sssssid", $num_ped, $fec_compra, $estado_ped, $cod_cli, $cod_prod, $cantidad, $precio_unitario);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $stmt->close();
            return true;
        } else {
            $stmt->close();
            return "No se pudo registrar el carrito.";
        }
    }
}
?>
