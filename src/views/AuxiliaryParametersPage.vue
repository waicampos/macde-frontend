<template>
<div>
    <v-row>
        <v-col cols=10>
             <v-card class="elevation-0"
                title="Parâmetros Auxiliares"
                subtitle="Configuração dos Parâmetros utilizados na aplicação."
                text="Os parâmetros auxiliares permitem alterar a forma como a simulação é realizada. Nesta página é possível configurar
                    o tipo de simulação a ser realizada além dos valores utilizados nos cálculos."
             ></v-card>
        </v-col>
        <!-- Tipo de simulação -->
         <v-col cols=10>
             <FormBox
                :hide_actions = "true"
             >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-laptop"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Tipo Simulação
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.selected_simulation_type = !show_message.selected_simulation_type"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Seleção do tipo de simulação que será realizada.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12 
                        v-show="show_message.selected_simulation_type"
                    >
                        <v-col>
                            <p>As simulações da aplicação MACDE são realizadas para as modalidades tarifárias Verde e Azul. Esta informação é importante pois difere no tipo 
                                de cobrança ao qual o consumidor é submetido. Consumidores da Modalide Azul são cobrados pela demanda ponta e fora de ponta. Já os Consumidores
                                da Modalidade Verde são cobrados com um único valor de demanda, indenpendente do horário de uso. Além disso, é possível realizar as simulações 
                                considerando ou não os valores de energia.</p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row >                        
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
                </template>                     
            </FormBox>
            <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Aumento ou redução de demanda -->
         <v-col cols=10>
            <FormBox
                :hide_actions = "true"
             >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-square-wave"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Aumento ou redução de demanda (1x)
                     <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.has_demand_variation = !show_message.has_demand_variation"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Opção que considera dois valores de demanda ótima.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.has_demand_variation"
                    >
                        <v-col>
                            <p>
                                Algumas unidades consumidores possuem perfis de carga diferente dependendo do período do ano. Uma possibilidade é considerar essa variação de demanda e contratar dois 
                                valores de demanda, dependendo do período do ano. É importante destacar que o consumidor deve atender os prazos solicitados pela distribuidora de energia.
                            </p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row >                       
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
                </template>                     
            </FormBox>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Possui Sistema Fotovoltaico -->
        <v-col cols=10>
            <FormBox
                :hide_actions = "true"
             >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-solar-panel"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Possui Sistema Fotovoltaico
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.has_photovoltaic_system = !show_message.has_photovoltaic_system"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Opção para unidades consumidoras que possuem sistema fotovoltaico.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.has_photovoltaic_system"
                    >
                        <v-col>
                            <p>
                                A inserção de sistema solar fotovoltaico interfere no valor da demanda a ser contratado. Caso o consumidor instalou sistema fotovoltaico
                                durante o período de meses utilizados como histórico de entrada dos dados, é necessário informar marcar a opção para que o modelo de previsão 
                                considere a influência do sistema na demanda a ser contratada.
                            </p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row>                        
                        <v-col cols=12 md=6>
                            <InputDatePicker      
                                :disabled="!has_photovoltaic_system"
                                v-model="date_installation_photovoltaic_system"
                                label="Data de instalação"
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
                </template>                     
            </FormBox>
            <v-divider class="border-opacity-25"></v-divider>
        </v-col>

        <!-- Previsão de crescimento -->
        <v-col cols=10>

            <FormBox
                :disabled_save_btn="!v$.local_growth_forecast.$each.$response.$valid"
                @save="formBoxGrowthForecastSave"
                @cancel="formBoxGrowthForecastCancel"
             >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-finance"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Previsão de crescimento
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.local_growth_forecast = !show_message.local_growth_forecast"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Valor do crescimento previsto para o ano seguinte.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.local_growth_forecast"
                    >
                        <v-col>
                            <p>
                                O modelo de previsão permite considerar a previsão de crescimento da unidade consumidora para o próximo ano. Caso o consumidor 
                                tenha uma previsão de crescimento é importante informar o valor. O valor padrão é de R$ 5%.
                            </p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row>                                           
                        <v-col 
                            class="pa-0"
                            cols=12 md=6
                            v-for="(item, index) in this.local_growth_forecast"
                            :key="index"
                        >
                            <InputNumberFormatted  
                                class="px-3"
                                v-model="item.value"                                                        
                                maxFractionDigits='12'
                                lang="pt-BR"
                                :label="item.title"                                
                                :suffix= "item.suffix"
                            />                           
                        </v-col>
                    </v-row>
                </template>                     
            </FormBox>
            <v-divider class="border-opacity-25 mt-4"></v-divider>
        </v-col>

     <!-- Demanda contratada -->
        <v-col cols=10>
            <FormBox
                :disabled_save_btn="!v$.local_contrac_demand.$each.$response.$valid"
                @save="formBoxContracDemandSave"
                @cancel="formBoxContracDemandCancel"
            >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-file-sign"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                        Demanda Contratada
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.local_contrac_demand = !show_message.local_contrac_demand"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Valor atual da demanda contratada.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.local_contrac_demand"
                    >
                        <v-col>
                            <p>A demanda contratada é o valor de demanda de potência que a distribuidora deve obrigatoriamente disponibilizar ao consumidor. Uma demanda contratada abaixo
                                da demanda utilizada ocasiona custos adicionais com o pagamento de penalidade. Já uma demanda contratada elevada em relação a demanda utilizada, representa 
                                o pagamento por um produto não utilizado.</p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row>                                           
                        <v-col 
                            class="pa-0"
                            cols=12 md=6
                            v-for="(item, index) in this.local_contrac_demand"
                            :key="index"
                        >
                            <InputNumberFormatted  
                                class="px-3"
                                v-model="item.value"                                                        
                                maxFractionDigits='12'
                                lang="pt-BR"
                                :label="item.title"                                
                                :suffix= "item.suffix"
                            />                           
                        </v-col>
                    </v-row>
                </template>                
            </FormBox>
        </v-col>

        <!-- tarifas -->
        <v-col cols=10>
            <FormBox
                :disabled_save_btn="!v$.local_tariffs.$each.$response.$valid"
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
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.local_tariffs = !show_message.local_tariffs"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Definição dos valores das tarifas de demanda e consumo.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.local_tariffs"
                    >
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
                        cols=12 md=6 lg=4
                        v-for="(item, index) in local_tariffs"
                        :key="index"
                        >                        
                        <InputNumberFormatted  
                            class="px-3"
                            v-model="item.value"                                                        
                            maxFractionDigits='12'
                            lang="pt-BR"
                            :label="item.title"
                            :prefix="item.prefix"
                            :suffix= "item.suffix"                            
                        />                            
                        </v-col>
                    </v-row>
                </template>                
            </FormBox>
        </v-col>

        <!-- Encargos e tributos -->
        <v-col cols=10>
            <FormBox
                :disabled_save_btn="!v$.local_taxes_and_charges.$each.$response.$valid"
                @save="formBoxTaxesChargesSave"
                @cancel="formBoxTaxesChargesCancel"
            >
                <template v-slot:title>
                    <v-icon
                        icon="mdi-calculator"
                        color="green-darken-1"
                        size="large"
                        class="me-2"
                    ></v-icon>
                    Tributação
                    <v-icon
                        icon="mdi-help-circle"
                        color="info"
                        size="x-small"
                        class="me-2"
                        @click="show_message.local_taxes_and_charges = !show_message.local_taxes_and_charges"
                    ></v-icon>
                </template>

                <template v-slot:subtitle>
                    Valores dos tributos incidentes na tarifa final.
                </template>
                
                <template v-slot:message>
                    <v-row 
                        cols=12
                        v-show="show_message.local_taxes_and_charges"
                    >
                        <v-col>
                            <p>
                                Além das tarifas de Energia e de Uso do Sistema de Distribuição incidem sobre a tarifa final o pagamento compulsório de tributos devidos ao poder público. Os tributos
                                federais cobrados pela união são o Programa de Integração Social (PIS) e a Contribuição para o financiamento da Seguridade Social(COFINS) que são utilizados para manter programas voltados para
                                o trabalhador e para atender programas sociais. O imposto estadual que incide sobre a tarifa é o Imposto sobre Circulação de Mercadorias e Serviços (ICMS) previsto na constituição
                                federal e que possui alíquotas variáveis. O Custeio do Serviço de Iluminação Pública (CIP) não incide sobre a tarifa, este tributo municipal é arrecado pela concessionária e repassado
                                para o município 
                            </p>                        
                        </v-col>                        
                   </v-row>                   
                </template>

                <template v-slot>
                    <v-row>                       
                        <v-col 
                            class="pa-0"
                            cols=12 md=6 
                            v-for="(item, index) in this.local_taxes_and_charges"
                            :key="index"
                        >
                        <InputNumberFormatted  
                            class="px-3"
                            v-model="item.value"                                                        
                            maxFractionDigits='12'
                            lang="pt-BR"
                            :label="item.text"
                            :prefix="item.prefix"
                            :suffix= "item.suffix"                            
                        />                                    
                        </v-col>
                    </v-row>
                </template>                
            </FormBox>
             <v-divider class="border-opacity-25"></v-divider>
        </v-col>

    </v-row>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { is_number_pt_br } from '@/assets/files/validators'
