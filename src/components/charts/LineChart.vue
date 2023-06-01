<template>
  <MyLine      
    id="my-line-parsing-chart-id"
    :data="chartData"
  />
  
</template>

<script>
import { mapGetters } from 'vuex'
import { Line as MyLine} from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
 
export default {
  name: 'LineChart',
  components: { MyLine },
  data() {
    return{
      chartData: {datasets: []}
    } 
  },
  computed: {
    ...mapGetters({
      data_file: 'get_user_data_history'
    }),
  },
  watch: {
    data_file: function() {
      this.create_datasets()
    }
  },
  mounted() {
    this.create_datasets()
  },
  methods: {
    str2date(dt) {
      let curr = dt.split('/')
      
      // Função Date o mês inicia em 0
      return new Date(curr[2], curr[1] - 1, curr[0])
    },
    date2str(dt) {
      return `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`
    },
    groupBy(array, key) {
      return array.reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
      }, {})
    },

    create_datasets() {
      this.chartData = {datasets: []}
      let mod_data = JSON.parse(JSON.stringify(this.data_file))
      mod_data.forEach((curr, i, arr) => {
        let dt = this.str2date(curr.date)
        arr[i]['month'] = dt.getMonth().toString()
        arr[i]['year'] = dt.getFullYear().toString()         

      })
      let agrouped_data = this.groupBy(mod_data, 'year')
      for(var dt_name in agrouped_data) {
        this.chartData.datasets.push({
            label: dt_name,
            data: agrouped_data[dt_name],
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'peak_demand',
            },
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5'
        })
      }
    },
  },
}
</script>
