import { 
    demand_cost_assembly_request, 
    demand_cost_response_disassembly, 
    sum,
  } 
  from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
        contracted_demand_cost: [],
        optimized_demand_cost: [],
        energy_cost: [],
    },
    getters: {
        get_contracted_demand_cost(state) {
            return state.contracted_demand_cost
        },

        get_optimized_demand_cost(state) {
            return state.optimized_demand_cost
        },

        get_contracted_cost(state) {
          return state.contracted_demand_cost.map((item, index) => Object.assign({}, item, state.energy_cost[index]))
        },

        get_optimized_cost(state) {
          return state.optimized_demand_cost.map((item, index) => Object.assign({}, item, state.energy_cost[index]))
        },

        get_total_contracted_monthly_cost(state, getters) {
          return getters.get_contracted_cost.map(item => Number((Object.values(item).reduce(sum, 0)).toFixed(2)))
        },

        get_total_optimized_monthly_cost(state, getters) {
          return getters.get_optimized_cost.map(item => Number((Object.values(item).reduce(sum, 0)).toFixed(2)))
        },

        get_total_contracted_cost(state, getters) {
          return getters.get_total_contracted_monthly_cost.reduce(sum, 0).toFixed(2)
        },

        get_total_optimized_cost(state, getters) {
          return getters.get_total_optimized_monthly_cost.reduce(sum, 0).toFixed(2)
        },

        get_total_contracted_cost_by_key(state, getters) {
          let costs = {}
          if(getters.get_contracted_cost.length) {
            Object.keys(getters.get_contracted_cost[0]).forEach(key => costs[key] = 0)
            getters.get_contracted_cost.map(item => {
              Object.keys(item).forEach(key => {
                costs[key] += item[key]
              })
            })
          }
          return costs
        },

        get_total_optimized_cost_by_key(state, getters) {
          let costs = {}
          if(getters.get_optimized_cost.length) {
            Object.keys(getters.get_optimized_cost[0]).forEach(key => costs[key] = 0)
            getters.get_optimized_cost.map(item => {
              Object.keys(item).forEach(key => {
                costs[key] += item[key]
              })
            })
          }
          return costs
        },

        get_proportional_contracted_cost(state, getters) {
          const costs = getters.get_total_contracted_cost_by_key
          const total_cost = Object.values(costs).reduce(sum, 0)
          
          const porportional_costs = {}
          Object.keys(costs).forEach(key => {            
            porportional_costs[key] = Number(((costs[key] / total_cost) * 100).toFixed(2))
          })    

          return porportional_costs
        },

        get_proportional_optimized_cost(state, getters) {
          const costs = getters.get_total_optimized_cost_by_key
          const total_cost = Object.values(costs).reduce(sum, 0)
          
          const porportional_costs = {}
          Object.keys(costs).forEach(key => {            
            porportional_costs[key] = Number(((costs[key] / total_cost) * 100).toFixed(2))
          })    

          return porportional_costs
        },

        get_energy_cost(state) {
            return state.energy_cost
        },

        get_total_cost_savings(state, getters) {
          const contracted = Object.values(getters.get_total_contracted_cost_by_key).reduce(sum,0).toFixed(2)
          const optimized = Object.values(getters.get_total_optimized_cost_by_key).reduce(sum,0).toFixed(2)
          return contracted - optimized
        },
    },

    mutations: {  
        set_contracted_demand_cost(state, payload) {
            state.contracted_demand_cost = payload
        },

        set_optimized_demand_cost(state, payload) {
            state.optimized_demand_cost = payload
        },

        set_energy_cost(state, payload) {
            state.energy_cost = payload
        },
    },

    actions: {
        calculate_contracted_demand_cost({ commit, rootGetters }) {
            const forecasted = rootGetters['data_forecast/get_forecasted_data']
            const current_contracted = rootGetters['data_parameters/get_current_contracted_demand']
            let contracted_values = {}
            const demand_names = rootGetters['data_configurations/get_demand_measurements_names']
            demand_names.forEach(key => {
                contracted_values[key] = current_contracted(key).value
            })
            contracted_values = Array(forecasted.length).fill(contracted_values) 
            const arr_req = demand_cost_assembly_request(
              forecasted, 
              contracted_values, 
              rootGetters['data_parameters/get_tariffs'],
              demand_names
            )    
            Promise.all(arr_req).then(response => {   
              const demand_costs = demand_cost_response_disassembly(contracted_values, response)
              commit("set_contracted_demand_cost", demand_costs)
            })
          },

          calculate_optimized_demand_cost({ commit, rootGetters }) {    
            const demand_names = rootGetters['data_configurations/get_demand_measurements_names']
            let optimized = rootGetters['data_optimize/get_optimized_data']           
                        
            const arr_req = demand_cost_assembly_request(
              rootGetters['data_forecast/get_forecasted_data'], 
              optimized, 
              rootGetters['data_parameters/get_tariffs'],
              demand_names
            )
              
            Promise.all(arr_req).then(response => {   
              const demand_costs = demand_cost_response_disassembly(optimized, response)                                      
              commit("set_optimized_demand_cost", demand_costs)
            })
          },
    
          calculate_energy_cost({ commit, rootGetters }) { 
            const forecasted = rootGetters['data_forecast/get_forecasted_data']     
            const get_tariff = rootGetters['data_parameters/get_tariffs']
            const energy_names = rootGetters['data_configurations/get_energy_measurements_names']
            let costs = []
            forecasted.forEach(item => {
              let prov = {}
              energy_names.forEach(key => {
                prov[key] = Number((item[key] * get_tariff(key).value).toFixed(2))
              })
              costs.push(prov)
            })
            commit("set_energy_cost", costs)
          },
    }
}
  