import { MSG_REQUIRED, MSG_INVALID_NUMBER } from '@/assets/files/validators_messages'
import { SIMULATION_TYPES } from '@/assets/files/consts'
import FormBox from '@/components/FormBox.vue'
import InputNumberFormatted from '@/components/InputNumberFormatted.vue'
import InputDatePicker from '@/components/InputDatePicker.vue'



export default {
    components: {FormBox, InputNumberFormatted, InputDatePicker},

    data() {
        return {
            simulation_types: SIMULATION_TYPES,
            local_tariffs: [],
            local_contrac_demand: [],
            local_growth_forecast: '',
            local_taxes_and_charges: [],
            show_message: {
                selected_simulation_type: false,
                has_demand_variation: false,
                has_photovoltaic_system: false,
                local_growth_forecast: false,
                local_contrac_demand: false,
                local_tariffs: false,
                local_taxes_and_charges: false
            }
        }
    },

    setup: () => ({ v$: useVuelidate() }),

    validations () {
        return {
            local_growth_forecast: { 
                $each: helpers.forEach({
                        value: {
                            required: helpers.withMessage(MSG_REQUIRED, required), 
                            is_number_pt_br: helpers.withMessage(MSG_INVALID_NUMBER, is_number_pt_br)
                        }
                })        
            },
            local_contrac_demand: {
                $each: helpers.forEach({
                        value: {
                            required: helpers.withMessage(MSG_REQUIRED, required), 
                            is_number_pt_br: helpers.withMessage(MSG_INVALID_NUMBER, is_number_pt_br)
                        }
                })                                    
            },
            local_tariffs: {
                $each: helpers.forEach({
                        value: {
                            required: helpers.withMessage(MSG_REQUIRED, required), 
                            is_number_pt_br: helpers.withMessage(MSG_INVALID_NUMBER, is_number_pt_br)
                        }
                })                                    
            },
            local_taxes_and_charges: {
                $each: helpers.forEach({
                        value: {
                            required: helpers.withMessage(MSG_REQUIRED, required), 
                            is_number_pt_br: helpers.withMessage(MSG_INVALID_NUMBER, is_number_pt_br)
                        }
                })                                    
            },
        }
    },

    methods: {
        ...mapActions('data_parameters', ['set_tariffs', 'set_current_contracted_demand', 'set_growth_forecast', 'set_taxes_and_charges', 'set_selected_simulation_type']),        
       
        async formBoxTaxesChargesSave() { 
            const isValid = await this.v$.local_taxes_and_charges.$each.$response.$valid
            isValid && this.set_taxes_and_charges(JSON.parse(JSON.stringify(this.local_taxes_and_charges)))
        },

        formBoxTaxesChargesCancel() {
            this.local_taxes_and_charges = JSON.parse(JSON.stringify(this.get_taxes_and_charges)).map(item => {
                item.value = item.value.toString().replace(".", ",")
                return item 
            })
        },

        async formBoxGrowthForecastSave() {
            const isValid = await this.v$.local_growth_forecast.$each.$response.$valid
            isValid && this.set_growth_forecast(JSON.parse(JSON.stringify(this.local_growth_forecast)))
        },

        formBoxGrowthForecastCancel() {
            this.local_growth_forecast = JSON.parse(JSON.stringify(this.get_growth_forecast)).map(item => {
                item.value = item.value.toString().replace(".", ",")
                return item 
            })
        },

        async formBoxContracDemandSave() {
            const isValid = await this.v$.local_contrac_demand.$each.$response.$valid
            isValid && this.set_current_contracted_demand(JSON.parse(JSON.stringify(this.local_contrac_demand)))
        },
        
        formBoxContracDemandCancel() {
            this.local_contrac_demand = JSON.parse(JSON.stringify(this.get_current_contracted_demand())).map(item => {
                item.value = item.value.toString().replace(".", ",")
                return item 
            })
        },

        async formBoxTariffSave() {
            const isValid = await this.v$.local_tariffs.$each.$response.$valid
            isValid && this.set_tariffs(JSON.parse(JSON.stringify(this.local_tariffs)))
        },

        formBoxTariffCancel() {
            this.local_tariffs =  JSON.parse(JSON.stringify(this.get_tariffs)).map(item => {
                item.value = item.value.toString().replace(".", ",")
                return item 
            })
        },
    },

    computed: {
        ...mapGetters('data_configurations', {
            get_tariff_modality: 'get_tariff_modality',
        }),

        ...mapGetters('data_parameters', {
            get_tariffs: 'get_tariffs',
            get_current_contracted_demand: 'get_current_contracted_demand',
            get_growth_forecast: 'get_growth_forecast',
            get_taxes_and_charges: 'get_taxes_and_charges',
        }),

        selected_simulation_type: {
            get() {
                return this.$store.state.data_parameters.selected_simulation_type
            },
            set(payload){
                this.set_selected_simulation_type(payload)
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
    },

    mounted() {        
        this.local_tariffs =  JSON.parse(JSON.stringify(this.get_tariffs)).map(item => {
            item.value = item.value.toString().replace(".", ",")
            return item 
        })
        
        this.local_contrac_demand = JSON.parse(JSON.stringify(this.get_current_contracted_demand())).map(item => {
            item.value = item.value.toString().replace(".", ",")
            return item 
        })

        this.local_taxes_and_charges = JSON.parse(JSON.stringify(this.get_taxes_and_charges)).map(item => {
            item.value = item.value.toString().replace(".", ",")
            return item 
        })

        this.local_growth_forecast = JSON.parse(JSON.stringify(this.get_growth_forecast)).map(item => {
            item.value = item.value.toString().replace(".", ",")
            return item 
        })
    }
}
</script>
