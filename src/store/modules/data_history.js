import { str2date, groupBy, get_serie_by_key } from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
        user_data_history: []        
      },
      getters: {
        get_user_data_history(state) {
          return state.user_data_history
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
        }
      },
      actions: {
        load_user_data_history({ commit }, payload) {
          payload.map(item => {        
            item.demand = Math.max(item.peak_demand, item.off_peak_demand)
          })
          commit("load_user_data_history", payload)
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