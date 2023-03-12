package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
)

func main() {
	modulo_cpu := leer_modulo_cpu()
	fmt.Println(modulo_cpu)
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

func insertarProcesos(procesos string) {
	//Se establece la conexion con la base de datos
	db, err := sql.Open("mysql", "root:0000@tcp(db-prac1:3306)/sopes1_p2")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}

	var version string

	err2 := db.QueryRow("SELECT VERSION()").Scan(&version)

	if err2 != nil {
		log.Fatal(err2)
	}

	fmt.Println(version)

}

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
