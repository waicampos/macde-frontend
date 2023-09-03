<template>
  <div class="d-flex flex-column">
    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <v-card
          elevation="0"
        >
          <v-card-title>Etapa Entrada dos dados históricos</v-card-title>               
          <v-card-subtitle>Entrada dos dados que serão utilizados nas simulações.</v-card-subtitle>               
          <v-divider></v-divider>
          <v-card-text>
              <v-row class="text-center pa-0">
                <v-col>
                    <p class="text-justify"> 
                        Toda a aplicação MACDE é baseada no histórico de dados do consumidor. Esses dados estão disponíveis na fatura de energia e devem ser compilados em um arquivo
                        que será enviado para a aplicação.
                        <br><br>
                    </p>
                    <p class="text-justify"> 
                        Os dados podem ser enviados clicando ou arrastando o arquivo diretamente na caixa de entrada abaixo. <br><br>
                    </p>
                    <p class="text-justify"> 
                        É possível carregar os dados, clicando no botão CARREGAR MODELO. Ao carregar um arquivo corretamente os dados do arquivo serão apresentados de
                        forma gráfica e tabular.
                    </p>                    
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="flex-1-0 text-center ma-0 pa-0">
      <v-col cols="4">
        <v-btn 
          @click="load_standard_user_historic" 
          color="warning"
          elevation="4" 
          size="small"
        >
        <span class="hidden-sm-and-down">Carregar Exemplo</span>
            <v-icon 
                size="x-large"
                icon="mdi-file-cabinet"
                end>
          </v-icon>               
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="primary"
          @click="download_standard_user_historic"
          elevation="4" 
          size="small"
        >          
           <span class="hidden-sm-and-down">Baixar Exemplo</span>
            <v-icon 
                size="x-large"
                icon="mdi-download-circle-outline"
                end>
          </v-icon>           
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn 
          @click="clear_user_historic" 
          color="error"
          elevation="4" 
          size="small"
        >
        <span class="hidden-sm-and-down">Limpar dados</span>
            <v-icon 
                size="x-large"
                icon="mdi-broom"
                end>
          </v-icon>              
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="flex-1-0 ma-0 pa-0">
      <v-col 
        cols="12"
          v-for="(msg, index) in get_user_data_history_messages"
          :key="msg.code"
      >
        <MessageViewer 
          :msg="msg"
          v-show="msg"
          @msg_shown='message_shown(index)'
        />
      </v-col>
    </v-row>

    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <FileUploader  
          @newFileUploaded="fileUploaded"  
        />
      </v-col>
    </v-row>

    <v-row 
      v-if="data_file.length"
      class="flex-1-0 ma-2 pa-2"
    >
      <v-col cols="12" :lg="active_meas('energy').length ? 6 : 12">
        <v-sheet rounded="lg" min-height="300">
           <Bar 
              id="bar-data-history-chart-demand-id"
              :data="chartDemand"
              :options="chartOptionsDemand"
            />
        </v-sheet>
      </v-col>
    
        <v-col cols="12" lg="6" v-if="active_meas('energy').length">
          <v-sheet rounded="lg" min-height="300">
            <Bar 
              id="bar-data-history-chart-energy-id"
              :data="chartEnergy"
              :options="chartOptionsEnergy"
            />                 
          </v-sheet>
      </v-col>
    </v-row>    

    <v-row 
      class="flex-1-0 ma-2 pa-2"
    >
      <v-col cols="12">
        <TableData />
      </v-col>
    </v-row>
  </div>     
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import FileUploader from '@/components/FileUploader.vue'
  import MessageViewer from '@/components/MessageViewer.vue'
  import macde_model from '@/assets/files/macde_model.json'
  import TableData from '@/components/TableData.vue'
  import { Bar} from 'vue-chartjs'
  import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
  import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,  TimeScale } from 'chart.js'
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ArcElement, Tooltip, Legend,  TimeScale)
  import 'chartjs-adapter-date-fns';
  import fileDownload from 'js-file-download'
  import { translated_input_file_keys, sequence_headers_input_data_file } from '@/assets/files/consts'

  export default {
    name: 'userHistoryPage',
    components: {FileUploader, TableData, MessageViewer, Bar},
    data() {
      return {
        msg_props: {"text": "", "type": "success"},
        chartEnergy: {datasets: []},
        chartDemand: {datasets: []},
      }
    },
    computed: {
      ...mapGetters('data_history', {
          data_file: 'get_user_data_history',
          get_user_data_history_messages: 'get_user_data_history_messages',
      }),

      ...mapGetters('data_parameters', {
          get_selected_simulation_type: 'get_selected_simulation_type',
      }),

      chartOptionsDemand() {
        let opt = JSON.parse(JSON.stringify(chartOptionsConfig))
        opt.plugins.title.text = "Gráfico de Demanda"
        opt.scales.x.title.text = "Data"
        opt.scales.y.title.text = "Demanda [kW]"

        return opt
      },

      chartOptionsEnergy() {
        let opt = JSON.parse(JSON.stringify(chartOptionsConfig))
        opt.plugins.title.text = "Gráfico de Energia"
        opt.scales.x.title.text = "Data"
        opt.scales.y.title.text = "Energia [kWh]"
        return opt
      },
    },
    methods: {
      ...mapActions('data_history', ['user_data_history_messages', 'delete_item_user_data_history_messages']),

      fileUploaded(val) {      
        val.forEach(item => {                    
          Object.keys(item).forEach((key, index) => {       
            let num = Number(item[key].replace(/\./g, "").replace(/,/g, "."))
            if(!Number.isNaN(num)){
              item[key] = num
            }

            let name_key = translated_input_file_keys[key.toLowerCase()] || sequence_headers_input_data_file[index]
            if(!sequence_headers_input_data_file.includes(key) && !Object.keys(item).includes(name_key)) {              
              item[name_key] = item[key]   
              delete item[key]              
            }            
          })
        })        
        this.$store.dispatch('data_history/load_user_data_history', val)
      },

      active_meas(type_meas) {
        return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
      },

      message_shown(index) {
        this.delete_item_user_data_history_messages(index)
      },

      clear_user_historic() {
        if(this.data_file.length) {
          this.$store.dispatch('data_history/clear_user_data_history')
        }
      },

      load_standard_user_historic() {
        this.$store.dispatch('data_history/load_user_data_history', macde_model)
      },

      download_standard_user_historic() {
        let dt = JSON.parse(JSON.stringify(macde_model))
        dt.forEach(item => {
          Object.keys(item).forEach(key => item[key] = item[key].toString().replace(/\./g, ","))
        })
        fileDownload(this.$papa.unparse(dt, {delimiter: ";",}), 'modelo_macde.csv')
      },
      
      chartDataDemand() {
        this.chartDemand = createDataSetsTimeSeries( 
          this.active_meas('demand'), 
          'date',
          [...this.data_file])
      },

      chartDataEnergy() {
        this.chartEnergy = createDataSetsTimeSeries( 
          this.active_meas('energy'), 
          'date',
          [...this.data_file])
      },
    },
    mounted(){
      this.chartDataDemand()
      this.chartDataEnergy()
    },
    watch: {
      data_file: {
        handler() {
          this.chartDataDemand()
          this.chartDataEnergy()
        },
        deep: true,
        imediate: true,
      }
    },
  }
</script>
