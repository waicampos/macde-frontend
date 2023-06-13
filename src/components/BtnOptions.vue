<template>

        <v-row class="text-center pa-3">
            <v-col>
                <v-btn-toggle
                background-color="primary" 
                group
                color="deep-orange-accent-3"
                rounded="5"
                v-model="chosen_forecast_model.type"       
                elevation="5"      
                mandatory  
                variant="flat"
                divided
            >
                <v-btn value="doublemean">
                    <span class="hidden-sm-and-down">Média Dupla</span>
                    <v-icon 
                        size="x-large"
                        icon="mdi-alpha-m-box"
                        end>
                    </v-icon>
                </v-btn>

                <v-btn value="naive">
                    <span class="hidden-sm-and-down">Naïve</span>
                    <v-icon 
                        size="x-large"
                        icon="mdi-alpha-n-box-outline"
                        end
                    >  
                    </v-icon>
                </v-btn>

                <v-btn value="custom">
                    <span class="hidden-sm-and-down">Personalizado</span>
                    <v-icon 
                        size="x-large"
                        icon="mdi-alpha-p-circle"
                        end
                    >
                    </v-icon>
                </v-btn>
            </v-btn-toggle>                            
        </v-col>
    </v-row>

    <v-row>
        <v-col class="text-center py-0 my-0">
            <h3 class="py-2">
                Modelo Selecionado: <span class="text-red">{{ toogle_name[chosen_forecast_model.type] }} </span>
            </h3>
        </v-col>
    </v-row>

              
</template>

<script>
  export default {
    data () {
      return {
        toogle: 'doublemean',
        toogle_name: {
            'doublemean': "MÉDIA DUPLA",
            'naive': "NAIVE",
            'custom': "PERSONALIZADO",
        }
      }
    },
    computed: {
        chosen_forecast_model: {
            get() {
                return this.$store.state.data_forecast.chosen_forecast_model
            },
            set(payload){
                this.$store.commit('data_forecast/set_chosen_forecast_model', payload)
            }
        }
    }
  }
</script>