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
      
      get_forecasted_data_by_key: (state) => (key) => {
        if(!key) {
          return state.forecasted_data
        }

        if(state.forecasted_data.length) {
          if(Object.keys(state.forecasted_data[0]).includes(key)) {
            return state.forecasted_data.map(item => item[key])
          }
        }
        return []
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
        payload.map(item => {        
          item.demand = Math.max(item.peak_demand, item.off_peak_demand)
        })
        commit("set_forecasted_data", payload)
      },

      set_chosen_forecast_model({ commit }, payload) {
        commit('set_chosen_forecast_model', payload)
      }
    },
  }
  