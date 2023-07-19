import axios from 'axios'
import { get_demand_measurements_names } from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
      contracted_demand_cost: [],
      optimized_demand_cost: [],
    },
    getters: {
      get_contracted_demand_cost(state, getters, rootState, rootGetters) {
        return rootGetters['data_parameters/get_current_contracted_demand']
      },

      get_contracted_demand_total_cost(state, getters, rootState, rootGetters){
        let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
        let demand_names = get_demand_measurements_names(tariff_modality.name)
        let costs = {}

        demand_names.forEach(key => {            
          costs[key] = state.contracted_demand_cost.map(item => item[key]).reduce((acc, cur) => acc + cur, 0)
        })
        return costs
      },

      get_optimized_demand_cost(state) {
        return state.optimized_demand_cost
      },

      get_optimized_demand_total_cost(state, getters, rootState, rootGetters) {
        let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
        let demand_names = get_demand_measurements_names(tariff_modality.name)
        
        let costs = {}
        if(state.optimized_demand_cost.length) {
          demand_names.forEach(key => {
            costs[key] = 0
            state.optimized_demand_cost.map(item => {
              costs[key] += item[key]
            })  
          })
        }
        return costs
      },

      get_total_cost_savings(state, getters, rootState, rootGetters) {
        let total = 0
        if(state.optimized_demand_cost.length && state.optimized_demand_cost.length) {
          let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
          let demand_names = get_demand_measurements_names(tariff_modality.name)
          demand_names.map(key => {              
            total -= getters.get_optimized_demand_total_cost[key]
            total += getters.get_contracted_demand_total_cost[key]
          })
        }
        
        return total
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
      },

      calculate_contracted_demand_cost({ dispatch, rootGetters }) {
        let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
        let demand_names = get_demand_measurements_names(tariff_modality.name)
        let current_contracted_demand = rootGetters['data_parameters/get_current_contracted_demand']
        const forecasted = rootGetters['data_forecast/get_forecasted_data']
        let curr_demand = {}
        demand_names.map(curr => {
          curr_demand[curr] = current_contracted_demand(curr)[0].value           
        })
        let contracted = Array(forecasted.length).fill(curr_demand)
        dispatch("calcule_demand_cost", {data: forecasted, contracted: contracted, type: 'contracted'})
      },

      calculate_optimized_demand_cost({ dispatch, rootGetters }) {        
        const forecasted = rootGetters['data_forecast/get_forecasted_data']
        let optimized_demand = [...rootGetters['data_optimize/get_optimized_data']]
        dispatch("calcule_demand_cost", {data: forecasted, contracted: optimized_demand, type: 'optimized'})
      },

      calcule_demand_cost({commit, rootGetters}, payload){
        let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
        let tariff = rootGetters['data_parameters/get_tariffs']
        let demand_names = get_demand_measurements_names(tariff_modality.name)
        const addr = '//localhost:5010/demand_cost'
        let arr_req = []
        demand_names.map(curr => {
          arr_req.push(
            axios.post(addr, {
              'data': payload.data.map(item => item[curr]),
              'contracted': payload.contracted.map(item => item[curr]),
              'tariff': tariff(curr)[0].value
            })            
          )
        })        
        Promise.all(arr_req).then(response => {   
          let lentgh_res = response[0].data.length
          let demand_costs = []
          for(let i in [...Array(lentgh_res).keys()]){
            let prov = {}
            demand_names.map((key, index) => {
              prov[key] = response[index].data[i]
            })
            demand_costs.push(prov)
          }
          if(payload.type == 'optimized') {
            commit("set_optimized_demand_cost", demand_costs)
          }
          else {
            commit("set_contracted_demand_cost", demand_costs)
          }
        })           
      },
    },
  }
  