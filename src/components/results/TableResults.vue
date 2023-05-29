<template>
  <v-data-table
    :items-per-page=5
    :headers="headers"
    :items="desserts"
    item-value="name"
    class="elevation-8"
  >   
  <template v-slot:top>
      <v-toolbar
        flat
        color="light-blue-lighten-4"
      >
      <v-toolbar-title>Economia esperada</v-toolbar-title>
      </v-toolbar>
  </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        itemsPerPage: 5,
        headers: [
          {title: 'Denominacão', align: 'start', sortable: false, key: 'denomination'},
          { title: 'Atual', align: 'end', key: 'atual', sortable: false},
          { title: 'Proposta', align: 'end', key: 'proposed', sortable: false},
        ],
        desserts: [
          {
            denomination: 'Custo de Demanda P (TUSD)',
            atual: "271.614,40",
            proposed: "291.627,20"
          },
          {
            denomination: 'Ultrapassagem Ponta',
            atual: "53.424,00",
            proposed: "33.750,40"
          },
          {
            denomination: 'Custo de Demanda FP (TUSD)',
            atual: "139.302,02",
            proposed: "173.010,94"
          },
          {
            denomination: 'Ultrapassagem Fora Ponta',
            atual: "66.866,44",
            proposed: " 2.573,20"
          },
          {
            denomination: 'Custo de Energia FP (TE+TUSD)',
            atual: "713.224,05",
            proposed: "713.224,05"
          },
          {
            denomination: 'Custo de Energia P (TE+TUSD)',
            atual: "140.779,44",
            proposed: "140.779,44"
          },
          {
            denomination: 'PIS/PASEP+COFINS+ICMS(%)',
            atual: "0,00",
            proposed: "0,00"
          },
          {
            denomination: 'Frozen Yogurt',
            atual: "0,00",
            proposed: "0,00"
          },
          {
            denomination: 'CIP ou COSIP (R$)',
            atual: "0,00",
            proposed: "0,00"
          },
          {
            denomination: 'Outros (R$)',
            atual: "0,00",
            proposed: "0,00"
          }      
        ],
      }
    },
  }
</script>