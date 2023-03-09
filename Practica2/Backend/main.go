package main

import (
	"fmt"
	"os/exec"
)

func main() {
	cmd := exec.Command("sh", "-c", "/proc/cpu_201901704")
	fmt.Println(cmd)
}

func leer_modulo_cpu() string {
	cmd := exec.Command("sh", "-c", "/proc/cpu_201901704")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}
