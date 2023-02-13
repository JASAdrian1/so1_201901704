package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	cors "github.com/rs/cors/wrapper/gin"
)

type operacion struct {
	Val1 string `json:"val1"`
	Val2 string `json:"val2"`
	Op   string `json:"op"`
}

type registro struct {
	Val1      string
	Val2      string
	Op        string
	Resultado string
	Fecha     string
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/resultado", postOperacion)
	router.GET("/logs", getLogs)
	router.Run("0.0.0.0:8080")
}

func postOperacion(c *gin.Context) {
	var op operacion
	if err := c.BindJSON(&op); err != nil {
		return
	}
	resultado := calcularResultado(op)

	//Se inserta dentro de la base de datos el log
	insertarLogDb(op, resultado)

	//Se guarda la informacion en un txt
	crearArchivoLogs()

	//Se retorna la front el resultado de la operacion
	c.IndentedJSON(200, gin.H{"resultado": resultado})
}

func calcularResultado(operacion operacion) (resultado string) {
	valor1, err1 := strconv.ParseFloat(operacion.Val1, 32)
	valor2, err2 := strconv.ParseFloat(operacion.Val2, 32)
	if err1 != nil {
		resultado = "e"
		return
	}
	if err2 != nil {
		resultado = fmt.Sprintf("%v", valor2)
	}
	if operacion.Op == "+" {
		resultado = fmt.Sprintf("%v", valor1+valor2)
	} else if operacion.Op == "-" {
		resultado = fmt.Sprintf("%v", valor1-valor2)
	} else if operacion.Op == "/" {
		resultado = fmt.Sprintf("%v", valor1/valor2)
		if valor2 == 0 {
			resultado = "e"
		}
	} else if operacion.Op == "x" {
		resultado = fmt.Sprintf("%v", valor1*valor2)
	}
	return
}

func getLogs(c *gin.Context) {
	//Se establece la conexion con la base de datos
	db, err := sql.Open("mysql", "root:0000@tcp(db-prac1:3306)/operaciones")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}
	logs, err := db.Query("SELECT * FROM log")
	defer logs.Close()

	//SE OBTIENE EL NUMERO DE TUPLAS QUE DEVUELVE LA CONSULTA
	count, _ := db.Query("SELECT COUNT(*) FROM log")
	defer count.Close()
	var numTuplas int
	count.Next()
	count.Scan(&numTuplas)

	logsArray := make([]registro, 0)

	//Se guardan en los structs los datos obtenidos de la consulta
	for logs.Next() {
		var lo registro
		errlog := logs.Scan(&lo.Val1, &lo.Val2, &lo.Op, &lo.Resultado, &lo.Fecha)
		if errlog != nil {
			log.Fatal(errlog)
		}
		logsArray = append(logsArray, lo)
		fmt.Println(lo)
	}

	c.IndentedJSON(http.StatusOK, logsArray)
}

func insertarLogDb(op operacion, resultado string) {
	//Se establece la conexion con la base de datos
	db, err := sql.Open("mysql", "root:0000@tcp(db-prac1:3306)/operaciones")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}
	//Se realiza la insercions dentro de la base datos
	query := `INSERT INTO log(numero1, numero2, operacion, resultado) VALUES("` + op.Val1 + `","` + op.Val2 + `","` + op.Op + `","` + resultado + `")`
	fmt.Println(query)
	_, err3 := db.Exec(query)

	if err3 != nil {
		panic(err3.Error())
	}

}

func crearArchivoLogs() {
	//Se establece la conexion con la base de datos
	db, err := sql.Open("mysql", "root:0000@tcp(db-prac1:3306)/operaciones")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}
	logs, err := db.Query("SELECT * FROM log")
	defer logs.Close()

	//SE OBTIENE EL NUMERO DE TUPLAS QUE DEVUELVE LA CONSULTA
	count, _ := db.Query("SELECT COUNT(*) FROM log")
	defer count.Close()
	var numTuplas int
	count.Next()
	count.Scan(&numTuplas)

	logsArray := make([]registro, 0)

	//Se guardan en los structs los datos obtenidos de la consulta
	for logs.Next() {
		var lo registro
		errlog := logs.Scan(&lo.Val1, &lo.Val2, &lo.Op, &lo.Resultado, &lo.Fecha)
		if errlog != nil {
			log.Fatal(errlog)
		}
		logsArray = append(logsArray, lo)
		fmt.Println(lo)
	}

	textLog := ""

	fmt.Println("Escribiendo logs en logs.txt")
	for _, el := range logsArray {
		textLog += el.Fecha[8:10] + "," + el.Val1 + "," + el.Val2 + "," + el.Resultado + "," + el.Op + "\n"
	}
	fmt.Println(textLog)

	//SE CREA UN ARCHIVO DONDE SE GUARDAN LOS LOGS
	file, err := os.OpenFile("bash/logs.txt", os.O_CREATE|os.O_WRONLY, 0644)
	file.WriteString(textLog)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

}
