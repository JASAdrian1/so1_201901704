#!/bin/bash
url="logs.txt"
date=$(date +'%d')
echo "------------------REPORTE-----------------------" 
echo -n "Cantidad de logs registrados: "
cat $url | wc -l
echo -n "Cantidad de operaciones resultadas en error: "
cat $url | grep e | wc -l
echo "Cantidad de operaciones:"
echo -n "       Sumas:            "
cat $url | grep + | wc -l
echo -n "       Restas:           "   
cat $url | grep - | wc -l
echo -n "       Divsiones:        "
cat $url | grep / | wc -l
echo -n "       Multiplicaciones: "
cat $url | grep x | wc -l
echo "Logs de operaciones de hoy"
while read line; do
    if [[ $(echo "$line" | cut -d "," -f 1) == "$date" ]]; then
        echo -n "Fecha: "
        printf $line | cut -d "," -f 1
        echo -n "   Valor1: "
        echo $line | cut -d "," -f 2
        echo -n "   Valor2: "
        echo $line | cut -d "," -f 3
        echo -n "   Operador: "
        echo $line | cut -d "," -f 5
        echo -n "   Resultado: "
        echo $line | cut -d "," -f 4
    fi
done < $url
echo "------------------------------------------------"
