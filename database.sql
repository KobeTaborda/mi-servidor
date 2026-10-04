-- Script para crear la base de datos y la tabla de usuarios
CREATE DATABASE IF NOT EXISTS formulario_db;
USE formulario_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    tipoDoc    VARCHAR(2)   NOT NULL,
    numDoc     VARCHAR(20)  NOT NULL,
    nombres    VARCHAR(100) NOT NULL,
    apellidos  VARCHAR(100) NOT NULL,
    direccion  VARCHAR(150),
    ciudad     VARCHAR(50),
    fechaNac   DATE         NOT NULL,
    correo     VARCHAR(120) NOT NULL,
    -- Una persona se identifica por tipo + número de documento (igual que en el formulario)
    CONSTRAINT uq_documento UNIQUE (tipoDoc, numDoc)
);
