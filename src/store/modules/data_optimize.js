export default {
    namespaced: true,
    state: {
      optimized_data: [],
      chosen_optimize_model: {'type': 'exploratory'}
    },
    getters: {
      get_optimized_data(state) {
        return state.optimized_data
      },
      get_chosen_optimize_model(state) {
        return state.chosen_optimize_model
      }
    },
    mutations: {  
      set_optimized_data(state, payload) {
        state.optimized_data = payload
      },  
      set_chosen_optimize_model(state, payload) {
        state.chosen_optimize_model = payload
      }
    },
    actions: {
      set_optimized_data({ commit }, payload) {
        commit("set_optimized_data", payload)
      },
      set_chosen_optimize_model({ commit }, payload) {
        commit('set_chosen_optimize_model', payload)
      }
    },
  }
  