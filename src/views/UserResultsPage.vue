<template>
<v-btn @click="this.calculate_optimized_demand_cost()"> OPT</v-btn>
<v-btn @click="this.calculate_contracted_demand_cost()"> CONT</v-btn>
<br />
<br />
TOTAL: OPT
{{optimized_demand_total_cost}}
<br />
<br />
TOTAL: CONTR
{{contracted_demand_total_cost}}


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
                    {{ total_cost_savings }}
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
    v-for="item in Object.keys(optimized_demand_total_cost)" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="optimized_demand_total_cost[item]"
      :demand="unique_optimized_demand_cost[item]"
      title="Demanda Sugerida"
      subtitle="Demanda Sugerida"
    />
  </VCol>
  <VCol
    v-for="item in Object.keys(contracted_demand_total_cost)" :key="item"
    cols=12 md=6 lg=3
    >
    <SingleCard         
      :annual_cost="contracted_demand_total_cost[item]"
      :demand="[current_contracted_demand().filter(curr => curr.name == item)[0].value]"
      title="Demanda Contratada"
      subtitle="Demanda Atual"
    />
  </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="6"
    >
      <Pie :data="data_graph" :options="options_pie" />
    </VCol>

     <VCol
      cols="6"
    >
      <LineChartResults />
    </VCol>

    <VCol
      cols="12"
    >
      <Bar :data="data_bar" :options="options_bar" />
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
    import LineChartResults from '@/components/results/LineChartResults.vue'
    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import TotalEarnings2 from '@/components/results/TotalEarnings2.vue'
    import TableResults from '@/components/results/TableResults.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend)

    export default {
      components: {LineChartResults, TotalEarnings, TotalEarnings2, TableResults, SingleCard, Pie, Bar},
      data() {
        return {
          demand_names: ['demand'],
          data_graph: {
            labels: ['Demanda de Ponta', 'Demanda Fora de Ponta', 'Energia Fora de Ponta', 'Energia de Ponta'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [25, 13, 53, 11]
              }
            ]
          },
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
        ...mapActions('data_results', ['calculate_contracted_demand_cost', 'calculate_optimized_demand_cost']),
      },
        computed: {
          ...mapGetters('data_parameters', {
              current_contracted_demand: 'get_current_contracted_demand'
          }),

          ...mapGetters('data_optimize', {
              optimized: 'get_optimized_data'
          }),

          ...mapGetters('data_forecast', {
            forecasted: 'get_forecasted_data',
          }),

          ...mapGetters('data_results', {
            contracted_demand_cost: 'get_contracted_demand_cost',
            contracted_demand_total_cost: 'get_contracted_demand_total_cost',
            optimized_demand_cost: 'get_optimized_demand_cost',
            optimized_demand_total_cost: 'get_optimized_demand_total_cost',
            total_cost_savings: 'get_total_cost_savings',
          }),   

          unique_optimized_demand_cost() {
            let unique = {}
            this.demand_names.map(dname => {
              let values = this.optimized.map(curr => curr[dname])
              unique[dname] = Array.from(new Set(values))
            })
            
            return unique
          },
        },

        mounted() {          
          if(this.optimized.length){
            this.demand_names = Object.keys(this.optimized[0]).filter(i => i != 'date')    
            //this.get_demand_cost(this.forecasted, this.optimized)
            // if(this.contracted_demand_cost) {
            //   this.calculate_contracted_demand_cost()
            // }
          }          
        }
}

</script>
