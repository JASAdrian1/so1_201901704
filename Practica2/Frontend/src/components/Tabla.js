import React from 'react'
import RowProcess from './RowProcess'

const Tabla = ({procesos}) => {
  return (
    <div className="tabla-procesos">
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {procesos.map((proceso) => (
            <RowProcess proceso={proceso} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla