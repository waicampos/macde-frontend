import axios from 'axios';
import * as sys_msg from '@/assets/files/system_messages'

const SIZE_CUSTOM_FORCASTED_DATA = 12

const valid_all_numbers = (payload) => payload.every(item => {                           
  return Object.keys(item).every(key => {                
      let num = Number(item[key])
      return (typeof num == 'number') && (!Number.isNaN(num))
  }) 
})

const valid_min_size = (payload) => payload.length >= SIZE_CUSTOM_FORCASTED_DATA
const valid_max_size = (payload) => payload.length <= SIZE_CUSTOM_FORCASTED_DATA

const validate_months_duplicate = (payload) => {
  const months = payload.map(i => i.month)
  const distinct = new Set(months)
  const filtered = months.filter(item => {
    if(distinct.has(item)) {
      distinct.delete(item)
      return false
    } else {
      return true
    }
  })

  return !filtered.length
}

const validate_months_sequence = (payload) => {
  let months = payload.map(item => item.month).sort((a, b) => a - b)
  const ans = months.reduce((a,b) => ((a - b == -1) && b) || 0)
  return ans > 0
}

const valid_required_keys = (payload) => payload.every(item => { 
            return ['month'].concat(sys_msg.BASIC_KEYS_REQUIRED).every(key => {
                return Object.prototype.hasOwnProperty.call(item, key)
            }) 
        })

export default {
    namespaced: true,
    state: {
      forecasted_data: [],
      is_valid_custom_forecasted_data: false,
      user_forecasted_data_messages: new sys_msg.MessageManager(),
      chosen_forecast_model: {'type': 'doublemean'},      
    },
    getters: {
      get_forecasted_data(state) {
        return state.forecasted_data
      },

      get_user_forecasted_data_messages(state) {
        return state.user_forecasted_data_messages.get_messages()
      },

      get_is_valid_custom_forecasted_data(state) {
        return state.is_valid_custom_forecasted_data
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
    },

    mutations: {  
      set_forecasted_data(state, payload) {
        state.forecasted_data = payload
      }, 

      set_is_valid_custom_forecasted_data(state, payload) {
        state.is_valid_custom_forecasted_data = payload
      },

      delete_item_user_forecasted_data_messages(state, payload) {
        state.user_forecasted_data_messages.delete(payload)
      },
      
      clear_forecasted_data(state) {
        state.forecasted_data = []
      },  

      clear_user_forecasted_data_messages(state) {
        state.user_forecasted_data_messages.clear()
      },

      set_chosen_forecast_model(state, payload) {
        state.chosen_forecast_model = payload
      },
    },

    actions: {
      set_forecasted_data({ commit }, payload) {
        commit("set_forecasted_data", payload)
      },

      set_is_valid_custom_forecasted_data({ commit, state }, payload) {
        state.user_forecasted_data_messages.clear()        
        if(!valid_min_size(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_TS_MIN_SIZE(payload.length, SIZE_CUSTOM_FORCASTED_DATA))
        if(!valid_max_size(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_TS_MAX_SIZE(payload.length, SIZE_CUSTOM_FORCASTED_DATA))
        if(!validate_months_duplicate(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_TS_DUPLICATED_VALUE())
        if(!validate_months_sequence(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_TS_DATE_SEQ())
        if(!valid_all_numbers(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_TS_IS_NUMBER())
        if(!valid_required_keys(payload)) state.user_forecasted_data_messages.add(sys_msg.ERROR_REQ_KEYS(['month'].concat(sys_msg.BASIC_KEYS_REQUIRED)))        
        
        commit("set_is_valid_custom_forecasted_data", state.user_forecasted_data_messages.length() == 0)
      },

      set_forecasted_from_custom_data({state, dispatch, commit}, payload) {
        if(!payload) {
          state.user_forecasted_data_messages.clear()
          state.user_forecasted_data_messages.add(sys_msg.ERROR_FAIL_UPLOAD_FILE())        
          return false
        }

        dispatch("set_is_valid_custom_forecasted_data", payload)
        if(state.is_valid_custom_forecasted_data) { 
          payload.forEach(item => {
            item.demand = Math.max(item.peak_demand, item.off_peak_demand)
            item.month = item.month.toString()
          })         
          commit('set_forecasted_data', payload)
          state.user_forecasted_data_messages.add(sys_msg.SUCCESS_UPLOAD_FILE())
        }
      },

      delete_item_user_forecasted_data_messages({ commit }, payload) {
        commit("delete_item_user_forecasted_data_messages", payload)
      },
      
      clear_forecasted_data({ commit }) {
        commit("clear_forecasted_data")
      },

      clear_user_forecasted_data_messages({ commit }) {
        commit("clear_user_forecasted_data_messages")
      },

      set_chosen_forecast_model({ commit }, payload) {
        commit('set_chosen_forecast_model', payload)
      },

      forecast({dispatch, commit, getters, rootGetters}) {
        const is_double_mean = getters.get_chosen_forecast_model.type == 'doublemean'
        let get_data = rootGetters[`data_history/${is_double_mean ? 'get_user_data_history_by_group' : 'get_user_data_history_by_serie'}`]        
        let meas_names = rootGetters['data_parameters/get_selected_simulation_type'].meas
        
        const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/${getters.get_chosen_forecast_model.type}`
        let arr_req = meas_names.map(key => axios.post(addr, {'data': get_data(key)}))
        Promise.all(arr_req).then(response => {   
            let forecasted = []
            let lentgh_res = response[0].data.length
            for(let i in [...Array(lentgh_res).keys()]){
                let prov = {}
                meas_names.map((key, index) => {    
                    prov['month'] = (Number(i) + 1).toString()
                    prov[key] = response[index].data[i]
                 })
                forecasted.push(prov)
            }
          commit("set_is_valid_custom_forecasted_data", true)
          dispatch('set_forecasted_data', forecasted)
        })
      },
    }
}
  