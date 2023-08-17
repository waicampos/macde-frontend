import { str2date, groupBy, get_serie_by_key } from '@/assets/files/consts'
import { TimeSeries, ValidationTimeSerie } from '@/components/classes/time_series'

export default {
    namespaced: true,
    state: {
        user_data_history: [],     
        user_data_history_raw: [],
        time_serie_errors: []
      },
      getters: {
        get_user_data_history(state) {
          return state.user_data_history
        },

        get_user_data_history_raw(state) {
          return state.user_data_history_raw
        },

        get_time_serie_errors(state) {
          return state.time_serie_errors
        },

        get_user_data_history_by_serie: (state) => (key) => {
          try{
            if(Object.keys(state.user_data_history[0]).includes(key)) {
              return state.user_data_history.map(curr => curr[key])
            }else {
              return []
            }
          }
          catch{
            return []
          }
        },

        get_user_data_history_by_group: (state) => (key) => {
          let mod_data = [...state.user_data_history];
          mod_data.forEach((curr, i, arr) => {
              let dt = str2date(curr.date)
              arr[i]['month'] = dt.getMonth().toString()
              arr[i]['year'] = dt.getFullYear().toString()         
          })
          let agrouped = groupBy(mod_data, 'year')
          let arr = []

          for(let name in agrouped){                
              arr.push(
                  agrouped[name].map((curr) => {
                      return curr[key]
                  })
              )
          }
          return arr
        },    

        get_series_biggest_year(state) {
          let dt_series = get_serie_by_key(state.user_data_history, 'date')
          return dt_series
                  .map(item => str2date(item).getFullYear())
                  .reduce(function(a, b) {
            return Math.max(a, b);
          }, -Infinity);          
        },
      },

      mutations: {
        load_user_data_history(state, payload) {
          state.user_data_history = payload
        },
        load_user_data_history_raw(state, payload) {
          state.user_data_history_raw = payload
        },
        add_user_data_history(state, payload) {
          state.user_data_history.push(payload)
        },
        set_item_user_data_history(state, payload) {
          state.user_data_history[payload.index] = {...payload.value}
        },
        delete_item_user_data_history_by_id(state, payload) {
          state.user_data_history.splice(payload, 1)
        },    
        clear_user_data_history(state) {
          state.user_data_history = []
        },
        clear_time_serie_errors(state) {
          state.time_serie_errors = []
        },
      },
      actions: {
        load_user_data_history({ commit }, payload) {
          payload.map(item => {        
            item.demand = Math.max(item.peak_demand, item.off_peak_demand)
          })
          commit("load_user_data_history", payload)
        },

        clear_time_serie_errors({ commit }) {
          commit("clear_time_serie_errors")
        },

        load_user_data_history_raw({ state, commit }, payload) {
          let ts = new TimeSeries(payload)
          let ts_validation = new ValidationTimeSerie(ts)
          commit("clear_time_serie_errors")

          try{
            ts_validation.valid_isValidDate()
            ts_validation.valid_min_size()
            ts_validation.valid_max_size()
            ts_validation.valid_ideal_size()
            ts_validation.valid_date_sequence()
            ts_validation.valid_DuplicatesDates()
            ts_validation.valid_allNumbers()
            ts_validation.valid_required_keys()

            if(ts_validation.errors) {
              ts_validation.errors.forEach((item) => {
                state.time_serie_errors.push({code: item.name, message: item.message, type: 'error'})
              })
            }else {
              state.time_serie_errors.push({code: "NOERR_INPUT_FILE", message: 'Arquivo carregado com sucesso', type: 'success'})
              commit("load_user_data_history_raw", payload)      
            }
          } catch(err) {
            state.time_serie_errors.push({code: "ERR_INPUT_FILE", message: 'Ocorreu um erro no carregamento do arquivo', type: 'error'})
          }                   
        },

        add_user_data_history({ commit }, payload) {
          payload.demand = Math.max(payload.peak_demand, payload.off_peak_demand)
          commit("add_user_data_history", payload)
        },
        set_item_user_data_history({ commit }, payload) {
          payload.value.demand = Math.max(payload.value.peak_demand, payload.value.off_peak_demand)
          commit("set_item_user_data_history", payload)
        },
        delete_item_user_data_history_by_id({ commit }, payload) {
          commit("delete_item_user_data_history_by_id", payload)
        },
        clear_user_data_history({ commit }) {
          commit("clear_user_data_history")
        },
      },
}