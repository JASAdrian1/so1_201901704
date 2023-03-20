import Chart from "react-apexcharts"
import React from 'react'

const Grafica = (props) => {
    const series = [{
        name: props.labels,
        data: props.datos
    }]
    const options =  {
      chart: {
        height: 1700,
        type: 'line',
        zoom: {
          enabled: false 
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: props.titulo,
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        type:'numeric'
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
      fill: {
        type: 'pattern',
        pattern: {
          style: 'verticalLines',
          width: 6,
          height: 6,
          strokeWidth: 2
        }
      },
      
    }

  return (
    <div id="chart">
        <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default Grafica