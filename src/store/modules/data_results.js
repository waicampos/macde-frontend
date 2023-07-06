export default {
    namespaced: true,
    state: {
      contracted_demand_cost: [],
      optimized_demand_cost: [],
    },
    getters: {
      get_contracted_demand_cost(state) {
        return state.contracted_demand_cost
      },
      get_optimized_demand_cost(state) {
        return state.optimized_demand_cost
      }
    },
    mutations: {  
      set_contracted_demand_cost(state, payload) {
        state.contracted_demand_cost = payload
      },
      set_optimized_demand_cost(state, payload) {
        state.optimized_demand_cost = payload
      }
    },
    actions: {
      set_contracted_demand_cost({ commit }, payload) {
        commit("set_contracted_demand_cost", payload)
      },
      set_optimized_demand_cost({ commit }, payload) {
        commit("set_optimized_demand_cost", payload)
      }
    },
  }
  