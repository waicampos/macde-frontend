import { createStore } from 'vuex'

import data_history from '@/store/modules/data_history'
import data_forecast from '@/store/modules/data_forecast'
import data_optimize from '@/store/modules/data_optimize'
import data_parameters from '@/store/modules/data_parameters'
import data_configurations from '@/store/modules/data_configurations'
import data_results from '@/store/modules/data_results'

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
    data_history, data_forecast, data_optimize, data_parameters, data_configurations, data_results

  }
})
