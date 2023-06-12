export default {
    namespaced: true,
    state: {
      user_data_forecast: []
    },
    getters: {
      get_user_data_forecast(state) {
        return state.user_data_forecast
      }
    },
    mutations: {  
      load_user_data_forecast(state, payload) {
        state.user_data_forecast = payload
      },  
    },
    actions: {
      load_user_data_forecast({ commit }, payload) {
        commit("load_user_data_forecast", payload)
      }
    },
  }
  