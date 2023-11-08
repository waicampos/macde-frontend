<template>
  <div class="d-flex flex-column">
    <v-row class="flex-1-0">
      <v-col cols="12">
          <v-card
              elevation="0"
          >
              <v-card-title>
                  Etapa Resultados
                  <v-icon
                      icon="mdi-help-circle"
                      color="info"
                      size="x-small"
                      class="me-2"
                      @click="show_message.header = !show_message.header"
                  ></v-icon>
              </v-card-title>               
              <v-card-subtitle>Resultados da simulação.</v-card-subtitle>               
              <v-divider></v-divider>
              <v-card-text
                  v-show="show_message.header"
              >
                  <v-row class="text-center pa-3">
                      <v-col>
                          <p class="text-justify"> 
                              Resultados apresentados com base nas etapas anteriores.
                              <br>
                          </p>                                                    
                      </v-col>
                  </v-row>
              </v-card-text>
              <v-divider></v-divider>
          </v-card>
      </v-col>
    </v-row>
    
    <!-- Mensagem de dados não carregados -->
    <v-row 
        v-if="!this.get_optimized_data.length"
        class="flex-1-0 bg-grey-lighten-2"
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
            <h4 class="text-red">Os resultados só estarão disponíveis após todas as etapas anteriores estarem concluídas: Histórico, Previsão e Otimização.</h4>
        </v-col>
    </v-row> 

    <v-row
      v-if="this.get_optimized_data.length"
    >   
      <v-col cols=12>
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
                      {{ currency_format(get_total_cost_savings) }}                    
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
      </v-col>

      <v-col
        v-for="item in this.active_meas('demand')" :key="item"
        cols=12 md=6 lg=3
        >
        <SingleCard         
          :annual_cost="get_total_optimized_cost_by_key[item]"
          :demand="unique_optimized_demand_cost[item]"
          :title="this.get__title_single_card(item)"
          subtitle="Demanda Sugerida"
        />
      </v-col>

      <v-col
        v-for="item in this.active_meas('demand')" :key="item"
        cols=12 md=6 lg=3
        >
        <SingleCard         
          :annual_cost="get_total_contracted_cost_by_key[item]"
          :demand="[get_current_contracted_demand(item).value]"
          :title="this.get__title_single_card(item)"
          subtitle="Demanda Atual"
        />
      </v-col>

    </v-row>

    <v-row
      v-if="this.get_optimized_data.length"
    >  
      <v-col
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
      </v-col>

      <v-col
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
      </v-col>
      
      <v-col
        cols="12" lg="6"
      >
        <v-sheet rounded="lg" min-height="300">
          <Bar 
            id="bar-costs-results-chart-id"
            :data="chartBarTimeSeriesData(this.get_selected_simulation_type.meas, get_optimized_cost)"
            :options="options_bar"
          />
        </v-sheet>
      </v-col>
  
      <v-col
        cols="12" lg="6"
      >
        <v-sheet rounded="lg" min-height="300">
          <MyLine
              id="my-line-costs-results-chart-id"
              :data="chartTimeSeriesData(active_meas('demand'), get_optimized_data)"            
          />
        </v-sheet> 
      </v-col>
    </v-row>

    <v-row
      v-if="this.get_optimized_data.length"
    >  
      <v-col      
        cols="12"
        lg="6"
      >
        <TotalEarnings cost_type="optimized"/>
      </v-col>

      <v-col      
        cols="12"
        lg="6"
      >
        <TotalEarnings cost_type="contracted"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { Line as MyLine} from 'vue-chartjs'

    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import { Chart as ChartJS, Title, ArcElement, PointElement, LineElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'
    import { sum, MEAS_INFO, currency_separator } from '@/assets/files/consts'
    ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, ArcElement, Tooltip, Legend)
    import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'

    export default {
      components: {MyLine, TotalEarnings, SingleCard, Pie, Bar},
      data() {
        return {
          show_message: {
                  header: false,
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

        active_meas(type_meas) {
            return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
        },

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
        
        chartBarTimeSeriesData(keys, data){
          data.forEach((item, index) => item.month = (index + 1).toString())    
          return createDataSetsTimeSeries(keys, 'month', data)
        },

        chartTimeSeriesData(keys, data) {
          return createDataSetsTimeSeries(keys, 'month', data)              
        },   
        
        currency_format(value) {          
          return currency_separator(value)
        },
      },
      computed: {
        ...mapGetters('data_results', {
          get_energy_cost: 'get_energy_cost',          
          get_optimized_cost: 'get_optimized_cost',
          get_total_cost_savings: 'get_total_cost_savings',
          get_total_optimized_cost_by_key: 'get_total_optimized_cost_by_key',
          get_total_contracted_cost_by_key: 'get_total_contracted_cost_by_key',
          get_proportional_optimized_cost: 'get_proportional_optimized_cost',
          get_proportional_contracted_cost: 'get_proportional_contracted_cost',
        }),

        ...mapGetters('data_parameters', {
            get_current_contracted_demand: 'get_current_contracted_demand',
            get_selected_simulation_type: 'get_selected_simulation_type',
        }),

        ...mapGetters('data_optimize', {
            get_optimized_data: 'get_optimized_data',
            get_optimized_data_by_key: 'get_optimized_data_by_key',
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
          return data_graph
        },

        unique_optimized_demand_cost() {
          let unique = {}          
          this.active_meas('demand').forEach(key => {
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
        if(this.get_optimized_data.length) {
          this.calculate_contracted_demand_cost()
          this.calculate_optimized_demand_cost()
          this.calculate_energy_cost()
        }     
      }
    }

</script>
