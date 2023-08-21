<template>
<div>
    <v-row>
        <v-col cols=12>
             <v-card class="elevation-0"
                title="Parâmetros Auxiliares"
                subtitle="Configuração dos Parâmetros utilizados na aplicação."
                text="Os parâmetros auxiliares permitem alterar a forma como a simulação é realizada. Nesta página é possível configurar
                    o tipo de simulação a ser realizada além dos valores utilizados nos cálculos."
             ></v-card>
        </v-col>
        <!-- Tipo de simulação -->
         <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-laptop"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Tipo Simulação
                    </v-card-title>
                    <v-card-subtitle>Seleção do tipo de simulação que será realizada.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row >
                        <v-col cols=12>
                            <p>As simulações da aplicação MACDE são realizadas para as modalidades tarifárias Verde e Azul. Esta informação é importante pois difere no tipo 
                                de cobrança ao qual o consumidor é submetido. Consumidores da Modalide Azul são cobrados pela demanda ponta e fora de ponta. Já os Consumidores
                                da Modalidade Verde são cobrados com um único valor de demanda, indenpendente do horário de uso. Além disso, é possível realizar as simulações 
                                considerando ou não os valores de energia.
                            </p>
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="selected_simulation_type"
                                label="Modalidade Tarifária"
                                :items="simulation_types"
                                item-title="text"
                                item-value="name"
                                variant="outlined"
                                return-object
                            ></v-select>
                        </v-col>
                        
                    </v-row>
                </v-card-text>

             </v-card>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Aumento ou redução de demanda -->
         <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-square-wave"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Aumento ou redução de demanda (1x)
                    </v-card-title>
                    <v-card-subtitle>Opção que considera dois valores de demanda ótima..</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row >
                        <v-col cols=12>
                            <p> Algumas unidades consumidores possuem perfis de carga diferente dependendo do período do ano. Uma possibilidade é considerar essa variação de demanda e contratar dois 
                                valores de demanda, dependendo do período do ano. É importante destacar que o consumidor deve atender os prazos solicitados pela distribuidora de energia.
                            </p>
                        </v-col>
                        <v-col cols=12>
                            <v-switch
                                v-model="has_demand_variation"
                                inset
                                :label="has_demand_variation ? 'Ativado' : 'Desativado'"
                                color="primary"                                                              
                                hide-details
                            ></v-switch>                   
                        </v-col>
                    </v-row>
                </v-card-text>

             </v-card>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Possui Sistema Fotovoltaico -->
        <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-solar-panel"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Possui Sistema Fotovoltaico
                    </v-card-title>
                    <v-card-subtitle>Opção para unidades consumidores que possui sistema fotovoltaicos.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row>
                        <v-col cols=12>
                            <p>A inserção de sistema solar fotovoltaico interfere no valor da demanda a ser contratado. Caso o consumidor instalou sistema fotovoltaico
                                durante o período de meses utilizados como histórico de entrada dos dados, é necessário informar marcar a opção para que o modelo de previsão 
                                considere a influência do sistema na demanda a ser contratada.
                            </p>
                        </v-col>
                        <v-col cols=12 md=6>
                            <v-text-field                                
                                :disabled= "!has_photovoltaic_system"
                                v-model="date_installation_photovoltaic_system"
                                label="Data de instalação"                                 
                                type="date"
                            />                             
                        </v-col>
                        <v-col cols=12 md=6>
                            <v-switch
                                v-model="has_photovoltaic_system"
                                inset
                                :label="has_photovoltaic_system ? 'Ativado' : 'Desativado'"
                                color="primary"                        
                                hide-details
                            ></v-switch>                            
                        </v-col>
                        
                    </v-row>
                </v-card-text>
             </v-card>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Previsão de crescimento -->
        <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-finance"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Previsão de crescimento
                    </v-card-title>
                    <v-card-subtitle>Valor do crescimento previsto para o ano seguitne.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row>
                        <v-col cols=12 class="mb-3">
                            <p>O modelo de previsão permite considerar a previsão de crescimento da unidade consumidora para o próximo ano. Caso o consumidor 
                                tenha uma previsão de crescimento é importante informar o valor. O valor padrão é de R$ 5%.
                            </p>
                        </v-col>
                        <v-row>
                            <v-col cols=6 md=4>
                                <v-text-field
                                    v-model="growth_forecast"
                                    suffix="%"
                                    type="number"                                    
                                    density="compact"
                                    hide-details
                                    variant="outlined"
                                ></v-text-field>   
                            </v-col>
                            <v-col cols=6 md=4>
                                <v-btn
                                    class="text-none"
                                    color="grey-lighten-1"
                                    variant="flat"
                                >
                                    Salvar
                                </v-btn>                 
                            </v-col>     
                        </v-row>
                    </v-row>
                </v-card-text>
             </v-card>
             <v-divider class="border-opacity-25 mt-4"></v-divider>
        </v-col>

     <!-- Demanda contratada -->
        <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-file-sign"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Demanda Contratada
                    </v-card-title>
                    <v-card-subtitle>Valor atual da demanda contratada.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row>
                        <v-col cols=12>
                            <p>A demanda contratada é o valor de demanda de potência que a distribuidora deve obrigatoriamente disponibilizar ao consumidor. Uma demanda contratada abaixo
                                da demanda utilizada ocasiona custos adicionais com o pagamento de penalidade. Já uma demanda contratada elevada em relação a demanda utilizada, representa 
                                o pagamento por um produto não utilizado.
                            </p>
                        </v-col>

                        <v-col 
                            class="pa-0"
                            cols=12 md=6
                            v-for="(item, index) in this.current_contracted_demand"
                            :key="index"
                        >
                            <v-text-field class="px-3"
                                v-model="item.value"
                                :label="item.title" 
                                :suffix="item.suffix"
                                :type="item.type"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-1"
                        variant="flat"
                    >
                        Salvar
                    </v-btn>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-3"
                        variant="flat"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-3"
                        variant="flat"
                    >
                        Resetar
                    </v-btn>
                </v-card-actions>
             </v-card>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- tarifas -->
        <v-col cols=10>
            <FormBox
                @save="formBoxTariffSave"
                @cancel="formBoxTariffCancel"
            >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-cash"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Tarifas
                </template>

                <template v-slot:subtitle>
                    Definição dos valores das tarifas de demanda e consumo.
                </template>
                
                <template v-slot:message>
                   <v-row cols=12>
                        <v-col>
                            <p>Os valores de tarifa são aplicados sobre a demanda e a energia. Estes valores são a forma de remunerar a distribuidora pelo serviço de distribuição prestado
                            e no caso dos consumidores cativos, pela produto entregue.</p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row>
                        <v-col
                        class="pa-0"
                        cols=12 md=6
                        v-for="(item, index) in this.local_tariffs"
                        :key="index"
                        >
                        <InputNumberFormatted  
                        class="px-3"
                            :initial="item.value"                                                        
                            maxFractionDigits='12'
                            lang="pt-BR"
                            :label="item.title"
                            :prefix="item.prefix"
                            :suffix= "item.suffix"
                            @changedValue="changedTariffInputNumberValue($event, item.value, index)"
                        />                            
                        </v-col>
                    </v-row>
                </template>                
            </FormBox>
        </v-col>

        <!-- Encargos e tributos -->
        <v-col cols=10>
             <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-calculator"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Tributação
                    </v-card-title>
                    <v-card-subtitle>Valores dos tributos incidentes na tarifa final.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row>
                        <v-col cols=12>
                            <p>Além das tarifas de Energia e de Uso do Sistema de Distribuição incidem sobre a tarifa final o pagamento compulsório de tributos devidos ao poder público. Os tributos
                                federais cobrados pela união são o Programa de Integração Social (PIS) e a Contribuição para o financiamento da Seguridade Social(COFINS) que são utilizados para manter programas voltados para
                                o trabalhador e para atender programas sociais. O imposto estadual que incide sobre a tarifa é o Imposto sobre Circulação de Mercadorias e Serviços (ICMS) previsto na constituição
                                federal e que possui alíquotas variáveis. O Custeio do Serviço de Iluminação Pública (CIP) não incide sobre a tarifa, este tributo municipal é arrecado pela concessionária e repassado
                                para o município 
                                </p>
                        </v-col>
                        <v-col 
                            class="pa-0"
                            cols=12 md=6 
                            v-for="(item, index) in this.taxes_and_charges"
                            :key="index"
                        >
                            <v-text-field class="px-3"
                                v-model="item.value"
                                :label="item.name" 
                                :prefix="item.prefix"
                                :suffix="item.suffix"
                                :type="item.type"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-1"
                        variant="flat"
                    >
                        Salvar
                    </v-btn>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-3"
                        variant="flat"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-3"
                        variant="flat"
                    >
                        Resetar
                    </v-btn>
                </v-card-actions>
             </v-card>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

    </v-row>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SIMULATION_TYPES } from '@/assets/files/consts'
