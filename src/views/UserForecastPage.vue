<template>
    <div class="d-flex flex-column">
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12">
                <v-card
                    elevation="0"
                >
                    <v-card-title>Etapa de Previsão de Demanda</v-card-title>               
                    <v-card-subtitle>Seleção do Modelo de Previsão</v-card-subtitle>               
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="text-center pa-3">
                            <v-col>
                                <p class="text-justify"> 
                                    Nesta etapa, é realizado a pevisão de demanda com base no histórico do consumidor. Os valores previstos são utilizados como dados de entrada para 
                                    a etapa de otimização. Atualmente o MACDE oferece dois modelos de previsões: Naïve e Média dupla. Também é possível fazer upload dos valores de previsão
                                    obtidos com o uso de outros modelos.  
                                    <br><br>
                                </p>
                                <p class="text-justify"> 
                                    Modelos de Previsão:
                                </p>
                                <p class="text-justify"> 
                                    - <b>Média Dupla:</b> Modelo padrão utilizado pelo MACDE;
                                </p>
                                <p class="text-justify"> 
                                    - <b>Naive:</b> Define todos os valores futuros iguais ao valor da última observação, acrescido da previsão de crescimento da unidade consumidora;
                                </p>
                                <p class="text-justify"> 
                                    - <b>Externo:</b> Permite o envio de um arquivo com os valores futuros adquiridos com um método de previsão externo;
                                </p>
                            </v-col>
                        </v-row>
                        
                        <BtnOptions />

                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>
        </div>

    <!-- Tipos Modelos -->
    <div class="d-flex flex-column">        
        <v-row 
            v-if="!this.data_file.length && this.chosen_forecast_model.type != 'custom'"
            class="flex-1-0 ma-2 pa-2 bg-grey-lighten-2"
        >
            <v-col class="text-center" >
                <v-icon
                    icon="mdi-alert"
                    color="red-accent-4"
                    size="80"
                    class="me-2"
                ></v-icon>
            </v-col>
            <v-col class="text-center" cols="12">
                <h4 class="text-red">Ops. Parece que os dados do histórico não foram carregados. Os modelos Naive e Média Dupla utilizam estes dados.</h4>
            </v-col>
        </v-row> 

        <!-- File Uploader -->
         <v-row 
            class="flex-1-0 ma-2 pa-2"
            v-if="chosen_forecast_model.type == 'custom'"
         >
            <v-col cols="12">
                <FileUploader store_dispatch_name="data_forecast/set_forecasted_data"/>
            </v-col>
        </v-row>

        <!-- Modelos de Previsão -->
        <v-row v-if="this.forecasted_data.length" class="flex-1-0 ma-2 pa-2">
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="this.forecasted_data"
                    class="elevation-4"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </div>

    <div 
        v-if="this.forecasted_data.length"
        class="d-flex flex-column"
    >
        <!-- Título dos gráficos -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col class="text-center" cols='12'>
                <h1>Gráficos dos Dados Históricos + Previsão</h1>
            </v-col>
            <v-divider></v-divider>
        </v-row>

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
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios';
import BtnOptions from '@/components/BtnOptions.vue';
import FileUploader from '@/components/FileUploader.vue';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfig, chartDataConfig } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    name: "user-forecast_page",
    components: {MyLine, FileUploader, BtnOptions},
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
            ]
        }
    },
    computed: {
        ...mapGetters('data_history', {
            data_file: 'get_user_data_history'
            }
        ),
        ...mapGetters('data_forecast', {
            forecasted_data: 'get_forecasted_data', 
            chosen_forecast_model: 'get_chosen_forecast_model'
            }
        ),
        
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
        ...mapActions('data_forecast', ['set_forecasted_data', 'set_chosen_forecast_model']),

        chartTimeSeriesData(keys) {
            let dt_series = []
            dt_series = createDataSetsTimeSeries( 
                keys, 
                'date',
                [...this.data_file]
            )
                         
            let dt_data = createDataSetsTimeSeries( 
                keys, 
                'date',
                [...this.forecasted_data]
            )
            dt_data.datasets[0].backgroundColor = "#BDBDBD"
            dt_data.datasets[0].borderColor = "#757575"
            dt_data.datasets[0].borderDash = [5, 5]
            
            console.log(dt_data)
            dt_data.datasets.forEach( dt => {
                dt_series.datasets.push(dt)
            })
                                                        
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
            const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/naive`
            
            Promise.all([
                axios.post(addr, {"data": peak_demand}),
                axios.post(addr, {"data": off_peak_demand}),
                axios.post(addr, {"data": peak_energy}),
                axios.post(addr, {"data": off_peak_energy})
            ])
            .then(response => {
                this.set_forecasted_data(this.join_date_arr(response))
            })
        },
        loadDoubleMean() {
            let peak_demand = this.convert2doublemean('peak_demand')
            let off_peak_demand = this.convert2doublemean('off_peak_demand')
            let peak_energy = this.convert2doublemean('peak_energy')
            let off_peak_energy = this.convert2doublemean('off_peak_energy')
            const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/doublemean`
            Promise.all([
                axios.post(addr, {"data": peak_demand}),
                axios.post(addr, {"data": off_peak_demand}),
                axios.post(addr, {"data": peak_energy}),
                axios.post(addr, {"data": off_peak_energy})
            ]).then(response => {
                this.set_forecasted_data(this.join_date_arr(response))
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
    watch:{
        chosen_forecast_model: {
            handler() {         
                this.set_forecasted_data([])

                if(this.data_file.length) {
                    if(this.chosen_forecast_model.type == 'naive') {
                        this.loadNaive()
                    }
                    else if(this.chosen_forecast_model.type == 'doublemean') {
                        this.loadDoubleMean()
                    }               
                }
                
            },
            deep: true
        }
    }
}
</script>
