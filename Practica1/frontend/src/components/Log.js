import React, { useState } from 'react'
import './Log.css'

const url = "http://localhost:8080/logs"

function getData(){
    fetch(url)
    .then(data => data.json)
    .then((data)=>{
        console.log(data)
    })
}

const Log = () => {
    const [datos, setDatos] = useState({})

  return (
    <div>
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
        </table>
    </div>
  )
}

export default Log