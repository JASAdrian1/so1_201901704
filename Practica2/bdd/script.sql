CREATE DATABASE IF NOT EXISTS sopes1_p2;

use sopes1_p2;

CREATE TABLE proceso(
    id_proceso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pid VARCHAR(500) NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    estado INT NOT NULL
);

CREATE TABLE child(
    id_child INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pid VARCHAR(500) NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    id_proceso INT NOT NULL,
    CONSTRAINT fK_proceso
        FOREIGN KEY (id_proceso)
        REFERENCES proceso(id_proceso)
);