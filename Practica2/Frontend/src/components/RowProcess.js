import React, { useEffect, useState } from 'react'
import RowChild from './RowChild'

const RowProcess = ({proceso}) => {

    const [muestraHijos, setmuestraHijos] = useState(false)
    const [btnText, setBtnText] = useState("Mostrar hijos")

    useEffect(() => {
        if(muestraHijos === true){
            setBtnText("Ocultar hijos")
        }else{
            setBtnText("Mostrar hijos")
        }
    }, [muestraHijos])
    
   
    
  return (
    <React.Fragment>
      <tr className='padre'>
        <td>{proceso.pid}</td>
        <td>{proceso.nombre}</td>
        <td>{proceso.username}</td>
        <td>{proceso.estado}</td>
        <td>{proceso.ram}</td>
        <td>
          <button onClick={() => setmuestraHijos(!muestraHijos)}>
            {btnText}
          </button>
        </td>
      </tr>
      {muestraHijos && <RowChild pid={proceso.pid} />}
    </React.Fragment>
  );
}

export default RowProcess