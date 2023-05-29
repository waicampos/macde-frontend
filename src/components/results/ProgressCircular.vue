<template>
 <v-card elevation="8">
  <div class="text-center">
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :model-value="value"
      :color="color"
    >
      {{ value }}
    </v-progress-circular>
  </div>
</v-card >
</template>

<script>
  export default {
    props: {
        value: Number,
        color: String
    }

  }
</script>

<style scoped>
    .v-progress-circular {
    margin: 1rem;
    }
</style>