import React, { useEffect, useState } from 'react'
import Grafica from '../components/Grafica'
import Tabla from '../components/Tabla'

import '../static/Dashboard.css'

const Dashboard = () => {
  const [procesos, setProcesos] = useState([])
  const [usoRam, setUsoRam] = useState([])
  const initEstados = {
    ejecucion:0,
    suspendido:0,
    detenido:0,
    zombie:0,
    total:0
  }
  const [estadoProcesos, setEstadoProcesos] = useState(initEstados)

  useEffect(() => {
    const interval = setInterval(() =>{
      fetch(`http://localhost:5000/procesoscpu`)
        .then((data)=>data.json())
        .then((data)=>{
          setProcesos(data.data)
          //console.log(data.data)
        })
    },8000)  
  }, [])

  useEffect(() => { 

    setEstadoProcesos(initEstados)
    procesos.forEach((proceso) =>{
      //console.log(proceso)
      if(proceso.estado === "0") setEstadoProcesos((estadoProcesos => ({...estadoProcesos,ejecucion:estadoProcesos.ejecucion+1})))
      if(proceso.estado === "4") setEstadoProcesos((estadoProcesos => ({...estadoProcesos,zombie:estadoProcesos.zombie+1})))
      if(proceso.estado === "8") setEstadoProcesos((estadoProcesos => ({...estadoProcesos,detenido:estadoProcesos.detenido+1})))
      if(proceso.estado === "1" || proceso.estado === "1026") setEstadoProcesos((estadoProcesos => ({...estadoProcesos,suspendido:estadoProcesos.suspendido+1})))
    })
  }, [procesos])
  
useEffect(() => {
  console.log(estadoProcesos)
}, [estadoProcesos])

  
  useEffect(() =>{
    const interval = setInterval(()=>{
      fetch(`http://localhost:5000/usoram`)
        .then((data)=>data.json())
        .then((data)=>{
          //console.log(data.data)}
          const datosGrafica = data.data.map(dato =>[dato.id_ram, dato.ram_uso])
          //console.log(datosGrafica)
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
        <h1>Estado de los procesos</h1>
        <div>
          <div>
            <span>En ejcucion</span>
            <span>{estadoProcesos.ejecucion}</span>
          </div>
          <div>
            <span>Suspendidos</span>
            <span>{estadoProcesos.suspendido}</span>
          </div>
          <div>
            <span>Detenidos</span>
            <span>{estadoProcesos.detenido}</span>
          </div>
          <div>
            <span>Zombies</span>
            <span>{estadoProcesos.zombie}</span>
          </div>
        </div>
        <h1>PROCESOS</h1>
        <Tabla procesos={procesos} />
      </div>
    </React.Fragment>
  );
}

export default Dashboard