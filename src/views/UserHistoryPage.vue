<template>
  <div class="d-flex flex-column">
    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <v-btn 
        @click="load_standard_user_historic" 
        elevation="4" 
        size="small">
          Carregar Modelo
        </v-btn>
      </v-col>
    </v-row>
    
     <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <FileUploader  store_dispatch_name="load_user_data_history"/>
      </v-col>
    </v-row>

    <v-row class="flex-1-0 ma-2 pa-2">
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

    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <TableData />
      </v-col>
    </v-row>
  </div>     
</template>

<script>
  import { mapGetters } from 'vuex'
  import FileUploader from '@/components/FileUploader.vue'
  import macde_modelo from '@/assets/files/modelo_macde.json'
  import TableData from '@/components/TableData.vue'
  import { Line as MyLine} from 'vue-chartjs'
  import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

  export default {
    name: 'userHistoryPage',
    components: {FileUploader, TableData, MyLine},
    data() {
      return {
        chartEnergy: {datasets: []},
        chartDemand: {datasets: []}
      }
    },
    computed: {
      ...mapGetters({
          data_file: 'get_user_data_history',
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
      load_standard_user_historic() {
        this.$store.dispatch('load_user_data_history', macde_modelo)
        console.log(this.data_file)
      },

      str2date(dt) {
        let curr = dt.split('/')
        
        // Função Date o mês inicia em 0
        return new Date(curr[2], curr[1] - 1, curr[0])
      },
      
      chartDataDemand() {
        this.chartDemand = createDataSetsTimeSeries( 
          ['off_peak_demand', 'peak_demand'], 
          'date',
          this.data_file)
      },

      chartDataEnergy() {
        this.chartEnergy = createDataSetsTimeSeries( 
          ['off_peak_energy', 'peak_energy'], 
          'date',
          this.data_file)
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
