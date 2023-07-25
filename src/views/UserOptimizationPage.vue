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

        <!-- Seleção aumento e redução de demanda -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col cols="4">
                <v-select
                    v-model="tariff_modality"
                    label="Modalidade tarifária"
                    :items="tariff_modality_types"
                    item-title="text"
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
                
                    hide-details
                ></v-switch>
            </v-col>
        </v-row>
    
      <v-row>
            <v-col cols="12 text-center">
                <v-btn 
                    :disabled="loading"
                    :loading="loading"
                    @click="this.loadExploratory()"
                    class="text-none mb-4"
                    color="indigo-darken-3"
                    variant="flat"
                    size="x-large"                     
                >
                    Otimizar
                </v-btn>
            </v-col>
        </v-row>

        <!-- Gráficos -->
        <v-row 
            v-if="this.get_optimized.length"
            class="flex-1-0 ma-0 pa-0"
        >
            <v-col cols="12 text-justify">
                <h3>Gráficos dos valores otimizados</h3>
                <p>Nos gráficos abaixo são apresentados o resultado da otimização da demanda.</p>
            </v-col>
             <v-col                 
                v-for="demand_name in get_demand_measurements_names" :key="demand_name"
                cols=12 :lg="get_tariff_modality.name == 'green' ? 12 : 6"
            >
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        :data="chartTimeSeriesData([demand_name])"
                    />
                </v-sheet>
            </v-col>    
        </v-row>

        <!-- Download de arquivo -->
        <v-row v-if="this.get_optimized.length" class="flex-1-0 ma-2 pa-2">
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

        <!-- Valores Previstos -->
        <v-row class="flex-1-0 ma-0pa-0">
            <v-col cols="12 text-justify">
                <h3>Tabela Otimizados</h3>
                <p>A tabela abaixo apresenta os valores ótimos de demanda. Caso a opção de Aumento ou Redução de Demanda (1x) esteja habilitada, são apresentados
                    dois valores diferentes para contratação da demanda.
                </p>
            </v-col>
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="this.get_optimized"
                    class="elevation-4"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import fileDownload from 'js-file-download'
    import { Line as MyLine} from 'vue-chartjs'
    import { createDataSetsTimeSeries } from '@/components/config/chartConfig'
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
    import { MEAS_INFO,TARIFF_MODALITY_TYPES } from '@/assets/files/consts'    

    export default {
        name: "userOptimizationPage",
        components: {MyLine},
        data() {
            return {      
                tariff_modality_types: TARIFF_MODALITY_TYPES,   
                loading: false,       
            }
        },

        computed: {
            ...mapGetters('data_forecast', {
                get_forecasted: 'get_forecasted_data',
            }),

            ...mapGetters('data_optimize', {
                get_optimized: 'get_optimized_data',
            }),

            ...mapGetters('data_configurations', {
              get_tariff_modality: 'get_tariff_modality',
              get_demand_measurements_names: 'get_demand_measurements_names'
            }),

            tariff_modality: {
                get() {
                    return this.get_tariff_modality
                },
                set(payload){
                    this.set_tariff_modality(payload)
                }
            },

            has_demand_variation: {
                get() {
                    return this.$store.state.data_parameters.has_demand_variation
                },
                set(payload){
                    this.$store.commit('data_parameters/set_has_demand_variation', payload)
                }
            },

            headers() {
                let names = this.get_demand_measurements_names.map(key => MEAS_INFO[key])
                names.unshift(
                    {
                        title: 'Date',
                        align: 'start',
                        sortable: false,
                        key: 'date',
                    }
                )
                return names
            },
        },

        methods: {        
            ...mapActions('data_optimize', ['set_optimized_data', 'optimize']),
            ...mapActions('data_configurations', ['set_tariff_modality']),
        
            download() {
                let dt = new Date()
                let filename = `${dt.getFullYear()}_${dt.getMonth()}_${dt.getDate()}_macde_otimizacao.json`
                fileDownload(JSON.stringify(this.get_optimized), filename);
            },

            chartTimeSeriesData(keys) {  
                let data = [...this.get_forecasted]

                if(this.tariff_modality.value == 1) {
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
                        [...this.get_optimized]
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

            loadExploratory() {
                this.loading  = true
                this.optimize()
                               
            },
        },

        watch: {
            get_optimized: {
                handler() {
                    if(this.loading) {
                        this.loading  = false  
                    }
                }
            }
        }
    }
</script>

<style>

</style>