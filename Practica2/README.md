# Manual técnico
Practica 2, Laboratorio de Sistemas Operativos 1, 1er Semestre 2023

# Maquinas virtuales
Se crearón dos instancias en Google Cloud Platform, en una se aloja el contenedor con la aplicación de Go y tiene los módulos cargados en el sistema.
El la otra máquina virtual se aloja los contenedores que contienen se servidor node y la página web React.

# Modulos

## Makefile
Para crear todos los archivos necesarios para la creacion de los modulos de kernel, se crea un make file con las siguientes configuraciones:
- Se espefica los archivos C donde se encuntra todo el código a compilar para la creacion de ambos modulos:

    ```
    obj-m += cpu_201901704.o
    obj-m += ram_201901704.o
    ```
- Indicamos la regla "all" para que al ejecutarlo se compile el módulo de kernel:
    ```
    all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
    ```
- Indicamos la regla "clean" para limpiar todos los archivos generados por la construcción del módulo
    ```
    all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
    ```

## Modulo CPU

### Carga y descargar del modulo CPU

Para cargar el modulo de CPU se ejecuta el comando
    ```
    sudo insmod cpu_201901704.ko
    ```
donde:

- insmod: comando que carga el modulo.

- cpu_201901704.ko: nombre del archivo del moudulo que contiene al modulo de CPU.

Para descargar el modulo de CPU se ejecuta
    ```
    sudo rmmod cpu_201901704
    ```
donde:

- insmod: comando para la descarga del modulo.

- cpu_201901704: nombre del archivo del moudulo que contiene al modulo de CPU.

## Modulo RAM

### Carga y descargar del modulo RAM
Al igua que con el modulo del cpu, se utilizan dos comando para la carga y descarga del modulo, los cuales son:
Para cargar el modulo de CPU se ejecuta el comando
    ```
    sudo insmod ram_201901704.ko
    ```
Para descargar el modulo de CPU se ejecuta
    ```
    sudo rmmod cpu_201901704
    ```

# Aplicacion GO
Se creó una aplicación go para leer la información que proporciona cada uno de los módulos.
La aplicacion se ejecuta dentro de un contenedor de docker, por lo que para crear la imagen es necesario estar en la carpeta que se encuentra el Dockerfile, y ejecutar el comando:
    ```
    docker build -t backend_go .
    ```
Posteriormente se crea un contenedor docker con la imagen creada, para ello usamos el siguiente comando:
    ```
    docker run -it --rm backend_go
    ```

# Aplicacion WEB
Para la creación de la aplicación web se utilizó un servidor node y para el frontend se utilizó la líbreria React.
Ambas cosas se ejecutaron dentro de contenedores, para levantar los contenedores se creo un archivo docker-compose.yml que se encuentra en la ráiz del proyecto, y para levantar los contenedores se ejucator los siguiente comandos dentro de la raíz del proyecto:
    ```
    docker compose build
    docker compose up -d
    ```



# Base de datos
Para la base de datos se uso una instancia de MySQL en Cloud SQL de Google Cloud Platform.
La configuracion de dicha instancia es la siguiente:
| Nombre configuración | Valor | 
|---------------|--------------|
|Versión de la base de datos| MySQL 8.0.26|
|CPU virtuales| 2 CPU virtual(es)| 
|Memoria| 3.75 GB| 
|Almacenamiento|100 GB| 

Se crearon tres tablas para manejar la información de los modulos, las tablas creadas son los siguientes:

Tabla procesos
| Nombre Columna | Tipo | 
|---------------|--------------|
|id_proceso| int|
|pid| VARCHAR(500)| 
|nombre| VARCHAR(500)| 
|username| VARCHAR(100)| 
|ram| VARCHAR(50)| 

Tabla child
| Nombre Columna | Tipo | 
|---------------|--------------|
|id_child| int|
|pid| VARCHAR(500)| 
|nombre| VARCHAR(500)| 
|id_proceso| int|

Tabla ram
| Nombre Columna | Tipo | 
|---------------|--------------|
|id_ram| int|
|ram_uso| int|

