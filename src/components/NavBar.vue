<template>
<v-container>
    <v-app-bar>        
      <v-app-bar-title
      href="/simulador"
      >
        MACDE  
      </v-app-bar-title>      
      <template v-slot:prepend></template>
      <template v-slot:image>
        <v-img
          gradient="to top right, #388E3C, #C8E6C9"
        ></v-img>
      </template>
      
      <template #append>
          <v-btn 
            text
            href="/simulador"
          >
              <span>Simulador</span> 
          </v-btn>
          <v-btn 
            text
            href="/"
          >
              <span>Inicio</span> 
          </v-btn>
      </template>
    </v-app-bar>
</v-container>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