import FormBox from '@/components/FormBox.vue'
import InputNumberFormatted from '@/components/InputNumberFormatted.vue'

export default {
    components: {FormBox, InputNumberFormatted},

    data() {
        return {
            simulation_types: SIMULATION_TYPES,
            local_tariffs: []
        }
    },

    methods: {
        ...mapActions('data_parameters', ['set_tariffs']),

        changedTariffInputNumberValue(e, param, index) {
            this.local_tariffs[index].value = e
        },

        formBoxTariffSave() {
            this.set_tariffs(this.local_tariffs)
        },

        formBoxTariffCancel() {
            this.local_tariffs =  JSON.parse(JSON.stringify(this.get_tariffs()[this.get_tariff_modality.name]))
        },
    },

    computed: {
        ...mapGetters('data_configurations', {
            get_tariff_modality: 'get_tariff_modality',
        }),

        ...mapGetters('data_parameters', {
            get_tariffs: 'get_tariffs',
        }),

        selected_simulation_type: {
            get() {
                return this.$store.state.data_parameters.selected_simulation_type
            },
            set(payload){
                this.$store.commit('data_parameters/set_selected_simulation_type', payload)
            }
        },
        has_demand_variation: {
            get() {
                return this.$store.state.data_parameters.has_demand_variation
            },
            set(payload){
                this.$store.commit('data_parameters/set_has_demand_variation', payload)
            }
        },
        has_photovoltaic_system: {
            get() {
                return this.$store.state.data_parameters.has_photovoltaic_system
            },
            set(payload){
                this.$store.commit('data_parameters/set_has_photovoltaic_system', payload)
            }
        },
        date_installation_photovoltaic_system: {
            get() {
                return this.$store.state.data_parameters.date_installation_photovoltaic_system
            },
            set(payload){
                this.$store.commit('data_parameters/set_date_installation_photovoltaic_system', payload)
            }
        },
        growth_forecast: {
            get() {
                return this.$store.state.data_parameters.growth_forecast
            },
            set(payload){
                this.$store.commit('data_parameters/set_growth_forecast', payload)
            }
        },
       
        taxes_and_charges: {
            get() {
                return this.$store.state.data_parameters.taxes_and_charges
            },
            set(payload){
                this.$store.commit('data_parameters/taxes_and_charges', payload)
            }
        },
        current_contracted_demand: {
            get() {
                return this.$store.state.data_parameters.current_contracted_demand
            },
            set(payload){
                this.$store.commit('data_parameters/set_current_contracted_demand', payload)
            }
        },
    },

    mounted() {
        this.local_tariffs =  JSON.parse(JSON.stringify(this.get_tariffs()[this.get_tariff_modality.name]))
    }
}
</script>
