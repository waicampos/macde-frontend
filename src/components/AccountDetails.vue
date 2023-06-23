<template>
<div>
    <v-row>
         <v-col cols=12>
             <v-card class="elevation-0"
                title="Informações"
                subtitle="Configurações da unidade consumidora e do distribuidora/concessionário/permissionária."
                text="As configuções são informações utilizadas para geração do relatório e podem ser utilizadas para
                automatizar alguns processos, como por exempolo, valores de tarifas. Para geração do relatório
                é necessário o preenchimento destas informações"
             ></v-card>
        </v-col>
    </v-row>

    <v-row>  
        <!-- Informações Unidade Consumidora -->
        <v-col cols=10>
            <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-home-city"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Unidade consumidora (UC)
                    </v-card-title>
                    <v-card-subtitle>Preenchimento de informações básicas da unidade consumidora.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row >
                        <v-col cols=12>
                            <p>As informações da unidade consumidora estão disponíveis na fatura de energia.
                                As informações preenchidas automatizam o preenchimento das informações, agilizando 
                                as simulações para o usuário. 
                            </p>
                        </v-col>

                        <!-- Código UC -->
                        <v-col cols=12 md=6>
                            <v-text-field                                
                                v-model="consumer_unit.code"
                                label="Código da UC"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Tensão de Fornecimento -->
                        <v-col cols=6 md=6>
                            <v-text-field                                
                                v-model="consumer_unit.supply_voltage"
                                label="Tensão de fornecimento"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                         <!-- Endereço -->
                        <v-col cols=12>
                            <v-text-field                                
                                v-model="consumer_unit.address.address"
                                label="Logradouro"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Endereço Número -->
                        <v-col cols=4>
                            <v-text-field                                
                                v-model="consumer_unit.address.number"
                                label="Número"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Endereço CEP -->
                        <v-col cols=4>
                            <v-text-field                                
                                v-model="consumer_unit.address.zip_code"
                                label="CEP"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Endereço UF -->
                        <v-col cols=12 md=6>
                            <v-text-field                                
                                v-model="consumer_unit.address.state"
                                label="UF"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Endereço Cidade -->
                        <v-col cols=12 md=6>
                            <v-text-field                                
                                v-model="consumer_unit.address.city"
                                label="Cidade"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- Grupo -->
                        <v-col cols=12 md=6>
                            <v-select
                                v-model="consumer_unit.group"
                                label="Grupo"
                                :items="group_classification_types" 
                                item-title="text"
                                item-value="name"                                
                                variant="outlined"
                                hide-details
                                return-object
                            ></v-select>                     
                        </v-col>       

                        <!-- Subgrupo -->
                        <v-col cols=12 md=6>
                            <v-select
                                v-model="consumer_unit.subgroup"
                                label="Subgrupo"
                                :items="subgroup_classification_types" 
                                item-title="text"
                                item-value="name"                                
                                variant="outlined"
                                hide-details
                                return-object
                            ></v-select>                     
                        </v-col>   

                        <!-- Modalidade Tarifária -->
                        <v-col cols=12 md=6>
                            <v-select
                                v-model="consumer_unit.tariff_modality"
                                label="Modalidade Tarifária"
                                :items="tariff_modality_types"         
                                item-title="text"
                                item-value="name"                       
                                variant="outlined"
                                hide-details
                                return-object
                            ></v-select>                     
                        </v-col>      

                        <!-- Classe unidade consumidora -->
                        <v-col cols=12 md=6>
                            <v-select
                                v-model="consumer_unit.class"
                                label="Classe"
                                :items="class_classification_unit_consumer_types"         
                                item-title="text"
                                item-value="name"                       
                                variant="outlined"
                                hide-details
                                return-object
                            ></v-select>                     
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

        <!-- Informações Distribuidora/Concessionária/Permissionária -->
        <v-col cols=10>
            <v-card class="elevation-0">
                <v-card-item>
                    <v-card-title>
                        <v-icon
                            icon="mdi-office-building-cog-outline"
                            color="green-darken-1"
                            size="large"
                            class="me-2"
                        ></v-icon>
                        Dados da Distribuidora/Concessionária/Permissionária (Cooperativa)
                    </v-card-title>
                    <v-card-subtitle>Preenchimento de informações básicas do fornecedor.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <v-row >
                        <v-col cols=12>
                            <p>As informações da distribuidora estão disponíveis na fatura de energia.
                                As informações preenchidas automatizam o preenchimento das informações, agilizando 
                                as simulações para o usuário. 
                            </p>
                        </v-col>

                        <!-- nome -->
                        <v-col cols=12>
                            <v-text-field                                
                                v-model="utility.name"
                                label="Nome"                                 
                                type="text"
                                hide-details
                                return-object
                            />                             
                        </v-col>

                        <!-- CNPJ -->
                        <v-col cols=12>
                            <v-text-field                                
                                v-model="utility.registration_number"
                                label="CNPJ"                                 
                                type="text"
                                hide-details
                                return-object
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
import { TARIFF_MODALITY_TYPES, GROUP_CLASSIFICATION_TYPES, SUBGROUP_CLASSIFICATION_TYPES, CLASS_CLASSIFICATION_UNITY_CONSUMER } from '@/assets/files/consts'

export default {
    data() {
        return {
            tariff_modality_types: TARIFF_MODALITY_TYPES,
            group_classification_types: GROUP_CLASSIFICATION_TYPES,
            subgroup_classification_types: SUBGROUP_CLASSIFICATION_TYPES,
            class_classification_unit_consumer_types: CLASS_CLASSIFICATION_UNITY_CONSUMER,
        }
    },
    computed: {
        consumer_unit: {
            get() {
                return this.$store.state.data_configurations.consumer_unit
            },
            set(payload){
                this.$store.commit('data_configurations/set_consumer_unit', payload)
            }
        },
         utility: {
            get() {
                return this.$store.state.data_configurations.utility
            },
            set(payload){
                this.$store.commit('data_configurations/set_utility', payload)
            }
        },
    }
}
</script>