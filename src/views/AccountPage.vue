<script>
    import LineChart from '@/components/charts/LineChart.vue'

    export default {
        components: {LineChart}
}
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="4"
    >
      <LineChart />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <LineChart />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LineChart />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LineChart />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow class="match-height">
        <VCol
          cols="12"
          sm="6"
        >
          <LineChart />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <LineChart v-bind="totalProfit" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <LineChart v-bind="newProject" />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <LineChart />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <LineChart />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <LineChart />
    </VCol>

    <VCol cols="12">
      <LineChart />
    </VCol>
  </VRow>
</template>
