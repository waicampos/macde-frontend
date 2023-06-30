<template>
<v-container class="py-0 my-0">
  <NavBar />

  <v-row class="mb-4 pb-4"> 
    <v-col>
    <v-parallax
      src="@/assets/nordwood-themes-kRNZiGKtz48-unsplash-1920.jpg"
      height="600"
      scale=0.85
    >
    <v-row class="d-flex flex-column justify-start" style="margin-top: 7.5em; margin-left: 8em;">
      <v-col class="d-flex flex-row align-center justify-start"> 
        <div class="pr-4">
          <v-img            
            :width="50"
            src="@/assets/logo_simples_150x150.png"
          ></v-img>        
        </div>
        <div>
          <p class="text-h2 font-weight-thin">MACDE</p>                
        </div>
      </v-col>

      <v-col class="d-flex flex-row align-center justify-start">
       <div>
            <p class="text-h5 font-weight-light pb-2">Modelo de Avaliação <br />
                                        dos Contratos de Demanda de Energia</p>                             
            <v-btn size="medium" color="indigo-darken-3">INICIAR SIMULAÇÃO</v-btn>                              
        </div>
      </v-col>
    </v-row>
</v-parallax>
</v-col>
</v-row>

<!-- Objetivos e público Alvo -->
<v-row class="my-4 py-4">
  <v-col cols=12>
    <h1 class="text-center text-h4 font-weight-thin">Modelo de Avaliação dos Contratos de Demanda de Energia (MACDE)</h1>
  </v-col>
    <v-col cols=12>
      <v-card elevation="0">
        <v-card-item class="">
          <v-row>
            <v-col>
              <p class="text-subtitle-1 text-justify">
                O Macde surgiu dentro do IFSC Sustentável - ações de gestão da sustentabilidade no IFSC, 
                entre 2017 e 2018. Em novembro de 2018, o programa contou com aporte de recursos da Secretaria de Educação 
                Profissional e Tecnológica (Setec), dentro do Programa Energif, ligado à rede de Instituições Federais de 
                Educação Profissional e Tecnológica. O objetivo geral do projeto é criar uma ferramenta web para a otimização 
              e o planejamento da contratação de energia elétrica dos Institutos Federais conectados à rede de 
              distribuição de média tensão, em linguagem acessível e de fácil utilização, podendo estender-se 
              ao público em geral.
              </p>
              <p class="text-subtitle-1 text-justify mt-4">O público-alvo do projeto são os Institutos Federais conectados em rede de distribuição de
                média tensão, onde a tarifa de energia é binômia, ou seja, é cobrada em função de dois
                indicadores, a demanda contratada (kW) e o consumo de energia elétrica (MWh). Pode-se
                estender a todos os consumidores do Grupo A do mercado cativo de energia.
              </p>
            </v-col>
          </v-row>
        </v-card-item>                        
        <v-card-text class="text-justify">         
        </v-card-text>  
      </v-card>  
    </v-col>
