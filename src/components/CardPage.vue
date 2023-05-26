<template>
  <v-card
    class="mx-auto"
    max-width="344"
    height="100%"
  >
    <v-img
      :src= "require('../assets/logo-ifsc.png')"
      height="200px"
    ></v-img>

    <v-card-title>
      {{title}} 
    </v-card-title>

    <v-card-subtitle>
      {{subtitle}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        {{btnText}}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
            <v-card-text class="justify-center">
            {{text}}
            </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    props: {
        title: String,
        subtitle: String,
        text: String,
        btnText: String,
        srcImage: String
    },
    data: () => ({
      show: false
    }),
  }
</script>