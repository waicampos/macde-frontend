<template>
  <VRow>
    <VCol cols=6>
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
                    35.584,14
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
        cols="3"
      >
      <SingleCard />
      </VCol>
    <VCol
      cols="3"
    >
      <SingleCard2 />
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
    import LineChartResults from '@/components/results/LineChartResults.vue'
    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import TotalEarnings2 from '@/components/results/TotalEarnings2.vue'
    import TableResults from '@/components/results/TableResults.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import SingleCard2 from '@/components/results/SingleCard2.vue'
    import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import { Bar } from 'vue-chartjs'
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend)

    export default {
      components: {LineChartResults, TotalEarnings, TotalEarnings2, TableResults, SingleCard, SingleCard2, Pie, Bar},
      data() {
        return {
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
      }
}

</script>
