<template>
    <div class="d-flex flex-column">
        <v-row class="flex-1-0">
            <v-col cols="12">
                <v-card
                    elevation="0"
                >
                    <v-card-title>
                        Etapa Otimização
                        <v-icon
                            icon="mdi-help-circle"
                            color="info"
                            size="x-small"
                            class="me-2"
                            @click="show_message.header = !show_message.header"
                        ></v-icon>
                    </v-card-title>               
                    <v-card-subtitle>Otimização dos valores de demanda contratada.</v-card-subtitle>               
                    <v-divider></v-divider>
                    <v-card-text
                        v-show="show_message.header"
                    >
                        <v-row class="text-center pa-3">
                            <v-col>
                                <p class="text-justify"> 
                                    Com base nos valores previstos é otimizado o valor da demanda contratada. O processo de otimização busca o valor de demanda, a ser contratada,
                                    que represente o menor custo. Atualmente está disponível o modelo de otimização exploratória.
                                    <br>
                                </p>                                                    
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>       

        <!-- Aumento e redução de demanda-->
        <v-row class="flex-1-0">
            <v-col class="pt-0 mt-0" cols="12">
                <v-switch
                    v-model="has_demand_variation"
                    label="Aumento ou Redução de Demanda (1x)"
                    color="orange"                
                    hide-details
                ></v-switch>
            </v-col>
        </v-row>
        
        <!-- Mensagem de erro para dados de previsão não carregados-->
        <v-row 
            v-if="!this.get_forecasted_data.length"
            class="flex-1-0 bg-grey-lighten-2"
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
                <h4 class="text-red">Não há dados previstos ou houve alteração no valor do tipo de simulação. É necessário realizar a previsão dos dados antes da otimização.</h4>
            </v-col>
        </v-row> 

        <!-- Otimizar -->
        <v-row
            v-if="this.get_forecasted_data.length"
        >
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
            v-if="this.get_optimized_data.length && this.get_forecasted_data.length"
            class="flex-1-0 ma-0 pa-0"
        >            
            <v-col cols=12>
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-optimize-chart-id"
                        :data="chartDataSets['demand']"
                        :options="this.chartTimeSeriesOptionsDemand"
                    />
                </v-sheet>
            </v-col>    
        </v-row>       

        <!-- Tabela Valores Previstos -->
        <v-row 
            v-if="this.get_optimized_data.length && this.get_forecasted_data.length" 
            class="flex-1-0  mb-4 pb-4"
        >            
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="this.get_optimized_data"
                    class="elevation-4"
                    :items-per-page-options="items_per_page"
                    items-per-page=12
                    items-per-page-text="Itens por Página:"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Otimização</v-toolbar-title>
                            <v-btn
                                v-if="this.get_optimized_data.length"
                                color="red"
                                dark
                                class="mb-2"
                                @click="download_table_data()"
                                >
                                <v-icon
                                size="large"
                                class="me-2"
                                >
                                mdi-download-circle
                                </v-icon>
                                Baixar Tabela
                            </v-btn>            
                        </v-toolbar>                        
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import fileDownload from 'js-file-download'
    import { Line as MyLine} from 'vue-chartjs'
    import { createDataSetsTimeSeries, chartOptionsConfigDefault } from '@/components/config/chartConfig'
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
    import { MEAS_INFO, ITEMS_PER_PAGE_TABLE, change_names_en2pt } from '@/assets/files/consts'    

    export default {
        name: "userOptimizationPage",
        components: {MyLine},
        data() {
            return {                      
                loading: false,
                items_per_page: ITEMS_PER_PAGE_TABLE,
                show_message: {
                        header: false,
                },
                chartDataSets: {                    
                    demand: {datasets: []},
                },         
            }
        },

        computed: {
            ...mapGetters('data_forecast', {
                get_forecasted_data: 'get_forecasted_data',
            }),

            ...mapGetters('data_optimize', {
                get_optimized_data: 'get_optimized_data',
            }),

            ...mapGetters('data_parameters', {
                get_selected_simulation_type: 'get_selected_simulation_type',
            }),

            chartTimeSeriesOptionsDemand() {
                let opt = JSON.parse(JSON.stringify(chartOptionsConfigDefault))
                opt.plugins.title.text = "Gráfico de Demanda"
                opt.scales.x.title.text = "Mês"
                opt.scales.y.title.text = "Demanda [kW]"

                return opt
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
                let names = this.get_selected_simulation_type.meas
                    .filter(i => i.includes('demand'))
                    .map(key => MEAS_INFO[key])
                names.unshift(
                    {
                        title: 'Mês',
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
            ...mapActions('data_parameters', ['set_selected_simulation_type']),        
        
            active_meas(type_meas) {
                return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
            },

            chartData(type_meas) {  
                this.chartDataSets[type_meas] = createDataSetsTimeSeries( 
                this.active_meas(type_meas), 
                'date',
                Object.assign([], this.get_optimized_data)
                )             
                this.chartDataSets[type_meas].datasets.forEach(dt => {
                    dt.label += ' Sugerida'                                
                })                                

                let forecast_dataset = createDataSetsTimeSeries( 
                this.active_meas(type_meas), 
                'date',
                Object.assign([], this.get_forecasted_data)
                )              
                
                forecast_dataset.datasets.forEach(dt => {
                    dt.label += ' Prevista'                    
                    dt.borderDash = [5, 5]
                    this.chartDataSets[type_meas].datasets.push(dt)
                })                
            },

            download_table_data() {                                                              
                fileDownload(this.$papa.unparse(change_names_en2pt(this.get_optimized_data), {delimiter: ";",}), 'otimizacao_macde.csv')
            },
           
            loadExploratory() {
                this.loading  = true
                this.optimize()                               
            },
        },

        mounted() {
            this.chartData('demand')
        },

        watch: {
            get_optimized_data: {
                handler() {
                    this.chartData('demand')
                    if(this.loading) {
                        this.loading  = false  
                    }
                }
            },           
        }
    }
</script>

<style>

</style>