export default function setValor(props) {
    if(props.valor === "C"){
        props.setVal1("")
        props.setVal2("")
        props.setResultado("")
        props.setOperador("")
        props.setOpPresionado(false)
        return
    }
    if (props.valor !== "="){
        if(props.opPresionado === false){
            if(props.valor === "+" || props.valor === "-" || props.valor === "/" || props.valor === "x"){
                props.setOperador(props.valor)
                props.setOpPresionado(true)
                return
            }
            props.setVal1(props.val1+props.valor)
        }else{
            if(props.valor === "+" || props.valor === "-" || props.valor === "/" || props.valor === "x") return
            props.setVal2(props.val2+props.valor)
        }
    }else{
        if(props.opPresionado === false){
            props.setResultado(props.val1)
        }else{
            if(props.operador === "+"){
                props.setResultado(Number(props.val1)+Number(props.val2))
            }else if(props.operador === "-"){
                props.setResultado(Number(props.val1)-Number(props.val2))
            }else if(props.operador === "x"){
                props.setResultado(Number(props.val1)*Number(props.val2))
            }else if(props.operador === "/"){
                props.setResultado(Number(props.val1)/Number(props.val2))
            }
        }
        props.setVal1("")
        props.setVal2("")
        props.setOperador("")
        props.setOpPresionado(false)
    }
    
}