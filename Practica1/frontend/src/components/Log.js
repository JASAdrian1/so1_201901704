import React, { useEffect, useState } from 'react'
import './Log.css'
import LogRow from './LogRow'

const url = "http://localhost:8080/logs"




const Log = () => {
    const [datos, setDatos] = useState([{}])

    useEffect(() => {
      const interval = setInterval(() => {
        fetch(`http://localhost:8080/logs`)
        .then((res) => res.json())
        .then((res)=>{
            setDatos(res)
            console.log(datos)
        })
      }, 2000);
    return () => clearInterval(interval)
    }, [datos])
    

  return (
    <div className='logs'>
        <h1>LOGS</h1>
        <table className='tabla-logs'>
            <thead>
                <tr>
                    <th>Numero 1</th>
                    <th>Numero 2</th>
                    <th>Operador</th>
                    <th>Resultado</th>
                    <th>Fecha y hora</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.map((operacion) =>(
                        <LogRow data={operacion} />
                    )) 
                }
            </tbody>
        </table>
    </div> 
  )
}

export default Log