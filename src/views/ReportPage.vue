<template>
<div class="container">   
        <VCard>  
            <VCardTitle>
                <!--Cabeçalho-->   
               Relatório MACDE
            </VCardTitle>
            
            <VCardText>                
                <!--Informações Consumidor-->
                <div class="row">  
                  <div class="col-12">
                    <h4 class="p-0 m-2">Dados do cliente:</h4> 
                  </div>
                </div>

                <div class="row">
                    <div class="col-2 bg-red">
                        CNPJ: <b>102.200.30/0001</b>
                    </div>
                    <div class="col-8">
                        Razão Social: <b>Instituto Federal de Santa Catarina</b>
                    </div>      
                </div>

                  <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                UC: <b>105006</b>
                            </div>
                            <div class="col-12 col-lg-8">
                                Distribuidora/ Concessionária/Permissionária (Cooperativa): 
                                    <b>Distribuidoas</b>
                            </div>    
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-lg-6">
                                Cliente: <b>IFSC</b>
                            </div>  
                        </div>  
                    </div>  

                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                Classe: <b>Poder Público</b>
                            </div>
                            <div class="col-12 col-lg-4">
                                Subgrupo: <b>A4</b>
                            </div>  
                            <div class="col-12 col-lg-4">
                                ModalidadeTarifaria: <b>Verde</b>
                            </div>                              
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 col-lg-4">
                                PIS/PASEP + COFINS + ICMS (%): <b>0</b>
                            </div>
                            <div class="col-12 col-lg-4">
                                CIP ou COSIP (R$): <b>0</b>
                            </div>  
                            <div class="col-12 col-lg-4">
                                Outros (R$): <b>0</b>
                            </div>                                                          
                        </div>
                    </div>
                </div>
                <hr class="style13 p-1 m-1">
                <!--Observação-->   
                <div class="row justify-content-center mt-2">
                    <h4 class="p-0 m-2">Informações:</h4>
                    <div class="col-12">
                        <p>Este planejamento é baseado na Resolução Normativa n°. 1.000/2021 da Agência Nacional de Energia Elétrica. 
                            Contudo, as regras da Resolução Normativa n°. 1.000/2021 devem ser verificadas e a distribuidora deve ser 
                            contatada para verificar as implicações de alteração na demanda para cada caso específico. As tarifas de energia (TE) 
                            e demanda (TUSD) utilizadas são as informadas pelo usuário e devem ser atualizadas. Em caso de dúvidas ou sugestões, 
                            entre em contato com <b>macde.energif@ifsc.edu.br</b>.
                        </p>
                    </div>      
                </div>
                <hr class="style13 p-1 m-1">

                <!--Laudo técnico e economia esperada-->
                <div class="row m-1">  
                    <div class="col-12 col-lg-5">  
                        <div class="row justify-content-center mt-2">                              
                                <h4>Laudo Técnico da Otimização</h4>
                            <div class="col-12"> 
                                <p>
                                A otimização com dados históricos de consumo e demanda da unidade consumidora (Ano A-1 a A-3), 
                                considerando as opções disponíveis de contratação e as tarifas vigentes, apontou a necessidade de 
                                ajustes no contrato de energia da unidade consumidora junto à distribuidora , abrangendo: Contratação de demanda.
                                Não esqueça que outras atitudes são sempre bem vindas e efetivas quando se deseja economizar na fatura de energia 
                                elétrica como ações de eficiência energética (ajustes e trocas de equipamentos de iluminação e climatização, 
                                instalação de sensores de presença, dentre outras), instalação de micro ou minigeração de energia 
                                (fotovoltaica ou outras renováveis), análise de multas por baixo fator de potência que são descritas na fatura, 
                                dentre outros.
                                </p>
                            </div>
                        </div>   
                    </div>

                    <div class="col-12 col-lg-7">  
                        <div class="row justify-content-center mt-2"> 
                            <h4>Economia Esperada</h4>                                                    
                            <div class="col-12">  
                                TABELA ECONOMIA ESPERADA
                            </div>
                        </div>                       
                    </div>
                </div>
                <hr class="style13 p-1 m-1">
                <!--Previsão de demanda-->
                <div class="row justify-content-center m-2">
                    <h4>Previsão de demanda:</h4>
                    <div class="col-12">
                        <div class="row" area_dos_graficos_relatorio>

                        </div>
                    </div>
                </div>

                <hr class="style13 p-1 m-1">
                <!--Ajustando o Contrato-->
                <div class="row justify-content-center m-2">
                    <h4>Ajustando o Contrato:</h4>
                    <div class="col-12">
                        <div class="row justify-content-center mt-2">
                            <p>A contatação acima ou abaixo da demanda necessária geram perda de dinheiro. Não tenha receio em solicitar 
                                informações sobre a alteração da demanda contrata para a distribuidora, também perguntando sobre as implicações 
                                da alteração da demanda para o seu caso específico. Em alguns casos esta implicações podem limitar a economia esperada, 
                                ou até mesmo reverter em prejuízo. A REN n°. 1.000/2021 da ANEEL deve ser verificada. Agende-se para evitar transtornos. 
                                Caso haja o conhecimento de alguma alteração estrutural do consumo de energia da unidade consumidora, como ampliações prediais, 
                                novos usos, instalação de geração distribuída (micro ou minigeração), dentre outros, este estudo precisará ser reexecutado considerando-os(as).
                            </p>
                            <p> 
                                O não cumprimento de todas as etapas a seguir pode limitar a economia esperada, ou até mesmo reverter em prejuízo.
                                Agende-se para evitar transtornos.
                                Caso haja o conhecimento de alguma alteração estrutural do consumo de energia da unidade consumidora, como
                                ampliações prediais, novos usos, instalação de geração distribuída, dentre outros, este estudo precisará ser
                                reexecutado.
                            </p>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row justify-content-left mt-2" id="textoAjusteContrato">
                            <!--JavaScript-->
                        </div>
                    </div>

                </div>

                <hr class="style13 p-1 m-1">
                <!-- Contato-->
                <div class="row justify-content-center m-2">
                    <h4>Contato da Concessionária de Energia:</h4>
                    <div class="col-12">
                        <div class="row justify-content-center"> 
                            <span>Empresa
                                Teleatendimento — 999
                                Empresa — (99) 9999-9999 — 14 h às 17h
                                exemplo@empresa.com.br
                            </span>
                        </div>
                    </div>
                </div>

                <hr class="style13 p-1 m-1">
                <!--Glossário Técnico-->
                <div class="row justify-content-center m-2">
                    <h4>Glossário Técnico:</h4>
                    <div class="col-12">
                        <div class="row"> 
                            <div class="col-6">                         
                                    <p>
                                        <ul>
                                            <li><b>Ano A-1:</b> Primeiro dos 3 anos que são utilizados para compor os três anos históricos para analisar o 
                                                incremento ou decréscimo de demanda prevista. Ex. Ano 2022, o ano A-1 é o ano de 2021.
                                            </li>
                                            <li><b>Bandeiras Tarifárias:</b> A distribuidora deve aplicar as bandeiras tarifárias sobre o consumo faturado 
                                                da unidade consumidora, utilizando uma tarifa proporcional aos dias de vigência de cada bandeira.
                                            </li>
                                            <li><b>CUSD - Contrato de Uso do Sistema de Distribuição:</b> A distribuidora deve celebrar um contrato 
                                                com o consumidor responsável por unidade consumidora do grupo A e demais usuários, com exceção das 
                                                unidades consumidoras do Grupo B.
                                            </li>
                                            <li><b>Demanda:</b> média das potências elétricas ativas (kW) requerida pela carga durante um intervalo de tempo 
                                                especificado (15 minutos).
                                            </li>
                                            <li><b>Demanda Contratada:</b> potência ativa (kW) contratada junto à distribuidora de energia, durante o período 
                                                de vigência fixado em contrato. Deve ser paga mesmo que não utilizada, devido aos custos para manutenção 
                                                da disponibilidade.
                                            </li>
                                            <li><b>Demanda Faturável:</b> maior valor entre a demanda máxima medida e a demanda contratada durante o período 
                                                de faturamento, expressa em quilowatts (kW).
                                            </li>
                                            <li><b>Fatura:</b> documento emitido pela distribuidora com a quantia monetária total a ser paga pelo consumidor. 
                                                Documento fiscal denominado "Nota Fiscal/Conta de Energia Elétrica”.
                                                </li>
                                            <li><b>Horário Fora de Ponta (Posto tarifário fora de ponta):</b> período composto pelo restante das horas 
                                                diárias não inclusas no Horário de Ponta, além dos sábados, domingos e feriados e, para o grupo B, intermediário.                                            
                                            </li>
                                            <li><b>Horário de Ponta (Posto tarifário ponta:):</b> período composto por três horas diárias consecutivas 
                                                definidas pela distribuidora, onde os custos das tarifas de energia (TE) e de uso do sistema elétrico (TUSD) 
                                                são, geralmente, superiores aos do Horário Fora de Ponta devido à maior concentração de cargas no sistema. 
                                                Não se aplica aos sábados, domingos e feriados nacionais.
                                        </li>
                                        </ul>
                                    </p>                        
                            </div>
                            <div class="col-6"> 
                                <p>
                                    <ul>                                        
                                        <li><b>Horo-Sazonal Azul (modalidade tarifária horária azul):</b> caracterizada por:
                                            <ol type = "I"> 
                                                <li> 1 (uma) tarifa para a demanda para o posto tarifário ponta;</li>
                                                <li> 1 (uma) tarifa para a demanda para o posto tarifário fora de ponta;</li>
                                                <li> 1 (uma) tarifa para o consumo de energia elétrica para o posto tarifário ponta; e</li>
                                                <li> 1 (uma) tarifa para o consumo de energia elétrica para o posto tarifário fora de ponta.</li>
                                            </ol> 
                                        </li>
                                        <li><b>Horo-Sazonal Verde (modalidade tarifária horária verde):</b> caracterizada por:
                                            <ol type = "I"> 
                                                <li> 1 (uma) tarifa para a demanda, sem segmentação horária;</li>
                                                <li> 1 (uma) tarifa para o consumo de energia elétrica para o posto tarifário ponta; e</li>
                                                <li> 1 (uma) tarifa para o consumo de energia elétrica para o posto tarifário fora de ponta.</li>
                                            </ol>
                                        </li>
                                        <li><b>Otimização:</b> processo matemático que busca identificar a alternativa que gere o melhor resultado 
                                            possível diante de uma determinada oportunidade, considerando as restrições estabelecidas.
                                        </li>
                                        <li><b>PIS/PASEP/COFINS e ICMS:</b> contribuições federais e estadual aplicadas sobre o faturamento da distribuidora 
                                            e diluídas posteriormente entre os consumidores, através de alíquotas mensais variáveis, aplicadas sobre os 
                                            montantes de demanda e energia da fatura.
                                        </li>
                                        <li><b>TE – Tarifa de Energia:</b> valor determinado pela ANEEL, em R$/MWh, utilizado para efetuar o faturamento 
                                            mensal do consumo de energia.
                                        </li>
                                        <li><b>TUSD - Tarifa de Uso do Sistema de Distribuição:</b> valor determinado pela ANEEL, em R$/MWh 
                                            (aplicado sobre o consumo) e em R$/kW (aplicado sobre a demanda contratada), utilizado para efetuar 
                                            o faturamento mensal pelo uso do sistema elétrico de distribuição.
                                        </li>
                                        <li><b>Ultrapassagem de Demanda:</b> multa pelo uso de demanda maior que o limite de 5% acima da Demanda 
                                            Contratada para consumidor. É cobrada sobre todo o excesso de demanda e equivale ao dobro do valor 
                                            da TUSD aplicada sobre a contratação de demanda (R$/kW).
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </VCardText>            
        </VCard>
    </div> 
</template>
