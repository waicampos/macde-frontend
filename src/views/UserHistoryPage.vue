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

    <v-row class="flex-1-0 ma-0 pa-0">
      <v-col cols="6 text-center">
        <v-btn 
          @click="load_standard_user_historic" 
          color="warning"
          elevation="4" 
          size="small"
        >
          Carregar Exemplo
        </v-btn>
      </v-col>
      <v-col cols="6 text-center">
        <v-btn 
          @click="clear_user_historic" 
          color="error"
          elevation="4" 
          size="small"
        >
          Limpar dados
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
          store_dispatch_name="data_history/load_user_data_history"
          @messages="fileUploaderMsg"  
        />
      </v-col>
    </v-row>

    <v-row 
      v-if="data_file.length"
      class="flex-1-0 ma-2 pa-2"
    >
      <v-col cols="12" lg="6">
        <v-sheet rounded="lg" min-height="300">
          <MyLine
            id="my-line-historic-chart-demand-id"
            :data="chartDemand"
            :options="this.chartOptionsDemand"
          />
        </v-sheet>
      </v-col>
    
        <v-col cols="12" lg="6">
          <v-sheet rounded="lg" min-height="300">
            <MyLine
              id="my-line-historic-chart-energy-id"
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
  import macde_modelo from '@/assets/files/modelo_macde.json'
  import TableData from '@/components/TableData.vue'
  import { Line as MyLine} from 'vue-chartjs'
  import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

  export default {
    name: 'userHistoryPage',
    components: {FileUploader, TableData, MyLine, MessageViewer},
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
          data_file_raw: 'get_user_data_history_raw',
          get_time_serie_errors: 'get_time_serie_errors',
          get_user_data_history_messages: 'get_user_data_history_messages',
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
      ...mapActions('data_history', ['clear_time_serie_errors', 'user_data_history_messages', 'delete_item_user_data_history_messages']),
      
      message_shown(index) {
        this.delete_item_user_data_history_messages(index)
      },

      fileUploaderMsg(msg) {
        this.user_data_history_messages(msg)        
      },

      set_msg(m, type_msg) {
        this.msg_props.text = m
        this.msg_props.type = type_msg
        setTimeout(() => {
          this.msg_props.text = ""
        }, 3000)
      },

    clear_user_historic() {
      if(this.data_file.length) {
        this.$store.dispatch('data_history/clear_user_data_history')
      }
    },

      load_standard_user_historic() {
        this.$store.dispatch('data_history/load_user_data_history', macde_modelo)
        this.set_msg("Dados carregados com sucesso.", "success")
      },
      
      chartDataDemand() {
        this.chartDemand = createDataSetsTimeSeries( 
          ['off_peak_demand', 'peak_demand'], 
          'date',
          [...this.data_file])
      },

      chartDataEnergy() {
        this.chartEnergy = createDataSetsTimeSeries( 
          ['off_peak_energy', 'peak_energy'], 
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
          if(this.data_file.length){ 
            this.set_msg("Dados carregados com sucesso.", "success")
          }
          else {
            this.set_msg("Dados apagados com sucesso.", "info")
            this.clear_time_serie_errors
          }

          this.chartDataDemand()
          this.chartDataEnergy()
        },
        deep: true,
        imediate: true,
      }
    },
  }
</script>
