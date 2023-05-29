<script>
    import LineChart from '@/components/charts/LineChart.vue'
    import LineChartResults from '@/components/results/LineChartResults.vue'
    import TotalEarnings from '@/components/results/TotalEarnings.vue'
    import TableResults from '@/components/results/TableResults.vue'
    import SingleCard from '@/components/results/SingleCard.vue'
    import SingleCard2 from '@/components/results/SingleCard2.vue'
    import EnergyInfo from '@/components/results/EnergyInfo.vue'
    import ProgressCircular from '@/components/results/ProgressCircular.vue'

    export default {
        components: {LineChart, LineChartResults, TotalEarnings, TableResults, SingleCard, SingleCard2, EnergyInfo, ProgressCircular}
}
</script>

<template>
  <VRow>
    <VCol      
      cols="12"
    >
      <EnergyInfo />
    </VCol>

    <VCol      
      cols="12"
      lg="4"
    >
      <TotalEarnings />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <LineChartResults />
    </VCol>

    <VRow>
      <VCol
      cols="8"
      >
        <TableResults />
      </VCol>

      <VCol
        cols="4"
        md="4"
      >
        <VRow>
          <VCol
            cols="12"
          >
          <SingleCard />
          </VCol>
        <VCol
          cols="12"
        >
          <SingleCard2 />
        </VCol>
        </VRow>
      </VCol>
    </VRow>
    
    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <ProgressCircular value= '40' color="teal"/>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <ProgressCircular value= '95' color="warning"/>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <ProgressCircular value= '15' color="info"/>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <ProgressCircular value= '80' color="success"/>
        </VCol>
      </VRow>
    </VCol>

   
  </VRow>
</template>
