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
        let operacion ={
            "val1":props.val1,
            "val2":props.val2,
            "op":props.operador
        }
        postOperacion("http://localhost:8080/resultado",operacion)
        .then((data)=> data.json())
        .then((data)=>props.setResultado(data.resultado))
        
        props.setVal1("")
        props.setVal2("")
        props.setOperador("")
        props.setOpPresionado(false)
    }
    
}

async function postOperacion(url='',data={}){
    const response = await fetch(url,{
        method:"POST",
        mode:"cors",    
        crossorigin: true,  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response
}
