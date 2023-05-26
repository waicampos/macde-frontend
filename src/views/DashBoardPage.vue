<template>
<v-app>
  <NavBar />
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item 
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          :prepend-icon="item.icon" :title="item.text" :value="item.text"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-container>
</v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
  export default {
    name: 'DashBoardPage',
    components: {NavBar},
    data() {
      return {
        rail: false,
        drawer: null,
        items: [
          { text: 'Histórico', icon: 'mdi-file-cabinet', link: "/simulador/historico" },
          { text: 'Previsão', icon: 'mdi-finance', link: "/simulador/previsao" },
          { text: 'Otimização', icon: 'mdi-desktop-classic', link: "/simulador/otimizacao" },
          { text: 'Resultados', icon: 'mdi-content-paste', link: "/simulador/resultados" },
        ],
      }
    },
  }
</script>
