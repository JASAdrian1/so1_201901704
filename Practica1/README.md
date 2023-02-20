# Manual técnco

Practica 1, Laboratoro de Sistemas Operativos 1, 1er Semestre 2023

## Pre-requisitos

Es necesario tener instalado [Docker](https://docs.docker.com/desktop/install/linux-install/) y [Docker-Compose](https://docs.docker.com/compose/install/)

## Docker-Compose

Para que todos los contenedor funcionaran entre sí se utilizó docker-compose. El archivo de para ejecutar el docker-compose se encuentra en la raíz del proyecto, y para poder ejecutarlo se requieren los siguientes comandos

- Para construir las imagenes:

    ```
    docker-compose build
    ```

- Para levantar los contenedores y que no se mantega ocupada la terminal mientras se ejecutan los contenedores:

    ```
    docker-compose up -d
    ```

- Para detener los contenedores:

    ```
    docker-compose down
    ```

## Imagenes

A continuación se explican las imagenes utilizadas dentro de los contenedores. Todas estas imagenes se ejecutan al momento de ejecutar el docker compose.

### MySQL
Para la base de datos se utilizó una imagen de MySQL. Para acceder a dicha imagen cuando ya se encuentra en un contenedor, se utiliza el siguiente comando:
```
    docker exec -it db-prac1 mysql -uroot -p0000
```

donde:

- -u: nombre del usuario.

- -p: contraseña del usuario.

- db-prac1 = nombre del contenedor donde se está ejecutando la imagen de la base de datos.


### GOLANG

Para el servidor de la aplicación se utilizó golang, la imagen específica fue golang:1.19-alpine3.17. Dentro del dockerfile algunos de los comandos que se pueden encontrar son:

- Paracopiar los archivos de la máquina host dentro del contenedor:

    ```
    COPY go.mod ./
    COPY go.sum ./
    ```

- Para descargar las dependencias:

    ```
    RUN go mod download
    ```

- Para construir el build de la aplicacion:

    ```
    COPY *.go ./
    RUN go build -o /servidor
    ```


### Node

Para el frontend se trabajó con React, por lo que fue necesario utilizar una imagen de node, la cual fue node:19-alpine.

### Bash

Para ejecutar el script se utilizó la imagen bash4:4.