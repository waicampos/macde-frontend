// Composables
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import DashBoardPage from '@/views/DashBoardPage.vue'
import UserHistoryPage from '@/views/UserHistoryPage.vue'
import UserForecastPage from '@/views/UserForecastPage.vue'
import UserOptimizationPage from '@/views/UserOptimizationPage.vue'
import UserResultsPage from '@/views/UserResultsPage.vue'
import ReportPage from '@/views/ReportPage.vue'
import AccountPage from '@/views/AccountPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/simulador',
    redirect: '/simulador/historico',
    name: 'Simulador',
    component: DashBoardPage,
    children: [
      {path: 'historico', component: UserHistoryPage},
      {path: 'previsao', component: UserForecastPage},
      {path: 'otimizacao', component: UserOptimizationPage},
      {path: 'resultados', component: UserResultsPage},
      {path: 'relatorio', component: ReportPage},
      {path: 'info', component: AccountPage}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
