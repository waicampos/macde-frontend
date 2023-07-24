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
                    {{ get_total_cost_savings.toFixed(2) }}                    
                </v-col>
                <v-col class="text-left">
                  
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
  <VCol
    v-for="item in get_demand_measurements_names" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="get_total_optimized_cost_by_key[item]"
      :demand="unique_optimized_demand_cost[item]"
      :title="this.get__title_single_card(item)"
      subtitle="Demanda Sugerida"
    />
  </VCol>
  <VCol
    v-for="item in get_demand_measurements_names" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="get_total_contracted_cost_by_key[item]"
      :demand="[get_current_contracted_demand(item).value]"
      :title="this.get__title_single_card(item)"
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
        :data="get_all_contracted_costs_proportional"
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
        :data="get_all_optimized_costs_proportional"
        :options="options_pie" 
      />        
      </v-card-text>
      </v-card>
    </VCol>
    
    <VCol
      cols="12" lg="6"
    >
      <v-sheet rounded="lg" min-height="300">
        <Bar 
          id="bar-costs-results-chart-id"
          :data="chartTimeSeriesData(get_measurements_names, get_optimized_cost)"
          :options="options_bar"
        />
      </v-sheet>
    </VCol>
 
    <VCol
      cols="12" lg="6"
    >
      <v-sheet rounded="lg" min-height="300">
        <MyLine
            id="my-line-costs-results-chart-id"
            :data="chartTimeSeriesData(get_demand_measurements_names, get_optimized_data)"
            :options="this.chartTimeSeriesOptionsDemand"
        />
      </v-sheet>
    </VCol>
  </VRow>

  <VRow>
    <VCol      
      cols="12"
      lg="6"
    >
      <TotalEarnings cost_type="optimized"/>
    </VCol>

    <VCol      
      cols="12"
      lg="6"
    >
      <TotalEarnings cost_type="contracted"/>
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

    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import TableResults from '@/components/results/TableResults.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import { Chart as ChartJS, Title, ArcElement, PointElement, LineElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'
    import { sum, MEAS_INFO } from '@/assets/files/consts'
    ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, ArcElement, Tooltip, Legend)
    import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'

    export default {
      components: {MyLine, TotalEarnings, TableResults, SingleCard, Pie, Bar},
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
        ...mapActions('data_results', ['calculate_contracted_demand_cost', 'calculate_energy_cost', 'calculate_optimized_demand_cost']),

        get__title_single_card(key) {
          return MEAS_INFO[key].title
        },

        get_all_costs(arr_cost) {
          let alfa = arr_cost.map((item, index) => {
            return Object.assign(item, this.get_energy_cost[index])
          })
          return JSON.parse(JSON.stringify(alfa))
        },

        calculate_total_cost_by_meas(arr) {
          let costs = {}
          if(arr.length) {
            Object.keys(arr[0]).forEach(key => {
              costs[key] = 0
              arr.forEach(item => {
                costs[key] += item[key]
              })  
            })
          }
          return costs
        },

        calculate_total_cost(arr) {          
          return Object.values(this.calculate_total_cost_by_meas(arr)).reduce(sum, 0)
        },

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
        ...mapGetters('data_results', {
          get_contracted_demand_cost: 'get_contracted_demand_cost',
          get_optimized_demand_cost: 'get_optimized_demand_cost',
          get_energy_cost: 'get_energy_cost',
          get_contracted_cost: 'get_contracted_cost',
          get_optimized_cost: 'get_optimized_cost',
          get_total_cost_savings: 'get_total_cost_savings',
          get_total_optimized_cost_by_key: 'get_total_optimized_cost_by_key',
          get_total_contracted_cost_by_key: 'get_total_contracted_cost_by_key',
          get_proportional_optimized_cost: 'get_proportional_optimized_cost',
          get_proportional_contracted_cost: 'get_proportional_contracted_cost',
        }),

        ...mapGetters('data_parameters', {
            get_current_contracted_demand: 'get_current_contracted_demand'
        }),

        ...mapGetters('data_optimize', {
            get_optimized_data: 'get_optimized_data',
            get_optimized_data_by_key: 'get_optimized_data_by_key',
        }),

        ...mapGetters('data_configurations', {
            get_measurements_names: 'get_measurements_names',
            get_demand_measurements_names: 'get_demand_measurements_names',
        }),
                        
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
                
          Object.keys(this.get_proportional_optimized_cost).forEach(key => {              
            data_graph.labels.push(MEAS_INFO[key].title)
            data_graph.datasets[0].data.push(this.get_proportional_optimized_cost[key])
          })    
          console.log("OPTIMIZED: ", data_graph)
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

           Object.keys(this.get_proportional_contracted_cost).forEach(key => {              
            data_graph.labels.push(MEAS_INFO[key].title)
            data_graph.datasets[0].data.push(this.get_proportional_contracted_cost[key])
          })    
          console.log("CONTRACTED: ", data_graph)
          return data_graph
        },

        unique_optimized_demand_cost() {
          let unique = {}          
          this.get_demand_measurements_names.forEach(key => {
            unique[key] = Array.from(new Set(this.get_optimized_data_by_key(key)))
          })
          return unique
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
