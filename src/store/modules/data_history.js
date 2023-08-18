import { str2date, groupBy, get_serie_by_key } from '@/assets/files/consts'
import * as sys_msg from '@/assets/files/system_messages'
import { TimeSeries, ValidationTimeSerie } from '@/components/classes/time_series'

export default {
    namespaced: true,
    state: {
        user_data_history: [],     
        user_data_history_raw: [],
        time_serie_errors: [],
        user_data_history_messages: [],
      },
      getters: {
        get_user_data_history(state) {
          return state.user_data_history
        },

        get_user_data_history_messages(state) {
          return state.user_data_history_messages
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
        user_data_history_messages(state, payload) {
          state.user_data_history_messages.push(payload)
        },
        delete_item_user_data_history_messages(state, payload) {
          state.user_data_history_messages.splice(payload)
        },
      },
      actions: {
        user_data_history_messages({ commit }, payload) {
          commit("user_data_history_messages", payload)
        },

        delete_item_user_data_history_messages({ commit }, payload) {
          commit("delete_item_user_data_history_messages", payload)
        },

        clear_time_serie_errors({ commit }) {
          commit("clear_time_serie_errors")
        },

        load_user_data_history({ state, commit }, payload) {
          if(!payload) {
            state.user_data_history_messages.push(sys_msg.ERROR_FAIL_UPLOAD_FILE())
            return false
          }
          let ts = new TimeSeries(payload)
          let ts_validation = new ValidationTimeSerie(ts)
          
          if(!ts_validation.valid_isValidDate()) state.user_data_history_messages.push(sys_msg.ERROR_TS_INVALID_DATE())
          else if(!ts_validation.valid_min_size()) state.user_data_history_messages.push(sys_msg.ERROR_TS_MIN_SIZE(ts))
          else if(!ts_validation.valid_max_size()) state.user_data_history_messages.push(sys_msg.ERROR_TS_MAX_SIZEts(ts))
          else if(!ts_validation.valid_date_sequence()) state.user_data_history_messages.push(sys_msg.ERROR_TS_DATE_SEQ())
          else if(!ts_validation.valid_DuplicatesDates()) state.user_data_history_messages.push(sys_msg.ERROR_TS_DUPLICATED_VALUE())
          else if(!ts_validation.valid_allNumbers()) state.user_data_history_messages.push(sys_msg.ERROR_TS_IS_NUMBER())
          else if(!ts_validation.valid_required_keys()) state.user_data_history_messages.push(sys_msg.ERROR_REQ_KEYS(['peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']))
          else{
            payload.forEach(item => {        
              item.demand = Math.max(item.peak_demand, item.off_peak_demand)
            })
            state.user_data_history_messages.push(sys_msg.SUCCESS_UPLOAD_FILE())
            let ts_with_demand = new TimeSeries(payload)
            commit("load_user_data_history", ts_with_demand.toString()) 
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