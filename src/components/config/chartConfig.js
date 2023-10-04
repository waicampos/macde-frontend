export const chartDataConfig = {
    'demand': {
        name: 'demand', 
        label: "Demanda",
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
    },

    'peak_demand': {
        name: 'peak_demand', 
        label: "Demanda de Ponta",
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
    },
    'off_peak_demand': {
        name: 'off_peak_demand', 
        label: "Demanda Fora de Ponta",
        borderColor: '#B71C1C',
        backgroundColor: '#E53935',
    },
    'peak_energy': {
        name: 'peak_energy', 
        label: "Energia de Ponta",
        borderColor: '#E65100',
        backgroundColor: '#FB8C00',
    },
    'off_peak_energy': {
        name: 'off_peak_energy', 
        label: "Energia Fora de Ponta",
        borderColor: '#1B5E20',
        backgroundColor: '#43A047',
    },
    'naive': {
        name: 'naive', 
        label: "Previsão Naive",
        borderColor: '#757575',
        backgroundColor: '#E0E0E0',
    }
    ,
    'double_mean': {
        name: 'double_mean', 
        label: "Previsão Média Dupla",
        borderColor: '#3E2723',
        backgroundColor: '#6D4C41',
    }
}

export const chartOptionsConfig = {
    plugins: {
        title : {
            display: true,
            text: 'Título do Gráfico'
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            type: 'time',            
            time: {
                unit: "month",
                parser: "dd/MM/yyyy",
                tooltipFormat: "MM/yyyy",
                unitStepSize: 1,
                displayFormats: {
                    'month': 'MM/yy'
                  }
            },
            title: {
                display: true,
                text: 'Label X axis'
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Label Y axis'
            }
        },
    }
}

export const chartOptionsConfigDefault = {
    plugins: {
        title : {
            display: true,
            text: 'Título do Gráfico'
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {            
            title: {
                display: true,
                text: 'Label X axis'
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Label Y axis'
            }
        },
    }
}

export function createDataSetsTimeSeries(keys, xAxis, data_raw) {
    let modelData = {datasets: []}
    keys.forEach(i => {
      modelData.datasets.push({
        label: chartDataConfig[i].label,
        data:  data_raw,
        parsing: {
            xAxisKey: xAxis,
            yAxisKey: chartDataConfig[i].name,
        },
        borderColor: chartDataConfig[i].borderColor,
        backgroundColor: chartDataConfig[i].backgroundColor
      })
    })
    return modelData
  }
