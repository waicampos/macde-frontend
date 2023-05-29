<script setup>
const statistics = [
  {
    title: 'Ponta',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Fora de Ponta',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Total',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Revenue',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
</script>

<template>
  <VCard elevation="8">
    <VCardItem>
      <VCardTitle>Inofrmações de Energia</VCardTitle>
    </VCardItem>

    <VCardText>
      <h6 class="text-sm font-weight-medium mb-12">
        <span>Total 48.5% Growth 😎</span>
        <span class="font-weight-regular"> this month</span>
      </h6>

      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
