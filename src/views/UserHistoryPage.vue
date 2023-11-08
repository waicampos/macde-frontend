<template>
  <div class="d-flex flex-column">
    <v-row class="flex-1-0">
      <v-col cols="12">
        <v-card
          elevation="0"
        >
          <v-card-title>
            Etapa Entrada dos dados históricos
            <v-icon
              icon="mdi-help-circle"
              color="info"
              size="x-small"
              class="me-2"
              @click="show_message.header = !show_message.header"
            ></v-icon>
          </v-card-title>
          <v-card-subtitle>Entrada dos dados que serão utilizados nas simulações.</v-card-subtitle>               
          <v-divider></v-divider>
          <v-card-text
            v-show="show_message.header"
          >
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

    <!-- Mensagens -->
    <v-row class="flex-1-0 ma-0 pa-0">
      <v-col 
        cols="12"
          v-for="msg in get_user_data_history_messages"
          :key="msg.code"
      >
        <MessageViewer 
          :msg="msg"
          v-show="msg"
          @msg_shown='message_shown(msg.code)'
        />
      </v-col>
    </v-row>

    <!-- Botões -->
    <v-row class="flex-1-0 text-center">
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

    <!-- FileUploader -->
    <v-row class="flex-1-0">
      <v-col cols="12">
        <FileUploader  
          @newFileUploaded="fileUploaded"  
        />
      </v-col>
    </v-row>

    <!-- Modalidade Tarifária -->
    <v-row >                        
        <v-col cols="12">
            <v-select
                v-model="selected_simulation_type"
                label="Modalidade Tarifária"
                :items="simulation_types"
                item-title="text"
                item-value="name"
                variant="outlined"
                return-object
            ></v-select>
        </v-col>                        
    </v-row>

    <!-- Gráficos -->
    <v-row 
      v-if="data_file.length"
      class="flex-1-0"
    >
      <v-col cols="12" :lg="active_meas('energy').length ? 6 : 12">
        <v-sheet rounded="lg" min-height="300">
           <Bar 
              id="bar-data-history-chart-demand-id"
              :data="chartDataSets['demand']"
              :options="chartOptionsDemand"
            />
        </v-sheet>
      </v-col>
    
        <v-col cols="12" lg="6" v-if="active_meas('energy').length">
          <v-sheet rounded="lg" min-height="300">
            <Bar 
              id="bar-data-history-chart-energy-id"
              :data="chartDataSets['energy']"
              :options="chartOptionsEnergy"
            />                 
          </v-sheet>
      </v-col>
    </v-row>    

    <!-- Tabela -->
    <v-row 
      class="flex-1-0 mb-4 pb-4"
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
  import { translated_input_file_keys, change_names_en2pt, sequence_headers_input_data_file, SIMULATION_TYPES } from '@/assets/files/consts'
  import { isAfter as fns_isAfter } from 'date-fns'

  export default {
    name: 'userHistoryPage',
    components: {FileUploader, TableData, MessageViewer, Bar},
    data() {
      return {
        simulation_types: SIMULATION_TYPES,
        msg_props: {"text": "", "type": "success"},
        chartDataSets: {
          energy: {datasets: []},
          demand: {datasets: []},
        },
        show_message: {
                header: false,
        },
      }
    },
    computed: {
      ...mapGetters('data_history', {
          data_file: 'get_user_data_history_raw',
          get_user_data_history_messages: 'get_user_data_history_messages',
      }),

      ...mapGetters('data_parameters', {
          get_selected_simulation_type: 'get_selected_simulation_type',
          get_date_installation_photovoltaic_system: 'get_date_installation_photovoltaic_system',
          get_has_photovoltaic_system: 'get_has_photovoltaic_system',
      }),

      selected_simulation_type: {
          get() {
              return this.get_selected_simulation_type
          },
          set(payload){
              this.set_selected_simulation_type(payload)
          }
      },

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
      ...mapActions('data_history', ['delete_item_user_data_history_messages', 'clear_user_data_history']),
      ...mapActions('data_parameters', ['set_selected_simulation_type']),
      ...mapActions('data_forecast', ['set_forecasted_data']),
      ...mapActions('data_optimize', ['set_optimized_data']),      

      change_names_pt2en(val) {      
        return val.map(item => {  
          let new_obj = {}                  
          Object.keys(item).forEach((key, index) => {                 
            let name_key = translated_input_file_keys[key.toLowerCase()] || sequence_headers_input_data_file[index]
            if(!sequence_headers_input_data_file.includes(key) && !Object.keys(item).includes(name_key)) {              
              new_obj[name_key] = item[key]                         
            }else {
              new_obj[key] = item[key]   
            }         
          })
          return new_obj
        })        
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
        this.$store.dispatch('data_history/load_user_data_history', this.change_names_pt2en(val))
      },

      active_meas(type_meas) {
        return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
      },

      message_shown(index) {
        this.delete_item_user_data_history_messages(index)
      },

      clear_user_historic() {
        if(this.data_file.length) {
          this.clear_user_data_history()
          this.set_forecasted_data([])
          this.set_optimized_data([])
        }
      },

      load_standard_user_historic() {
        this.$store.dispatch('data_history/load_user_data_history', JSON.parse(JSON.stringify(macde_model)))
      },

      download_standard_user_historic() {
        let dt = change_names_en2pt(JSON.parse(JSON.stringify(macde_model)), ['data', 'demanda ou demanda fora de ponta', 'demanda de ponta', 'energia fora de ponta', 'energia de ponta'])
        dt.forEach(item => Object.keys(item).forEach(key => item[key] = item[key].toString().replace(/\./g, ",")))
        fileDownload(this.$papa.unparse(dt, {delimiter: ";",}), 'modelo_macde.csv')
      },
      
      chartData(type_meas) {                      
        let data_filter = 
          (!this.get_has_photovoltaic_system && new Array(this.data_file.length).fill(true)) ||
          this.data_file.map(item => !fns_isAfter(this.get_date_installation_photovoltaic_system, item.date))

        this.chartDataSets[type_meas] = createDataSetsTimeSeries( 
          this.active_meas(type_meas), 
          'date',
          Object.assign([],this.data_file.filter((item, index) => data_filter[index]))
        )        
  
        if(this.get_has_photovoltaic_system) {
          const disabled_data = createDataSetsTimeSeries( 
            this.active_meas(type_meas), 
            'date',
            Object.assign([],this.data_file.filter((item, index) => !data_filter[index]))
          )
          
          disabled_data.datasets.forEach(item => {
            item.backgroundColor = "#BDBDBD"
            item.borderColor = "#757575"
            item.label = item.label + ' (Antes FV)'
            this.chartDataSets[type_meas].datasets.push(item)
          })
        }
      },
    },
    mounted(){
      this.chartData('demand')
      this.chartData('energy')
    },

    watch: {
      get_selected_simulation_type: {
        handler() {
          this.chartData('demand')
          this.chartData('energy')
        },
        deep: true,
        imediate: true,
      },

      data_file: {
        handler() {
          this.chartData('demand')
          this.chartData('energy')
        },
        deep: true,
        imediate: true,
      }
    },
  }
</script>
