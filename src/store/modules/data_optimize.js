import axios from 'axios'
import { 
  demand_cost_assembly_request, 
  demand_cost_response_disassembly, 
  get_demand_measurements_names } 
from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
      optimized_data: [],
      chosen_optimize_model: {'type': 'exploratory'},
      optimized_demand_cost: [],
    },
    getters: {
      get_optimized_data(state){     
        return state.optimized_data
      },

      get_optimized_data_by_key: (state) => (key) => {
        if(!key) {
          return state.optimized_data
        }
        else {          
          return state.optimized_data.map(item => item[key])  
        }
      },

      get_chosen_optimize_model(state) {
        return state.chosen_optimize_model
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
        const contracted_demand_cost = rootGetters['data_forecast/get_contracted_demand_total_cost']        
          let tariff_modality = rootGetters['data_configurations/get_tariff_modality']
          let demand_names = get_demand_measurements_names(tariff_modality.name)
          demand_names.map(key => {              
            total -= getters.get_optimized_demand_total_cost[key]
            total += contracted_demand_cost[key]
          })
        
        return total
      },       
    },

    mutations: {  
      set_optimized_data(state, payload) {
        state.optimized_data = payload
      },  
      set_chosen_optimize_model(state, payload) {
        state.chosen_optimize_model = payload
      },

      set_optimized_demand_cost(state, payload) {
        state.optimized_demand_cost = payload
      },
    },

    actions: {
      set_optimized_data({ commit }, payload) {
        commit("set_optimized_data", payload)
      },

      set_chosen_optimize_model({ commit }, payload) {
        commit('set_chosen_optimize_model', payload)
      },

      optimize({dispatch, rootGetters}){
        const tariff_modality = rootGetters['data_configurations/get_tariff_modality']
        const get_data = rootGetters['data_forecast/get_forecasted_data_by_key']
        const has_demand_variation = rootGetters['data_parameters/get_has_demand_variation']
        const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/exploratory/${tariff_modality.value}/${has_demand_variation ? "1" : "0"}`

        let arr_req = []
        if(tariff_modality.name == 'blue') {
          let peak_demand =  get_data('peak_demand')
          let off_peak_demand =  get_data('off_peak_demand')
          arr_req = [axios.post(addr, {'data': [[...peak_demand], ...[off_peak_demand]]})]
        }
        else {
          let demand = get_data('demand')
          arr_req = [axios.post(addr, {'data': [...demand]})]
        }

        Promise.all(arr_req).then(response => {   
          let optimized = []
          let lentgh_res = tariff_modality.name == 'blue' ? response[0].data[0].length : response[0].data.length
          for(let i in [...Array(lentgh_res).keys()]){
              let prov = {}
              if(tariff_modality.name == 'blue') {
                prov['peak_demand'] = response[0].data[0][i]
                prov['off_peak_demand'] = response[0].data[1][i]
              }else {
                prov['demand'] = response[0].data[i]
              }                
              optimized.push(prov)
          }

          let year = 1 + rootGetters['data_history/get_series_biggest_year']
          optimized.map((item, index) => {
            let month = index + 1
            item.date = '1/' + month + '/' + year
          })

          dispatch('set_optimized_data', optimized)
        })
      },

      calculate_optimized_demand_cost({ state, commit, rootGetters }) {        
        let optimized = JSON.parse(JSON.stringify(state.optimized_data))
        optimized.forEach(item => delete item.date)
        const arr_req = demand_cost_assembly_request(
          rootGetters['data_forecast/get_forecasted_data'], 
          optimized, 
          rootGetters['data_parameters/get_tariffs']
        )
          
        Promise.all(arr_req).then(response => {   
          const demand_costs = demand_cost_response_disassembly(optimized, response)
          commit("set_optimized_demand_cost", demand_costs)
        })
      },
    },
  }
  