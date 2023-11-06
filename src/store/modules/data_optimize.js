import axios from 'axios'

export default {
    namespaced: true,
    state: {
      optimized_data: [],
      chosen_optimize_model: {'type': 'exploratory'},
    },
    getters: {
      get_optimized_data(state){     
        return state.optimized_data
      },

      get_optimized_data_by_key: (state) => (key) => {      
        return (!key) ? state.optimized_data : state.optimized_data.map(item => item[key])  
      },

      get_chosen_optimize_model(state) {
        return state.chosen_optimize_model
      },  

      get_unique_optimized_demand_cost(state, getters, rootState, rootGetters) {
        let unique = {}        
        let meas_names = rootGetters['data_parameters/get_selected_simulation_type'].meas.filter(i => i.includes('demand')) 
        
        meas_names.forEach(key => {
          unique[key] = Array.from(new Set(getters.get_optimized_data_by_key(key)))
        })
        return unique
      },
    },

    mutations: {  
      set_optimized_data(state, payload) {        
        state.optimized_data = payload
      },  
      set_chosen_optimize_model(state, payload) {
        state.chosen_optimize_model = payload
      },
      clear_optimized_data(state) {        
        state.optimized_data = []
      }, 
    },

    actions: {
      set_chosen_optimize_model({ commit }, payload) {
        commit('set_chosen_optimize_model', payload)
      },

      set_optimized_data({ commit }, payload) {        
        commit("set_optimized_data", payload)        
      },  

      clear_optimized_data({ commit }) {        
        commit("clear_optimized_data") 
      }, 

      optimize({ commit, rootGetters }){    
        const get_data = rootGetters['data_forecast/get_forecasted_data_by_key']
        const has_demand_variation = rootGetters['data_parameters/get_has_demand_variation']
        const is_blue = rootGetters['data_parameters/get_selected_simulation_type'].name.includes('blue')
        const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/exploratory/${is_blue ? "2" : "1"}/${has_demand_variation ? "1" : "0"}`
        
        let arr_req = []
        if(is_blue) {
          let peak_demand =  get_data('peak_demand')
          let off_peak_demand =  get_data('off_peak_demand')
          arr_req = [axios.post(addr, {'data': [[...peak_demand], [...off_peak_demand]]})]
        }
        else {
          let demand = get_data('demand')
          arr_req = [axios.post(addr, {'data': [...demand]})]
        }

        Promise.all(arr_req).then(response => {   
          let optimized = []
          let lentgh_res = is_blue ? response[0].data[0].length : response[0].data.length
          for(let i in [...Array(lentgh_res).keys()]){
              let prov = {}
              if(is_blue) {
                prov['peak_demand'] = response[0].data[0][i]
                prov['off_peak_demand'] = response[0].data[1][i]
              }else {
                prov['demand'] = response[0].data[i]
              }                
              optimized.push(prov)
          }

          optimized.forEach((item, index) => item.date = (index + 1).toString())          
          commit("set_optimized_data", optimized)
        })
      },
    },
  }
  