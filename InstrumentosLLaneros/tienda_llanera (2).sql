-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2025 a las 02:38:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_llanera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cod_cat` varchar(50) NOT NULL,
  `nom_cat` varchar(100) NOT NULL,
  `desc_cat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Modificar la tabla `clientes` para que NO incluya dirección ni número y se incluya password
--
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `cod_cli` varchar(50) NOT NULL,
  `nom_cli` varchar(100) NOT NULL,
  `ape_cli` varchar(100) NOT NULL,
  `email_cli` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `num_ped` varchar(50) NOT NULL,
  `fec_compra` date NOT NULL,
  `cod_cli` varchar(50) DEFAULT NULL,
  `cod_prod` varchar(50) DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(10,2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod_prod` varchar(50) NOT NULL,
  `nom_prod` varchar(100) NOT NULL,
  `desc_prod` text DEFAULT NULL,
  `precio_prod` decimal(10,2) NOT NULL,
  `stock_prod` int(11) NOT NULL,
  `cod_cat` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Eliminar tablas relacionadas a proveedores
--
DROP TABLE IF EXISTS `productos_proveedores`;
DROP TABLE IF EXISTS `proveedores`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenas`
--

CREATE TABLE `resenas` (
  `cod_res` varchar(50) NOT NULL,
  `desc_res` text DEFAULT NULL,
  `calif_res` int(11) DEFAULT NULL CHECK (`calif_res` between 1 and 5),
  `cod_prod` varchar(50) DEFAULT NULL,
  `cod_cli` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    cod_cli INT NOT NULL,
    cod_prod INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cod_cli) REFERENCES clientes(cod_cli),
    FOREIGN KEY (cod_prod) REFERENCES productos(cod_prod),
    INDEX (cod_cli, cod_prod) -- Índice para mejorar el rendimiento
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cod_cat`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cod_cli`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`num_ped`),
  ADD KEY `cod_cli` (`cod_cli`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod_prod`),
  ADD KEY `cod_cat` (`cod_cat`);

--
-- Indices de la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD PRIMARY KEY (`cod_res`),
  ADD KEY `cod_prod` (`cod_prod`),
  ADD KEY `cod_cli` (`cod_cli`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`cod_cli`) REFERENCES `clientes` (`cod_cli`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`cod_cat`) REFERENCES `categorias` (`cod_cat`);

--
-- Filtros para la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`cod_prod`) REFERENCES `productos` (`cod_prod`),
  ADD CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`cod_cli`) REFERENCES `clientes` (`cod_cli`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
