import { createStore } from 'vuex'

import data_history from '@/store/modules/data_history'
import data_forecast from '@/store/modules/data_forecast'
import data_optimize from '@/store/modules/data_optimize'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
    
  },
  modules: {
    data_history, data_forecast, data_optimize
  }
})
