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
    },

    mutations: {  
      set_optimized_data(state, payload) {
        state.optimized_data = payload
      },  
      set_chosen_optimize_model(state, payload) {
        state.chosen_optimize_model = payload
      },
    },

    actions: {
      set_chosen_optimize_model({ commit }, payload) {
        commit('set_chosen_optimize_model', payload)
      },

      optimize({ commit, rootGetters }){
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

          commit("set_optimized_data", optimized)
        })
      },
    },
  }
  