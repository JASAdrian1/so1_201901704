import React from 'react'
import './Boton.css'


function setValorBoton(props){
    props.setValor(props.valorlbl)
}

const Boton = ({valorlbl,setValor}) => {
  return (
    <button onClick={()=>setValorBoton({valorlbl,setValor})}>{valorlbl}</button>
  )
}

//()=>setValor({valor,val1,val2,setVal1,setVal2,setResultado,setOpPresionado,setOperador,opPresionado})

export default Boton