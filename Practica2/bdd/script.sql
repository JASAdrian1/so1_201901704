CREATE DATABASE IF NOT EXISTS sopes1_p2;

use sopes1_p2;

CREATE TABLE proceso(
    id_proceso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pid VARCHAR(500) NOT NULL,
    username VARCHAR(500) NULL,
    nombre VARCHAR(500) NOT NULL,
    estado VARCHAR(500) NOT NULL
);

CREATE TABLE child(
    id_child INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pid VARCHAR(500) NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    id_proceso VARCHAR(500) NOT NULL,
    CONSTRAINT fK_proceso
        FOREIGN KEY (id_proceso)
        REFERENCES proceso(id_proceso)
        ON DELETE CASCADE
);

CREATE TABLE ram(
    id_ram INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ram_uso DECIMAL(5,2);
)


SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE sopes1_p2.proceso;
TRUNCATE sopes1_p2.child;

SET FOREIGN_KEY_CHECKS = 1;