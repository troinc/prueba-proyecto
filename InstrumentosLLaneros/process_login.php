<?php
include 'conexion.php';
// Recibe valores enviados desde el formulario de login
$email_cli = isset($_POST['email_cli']) ? $_POST['email_cli'] : "";
$password  = isset($_POST['password']) ? $_POST['password'] : "";

// Verificar que se hayan enviado ambos campos
if(empty($email_cli) || empty($password)){
    echo "<script>
            alert('Debe ingresar correo y contraseña.');
            window.location.href = 'http://localhost/InstrumentosLLaneros/Tienda_llanera/html/login.html';
          </script>";
    exit;
}

// Preparar la consulta para obtener el usuario por correo
$sql = "SELECT * FROM clientes WHERE email_cli = ?";
$stmt = $conexion->prepare($sql);
if(!$stmt){
    echo "<script>
            alert('Error en la consulta: " . $conexion->error . "');
            window.location.href = 'http://localhost/InstrumentosLLaneros/Tienda_llanera/html/login.html';
          </script>";
    exit;
}
$stmt->bind_param("s", $email_cli);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows === 1){
    $user = $result->fetch_assoc();
    // Comparar el password ingresado con el encriptado en BD
    if(password_verify($password, $user['password'])){
        echo "<script>
                alert('Inicio de sesión exitoso.');
                window.location.href = 'http://localhost/InstrumentosLLaneros/home/home.htm';
              </script>";
    } else {
        echo "<script>
                alert('Correo o contraseña incorrectos.');
                window.location.href = 'http://localhost/InstrumentosLLaneros/Tienda_llanera/html/login.html';
              </script>";
    }
} else {
    echo "<script>
            alert('Correo o contraseña incorrectos.');
            window.location.href = 'http://localhost/InstrumentosLLaneros/Tienda_llanera/html/login.html';
          </script>";
}

$stmt->close();
$conexion->close();
?>