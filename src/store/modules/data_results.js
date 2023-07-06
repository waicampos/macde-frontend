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

      get_contracted_demand_total_cost(state) {
        let costs = {}
        Object.keys(state.contracted_demand_cost).map(key => {  
          costs[key] = state.contracted_demand_cost[key].reduce((acc, cur) => acc + cur, 0)
        })
        return costs
      },

      get_optimized_demand_cost(state) {
        return state.optimized_demand_cost
      },

      get_optimized_demand_total_cost(state) {
        let costs = {}
        Object.keys(state.optimized_demand_cost).map(key => {  
          costs[key] = state.optimized_demand_cost[key].reduce((acc, cur) => acc + cur, 0)
        })
        console.log("SOTRE OPT", state.optimized_demand_cost)
        return costs
      },
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
  