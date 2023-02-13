echo "------------------REPORTE-----------------------" 
echo -n "Cantidad de logs registrados: "
cat logs.txt | wc -l
echo -n "Cantidad de operaciones resultadas en error: "
cat logs.txt | grep e | wc -l
echo "Cantidad de operaciones:"
echo -n "       Sumas:            "
cat logs.txt | grep + | wc -l
echo -n "       Restas:           "   
cat logs.txt | grep - | wc -l
echo -n "       Divsiones:        "
cat logs.txt | grep / | wc -l
echo -n "       Multiplicaciones: "
cat logs.txt | grep x | wc -l
echo "Logs de operaciones de hoy"
while read line; do
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
done < "logs.txt"
echo "------------------------------------------------"
