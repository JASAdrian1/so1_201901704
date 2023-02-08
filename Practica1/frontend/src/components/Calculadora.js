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
    const [valor, setValor] = useState("")


    useEffect(() => {
        setTextoDisplay(val1+operador+val2)
    }, [val1,val2,operador])
    
    useEffect(() => {
      setOpPresionado(false)
      //
      setTextoDisplay(resultado)
    }, [resultado])

    useEffect(()=>{
        if(valor !== "")setValorBtn({valor,val1,val2,setVal1,setVal2,setResultado,setOpPresionado,setOperador,operador,opPresionado})
        setValor("")
    },[valor])
    

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
                            <td><Boton valorlbl={"7"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"8"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"9"} setValor={setValor}/></td>
                            <td></td>
                            <td><Boton valorlbl={"C"} setValor={setValor}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"4"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"5"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"6"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"x"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"/"} setValor={setValor}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"1"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"2"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"3"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"+"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"-"} setValor={setValor}/></td>
                        </tr>
                        <tr>
                            <td><Boton valorlbl={"0"} setValor={setValor}/></td>
                            <td><Boton valorlbl={"."} setValor={setValor}/></td>
                            <td></td>
                            <td></td>
                            <td><Boton valorlbl={"="} setValor={setValor}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Calculadora