<script setup>
import aviato from '@/assets/aviato.png'
import bitbank from '@/assets/bitbank.png'
import zipcar from '@/assets/zipcar.png'

const earnings = [
  {
    avatar: zipcar,
    title: 'Demanda',
    subtitle: 'Custo Demanda',
    amount: '$24,895.65',
    progress: 'primary',
  },
  {
    avatar: bitbank,
    title: 'Energia',
    subtitle: 'Custo Energia de Ponta',
    amount: '$8,6500.20',
    progress: 'info',
  },
  {
    avatar: aviato,
    title: 'Energia',
    subtitle: 'Custo Energia Fora de Ponta',
    amount: '$1,2450.80',
    progress: 'secondary',
  },
]
</script>

<template>
  <VCard elevation="8">
    <VCardItem class="bg-orange-lighten-3">
      <VCardTitle>
        <v-icon
            icon="mdi-cash-multiple"
            color="green-darken-1"
            size="large"
            class="me-2"
        ></v-icon>
        Economia total
      </VCardTitle>
    </VCardItem>

    <VCardText class="pt-4">
      <div class="d-flex align-center">
        <h4 class="text-h3 me-2 text-orange-darken-3">
          $24,895
        </h4>
        <span class="text-success">
          <VIcon
            size="30"
            icon="mdi-menu-up"
          />
          <span>10%</span>
        </span>
      </div>
      <span class="text-xs">Comparada com R$84.325 com o valor atual de demanda contratada</span>

      <VList class="card-list mt-9">
        <VListItem
          v-for="earning in earnings"
          :key="earning.title"
        >
          <template #prepend>
            <VAvatar
              rounded
              :image="earning.avatar"
            />
          </template>

          <VListItemTitle class="text-sm font-weight-medium mb-1">
            {{ earning.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-xs">
            {{ earning.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h6 class="text-sm font-weight-medium mb-2">
                {{ earning.amount }}
              </h6>
              <VProgressLinear
                :color="earning.progress"
                model-value="80"
              />
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
