import React, { useEffect, useState } from 'react'
import Boton from './Boton'
import "./Calculadora.css"
import setValorBtn from '../helpers/setValor'

const Calculadora = () => {
    const [val1, setVal1] = useState("")
    const [val2, setVal2] = useState("")
    const [operador, setOperador] = useState("")
    const [resultado, setResultado] = useState("")
    const [textoDisplay, setTextoDisplay] = useState("")

    const [opPresionado, setOpPresionado] = useState(false)
    const [valorPresionado, setValorPresionado] = useState("")


    useEffect(() => {
        setTextoDisplay(val1+operador+val2)
    }, [val1,val2,operador])
    
    useEffect(() => {
      setOpPresionado(false)
      //
      setTextoDisplay(resultado)
    }, [resultado])

    useEffect(()=>{
        if(valorPresionado !== "")setValorBtn({valor:valorPresionado,val1,val2,setVal1,setVal2,setResultado,setOpPresionado,setOperador,operador,opPresionado})
        setValorPresionado("")
    },[valorPresionado])
    

  return (
    <div>
        <div className='calculadora'>
            <div className='calculadora-top'>
                <input className='display' id='display' value={textoDisplay} readOnly></input>
            </div>
            <div className='teclado'>
                <table>
                    <tbody>
                        <tr>
                            <td><Boton valorlbl={"7"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"8"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"9"} setValor={setValorPresionado}/></td>
                            <td></td>
                            <td><Boton valorlbl={"C"} setValor={setValorPresionado}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"4"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"5"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"6"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"x"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"/"} setValor={setValorPresionado}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"1"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"2"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"3"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"+"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"-"} setValor={setValorPresionado}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"0"} setValor={setValorPresionado}/></td>
                            <td><Boton valorlbl={"."} setValor={setValorPresionado}/></td>
                            <td></td>
                            <td></td>
                            <td><Boton valorlbl={"="} setValor={setValorPresionado}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Calculadora