</v-row>
<v-divider></v-divider>

  <!-- Simples e Fácil de Usar -->
  <v-row class="my-4 py-4">
    <VCol cols="12 text-center mt-6">
      <v-card elevation="0">
        <v-card-item>
            <v-card-title class="text-h4 font-weight-thin">Simples e Fácil de usar!</v-card-title>
        </v-card-item>                        
        <v-card-text class="text-justify">         
            <v-row align="center">
              <v-col cols=12 lg=7>                
                <v-list                                                           
                    lines="two"
                >                                    
                    <v-list-item                                           
                        class="ma-2 pa-2"    
                        v-for="item in how_to_use" 
                        :key="item.title"                                    
                        >    
                          <v-row>
                            <v-col class="d-flex align-center">                              
                              <v-icon
                                size="50"
                                color="blue-darken-2"
                                :icon="item.icon"
                              ></v-icon>
                              <div class="ml-6">
                                <v-list-item-title class="text-subtitle-1 text-md-h6 text-lg-h5 ma-0 pa-0">{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle class="text-caption text-md-subtitle-2 ma-0 pa-0">{{ item.subtitle }}</v-list-item-subtitle>                                                                                                    
                              </div>                          
                            </v-col>                        
                          </v-row>                                                                                        
                    </v-list-item>
                </v-list>  
              </v-col>
              <v-col class="hidden-md-and-down" cols="12" lg="">
                <v-img
                  class="rounded-xl"  
                  max-height="300"                
                  height="100%"
                  cover                  
                  src="@/assets/campaign-creators-pypeCEaJeZY-unsplash-640.jpg"
                >
                </v-img>
              </v-col>                     
              </v-row>
        </v-card-text>  
      </v-card>  
      </VCol>
  </v-row>
  <v-divider></v-divider>

  <!-- Parcerias -->
  <v-row class="mt-4 py-4 mb-8">
  <v-col cols=12>
    <h1 class="text-center text-h4 font-weight-thin">Parcerias</h1>
  </v-col>
    <v-col cols=12 md=6 lg=4 v-for="item in partners" :key="item.title">
      <v-card elevation="4" max-width="600px">
        <v-card-item class="">
          <v-img
            class="align-end text-white"
            height="150"
            :src= "item.img"            
          >
          </v-img>
          <v-divider class="my-3"></v-divider>
          <v-card-title class="text-h4 mt-3 font-weight-thin">{{ item.title }}</v-card-title> 
          <v-card-subtitle class="pt-4">{{ item.subtitle }}</v-card-subtitle>
        </v-card-item>                        
        <v-card-text class="text-justify">         
            <p>{{ item.text }}</p>
        </v-card-text>  
        <v-card-actions>
          <v-btn
              :href="item.href"      
              target="_blank"                  
              color="indigo-darken-3"
              variant="flat"
          >
              Saiba Mais
          </v-btn>                  
        </v-card-actions>
      </v-card>  
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import gese from '@/assets/logo-gese.png'
import ifsc from '@/assets/logo-ifsc.png'
import energif from '@/assets/logo-energif.png'

  export default {
    name: 'HomePage',
    components: {NavBar},
    data(){
      return {
        partners: [
          {
            "title": "GESE",
            "subtitle": "Grupo de Estudos em Sistemas de Energia",
            "img": gese,
            "link": "https://gese.florianopolis.ifsc.edu.br",
            "text": "O GESE atua nas seguintes áreas: tarifação de energia elétrica, regulação e mercado de energia elétrica, planejamento de sistemas de energia elétrica, gerenciamento pelo lado da demanda, otimização multiobjetivo, supervisão e controle de sistemas de energia elétrica, eficiência energética..."
          },
          {
            "title": "ENERGIF",
            "subtitle": "Programa para Desenvolvimento em Energias Renováveis e Eficiência Energética nas Instituições Federais de Educação",
            "img": energif,
            "link": "http://energif.mec.gov.br",
            "text": "O Programa EnergIF, estruturado no âmbito da Secretaria de Educação Profissional e Tecnológica (SETEC), do Ministério da Educação (MEC), torna possível a aplicação de medidas de melhoria no desempenho energético da Rede Federal, bem como a ampliação da oferta de cursos por suas unidades.     "
          },
          {
            "title": "IFSC",
            "subtitle": "Instituto Federal de Santa Catarina",
            "img": ifsc,
            "href": "https://ifsc.edu.br",
            "text": "O Instituto Federal de Santa Catarina (IFSC) é uma instituição pública federal de ensino. Atua na oferta de educação profissional, científica e tecnológica, oferecendo cursos nos mais diversos níveis: qualificação profissional, educação de jovens e adultos, cursos técnicos, superiores...    "
          }
        ],

        how_to_use: [
          {
            "title": "Dados Históricos",
            "subtitle": "Entre com os dados de consumo e demanda de energia.",
            "icon": "mdi-file-document-outline"
          },
          {
            "title": "Parâmetros Auxiliares",
            "subtitle": "Edite as informações e configure os parâmetros.",
            "icon": "mdi-cog-outline"
          },
          {
            "title": "Modelo de Previsão",
            "subtitle": "Escolha entre os modelos de previsão disponíveis ou entre com os resultados de um modelo externo.",
            "icon": "mdi-chart-line"
          },
          {
            "title": "Modelo de Otimização",
            "subtitle": "Pronto! É só clicar em otimizar.",
            "icon": "mdi-laptop"
          },
          {
            "title": "Resultados e Relatório",
            "subtitle": "Acompanhe os resultados e gere um relatório completo.",
            "icon": "mdi-chart-tree"
          },
        ]
      }
  },
}

</script>
