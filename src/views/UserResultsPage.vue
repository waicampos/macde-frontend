<template>
  <VRow>   
    <VCol cols=12>
      <v-card elevation="3">
        <v-card-item class="bg-green">               
          <v-card-title>Economia anual</v-card-title>               
          <v-card-subtitle>Economia prevista com alteração do valor de demanda contratada.</v-card-subtitle>               
        </v-card-item>
          <v-divider></v-divider>
          <v-card-text>
              <v-row align="center" no-gutters>
                <v-col
                  class="text-h3 font-weight-bold text-green text-center"
                  cols="8"
                >
                    <span class="text-green text-h6">R$</span>
                    {{ total_cost_savings.toFixed(2) }}
                </v-col>
                <v-col class="text-right">
                  <v-icon
                    icon="mdi-star-face"
                    size="118"
                    color="orange"
                    class="me-1 pb-1"
                  ></v-icon>
                </v-col>
              </v-row>
          </v-card-text>
        </v-card>
  </VCol>
  <!-- <VCol
    v-for="item in Object.keys(optimized_demand_total_cost)" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="optimized_demand_total_cost[item]"
      :demand="unique_optimized_demand_cost[item]"
      title="Demanda Sugerida"
      subtitle="Demanda Sugerida"
    />
  </VCol> -->
  <VCol
    v-for="item in Object.keys(contracted_demand_total_cost)" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="contracted_demand_total_cost[item].toFixed(2)"
      :demand="[current_contracted_demand().filter(curr => curr.name == item)[0].value]"
      title="Demanda Contratada"
      subtitle="Demanda Atual"
    />
  </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="12" lg="6"
    >
      <v-card>
      <v-card-item>
        <v-card-title class="text-center">Custos Demanda Contratada</v-card-title>
        <v-card-subtitle class="text-center">Composição do custo</v-card-subtitle>
      </v-card-item>
      <v-card-text>
      <Pie
        id="pie-costs-results-chart-id"
        :data="this.get_all_contracted_costs_proportional"
        :options="options_pie" 
      />        
      </v-card-text>
      </v-card>
    </VCol>

    <VCol
      cols="12" lg="6"
    >
      <v-card>
      <v-card-item>
        <v-card-title class="text-center">Custos Demanda Sugerida</v-card-title>
        <v-card-subtitle class="text-center">Composição do custo</v-card-subtitle>
      </v-card-item>
      <v-card-text>
      <Pie
        id="pie-costs-results-chart-id"
        :data="this.get_all_optimized_costs_proportional"
        :options="options_pie" 
      />        
      </v-card-text>
      </v-card>
    </VCol>
    
    <VCol
      cols="12"
    >
      <Bar 
        id="bar-costs-results-chart-id"
        :data="chartTimeSeriesData(get_all_measurements_names, this.add_date(this.get_all_costs))"
        :options="options_bar"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="12"
    >
      <MyLine
          id="my-line-costs-results-chart-id"
          :data="chartTimeSeriesData(get_demand_measurements_names, this.optimized)"
          :options="this.chartTimeSeriesOptionsDemand"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol      
      cols="12"
      lg="6"
    >
      <TotalEarnings />
    </VCol>

    <VCol      
      cols="12"
      lg="6"
    >
      <TotalEarnings2 />
    </VCol>

      <VCol
      cols="12"
      >
        <TableResults />
      </VCol>   
  </VRow>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { Line as MyLine} from 'vue-chartjs'
    import LineChartResults from '@/components/results/LineChartResults.vue'
    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import TotalEarnings2 from '@/components/results/TotalEarnings2.vue'
    import TableResults from '@/components/results/TableResults.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import { Chart as ChartJS, Title, ArcElement, PointElement, LineElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'
    import { get_all_measurements_names, get_demand_measurements_names, sum, MEAS_INFO } from '@/assets/files/consts'
    ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, ArcElement, Tooltip, Legend)
    import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'

    export default {
      components: {MyLine, LineChartResults, TotalEarnings, TotalEarnings2, TableResults, SingleCard, Pie, Bar},
      data() {
        return {
          demand_names: ['demand'],         
          data_bar: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            datasets: [
              {
                label: 'Energia de Ponta',
                backgroundColor: '#DD1B16',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              },
              {
                label: 'Energia Fora de Ponta',
                backgroundColor: '#00D8FF',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              },
              {
                label: 'Energia de Ponta',
                backgroundColor: '#41B883',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              },
              {
                label: 'Energia Fora de Ponta',
                backgroundColor: '#E46651',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
              },
            ]
          },
          options_pie: {
            responsive: true,
            maintainAspectRatio: false
          },
          options_bar: {
            plugins: {
              title: {
                display: true,
                text: 'Gráfico de custos mensais'
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          } 
        }
      },
      methods: {
        ...mapActions('data_forecast', ['calculate_contracted_demand_cost', 'calculate_energy_cost']),
        ...mapActions('data_optimize', ['calculate_optimized_demand_cost']),

        add_date(arr) {
          return JSON.parse(JSON.stringify(arr)).map((item, index) => {
              item.date = this.data_bar.labels[index]
              return item
            })
        },
        
        chartTimeSeriesData(keys, data) {                    
          const new_arr = this.add_date(data)
          let dt_series = []
          dt_series = createDataSetsTimeSeries( 
              keys, 
              'date',
              new_arr
          )   
          return dt_series
        },        
      },
        computed: {
          ...mapGetters('data_parameters', {
              current_contracted_demand: 'get_current_contracted_demand'
          }),

          ...mapGetters('data_forecast', {
            contracted_demand_cost: 'get_contracted_demand_cost',
            energy_cost: 'get_energy_cost',
            energy_total_cost: 'get_energy_total_cost',
            contracted_demand_total_cost: 'get_contracted_demand_total_cost',
          }),
          ...mapGetters('data_optimize', {
            optimized_demand_cost: 'get_optimized_demand_cost',
            optimized_demand_total_cost: 'get_optimized_demand_total_cost',
            total_cost_savings: 'get_total_cost_savings',
            optimized: 'get_optimized_data',
          }),

          get_all_costs() {
            let alfa = this.optimized_demand_cost.map((item, index) => {
              return Object.assign(item, this.energy_cost[index])
            })
            return JSON.parse(JSON.stringify(alfa))
          },
          
          get_all_optimized_costs_proportional() {
            let data_graph = {
              labels: [],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                  data: []
                }
              ]
            }

            let total_cost_meas = Object.assign({}, this.optimized_demand_total_cost, this.energy_total_cost)
            let total_Cost = Object.values(total_cost_meas).reduce(sum, 0)            
            Object.keys(total_cost_meas).forEach(key => {              
              data_graph.labels.push(MEAS_INFO[key].title)
              data_graph.datasets[0].data.push(Number(((total_cost_meas[key] / total_Cost) * 100).toFixed(2)))
            })    
            return data_graph
          },

          get_all_contracted_costs_proportional() {
            let data_graph = {
              labels: [],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                  data: []
                }
              ]
            }

            let total_cost_meas = Object.assign({}, this.contracted_demand_total_cost, this.energy_total_cost)
            let total_Cost = Object.values(total_cost_meas).reduce(sum, 0)            
            Object.keys(total_cost_meas).forEach(key => {              
              data_graph.labels.push(MEAS_INFO[key].title)
              data_graph.datasets[0].data.push(Number(((total_cost_meas[key] / total_Cost) * 100).toFixed(2)))
            })
    
            return data_graph
          },

          unique_optimized_demand_cost() {
            let unique = {}
            this.demand_names.map(dname => {
              let values = this.optimized.map(curr => curr[dname])
              unique[dname] = Array.from(new Set(values))
            })
            
            return unique
          },

          get_all_measurements_names() {
            return get_all_measurements_names()
          },

          get_demand_measurements_names() {
            return get_demand_measurements_names()
          },

          chartTimeSeriesOptionsDemand() {
            let opt = JSON.parse(JSON.stringify(chartOptionsConfig))
            opt.plugins.title.text = "Gráfico de Demanda"
            opt.scales.x.title.text = "Data"
            opt.scales.y.title.text = "Demanda [kW]"

            return opt
          },          
        },

        beforeMount() {          
          this.calculate_contracted_demand_cost()
          this.calculate_optimized_demand_cost()
          this.calculate_energy_cost()
        }
}

</script>
