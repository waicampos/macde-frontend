<template>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
        <v-divider class="mb-5 mt-5"></v-divider>
      {{ new Date().getFullYear() }} — <strong>MACDE</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
    name: 'FooterPage',
}
</script>