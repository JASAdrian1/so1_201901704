import React from 'react'

const LogRow = ({data}) => {
    let {Val1,Val2,Op,Resultado,Fecha} = data
  return (
        <tr>
            <td>{Val1}</td>
            <td>{Val2}</td>
            <td>{Op}</td>
            <td>{Resultado}</td>
            <td>{Fecha}</td>
        </tr>
  )
}

export default LogRow