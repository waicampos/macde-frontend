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
                                <VCol cols="12" lg="6" class="py-0 my-1">
                                    <p><b>CLIENTE:</b> Instituto Federal de Educação, Ciência e Tecnologia de Santa Catarina</p>
                                </VCol>
                                <VCol cols="12" lg="3" class="py-0 my-1">
                                    <p><b>RAZÃO SOCIAL:</b> Instituto Federal de Santa Catarina</p>
                                </VCol>
                                <VCol cols="12" lg="3" class="py-0 my-1">
                                    <p><b>CNPJ:</b> 125.200.70/0001</p>
                                </VCol>
                                <VCol cols="12" lg="6" class="py-0 my-1">
                                     <p><b>DISTRIBUIDORA/CONCESSIONÁRIA/PERMISSIONÁRIA(COOPERATIVA):</b> CELESC</p>
                                </VCol>
                                <VCol cols="12" lg="3" class="py-0 my-1">
                                    <p><b>CLASSE:</b> Poder Público</p>
                                </VCol>
                                <VCol cols="3" class="py-0 my-1">
                                    <p><b>UC:</b> 105006</p>
                                </VCol>                                
                                <VCol cols="12" lg="6" class="py-0 my-1">
                                    <p><b>MODALIDADE TARIFÁRIA:</b> Verde</p>
                                </VCol>
                                <VCol cols="12" lg="3" class="py-0 my-1">
                                    <p><b>SUBBGRUPO:</b> A4</p>
                                </VCol>
                                <VCol cols="12" lg="6" class="py-0 my-1">
                                    <p><b>PIS/PASEP + COFINS + ICMS (%):</b> 0</p>
                                </VCol>
                                <VCol cols="12" lg="3" class="py-0 my-1">
                                    <p><b>CIP ou COSIP (R$):</b> 0</p>
                                </VCol>
                                <VCol cols="12" md="3" class="py-0 my-1">
                                    <p><b>Outros (R$):</b> 0</p>
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
                                Solicitações que devem ser feitas à distribuidora <b>AmE</b>:
                            </p>
                            <p class="text-justify pt-2">
                                1) Alteração do valor contratado de <b>Demanda de Ponta</b> para <b>540 kW</b>.
                            </p>
                            <p class="text-justify pb-4">
                                2) Alteração do valor contratado de <b>Demanda Fora de Ponta</b> para <b>774 kW</b>.
                            </p>
                            
                            <p class="text-justify">
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
                            <v-card-title>Glossário Técnico:</v-card-title>
                        </v-card-item>
                        
                        <v-card-text class="py-0 my-0 text-justify">    
                                    <v-list>
                                        <v-list-item class="ma-1 pa-0" v-for="(item, idx) in items" :key="idx">                                            
                                            <p><b> {{item.title}}:</b> {{item.text}}</p>
                                            <v-list v-if="item.list.length">
                                                 <v-list-item class="ma-0 pa-0" v-for="(subitem, sub_idx) in item.list" :key="sub_idx">
                                                    <p><v-icon :icon="item.icon"></v-icon>{{subitem.text}}</p>
                                                </v-list-item>
                                            </v-list>
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
import macde_report_glossary from '@/assets/files/macde_report_glossary.json'
    export default {
        data() {
            return {
                items: macde_report_glossary
            }
        },
        methods: {
            print() {
                console.log(this.items)
                console.log(macde_report_glossary)
            }
        },
        mounted() {
            this.print()
        }
    }
</script>
