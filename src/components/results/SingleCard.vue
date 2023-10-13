<template>
  <v-card
    class="mx-auto elevation-6 rounded-ts-xl rounded-be-xl"
  >
    <v-card-item>
      <v-card-title class="text-grey-darken-3 font-weight-bold text-subtitle-1">{{ title }}</v-card-title>
      <v-card-subtitle class="text-grey-darken-3 font-weight-bold text-caption">
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon>
        {{ subtitle }}
      </v-card-subtitle>
    </v-card-item>

    <v-divider 
        color="#000000"
        thickness="3px"
    ></v-divider>

    <v-card-text class="py-1">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h4 font-weight-bold text-light-blue-darken-4 text-center"
          cols="12"
        >
          {{ this.demand.join('/') }}
         <span class="text-subtitle-1 font-weight-bold text-light-blue-darken-4 text-center">kW</span>
          <v-divider class="ma-3"></v-divider>
        </v-col>

      </v-row>
    </v-card-text>

    <v-row align="center" no-gutters>
        <v-col
          class="text-caption font-weight-bold text-red-accent-4 text-center mt-3"
          cols="12"
        >
          <v-icon
                icon="mdi-cash"
                color="grey-darken-3"
                size="large"
                class="me-2"
            ></v-icon>
            <span class="text-grey-darken-3 font-weight-bold">Custo anual (R$): </span>
        </v-col>
        <v-col 
          class="text-red-accent-4 text-h6 font-weight-bold text-center">
          
          <span v-if="annual_cost">{{ currency_format(annual_cost) }}</span>
          <span v-else>-</span>
        </v-col>
      </v-row>
    
  </v-card>
</template>

<script>
import { currency_separator } from '@/assets/files/consts'

export default {
  props: {
    annual_cost: Number,
    demand: Array,
    title: String,
    subtitle: String,
  },
  methods: {
    currency_format(value) {          
      return currency_separator(value)
    },
  }
  
}
</script>
