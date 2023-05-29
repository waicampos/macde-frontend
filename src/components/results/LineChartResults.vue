<template>

  <VCard elevation="8">
    <VCardItem>
      <VCardTitle>
        <v-icon
            icon="mdi-chart-line"
            color="green-darken-1"
            size="large"
            class="me-2"
        ></v-icon>
        Demandas
      </VCardTitle>
    </VCardItem>

    <VCardText class="pt-4">
    <Line
      :style= "myStyles"
      id="my-line-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </VCardText>
  </VCard>

</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return{
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: 'Ponta',
            backgroundColor: '#4E342E',
            data: [146, 689, 715, 614, 408, 333, 286, 320, 428, 478, 532, 496]
          },
                    {
            label: 'Fora de Ponta',
            backgroundColor: '#E65100',
            data: [392, 810, 844, 793, 653, 469, 281, 316, 566, 567, 729, 697]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    } 
  },
  computed: {
    myStyles () {
      return {
        height: '300px',
        position: 'relative'
      }
    }
  }
}
</script>