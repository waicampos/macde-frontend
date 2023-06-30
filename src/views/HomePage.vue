<template>
<v-container class="py-0 my-0">
  <NavBar />
  <div> 
    <v-parallax
      src="@/assets/nordwood-themes-kRNZiGKtz48-unsplash-1920.jpg"
      height="480"
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
</div>

<div class="d-flex align-center flex-column">      
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="@/assets/logo-mcd-origin.png"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          Modelo de Avaliação dos Contratos de Demanda de Energia (MACDE)
        </h1>
        
        <hr />
        
        <p class="subheading font-weight-regular text-justify">
          O objetivo geral do projeto é criar uma ferramenta web para a otimização 
          e o planejamento da contratação de energia elétrica dos Institutos Federais conectados à rede de 
          distribuição de média tensão, em linguagem acessível e de fácil utilização, podendo estender-se 
          ao público em geral.
        </p>
        <p class="subheading font-weight-regular text-justify">
          O Macde surgiu dentro do IFSC Sustentável - ações de gestão da sustentabilidade no IFSC, 
          entre 2017 e 2018. Em novembro de 2018, o programa contou com aporte de recursos da Secretaria de Educação 
          Profissional e Tecnológica (Setec), dentro do Programa Energif, ligado à rede de Instituições Federais de 
          Educação Profissional e Tecnológica.
        </p>
      </v-col>
    </v-row>
  
    <v-row>
      <v-col cols="6">
        <v-img
          class="my-3"
          contain          
        />
        <p class="text-center headline font-weight-bold mb-3">Público Alvo</p>
        <p class="text-justify">O público-alvo do projeto são os Institutos Federais conectados em rede de distribuição de
          média tensão, onde a tarifa de energia é binômia, ou seja, é cobrada em função de dois
          indicadores, a demanda contratada (kW) e o consumo de energia elétrica (MWh). Pode-se
          estender a todos os consumidores do Grupo A do mercado cativo de energia.
        </p>
      </v-col>

      <v-col cols="6">
        <v-img
          class="my-3"
          contain          
        />
        <p class="text-center headline font-weight-bold mb-3">Simples e fácil de usar!</p>
        <p class="text-justify ">O público-alvo do projeto são os Institutos Federais conectados em rede de distribuição de
          média tensão, onde a tarifa de energia é binômia, ou seja, é cobrada em função de dois
          indicadores, a demanda contratada (kW) e o consumo de energia elétrica (MWh). Pode-se
          estender a todos os consumidores do Grupo A do mercado cativo de energia.
        </p>
      </v-col>
    </v-row>

    <v-row>
     <v-col cols="12">
        <v-img
          class="my-3"
          contain          
        />
        <p class="text-center headline font-weight-bold mb-3">Parcerias</p>
      </v-col>
    </v-row>

    <v-row>
       <v-col
       v-for="(card, i) in cardInfo"
       :key="i">
        <CardPage 
          :title= "card.title"
          :subtitle= "card.subtitle"
          :text= "card.text"
          :btnText= "card.btnText"
          :srcImage= "card.srcImage"
        />
      </v-col>
    </v-row>

    <!-- <FooterPage /> -->

  </div>
  </v-container>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
  export default {
    name: 'HomePage',
    components: {NavBar}
  }
</script>
