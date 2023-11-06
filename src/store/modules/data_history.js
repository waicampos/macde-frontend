import { groupBy } from '@/assets/files/consts'
import * as sys_msg from '@/assets/files/system_messages'
import { TimeSeries, ValidationTimeSerie } from '@/components/classes/time_series'
import { isAfter as fns_isAfter } from 'date-fns'

export default {
    namespaced: true,
    state: {
        user_data_history: [],
        is_valid_user_data_history: false,
        user_data_history_messages: new sys_msg.MessageManager(),
      },
      getters: {
        get_is_valid_user_data_history(state) {          
          return state.is_valid_user_data_history
        },

        get_user_data_history_raw(state) {
          return state.user_data_history
        },

        get_user_data_history(state, getters, rootState, rootGetters) {
          const has_photovoltaic_system = rootGetters['data_parameters/get_has_photovoltaic_system']
          const date_installation_photovoltaic_system = rootGetters['data_parameters/get_date_installation_photovoltaic_system']
          
          return (!has_photovoltaic_system && state.user_data_history) ||
                  state.user_data_history.filter(item => !fns_isAfter(date_installation_photovoltaic_system, item.date))          
        },

        get_user_data_history_messages(state) {
          return state.user_data_history_messages.get_messages()
        },

        get_user_data_history_by_serie: (state, getters) => (key) => {
          let arr = []
          getters.get_user_data_history_by_group(key).forEach(curr => arr = arr.concat(curr))
          return arr          
        },

        get_user_data_history_by_group: (state, getters) => (key) => {
          let mod_data = [...getters.get_user_data_history];
          mod_data.forEach((curr, i, arr) => {
              arr[i]['month'] = curr.date.getMonth().toString()
              arr[i]['year'] = curr.date.getYear().toString()         
          })
          let agrouped = groupBy(mod_data, 'year')
          let arr = []

          for(let name in agrouped){         
              let temp_arr = new Array(12).fill(0)

              agrouped[name].forEach((curr) => {
                temp_arr[curr['month']] = curr[key]
              })

              arr.push(temp_arr)
          }
          return arr
        },    
      },

      mutations: {
        set_is_valid_user_data_history(state, payload) {
          state.is_valid_user_data_history = payload
        },
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
        delete_item_user_data_history_messages(state, payload) {
          state.user_data_history_messages.delete(payload)
        }                
      },
      actions: {
        set_is_valid_user_data_history({ state, commit, rootGetters}, user_data) { 
          let simulation_type = rootGetters['data_parameters/get_selected_simulation_type'].meas
          let ts = new TimeSeries(user_data, simulation_type)
          let ts_validation = new ValidationTimeSerie(ts)
        
          state.user_data_history_messages.clear()
          if(!ts_validation.valid_min_size()) state.user_data_history_messages.add(sys_msg.ERROR_TS_MIN_SIZE(ts, ts_validation))
          if(!ts_validation.valid_max_size()) state.user_data_history_messages.add(sys_msg.ERROR_TS_MAX_SIZE(ts, ts_validation))
          if(!ts_validation.valid_isValidDate()) state.user_data_history_messages.add(sys_msg.ERROR_TS_INVALID_DATE())
          if(!ts_validation.valid_there_is_least_one_month()) state.user_data_history_messages.add(sys_msg.ERROR_AT_LEAST_ONE_MONTH())
          if(!ts_validation.valid_DuplicatesDates()) state.user_data_history_messages.add(sys_msg.ERROR_TS_DUPLICATED_VALUE())
          if(!ts_validation.valid_allNumbers()) state.user_data_history_messages.add(sys_msg.ERROR_TS_IS_NUMBER())
          if(!ts_validation.valid_required_keys()) state.user_data_history_messages.add(sys_msg.ERROR_REQ_KEYS(['peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']))
                    
          commit("set_is_valid_user_data_history", state.user_data_history_messages.length() == 0)              
        },

        load_user_data_history({ state, commit, dispatch }, payload) {
          if(!payload) {
            state.user_data_history_messages.clear()
            state.user_data_history_messages.add(sys_msg.ERROR_FAIL_UPLOAD_FILE())        
            return false
          }

          payload.forEach(item => {        
            item.demand = Math.max(item.peak_demand, item.off_peak_demand)
          })
          dispatch("set_is_valid_user_data_history", payload)
          if(state.is_valid_user_data_history) {
            state.user_data_history_messages.clear()
            state.user_data_history_messages.add(sys_msg.SUCCESS_UPLOAD_FILE())
            let ts_with_demand = new TimeSeries(payload)
            ts_with_demand.sort()
            commit("load_user_data_history", ts_with_demand.get_data()) 
          }
        },

        add_user_data_history({ state, commit, dispatch }, payload) {
          commit("add_user_data_history", payload)
          dispatch("set_is_valid_user_data_history", state.user_data_history)
        },
        set_item_user_data_history({ state, commit, dispatch }, payload) {
          commit("set_item_user_data_history", payload)
          dispatch("set_is_valid_user_data_history", state.user_data_history)
        },
        delete_item_user_data_history_by_id({ state, commit, dispatch }, payload) {       
          commit("delete_item_user_data_history_by_id", payload)
          dispatch("set_is_valid_user_data_history", state.user_data_history)          
        },
        clear_user_data_history({ state, commit }) {       
          state.user_data_history_messages.clear()
          state.user_data_history_messages.add(sys_msg.INFO_DELETED_DATA())   
          commit("clear_user_data_history")
          state.is_valid_user_data_history = true          
        },
        delete_item_user_data_history_messages({ commit }, payload) {
          commit("delete_item_user_data_history_messages", payload)
        }   
      },
}