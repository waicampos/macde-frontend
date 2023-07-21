import axios from 'axios';
import { 
  get_all_measurements_names, 
  demand_cost_assembly_request, 
  demand_cost_response_disassembly, 
  get_energy_measurements_names 
} 
from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
      forecasted_data: [],
      chosen_forecast_model: {'type': 'doublemean'},
      contracted_demand_cost: [],
      energy_cost: [],
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
      },

      get_contracted_demand_cost(state) {
        return state.contracted_demand_cost
      },

      get_energy_cost(state) {
        return state.energy_cost
      },
    },

    mutations: {  
      set_forecasted_data(state, payload) {
        state.forecasted_data = payload
      },  

      set_chosen_forecast_model(state, payload) {
        state.chosen_forecast_model = payload
      },

      set_contracted_demand_cost(state, payload) {
        state.contracted_demand_cost = payload
      },

      set_energy_cost(state, payload) {
        state.energy_cost = payload
      },
    },

    actions: {
      set_forecasted_data({ commit }, payload) {
        commit("set_forecasted_data", payload)
      },

      set_chosen_forecast_model({ commit }, payload) {
        commit('set_chosen_forecast_model', payload)
      },

      forecast({dispatch, getters, rootGetters}) {
        let meas_names = get_all_measurements_names()
        let get_data = rootGetters['data_history/get_user_data_history_by_serie']
        if(getters.get_chosen_forecast_model.type == 'doublemean') {
          get_data = rootGetters['data_history/get_user_data_history_by_group']
        }
        const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/${getters.get_chosen_forecast_model.type}`
        let arr_req = meas_names.map(key => axios.post(addr, {'data': get_data(key)}))
        Promise.all(arr_req).then(response => {   
            let forecasted = []
            let lentgh_res = response[0].data.length
            for(let i in [...Array(lentgh_res).keys()]){
                let prov = {}
                meas_names.map((key, index) => {
                    prov[key] = response[index].data[i]
                 })
                forecasted.push(prov)
            }

          let year = 1 + rootGetters['data_history/get_series_biggest_year']
          forecasted.map((item, index) => {
            let month = index + 1
            item.date = '1/' + month + '/' + year
          })
          dispatch('set_forecasted_data', forecasted)
        })
      },

      calculate_contracted_demand_cost({ state, commit, rootGetters }) {
        let current_contracted = {}
        rootGetters['data_parameters/get_current_contracted_demand']().forEach(item => {
          current_contracted[item.name] = item.value
        })
        current_contracted = Array(state.forecasted_data.length).fill(current_contracted) 
        
        const arr_req = demand_cost_assembly_request(
          state.forecasted_data, 
          current_contracted, 
          rootGetters['data_parameters/get_tariffs']
        )

        Promise.all(arr_req).then(response => {   
          const demand_costs = demand_cost_response_disassembly(current_contracted, response)
          commit("set_contracted_demand_cost", demand_costs)
        })
      },

      calculate_energy_cost({ state, commit, rootGetters }) {      
        const get_tariff = rootGetters['data_parameters/get_tariffs']
        const energy_names = get_energy_measurements_names()
        let costs = []
        state.forecasted_data.forEach(item => {
          let prov = {}
          energy_names.forEach(key => {
            prov[key] = (item[key] * get_tariff(key).value).toFixed(2)
          })
          costs.push(prov)
        })
        commit("set_energy_cost", costs)
      },
    }
}
  