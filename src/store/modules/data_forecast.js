export default {
    namespaced: true,
    state: {
      forecasted_data: [],
      chosen_forecast_model: {'type': 'doublemean'}
    },
    getters: {
      get_forecasted_data(state) {
        return state.forecasted_data
      },
      get_chosen_forecast_model(state) {
        return state.chosen_forecast_model
      }
    },
    mutations: {  
      set_forecasted_data(state, payload) {
        state.forecasted_data = payload
      },  
      set_chosen_forecast_model(state, payload) {
        state.chosen_forecast_model = payload
      }
    },
    actions: {
      set_forecasted_data({ commit }, payload) {
        commit("set_forecasted_data", payload)
      },
      set_chosen_forecast_model({ commit }, payload) {
        commit('set_chosen_forecast_model', payload)
      }
    },
  }
  