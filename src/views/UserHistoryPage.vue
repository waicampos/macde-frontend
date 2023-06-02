<template>
  <div class="d-flex flex-column">
    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12">
        <FileUploader />
      </v-col>
    </v-row>
    
    <v-row class="flex-1-0 ma-2 pa-2">
      <v-col cols="12" lg="6">
        <v-sheet rounded="lg" min-height="300">
          <MyLine
            id="my-line-historic-chart-demand-id"
            :data="chartDemand"
            :options="this.chartOptions"
          />
        </v-sheet>
      </v-col>
    
        <v-col cols="12" lg="6">
          <v-sheet rounded="lg" min-height="300">
            <MyLine
              id="my-line-historic-chart-energy-id"
              :styles="myStyles"
              :data="chartEnergy"
              :options="chartOptions"
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
  import TableData from '@/components/TableData.vue'
  import { Line as MyLine} from 'vue-chartjs'
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
    
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      str2date(dt) {
        let curr = dt.split('/')
        
        // Função Date o mês inicia em 0
        return new Date(curr[2], curr[1] - 1, curr[0])
      },

      chartDataDemand() {
        this.chartDemand = {datasets: []}
        this.chartDemand.datasets.push({
            label: 'Ponta',
            data: this.data_file,
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'peak_demand',
            },
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5'
        })

        this.chartDemand.datasets.push({
            label: 'Fora de Ponta',
            data: this.data_file,
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'off_peak_demand',
            },
            borderColor: '#B71C1C',
            backgroundColor: '#E53935'
        })
      },
      
      chartDataEnergy() {
        this.chartEnergy = {datasets: []}
        this.chartEnergy.datasets.push({
            label: 'Ponta',
            data: this.data_file,
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'peak_energy',
            },
            borderColor: '#E65100',
            backgroundColor: '#FB8C00'
        })

        this.chartEnergy.datasets.push({
            label: 'Fora de Ponta',
            data: this.data_file,
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'off_peak_energy',
            },
            borderColor: '#1B5E20',
            backgroundColor: '#43A047'
        })
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
