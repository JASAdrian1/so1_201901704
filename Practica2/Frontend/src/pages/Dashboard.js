import React, { useEffect, useState } from 'react'
import Tabla from '../components/Tabla'

import '../static/Dashboard.css'

const Dashboard = () => {
  const [procesos, setProcesos] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/procesoscpu`)
      .then((data)=>data.json())
      .then((data)=>{
        setProcesos(data.data)
        console.log(data.data)
      })
  }, [])
  
 

  return (
    <React.Fragment>
      <div className='graficas'>
        <div className='grafica-ram'>

        </div>
        <div className='gracica-cpu'>

        </div>
      </div>
      <div className='informacion'>

      </div>
      <div className='procesos'>
        <h1>PROCESOS</h1>
        <Tabla procesos={procesos}/>
      </div>
    </React.Fragment>
    
  )
}

export default Dashboard