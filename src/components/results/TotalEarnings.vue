<script setup>

const earnings = [
   {
    title: 'Demanda Fora de Ponta',
    color: '#E53935',
    subtitle: 'Custo Demanda',
    amount: 175584.14,
    progress: 'primary',
  },
  {
    title: 'Demanda de Ponta',
    color: '#9BD0F5',
    subtitle: 'Custo Demanda',
    amount: 325377.60,
    progress: 'primary',
  },
  {
    title: 'Energia',
    color: '#FB8C00',
    subtitle: 'Custo Energia de Ponta',
    amount: 140779.44,
    progress: 'info',
  },
  {
    title: 'Energia',
    color: '#43A047',
    subtitle: 'Custo Energia Fora de Ponta',
    amount: 713224.05,
    progress: 'secondary',
  },
]
</script>

<template>
  <VCard elevation="8">
    <VCardItem class="bg-blue-darken-2">
      <VCardTitle>
        DEMANDA SUGERIDA 
      </VCardTitle>

      <VCardSubtitle>
        CUSTO ANUAL
      </VCardSubtitle>
    </VCardItem>

    <VCardText class="pt-4">
      <div class="d-flex align-center justify-center">
        <h4 class="text-h4 text-orange-darken-3 font-weight-medium">
          <span class="text-subtitle-1 text-orange-darken-3 font-weight-medium">R$</span> {{ total_cost}}
        </h4>
        <span class="text-success">
          <VIcon
            size="30"
            icon="mdi-menu-up"
          />
          <span>10%</span>
        </span>
      </div>
      <div class="d-flex align-center justify-center">
        <span class="text-caption text-center">Custo anual total considerando a contratação do valor da demanda sugerida pela aplicação MACDE.</span>
      </div>
      

    <v-list>
      <v-list-item
        v-for="earning in earnings"
        :key="earning.title"
        class="ma-4"
      >
        <v-list-item-title>{{ earning.title }} </v-list-item-title>
        <v-list-item-subtitle>{{ earning.subtitle }}  <span class="text-subtitle-1 text-orange-darken-3 font-weight-medium">
                R$ {{ earning.amount }}
              </span></v-list-item-subtitle>
    
        <v-row>
            <v-col cols=12>
              <VProgressLinear
                  :color="earning.color"
                  :model-value="(earning.amount / total_cost) * 100"
                  height="15"
                >
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
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
export default {
  data() {
    return {
      total_cost: 1354965.23
    }
  }
}
</script>
