import React, { useEffect, useState } from 'react'

const RowChild = ({pid}) => {
    const [procesosChild, setprocesosChild] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/procesoschild/${pid}`)
            .then((child)=>child.json())
            .then((child)=>{
                console.log(child)
                setprocesosChild(child.data)
            })
        }, [])
  return (
    <React.Fragment>
        { procesosChild &&
            procesosChild.map(child =>(
                <tr>
                    <td>{child.pid}</td>
                    <td>{child.nombre}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ))
        }
        
    </React.Fragment>
  )
}

export default RowChild