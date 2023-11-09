<template>
    <div class="d-flex flex-column">
        <v-row class="flex-1-0">
            <v-col cols="12">
                <v-card
                    elevation="0"
                >
                    <v-card-title>
                        Etapa de Previsão de Demanda
                        <v-icon
                            icon="mdi-help-circle"
                            color="info"
                            size="x-small"
                            class="me-2"
                            @click="show_message.header = !show_message.header"
                        ></v-icon>
                    </v-card-title>               
                    <v-card-subtitle>Seleção do Modelo de Previsão</v-card-subtitle>               
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row 
                            class="text-center pa-3"
                            v-show="show_message.header"    
                        >
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
                                    - <b>Personalizado:</b> Permite o envio de um arquivo com os valores futuros adquiridos com um método de previsão externo. Outra possibilidade 
                                    é o carregamento de um arquivo previamente salvo da aplicação MACDE;
                                </p>
                            </v-col>
                        </v-row>
                        
                        <BtnOptions />

                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>    

        <!-- Mensagens -->
        <v-row class="flex-1-0 ma-0 pa-0">
            <v-col 
                cols="12"
                v-for="msg in get_user_forecasted_data_messages"
                :key="msg.code"
            >            
                <MessageViewer 
                :msg="msg"
                v-show="msg"
                @msg_shown='message_shown(msg.code)'
                />
            </v-col>
        </v-row>

        <!-- Tipos Modelos -->
        <v-row 
            v-if="!this.get_is_valid_user_data_history && this.chosen_forecast_model.type != 'custom'"
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
                <h4 class="text-red">
                    Ops. Parece que os dados do histórico não foram carregados ou não são válidos. 
                    Os modelos Naive e Média Dupla utilizam estes dados. Verifique os dados na página histórico.
                </h4>
            </v-col>
        </v-row> 

        <!-- File Uploader -->
        <v-row 
            class="flex-1-0"
            v-if="chosen_forecast_model.type == 'custom'"
            >
            <v-col cols="12">
                <FileUploader 
                    @newFileUploaded="fileUploaded"    
                />
            </v-col>
        </v-row>
        
        <!-- Gráficos -->
        <v-row 
            v-if="this.forecasted_data.length"
            class="flex-1-0"
        >
            <v-col cols="12" :lg="active_meas('energy').length ? 6 : 12">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartDataSets['demand']"
                        :options="this.chartTimeSeriesOptionsDemand"
                    />
                </v-sheet>
            </v-col>            
      
            <v-col cols="12" lg="6" v-if="active_meas('energy').length">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-line-forecast-chart-id"
                        :data="chartDataSets['energy']"
                        :options="this.chartTimeSeriesOptionsEnergy"
                    />
                </v-sheet>
            </v-col>            
        </v-row>

        <!-- Tabela Modelos de Previsão -->
        <v-row 
            v-if="this.forecasted_data.length" 
            class="flex-1-0  mb-4 pb-4"
        >
            <v-col cols="12">
                <v-data-table                     
                    :headers="headers"
                    :items="this.forecasted_data"
                    class="elevation-4"
                    :items-per-page-options="items_per_page"
                    items-per-page=12
                    items-per-page-text="Itens por Página:"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Previsão</v-toolbar-title>
                            <v-btn
                                v-if="forecasted_data.length"
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
import { mapGetters, mapActions } from 'vuex'
import fileDownload from 'js-file-download'
import BtnOptions from '@/components/BtnOptions.vue';
import FileUploader from '@/components/FileUploader.vue';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfigDefault } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { MEAS_INFO, ITEMS_PER_PAGE_TABLE, change_names_en2pt, change_names_pt2en } from '@/assets/files/consts'
import MessageViewer from '@/components/MessageViewer.vue'

