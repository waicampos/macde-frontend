<template>
    <div class="d-flex flex-column">
        <!-- Gráficos de demanda -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartTimeSeriesData(['peak_demand'])"
                        :options="this.chartTimeSeriesOptionsDemand"
                    />
                </v-sheet>
            </v-col>
            <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartTimeSeriesData(['off_peak_demand'])"
                        :options="this.chartTimeSeriesOptionsDemand"
                    />
                </v-sheet>
            </v-col>
        </v-row>
        <!-- Gráficos de energia -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartTimeSeriesData(['peak_energy'])"
                        :options="this.chartTimeSeriesOptionsEnergy"
                    />
                </v-sheet>
            </v-col>
            <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartTimeSeriesData(['off_peak_energy'])"
                        :options="this.chartTimeSeriesOptionsEnergy"
                    />
                </v-sheet>
            </v-col>
        </v-row>

        <!-- Modelo de Previsão Naive -->
         <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12">
                <v-btn @click="this.loadNaive()">NAIVE</v-btn>
            </v-col>
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="forecast.naive"
                    class="elevation-4"
                >
                </v-data-table>
            </v-col>
        </v-row>

        <!-- Modelo de Previsão Média Dupla -->
         <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12">
                <v-btn @click="this.loadDoubleMean()">Média Dupla</v-btn>
            </v-col>     
             <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="forecast.double_mean"
                    class="elevation-4"                    
                >
                </v-data-table>
            </v-col>       
        </v-row>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfig, chartDataConfig } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: "user-forecast_page",
    components: {MyLine},
    data() {
        return {
             headers: [
                {
                    title: 'Date',
                    align: 'start',
                    sortable: false,
                    key: 'date',
                },
                { title: 'Demanda de Ponta', key: 'peak_demand' },
                { title: 'Demanda Fora de Ponta', key: 'off_peak_demand' },
                { title: 'Energia de Ponta', key: 'peak_energy' },
                { title: 'Energia Fora de Ponta', key: 'off_peak_energy' },
            ],
            forecast: {
                "naive": [],
                "double_mean": [],
            },
        }
    },
    computed: {
        ...mapGetters('data_history', {
            data_file: 'get_user_data_history',
        }),
        
        chartTimeSeriesOptionsDemand() {
            let opt = JSON.parse(JSON.stringify(chartOptionsConfig))
            opt.plugins.title.text = "Gráfico de Demanda"
            opt.scales.x.title.text = "Data"
            opt.scales.y.title.text = "Demanda [kW]"

            return opt
        },

        chartTimeSeriesOptionsEnergy() {
            let opt = JSON.parse(JSON.stringify(chartOptionsConfig))
            opt.plugins.title.text = "Gráfico de Energia"
            opt.scales.x.title.text = "Data"
            opt.scales.y.title.text = "Energia [kWh]"

            return opt
        },
    },
    methods: {
        chartTimeSeriesData(keys) {
            let dt_series = createDataSetsTimeSeries( 
                keys, 
                'date',
                JSON.parse(JSON.stringify(this.data_file))
            )
                         
            if(this.forecast.naive.length) {
                let dt_naive = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    JSON.parse(JSON.stringify(this.forecast.naive))
                )
                dt_naive.datasets[0].label = chartDataConfig['naive'].label
                dt_naive.datasets[0].label = chartDataConfig['naive'].label
                dt_naive.datasets[0].borderColor = chartDataConfig['naive'].borderColor
                dt_naive.datasets[0].backgroundColor = chartDataConfig['naive'].backgroundColor
                
                dt_naive.datasets.forEach( dt => {
                    dt_series.datasets.push(dt)
                })
            }

            if(this.forecast.double_mean.length) {
                let dt_double_mean = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    JSON.parse(JSON.stringify(this.forecast.double_mean))
                )
                    dt_double_mean.datasets[0].label = chartDataConfig['double_mean'].label
                    dt_double_mean.datasets[0].label = chartDataConfig['double_mean'].label
                    dt_double_mean.datasets[0].borderColor = chartDataConfig['double_mean'].borderColor
                    dt_double_mean.datasets[0].backgroundColor = chartDataConfig['double_mean'].backgroundColor

                    dt_double_mean.datasets.forEach( dt => {
                        dt_series.datasets.push(dt)
                })
            }
                                            
            return dt_series
        },

        convert2naive(key) {            
            return this.data_file.map((curr) => {
                return curr[key]
            })
        },

        convert2doublemean(key) {                        
            let mod_data = JSON.parse(JSON.stringify(this.data_file));
            mod_data.forEach((curr, i, arr) => {
                let dt = this.str2date(curr.date)
                arr[i]['month'] = dt.getMonth().toString()
                arr[i]['year'] = dt.getFullYear().toString()         
            })
            let agrouped = this.groupBy(mod_data, 'year')
            let arr = []

            for(let name in agrouped){                
                arr.push(
                    agrouped[name].map((curr) => {
                        return curr[key]
                    })
                )
            }
            
            return arr
        },
        
        join_date_arr(arr) {            
            let current_year = this.get_bigger_date_forecast() + 1
            let ans = []
            let range = [...Array(12).keys()]
            for(let i in range){
                let date = new Date(current_year, i)
                ans.push({                    
                    'date': `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    'peak_demand':  arr[0].data[i],
                    'off_peak_demand': arr[1].data[i],
                    'peak_energy':  arr[2].data[i],
                    'off_peak_energy':  arr[3].data[i]                    
                })
            }
            return ans
        },

        get_bigger_date_forecast() {
            let mod_data = JSON.parse(JSON.stringify(this.data_file));
            mod_data.forEach((curr, i, arr) => {
                let dt = this.str2date(curr.date)
                arr[i]['year'] = dt.getFullYear()
            })

            let all_date = mod_data.map(curr => {
                return curr['year']
            })
            return Math.max(...all_date)
        },

        loadNaive() {
            let peak_demand = this.convert2naive('peak_demand')
            let off_peak_demand = this.convert2naive('off_peak_demand')
            let peak_energy = this.convert2naive('peak_energy')
            let off_peak_energy = this.convert2naive('off_peak_energy')
            
            Promise.all([
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', {"data": peak_demand}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', {"data": off_peak_demand}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', {"data": peak_energy}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', {"data": off_peak_energy})
            ])
            .then(response => {
                this.forecast.naive = this.join_date_arr(response)
            })
        },
        loadDoubleMean() {
            let peak_demand = this.convert2doublemean('peak_demand')
            let off_peak_demand = this.convert2doublemean('off_peak_demand')
            let peak_energy = this.convert2doublemean('peak_energy')
            let off_peak_energy = this.convert2doublemean('off_peak_energy')
        
            Promise.all([
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', {"data": peak_demand}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', {"data": off_peak_demand}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', {"data": peak_energy}),
                axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', {"data": off_peak_energy})
            ]).then(response => {
                this.forecast.double_mean = this.join_date_arr(response)                
            })
        },
        str2date(dt) {
            let curr = dt.split('/')
            
            // Função Date o mês inicia em 0
            return new Date(curr[2], curr[1] - 1, curr[0])
        },
        date2str(dt) {
            return `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`
        },
        groupBy(array, key) {
            return array.reduce((hash, obj) => {
                if(obj[key] === undefined) return hash; 
                return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
            }, {})
        },
    },
}
</script>
