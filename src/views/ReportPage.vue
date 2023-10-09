<template>
    <div>
        <VSheet>
            <VRow>
                <VCol cols="12">
                    <h1 class="text-center">Relatório MACDE</h1>
                </VCol>
            </VRow>
                <v-divider class="py-2 my-4"></v-divider>
                <!--Informações Consumidor-->
            <VRow>
                <VCol cols="12">                    
                    <v-card elevation="0">
                        <v-card-item class="py-0 my-0">
                            <v-card-title>Informações do Cliente</v-card-title>
                            <v-card-subtitle>Informações básicas</v-card-subtitle>
                        </v-card-item>
                        
                        <v-card-text class="my-5 py-0 my-0">
                            <VRow>                               
                                <VCol cols=12 class="py-0 my-1">
                                    <p><b>RAZÃO SOCIAL:</b> {{consumer_unit.name}}</p>
                                </VCol>
                                <VCol cols=12 class="py-0 my-1">
                                    <p><b>CPF/CNPJ:</b> {{consumer_unit.registration_number}}</p>
                                </VCol>
                                <VCol cols=12 class="py-0 my-1">
                                     <p><b>DISTRIBUIDORA/CONCESSIONÁRIA/PERMISSIONÁRIA(COOPERATIVA):</b> {{utility.name}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>CLASSE:</b> {{consumer_unit.class.text}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>UC:</b> {{consumer_unit.code}}</p>
                                </VCol>                                
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>MODALIDADE TARIFÁRIA:</b> {{consumer_unit.tariff_modality.text}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>GRUPO:</b> {{consumer_unit.group.name.toUpperCase()}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>SUBBGRUPO:</b> {{consumer_unit.subgroup.text}}</p>
                                </VCol>                                
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>PIS/PASEP(%):</b> {{taxes_and_charges.filter(item => item.name === 'pis_pasep')[0].value}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>COFINS(%):</b> {{taxes_and_charges.filter(item => item.name === 'cofins')[0].value}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>ICMS (%):</b> {{taxes_and_charges.filter(item => item.name === 'icms')[0].value}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>CIP ou COSIP (R$):</b> {{taxes_and_charges.filter(item => item.name === 'cip_cosip')[0].value}}</p>
                                </VCol>
                                <VCol cols=12 md=6 lg=4 class="py-0 my-1">
                                    <p><b>Outros (R$):</b> {{taxes_and_charges.filter(item => item.name === 'others')[0].value}}</p>
                                </VCol>
                            </VRow>
                        </v-card-text>
                    </v-card>
                </VCol>
            </VRow>
            
            <v-divider class="py-2 my-4"></v-divider>

            <!--Informações-->
            <VRow>
                <VCol cols="12">                    
                    <v-card elevation="0">
                        <v-card-item class="py-0 my-0">
                            <v-card-title>Informações</v-card-title>
                            <v-card-subtitle>Informações Gerais</v-card-subtitle>
                        </v-card-item>
                        
                        <v-card-text class="my-5 py-0 my-0 text-justify">                            
                            <p>Este planejamento é baseado na Resolução Normativa n°. 1.000/2021 da Agência Nacional de Energia Elétrica. 
                                Contudo, as regras da Resolução Normativa n°. 1.000/2021 devem ser verificadas e a distribuidora deve ser 
                                contatada para verificar as implicações de alteração na demanda para cada caso específico. As tarifas de energia (TE) 
                                e demanda (TUSD) utilizadas são as informadas pelo usuário e devem ser atualizadas. Em caso de dúvidas ou sugestões, 
                                entre em contato com <b>macde.energif@ifsc.edu.br</b>.
                            </p>                               
                        </v-card-text>
                    </v-card>
                </VCol>
            </VRow>   

            <!--Laudo Técnio da Otimização-->
            <VRow>                 
                <VCol cols="12">                    
                    <v-card elevation="0">
                        <v-card-item class="py-0 my-0">
                            <v-card-title>Laudo Técnico</v-card-title>
                            <v-card-subtitle>Laudo Técnico da Otimização</v-card-subtitle>
                        </v-card-item>
                        
                        <v-card-text class="my-5 py-0 my-0 text-justify">                            
                            <p>A otimização com dados históricos de consumo e demanda da unidade consumidora (Ano A-1 a A-3), 
                                considerando as opções disponíveis de contratação e as tarifas vigentes, apontou a necessidade de 
                                ajustes no contrato de energia da unidade consumidora junto à distribuidora , abrangendo: Contratação de demanda. 
                                Não esqueça que outras atitudes são sempre bem vindas e efetivas quando se deseja economizar na fatura de energia 
                                elétrica como ações de eficiência energética (ajustes e trocas de equipamentos de iluminação e climatização, 
                                instalação de sensores de presença, dentre outras), instalação de micro ou minigeração de energia (fotovoltaica ou outras renováveis), 
                                análise de multas por baixo fator de potência que são descritas na fatura, dentre outros.
                            </p>                               
                        </v-card-text>
                    </v-card>
                </VCol>
            </VRow>

            <v-divider class="py-2 my-4"></v-divider>

        <!-- Gráficos -->
        <v-row 
            class="flex-1-0 ma-0 pa-0"
        >
            <v-col cols="12 text-center">
                <h3>Previsão de Demanda</h3>
            </v-col>
            <v-col                 
                v-for="demand_name in active_meas('demand')" :key="demand_name"
                cols=12 :lg="active_meas('energy').length ? 6 : 12"
            >
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        :data="chartTimeSeriesData([demand_name])"
                    />
                </v-sheet>
            </v-col>    
        </v-row>

            <!--Ajustando o Contrato-->
            <VRow>
                <VCol cols="12" class="text-center">
                    <v-card elevation="0">
                        <v-card-item>
                            <v-card-title>Ajustando o Contrato</v-card-title>
                        </v-card-item>
                        
                        <v-card-text class="text-justify">    
                            <p class="text-justify">
                                A contatação acima ou abaixo da demanda necessária geram perda de dinheiro. 
                                Não tenha receio em solicitar informações sobre a alteração da demanda contrata para a distribuidora, 
                                também perguntando sobre as implicações da alteração da demanda para o seu caso específico. Em alguns 
                                casos esta implicações podem limitar a economia esperada, ou até mesmo reverter em prejuízo. A REN n°. 1.000/2021 
                                da ANEEL deve ser verificada. Agende-se para evitar transtornos. Caso haja o conhecimento de alguma alteração 
                                estrutural do consumo de energia da unidade consumidora, como ampliações prediais, novos usos, instalação de 
                                geração distribuída (micro ou minigeração), dentre outros, este estudo precisará ser reexecutado considerando-os(as).
                            </p>
                            <p class="text-justify py-2">
                                O não cumprimento de todas as etapas a seguir pode limitar a economia esperada, ou até mesmo reverter em prejuízo. 
                                Agende-se para evitar transtornos. Caso haja o conhecimento de alguma alteração estrutural do consumo de energia da 
                                unidade consumidora, como ampliações prediais, novos usos, instalação de geração distribuída, dentre outros, 
                                este estudo precisará ser reexecutado.
                            </p>
                            <p class="text-justify  pt-4">
                                Solicitações que devem ser feitas à distribuidora <b>{{ get_utility.name }}</b>:
                            </p>
                            <p 
                                v-for="(demand_name, index) in active_meas('demand')" :key="demand_name"
                                class="text-justify pt-2 mt-2 mb-2 pt-2"
                            >                                
                                {{ index + 1 }}) Alteração do valor contratado de <b>{{get_demand_title(demand_name).toUpperCase() }}</b>
                                para <b><span class="text-h6">{{ get_unique_optimized_demand_cost[demand_name].join('/') }} </span> kW</b>.
                            </p>                            
                            
                            <p class="text-justify pt-4">
                                A distribuidora deve atender à solicitação de redução da demanda contratada, desde que formalizada com antecedência 
                                de pelo menos 90 (noventa) dias para o consumidor do subgrupo AS ou A4 ou 180 (cento e oitenta) dias para os demais usuários. 
                                (É vedada mais de uma redução de demanda em um período de 12 (doze) meses, exceto para casos envolvendo eficiência energética). 
                                A solicitação de orçamento prévio é obrigatória para aumento da potência demandada no sistema de distribuição. A distribuidora deve 
                                elaborar e fornecer gratuitamente o orçamento prévio em até 45 dias, mas caso não houver necessidade de obras de responsabilidade da 
                                distribuidora para a conexão ou para o atendimento do aumento da potência demandada ela somente irá informar as próximas etapas e 
                                providências para viabilização da solicitação.
                            </p>
                        </v-card-text>  
                    </v-card>  
                </VCol>
            </VRow>

            <v-divider class="py-2 my-4"></v-divider>

            <!--Contato Concesionária de energia-->
            <VRow>
                <VCol cols="12" class="text-center">
                    <v-card elevation="0">
                        <v-card-item>
                            <v-card-title>Contato da Concessionária de Energia</v-card-title>
                        </v-card-item>
                        
                        <v-card-text class="text-justify">    
                            <p class="text-center">AmE Teleatendimento — 999 AmE — (99) 9999-9999 — 14 h às 17h exemplo@AmE.com.br</p>
                        </v-card-text>  
                    </v-card>  
                </VCol>
            </VRow>

            <v-divider class="py-2 my-4"></v-divider>

            <!--Glossário Técnico-->
            <VRow>
                <VCol cols="12 text-center">
                    <v-card elevation="1">
                        <v-card-item>
                            <v-card-title class="text-h6">Glossário Técnico:</v-card-title>
                        </v-card-item>                        
                        <v-card-text class="text-justify">                                
                            <v-list                                                           
                                lines="three"
                            >                                    
                                <v-list-item 
                                    min-height="88px"   
                                    class="ma-0 pa-0"                                                                                                           
                                    v-for="item in items" 
                                    :key="item.title"                                    
                                    >                                                  
                                        <v-list-item-title class="text-subtitle-2 ma-0 pa-0">{{ item.title }}</v-list-item-title>
                                        <v-list-item-subtitle class="text-caption ma-0 pa-0">{{ item.subtitle }}</v-list-item-subtitle>
                                        <v-list 
                                            class="my-0 py-0" 
                                            v-if="item.list.length"
                                            lines="one"
                                            density="compact"                                        
                                        >
                                            <v-list-item   
                                                min-height="10px"  
                                                class="my-0 py-0" 
                                                v-for="(subitem, sub_idx) in item.list" 
                                                :key="sub_idx"                                            
                                            >
                                                <v-list-item-subtitle class="text-caption">{{ subitem.subtitle }}</v-list-item-subtitle>
                                                <template v-slot:prepend>
                                                    <v-icon :icon="subitem.icon"></v-icon>
                                                </template>                                                
                                            </v-list-item>
                                        </v-list>          
                                        <v-divider class="my-4"></v-divider>                                  
                                </v-list-item>
                            </v-list>                                                                                                                   
                        </v-card-text>  
                    </v-card>  
                </VCol>
            </VRow>
        </VSheet>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { createDataSetsTimeSeries } from '@/components/config/chartConfig'
import macde_report_glossary from '@/assets/files/macde_report_glossary.json'
import { MEAS_INFO } from '@/assets/files/consts'

import { Line as MyLine} from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
    components: {MyLine},
    data() {
        return {
            items: macde_report_glossary
        }
    },

    methods: {
        get_demand_title(key) {
            return MEAS_INFO[key].title
        },

        active_meas(type_meas) {
            return this.get_selected_simulation_type.meas.filter(item => item.includes(type_meas))
        },

        chartTimeSeriesData(keys) {  
            let data = [...this.get_forecasted]
            let dt = createDataSetsTimeSeries( 
                keys, 
                'date',
                data
            )

            this.get_forecasted.forEach((item, index) => {
                this.get_optimized_data[index].date = item.date
            })
            let dt_optimized = createDataSetsTimeSeries(
                    keys,
                    'date',
                    [...this.get_optimized_data]
            )
            dt_optimized.datasets[0].label += ' Sugerida'
            dt_optimized.datasets[0].backgroundColor = "#BDBDBD"
            dt_optimized.datasets[0].borderColor = "#757575"
            dt_optimized.datasets[0].borderDash = [5, 5]

            dt_optimized.datasets.forEach( dt_item => {
                dt.datasets.push(dt_item)
            })

            return dt
        },
    },

    computed: {
         ...mapGetters('data_parameters', {
            get_selected_simulation_type: 'get_selected_simulation_type',            
        }),        

        ...mapGetters('data_forecast', {
            get_forecasted: 'get_forecasted_data',
        }),

        ...mapGetters('data_optimize', {
            get_optimized_data: 'get_optimized_data',
            get_unique_optimized_demand_cost: 'get_unique_optimized_demand_cost',
        }),

        ...mapGetters('data_configurations', {
            get_utility: 'get_utility',
            get_tariff_modality: 'get_tariff_modality',            
        }),        
        
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
        
        taxes_and_charges: {
            get() {
                return this.$store.state.data_parameters.taxes_and_charges
            },
            set(payload){
                this.$store.commit('data_parameters/taxes_and_charges', payload)
            }
        },
    },
    
}
</script>
