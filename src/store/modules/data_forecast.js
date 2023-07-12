import axios from 'axios';

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
      },

      forecast(state, getters, rootState, rootGetters) {
        let meas_names = rootGetters['data_configurations/get_measurements_names']

        let get_data = rootGetters['data_history/get_user_data_history_by_serie']
        if(state.chosen_forecast_model.type == 'doublemean') {
          get_data = rootGetters['data_history/get_user_data_history_by_group']
        }
                
        const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/${state.chosen_forecast_model.type}`
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
          state.forecasted_data = forecasted
        })
      },
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
        commit("set_forecasted_data", payload)
      },

      set_chosen_forecast_model({ commit }, payload) {
        commit('set_chosen_forecast_model', payload)
      }
    },
  }
  