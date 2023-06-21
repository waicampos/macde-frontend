<template>
    <div class="d-flex flex-column">
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12">
                <v-card
                    elevation="0"
                >
                    <v-card-title>Etapa Otimização</v-card-title>               
                    <v-card-subtitle>Otimização dos valores de demanda contratada.</v-card-subtitle>               
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="text-center pa-3">
                            <v-col>
                                <p class="text-justify"> 
                                    Com base nos valores previstos é otimizado o valor da demanda contratada. O processo de otimização busca o valor de demanda, a ser contratada,
                                    que represente o menor custo.
                                    <br><br>
                                </p>
                                <p class="text-justify"> 
                                    Atualmente está disponível o modelo de otimização exploratória.
                                </p>                    
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>

        <!-- Seleção modalidade tarifária e aumento e redução de demanda -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="4">
                <v-select
                    v-model="selected_modality"
                    label="Modalidade tarifária"
                    :items="tariff_modality"
                    item-title="name"
                    item-value="value"
                    variant="outlined"
                    return-object
                ></v-select>
            </v-col>
            <v-col cols="8">
                <v-switch
                    v-model="has_demand_variation"
                    label="Aumento ou Redução de Demanda (1x)"
                    color="orange"
                    true-value= true
                    false-value= false
                    hide-details
                ></v-switch>
            </v-col>
        </v-row>
    
      <v-row>
            <v-col cols="12">
                <v-btn @click="this.loadExploratory()">Exploratória</v-btn>
            </v-col>
        </v-row>

        <!-- Valores Previstos -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="12 text-justify">
                <h3>Tabela dos valores previstos</h3>
                <p>A tabela abaixo apresenta os valores obtidos na etapa de previsão e que serão utilizados como entrada para o modelo de otimização.</p>
            </v-col>
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers1"
                    :items="this.forecasted"
                    class="elevation-4"
                >
                </v-data-table>
            </v-col>
        </v-row>

        <!-- Download de arquivo -->
        <v-row v-if="this.forecasted.length" class="flex-1-0 ma-2 pa-2">
            <v-col cols="12" class=" text-end">
                <v-btn 
                    class="bg-red"
                    elevation = 2
                    @click="download()"
                >
                    <v-icon 
                        color="black"
                        size="x-large"
                        icon="mdi-file-download-outline"
                        start>
                    </v-icon>
                    <span class="hidden-sm-and-down">Baixar dados da Otimização</span>
                </v-btn>
            </v-col>
        </v-row>

        <!-- Gráficos -->
        <v-row 
            v-if="this.optimized.length"
            class="flex-1-0 ma-2 pa-2"
        >
            <v-col cols="12 text-justify">
                <h3>Tabela dos valores previstos</h3>
                <p>A tabela abaixo apresenta os valores obtidos na etapa de previsão e que serão utilizados como entrada para o modelo de otimização.</p>
            </v-col>
            <v-col                 
                v-if="this.selected_modality.value == '1'"
                cols="12"
            >
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-optimization-chart-demand-id"
                        :data="chartTimeSeriesData(['demand'])"
                    />
                </v-sheet>
            </v-col>
            <v-col 
                v-if="this.selected_modality.value == '2'"
                cols="12" lg="6"
            >
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-optimization-chart-peak-demand-id"
                        :data="chartTimeSeriesData(['peak_demand'])"
                    />
                </v-sheet>
            </v-col>
            <v-col 
                v-if="this.selected_modality.value == '2'"
                cols="12" lg="6"
            >
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-optimization-chart-off-peak-demand-id"
                        :data="chartTimeSeriesData(['off_peak_demand'])"
                    />
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import fileDownload from 'js-file-download'
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


    export default {
        name: "userOptimizationPage",
        components: {MyLine},
        data() {
            return {                
                selected_modality: {name: 'Verde', value: '1'},
                tariff_modality:  [{name: 'Verde', value: '1'}, {name: 'Azul', value: '2'}],
                headers1: [
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
            ...mapGetters('data_forecast', {
                forecasted: 'get_forecasted_data',
            }),

            ...mapGetters('data_optimize', {
                optimized: 'get_optimized_data'
            }),

            has_demand_variation: {
            get() {
                return this.$store.state.data_parameters.has_demand_variation
            },
            set(payload){
                this.$store.commit('data_parameters/set_has_demand_variation', payload)
            }
        },

            headers() {
                let arr = []
                arr.push(
                    {
                        title: 'Date',                       
                        align: 'start',
                        sortable: false,
                        key: 'date',
                    }
                )

                if(this.selected_modality.value == 1) {
                    arr.push({ title: 'Demanda', key: 'demand' })
                } 
                else {
                    arr.push(
                        { title: 'Demanda de Ponta', key: 'peak_demand' },
                        { title: 'Demanda Fora de Ponta', key: 'off_peak_demand' }
                    )
                }

                return arr
                
            },
        },

        methods: {        
            ...mapActions('data_optimize', ['set_optimized_data']),
        
            download() {
                let dt = new Date()
                let filename = `${dt.getFullYear()}_${dt.getMonth()}_${dt.getDate()}_macde_otimizacao.json`
                fileDownload(JSON.stringify(this.optimized), filename);
            },

            chartTimeSeriesData(keys) {  
                let data = [...this.forecasted]

                if(this.selected_modality.value == 1) {
                    data = data.map((item) => {
                        item['demand'] = Math.max(item.peak_demand, item.off_peak_demand)
                        return item
                    })              
                }
                
                let dt = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    data
                )
                
                let dt_optimized = createDataSetsTimeSeries(
                        keys,
                        'date',
                        [...this.optimized]
                )
                dt_optimized.datasets[0].label += ' Contratada'
                dt_optimized.datasets[0].backgroundColor = "#BDBDBD"
                dt_optimized.datasets[0].borderColor = "#757575"
                dt_optimized.datasets[0].borderDash = [5, 5]

                dt_optimized.datasets.forEach( dt_item => {
                    dt.datasets.push(dt_item)
                })

                return dt
            },
            convert2naive(key) {
                return this.forecasted.map((curr) => {
                    return curr[key]
                })
            },
            create_dates(size, current_year) {
                let ans = []
                let range = [...Array(size).keys()]
                for(let i in range){
                    let date = new Date(current_year, i)
                    ans.push({
                        'date': `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                    })
                }
                return ans
            },

            get_bigger_date_forecast() {
                let mod_data = JSON.parse(JSON.stringify(this.forecasted));
                mod_data.forEach((curr, i, arr) => {
                    let dt = this.str2date(curr.date)
                    arr[i]['year'] = dt.getFullYear()
                })

                let all_date = mod_data.map(curr => {
                    return curr['year']
                })
                return Math.max(...all_date)
            },

            maxDemand(arr1, arr2) {
                return arr1.map(
                    (curr, index) => (curr >= arr2[index]) ? curr : arr2[index]
                )
            },
                    
            loadExploratory() {
                let peak_demand = this.convert2naive('peak_demand')
                let off_peak_demand = this.convert2naive('off_peak_demand')
                let green_demand = this.maxDemand(peak_demand, off_peak_demand)
                let blue_demand = [[...peak_demand], ...[off_peak_demand]]

                let arr_demand = [...green_demand]
                if(this.selected_modality.value == 2) {
                    arr_demand = [...blue_demand]
                }

                const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/exploratory/${this.selected_modality.value}/${this.has_demand_variation ? "1" : "0"}`

                axios
                .post(addr, {"data": arr_demand})
                .then(response => {
                    let ans = this.create_dates(12, '2022')
                    
                    if(this.selected_modality.value == 1) {
                        for(let i in ans) {
                            ans[i].demand = response.data[i]
                        }
                    }
                    else{
                        for(let i in ans) {
                            ans[i].peak_demand = response.data[0][i],
                            ans[i].off_peak_demand = response.data[1][i]                  
                        }
                    }
                    this.set_optimized_data(ans);
                })
            },
        }
    }
</script>

<style>

</style>