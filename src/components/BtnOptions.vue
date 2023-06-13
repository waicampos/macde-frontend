<template>
    <v-row>
        <v-col cols="12">
            <v-card
                elevation="0"
            >
                <v-card-title>Etapa de Previsão de Demanda</v-card-title>               
                <v-card-subtitle>Seleção do Modelo de Previsão</v-card-subtitle>               
                <v-divider></v-divider>
                <v-card-text>
                    <v-row class="text-center pa-3">
                        <v-col>
                            <p class="text-justify"> 
                                Nesta etapa, é realizado a pevisão de demanda com base no histórico do consumidor. Os valores previstos são utilizados como dados de entrada para 
                                a etapa de otimização. Atualmente o MACDE oferece dois modelos de previsões: Naïve e Média dupla. Também é possível fazer upload dos valores de previsão
                                obtidos com o uso de outros modelos.  
                                <br><br>
                            </p>
                            <p class="text-justify"> 
                                Modelos de Previsão:
                            </p>
                            <p class="text-justify"> 
                                - <b>Média Dupla:</b> Modelo padrão utilizado pelo MACDE;
                            </p>
                            <p class="text-justify"> 
                                - <b>Naive:</b> Define todos os valores futuros iguais ao valor da última observação, acrescido da previsão de crescimento da unidade consumidora;
                            </p>
                            <p class="text-justify"> 
                                - <b>Externo:</b> Permite o envio de um arquivo com os valores futuros adquiridos com um método de previsão externo;
                            </p>
                        </v-col>
                    </v-row>
                    
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

                </v-card-text>
                
            </v-card>
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