export default {
    name: "user-forecast_page",
    components: {MyLine, FileUploader, BtnOptions, MessageViewer},
     data() {
      return {       
        show_message: {
                header: false,
        },
        items_per_page: ITEMS_PER_PAGE_TABLE,
        chartDataSets: {
          energy: {datasets: []},
          demand: {datasets: []},
        },
      }
    },
    computed: {
        ...mapGetters('data_history', {
            get_is_valid_user_data_history: 'get_is_valid_user_data_history',
            }
        ),
        
        ...mapGetters('data_forecast', {
            forecasted_data: 'get_forecasted_data', 
            chosen_forecast_model: 'get_chosen_forecast_model',
            get_user_forecasted_data_messages: 'get_user_forecasted_data_messages',
            }
        ),

        ...mapGetters('data_parameters', {
            get_selected_simulation_type: 'get_selected_simulation_type',            
        }),
        
        headers() {
            let names = this.get_selected_simulation_type.meas.map(key => MEAS_INFO[key])            
            names.unshift(
                {
                    title: 'Mês',
                    align: 'start',
                    sortable: false,
                    key: 'month',
                }
            )
            return names
        },

        chartTimeSeriesOptionsDemand() {
            let opt = JSON.parse(JSON.stringify(chartOptionsConfigDefault))
            opt.plugins.title.text = "Gráfico de Demanda"
            opt.scales.x.title.text = "Mês"
            opt.scales.y.title.text = "Demanda [kW]"

            return opt
        },

        chartTimeSeriesOptionsEnergy() {
            let opt = JSON.parse(JSON.stringify(chartOptionsConfigDefault))
            opt.plugins.title.text = "Gráfico de Energia"
            opt.scales.x.title.text = "Mês"
            opt.scales.y.title.text = "Energia [kWh]"

            return opt
        },
    },
    methods: {
        ...mapActions(
            'data_forecast', 
            ['clear_forecasted_data', 'forecast', 'set_forecasted_from_custom_data', 'delete_item_user_forecasted_data_messages', 'clear_user_forecasted_data_messages']),
        ...mapActions('data_optimize', ['clear_optimized_data']),  
        message_shown(index) {
            this.delete_item_user_forecasted_data_messages(index)
        },

        active_meas(type_meas) {
            return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
        },

        fileUploaded(val) {            
            val.forEach(item => {                    
            Object.keys(item).forEach(key => {       
                let num = Number(item[key].replace(/\./g, "").replace(/,/g, "."))
                if(!Number.isNaN(num)){
                item[key] = num
                }
            })
            })   
            this.clear_optimized_data()
            this.set_forecasted_from_custom_data(change_names_pt2en(val))
        },

        download_table_data() { 
            const modality_is_green = ['green_demand', 'green_demand_plus_energy'].includes(this.get_selected_simulation_type.name)    
            let dt = this.forecasted_data.map(i => {return {...i}})
            if(modality_is_green) {          
                dt.forEach(item => {
                    delete item.off_peak_demand
                    delete Object.assign(item, {['off_peak_demand']: item['demand'] })['demand'];            
                    item.peak_demand = ''
                })
            } else {
                dt.forEach(item => delete item.demand)
            }         
            fileDownload(this.$papa.unparse(change_names_en2pt(dt, ['mês', 'demanda ou demanda fora de ponta', 'demanda de ponta', 'energia fora de ponta', 'energia de ponta']), {delimiter: ";",}), 'previsao_macde.csv')
        },

        chartData(type_meas) {  
            this.chartDataSets[type_meas] = createDataSetsTimeSeries( 
            this.active_meas(type_meas), 
            'month',
            Object.assign([], this.forecasted_data)
            )            
        },
        
        changed_forecast_model_type() {
            this.clear_user_forecasted_data_messages()
            if(this.chosen_forecast_model.type != 'custom') {
                this.clear_forecasted_data()
                this.$store.commit("data_forecast/set_is_valid_custom_forecasted_data", false)
                if(this.get_is_valid_user_data_history) {
                    this.forecast()               
                }
            }
        }
    },
    mounted() {
        this.changed_forecast_model_type();
        this.chartData('demand')
        this.chartData('energy')    
    },

    beforeUnmount() {
        this.clear_user_forecasted_data_messages()        
    },

    watch:{
        chosen_forecast_model: {
            handler() {   
                this.clear_forecasted_data()
                if(this.chosen_forecast_model.type == 'custom') {
                    this.$store.commit("data_forecast/set_is_valid_custom_forecasted_data", false)
                } else {
                    this.changed_forecast_model_type();                              
                }
                this.clear_optimized_data()
            },
            deep: true
        },        
        forecasted_data: {
            handler() {
                this.chartData('demand')
                this.chartData('energy')   
            },
            deep: true,
            imediate: true,
}
    }
}
</script>
