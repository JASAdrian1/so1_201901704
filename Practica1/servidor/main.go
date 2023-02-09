package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

type operacion struct {
	Val1 string `json:"val1"`
	Val2 string `json:"val2"`
	Op   string `json:"op"`
}

func main() {
	fmt.Println("Hello, World!")
	router := gin.Default()
	router.Use(cors.Default())
	router.POST("/resultado", postOperacion)
	router.Run("localhost:8080")
}

func postOperacion(c *gin.Context) {
	var op operacion
	if err := c.BindJSON(&op); err != nil {
		return
	}
	resultado := calcularResultado(op)
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
	} else if operacion.Op == "x" {
		resultado = fmt.Sprintf("%v", valor1*valor2)
	}
	return
}
