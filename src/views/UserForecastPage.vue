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
                <FileUploader 
                    @newFileUploaded="fileUploaded"    
                />
            </v-col>
        </v-row>

        <!-- Título tabela de previsão -->
        <v-row  v-if="this.forecasted_data.length" class="flex-1-0 ma-2 pa-2">
            <v-col class="text-center" cols='12'>
                <h1>Resultados de Previsão</h1>
            </v-col>
            <v-divider></v-divider>
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

        <!-- Download de arquivo -->
        <v-row v-if="this.forecasted_data.length" class="flex-1-0 ma-2 pa-2">
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
                    <span class="hidden-sm-and-down">Baixar dados da Previsão</span>
                </v-btn>
            </v-col>
        </v-row>

    <div 
        v-if="this.forecasted_data.length"
        class="d-flex flex-column"
    >
        <!-- Título dos gráficos -->
        <v-row class="flex-1-0 ma-2 pa-2">
            <v-col class="text-center" cols='12'>
                <h1>Gráficos de Previsão</h1>
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
import fileDownload from 'js-file-download'
import BtnOptions from '@/components/BtnOptions.vue';
import FileUploader from '@/components/FileUploader.vue';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { MEAS_INFO } from '@/assets/files/consts'

export default {
    name: "user-forecast_page",
    components: {MyLine, FileUploader, BtnOptions},
    computed: {
        ...mapGetters('data_history', {
            data_file: 'get_user_data_history',
            }
        ),
        
        ...mapGetters('data_forecast', {
            forecasted_data: 'get_forecasted_data', 
            chosen_forecast_model: 'get_chosen_forecast_model',
            }
        ),

        ...mapGetters('data_configurations', {
            tariff_modality: 'get_tariff_modality',
            get_measurements_names: 'get_measurements_names'
        }),
        
        headers() {
            let names = this.get_measurements_names.map(key => MEAS_INFO[key])            
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
        ...mapActions('data_forecast', ['set_forecasted_data', 'forecast']),

        fileUploaded(val) {            
            this.$store.dispatch('data_forecast/set_forecasted_data', val)
        },

        download() {
            let dt = new Date()
            let filename = `${dt.getFullYear()}_${dt.getMonth()}_${dt.getDate()}_macde_forecast.json`
            fileDownload(this.forecasted_data, filename);
        },

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
            
            dt_data.datasets.forEach( dt => {
                dt_series.datasets.push(dt)
            })
                                                        
            return dt_series
        },
        
        changed_forecast_model_type() {
            this.set_forecasted_data([])
            if(this.data_file.length > 0 && this.chosen_forecast_model.type != 'custom' ) {
                this.forecast()
            }
        }
    },
    mounted() {
        this.changed_forecast_model_type();
    },

    watch:{
        chosen_forecast_model: {
            handler() {         
                this.changed_forecast_model_type();
            },
            deep: true
        }
    }
}
</script>
