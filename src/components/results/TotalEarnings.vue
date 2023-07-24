<template>
  <VCard elevation="8">
    <VCardItem class="bg-blue-darken-2">
      <VCardTitle>
        {{ get_title }} 
      </VCardTitle>

      <VCardSubtitle>
        CUSTO ANUAL
      </VCardSubtitle>
    </VCardItem>

    <VCardText class="pt-4">
      <div class="d-flex align-center justify-center">
        <h4 class="text-h4 text-orange-darken-3 font-weight-medium">
          <span class="text-subtitle-1 text-orange-darken-3 font-weight-medium">R$</span> {{ get_total_cost }}
        </h4>        
      </div>
      <div class="d-flex align-center justify-center">
        <span class="text-caption text-center">Custo anual total considerando a contratação do valor da demanda sugerida pela aplicação MACDE.</span>
      </div>
      
    <v-list>
      <v-list-item
        v-for="(cost, item) in total_cost_by_key"
        :key="item"
        class="ma-4"
      >
        <v-list-item-title>{{ get_cost_title(item) }} </v-list-item-title>
        <v-list-item-subtitle>Custo: <span class="text-subtitle-1 text-orange-darken-3 font-weight-medium">
                R$ {{ cost.toFixed(2) }}
              </span></v-list-item-subtitle>
    
        <v-row>
            <v-col cols=12>
              <VProgressLinear
                  :color="get_chart_background(item)"
                  :model-value="proportional_costs[item]"
                  height="15"
                >
                <template v-slot:default="{ value }">
                  <strong>{{ value }}%</strong>
                </template>
                </VProgressLinear>
            </v-col>
          </v-row>
      </v-list-item>
    </v-list>
    </VCardText>
  </VCard>
</template>

<script>
import { MEAS_INFO, sum } from '@/assets/files/consts'
import {chartDataConfig} from '@/components/config/chartConfig'
import { mapGetters } from 'vuex';

export default {
  props: ['cost_type'],

  methods: {
    get_cost_title(key) {
       return MEAS_INFO[key].title
    },
    
    get_chart_background(key) {
      return chartDataConfig[key].backgroundColor
    },

  },

  computed: {
    ...mapGetters('data_configurations', {
      get_tariff_modality: 'get_tariff_modality',
      get_demand_measurements_names: 'get_demand_measurements_names',
      get_all_measurements_names: 'get_all_measurements_names'
    }),

    ...mapGetters('data_results', {
      get_contracted_demand_cost: 'get_contracted_demand_cost',
      get_optimized_demand_cost: 'get_optimized_demand_cost',
      get_energy_cost: 'get_energy_cost',
      get_contracted_cost: 'get_contracted_cost',
      get_optimized_cost: 'get_optimized_cost',
      get_total_contracted_cost_by_key: 'get_total_contracted_cost_by_key',
      get_total_optimized_cost_by_key: 'get_total_optimized_cost_by_key',
      get_proportional_optimized_cost: 'get_proportional_optimized_cost',
      get_proportional_contracted_cost: 'get_proportional_contracted_cost',
    }),

    total_cost_by_key() {
      return (this.cost_type == "optimized") ? this.get_total_optimized_cost_by_key : this.get_total_contracted_cost_by_key
    },

    proportional_costs() {
      return (this.cost_type == "optimized") ? this.get_proportional_optimized_cost : this.get_proportional_contracted_cost
    },

    get_total_cost() {
      return Object.values(this.total_cost_by_key).reduce(sum,0).toFixed(2)
    },

    get_title() {
      return (this.cost_type == "optimized") ? 'DEMANDA SUGERIDA' : 'DEMANDA CONTRATADA'
    },
  },
}
</script>
