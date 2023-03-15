package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
)

type procesos struct {
	Pid    string          `json:"pid"`
	Nombre string          `json:"nombre"`
	Uid    string          `json:"uid"`
	Estado string          `json:"estado"`
	Child  []proceso_child `json:"child"`
}

type proceso_child struct {
	Pid    string `json:"pid"`
	Nombre string `json:"nombre"`
}

type ram struct {
	Freeram  string `json:"freeram"`
	Totalram string `json:"totalram"`
}

func main() {
	go procesarCPU()
	procesarRAM()

}

func procesarCPU() {
	for {
		modulo_cpu := leer_modulo_cpu()
		//Se quitan unos errores de sintaxis que trae el json del cpu
		modulo_cpu = strings.Replace(modulo_cpu, "},]", "}]", -1)
		//fmt.Println(modulo_cpu)
		insertarProcesosCPU(modulo_cpu)
		time.Sleep(15 * time.Second)
	}
}

func procesarRAM() {
	//Se realiza la conexion con la base de datos para vaciar la tabla
	db, err := conectarDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//Antes de realizar la insercion de datos se vacian las tablas
	vaciarTablaRam(db)

	for {
		modulo_ram := leer_modulo_ram()
		insertarUsoRam(modulo_ram)
		time.Sleep(5 * time.Second)
	}
}

//--------------------------------------------------------
//FUNCIONES DE BASE DE DATOS
func conectarDB() (*sql.DB, error) {
	//Se establece la conexion con la base de datos
	db_nombre := goDotEnvVariable("DB_NAME")
	db_password := goDotEnvVariable("DB_PASSWORD")
	db_host := goDotEnvVariable("DB_HOST")
	db_user := goDotEnvVariable("DB_USER")

	db, err := sql.Open("mysql", db_user+":"+db_password+"@tcp"+"("+db_host+":3306"+")/"+db_nombre)

	if err != nil {
		return nil, err
	}
	return db, nil
}

func vaciarTablasProcesos(db *sql.DB) {
	query := "SET FOREIGN_KEY_CHECKS = 0;"
	//Se ejecuta el query
	_, err3 := db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}
	query = "TRUNCATE sopes1_p2.proceso;"
	//Se ejecuta el query
	_, err3 = db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}
	query = "TRUNCATE sopes1_p2.child;"
	//Se ejecuta el query
	_, err3 = db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}
	query = "SET FOREIGN_KEY_CHECKS = 1;"
	//Se ejecuta el query
	_, err3 = db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}
}

func vaciarTablaRam(db *sql.DB) {
	query := "TRUNCATE sopes1_p2.ram;"
	_, err3 := db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}
}

//--------------------------------------------------------------------
//FUNCIONES PARA EJECUTAR COMANDOS EN LA CONSOLA
func leer_modulo_cpu() string {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201901704")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}

func getUsernameProcess(uid string) string {
	cmd := exec.Command("sh", "-c", "getent passwd "+uid+" | cut -d: -f1")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}

func leer_modulo_ram() string {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201901704")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}

//-------------------------------------------------------------------------
//FUNCIONES PARA LOS MODULOS
//-----------------------------------------------------------------
//Funciones modulo cpu
func insertarProcesosCPU(procesos_cpu string) {
	//Conversion de string a un arreglos de structs de tipo procesos
	var modulo_cpu_json map[string][]procesos
	err := json.Unmarshal([]byte(procesos_cpu), &modulo_cpu_json)
	if err != nil {
		log.Panic(err)
	}

	//Se realiza la conexion con la base de datos
	db, err := conectarDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//Antes de realizar la insercion de datos se vacian las tablas
	vaciarTablasProcesos(db)

	for _, value := range modulo_cpu_json["data"] {
		//Obteniendo el nombre del usuario
		username := getUsernameProcess(value.Uid)
		//fmt.Println(index, ": ", value.Pid)
		fmt.Println("Insertando proceso: ", value.Pid)
		//Se crea la query para la insercion de procesos
		query := `INSERT INTO proceso VALUES(` + value.Pid + `,"` + value.Pid + `","` + value.Nombre + `","` + value.Estado + `","` + username + `")`
		//Se ejecuta el query
		_, err3 := db.Exec(query)
		if err3 != nil {
			panic(err3.Error())
		}
		//Si el proceso tiene hijos se recorre el arreglo child
		for _, child := range value.Child {

			fmt.Println("Insertando proceso hijo: ", child.Pid)
			//Se insertan los proceso child en su tabla
			query = `INSERT INTO child VALUES(` + child.Pid + `,"` + child.Pid + `","` + child.Nombre + `","` + value.Pid + `")`
			_, err3 = db.Exec(query)
			if err3 != nil {
				panic(err3.Error())
			}
		}
	}

}

//-----------------------------------------------------------------
//Funciones modulo ram
func insertarUsoRam(datos string) {
	//fmt.Println(datos)
	//Conversion de string a un arreglos de structs de tipo procesos
	var modulo_ram_cpu map[string]ram
	err := json.Unmarshal([]byte(datos), &modulo_ram_cpu)
	if err != nil {
		log.Panic(err)
	}
	freeram, _ := strconv.ParseInt(modulo_ram_cpu["data"].Freeram, 10, 0)
	totaram, _ := strconv.ParseInt(modulo_ram_cpu["data"].Totalram, 10, 0)
	porcentaje_uso := (float64(totaram) - float64(freeram)) / float64(totaram) * 100.0
	fmt.Println(freeram)
	fmt.Println(totaram)
	fmt.Println("Porcentaje de uso de ram: ", porcentaje_uso)
	//Se realiza la conexion con la base de datos
	db, err := conectarDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	query := "INSERT INTO ram(ram_uso) VALUES (" + fmt.Sprintf("%.2f", porcentaje_uso) + ");"

	//Se ejecuta el query
	_, err3 := db.Exec(query)
	if err3 != nil {
		panic(err3.Error())
	}

	fmt.Println("Insertado uso de ram en la base de datos")
}

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
