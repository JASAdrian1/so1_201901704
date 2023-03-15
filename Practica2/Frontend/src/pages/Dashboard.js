import React, { useEffect, useState } from 'react'
import Grafica from '../components/Grafica'
import Tabla from '../components/Tabla'

import '../static/Dashboard.css'

const Dashboard = () => {
  const [procesos, setProcesos] = useState([])
  const [usoRam, setUsoRam] = useState([])

  useEffect(() => {
    const interval = setInterval(() =>{
      fetch(`http://localhost:5000/procesoscpu`)
        .then((data)=>data.json())
        .then((data)=>{
          setProcesos(data.data)
          console.log(data.data)
        })
    },2000)  
  }, [])

  
  useEffect(() =>{
    const interval = setInterval(()=>{
      fetch(`http://localhost:5000/usoram`)
        .then((data)=>data.json())
        .then((data)=>{
          //console.log(data.data)}
          const datosGrafica = data.data.map(dato =>[dato.id_ram, dato.ram_uso])
          console.log(data.data)
          console.log(datosGrafica)
          setUsoRam(datosGrafica)
        })
    },2000)
    
  },[])
 

  return (
    <React.Fragment>
      <div className="graficas">
        <div className="grafica-ram">
          <Grafica
            titulo={"Grafica porcentaje de uso de la memoria RAM"}
            datos={usoRam}
            lables={"Memoria RAM"}
          />
        </div>
        <div className="gracica-cpu"></div>
      </div>
      <div className="informacion"></div>
      <div className="procesos">
        <h1>PROCESOS</h1>
        <Tabla procesos={procesos} />
      </div>
    </React.Fragment>
  );
}

export default Dashboard