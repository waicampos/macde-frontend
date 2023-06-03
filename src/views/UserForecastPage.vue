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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: "user-forecast_page",
    components: {MyLine},
    data() {
        return {
            chartDataByMonth: {datasets: []},
            chartDemandTimeSeries: {datasets: []},
            forecast: {
                "naive": [
                    {
                        "date": "01/01/2022",
                        "peak_demand": 159.6,
                        "off_peak_demand": 254.52,
                        "peak_energy": 4989,
                        "off_peak_energy": 59163
                    },
                    {
                        "date": "01/02/2022",
                        "peak_demand": 547.68,
                        "off_peak_demand": 624.12,
                        "peak_energy": 8206,
                        "off_peak_energy": 118769
                    },
                    {
                        "date": "01/03/2022",
                        "peak_demand": 547.68,
                        "off_peak_demand": 624.12,
                        "peak_energy": 8206,
                        "off_peak_energy": 118769
                    },
                ],
                "double_mean": [
                    {
                        "date": "01/01/2022",
                        "peak_demand": 459.6,
                        "off_peak_demand": 54.52,
                        "peak_energy": 4989,
                        "off_peak_energy": 59163
                    },
                    {
                        "date": "01/02/2022",
                        "peak_demand": 847.68,
                        "off_peak_demand": 824.12,
                        "peak_energy": 8206,
                        "off_peak_energy": 118769
                    },
                    {
                        "date": "01/03/2022",
                        "peak_demand": 947.68,
                        "off_peak_demand": 924.12,
                        "peak_energy": 8206,
                        "off_peak_energy": 118769
                    },
                ],
            },
        }
    },
    computed: {
        ...mapGetters({
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
                let b = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    this.forecast.naive
                )
                b.datasets.forEach( dt => {
                    dt_series.datasets.push(dt)
                })
            }

            if(this.forecast.double_mean.length) {
                let b = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    this.forecast.double_mean
                )
                b.datasets.forEach( dt => {
                    dt_series.datasets.push(dt)
                })
            }
                                            
            return dt_series
        },
        loadNaive() {
            axios
            .post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', this.dados)
            .then(response => {
                this.forecast.naive = response.data;
            })
        },
        loadDoubleMean() {
            axios
            .post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', this.dados2)
            .then(response => {
                this.forecast.double_mean = response.data;
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
