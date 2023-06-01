<template>
 <v-sheet class="d-flex flex-column">
    <div class="flex-1-0 ma-2 pa-2">
      <FileUploader />
    </div>

    <div class="flex-1-0 ma-2 pa-2">
      <TableData />
    </div>

    <div class="flex-1-0 ma-2 pa-2">
      <MyLine
        id="my-line-historic-chart-id"
        :data="chartData"
      />
    </div>  
    
</v-sheet>
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
          chartData: {datasets: []},
      }
    },
    computed: {
        ...mapGetters({
            data_file: 'get_user_data_history',
        })
    },
    methods: {
      str2date(dt) {
        let curr = dt.split('/')
        
        // Função Date o mês inicia em 0
        return new Date(curr[2], curr[1] - 1, curr[0])
      },
      create_datasets_time_series() {
          this.chartData = {datasets: []}
          this.chartData.datasets.push({
              label: 'Histórico',
              data: this.data_file,
              parsing: {
                  xAxisKey: 'date',
                  yAxisKey: 'peak_demand',
              },
              borderColor: '#36A2EB',
              backgroundColor: '#9BD0F5'
          })
      },
    },
    watch: {
      data_file: function() {
          this.create_datasets_time_series()
      }
    },
    mounted() {
      this.create_datasets_time_series()
    },
  }
</script>
