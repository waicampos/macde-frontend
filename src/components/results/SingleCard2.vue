<template>
  <v-card
    class="mx-auto bg-grey-lighten-2"
    max-width="368"
  >
    <v-card-item title="Demanda de Ponta">
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon>
        Demanda Sugerida Ótima 
      </template>
    </v-card-item>

    <v-divider 
        color="#000000"
        thickness="3px"
    ></v-divider>

    <v-card-text class="py-1">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h3 text-deep-orange-accent-3 text-center"
          cols="12"
        >
          540
        </v-col>

      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-start">
      <v-list-item
        density="compact"
      >
        <v-list-item-subtitle>
            <v-icon
                icon="mdi-cash"
                color="black"
                size="large"
                class="me-2"
            ></v-icon>
            Custo anual (R$): 
            <span class="text-red-accent-4 text-h6">325.377,60</span> 
        </v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>