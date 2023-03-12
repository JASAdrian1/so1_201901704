package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
)

type procesos struct {
	Pid    string          `json:"pid"`
	Nombre string          `json:"nombre"`
	Estado string          `json:"estado"`
	Child  []proceso_child `json:"child"`
}

type proceso_child struct {
	Pid    string `json:"pid"`
	Nombre string `json:"nombre"`
}

func main() {
	modulo_cpu := leer_modulo_cpu()
	modulo_cpu = strings.Replace(modulo_cpu, "},]", "}]", -1)
	fmt.Println(modulo_cpu)

	insertarProcesosCPU(modulo_cpu)

}

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

func leer_modulo_cpu() string {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201901704")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}

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
	vaciarTablas(db)

	for _, value := range modulo_cpu_json["data"] {
		//fmt.Println(index, ": ", value.Pid)
		fmt.Println("Insertando proceso: ", value.Pid)
		//Se crea la query para la insercion de procesos
		query := `INSERT INTO proceso VALUES(` + value.Pid + `,"` + value.Pid + `","` + value.Nombre + `","` + value.Estado + `")`
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

func vaciarTablas(db *sql.DB) {
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

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
