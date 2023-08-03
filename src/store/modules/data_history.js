import { str2date, groupBy, get_serie_by_key } from '@/assets/files/consts'
import { TimeSeries, ValidationTimeSerie, TimeSeriesError } from '@/components/classes/time_series'

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
            let requiredKeys = [ 'peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']
            const hasRequiredKeys = payload.every(item => { 
              return requiredKeys.every(key => {
                return Object.prototype.hasOwnProperty.call(item, key)
              }) 
            })
            if(!hasRequiredKeys) {
              state.time_serie_errors.push({code: 'NO_REQ_KEYS', message: `O arquivo não possui algumas das propriedades obrigatórias ('peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy') em todas as amostras.`, type: 'error'})
            }
            else {state.time_serie_errors.push({code: 'NO_DATE', message: `O arquivo possui todas as propriedades obrigatórias ('peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy') em todas as amostras.`, type: 'info'})}
            
            const allNumbers = payload.every(item => {                           
              return requiredKeys.every(key => {
                return typeof item[key] == 'number'
              }) 
            })

            if(!allNumbers) {
              state.time_serie_errors.push({code: 'NO_ALL_NUMBERS', message: `Algumas amostras não possuem números válidos.`, type: 'error'})
            }
            else{state.time_serie_errors.push({code: 'NO_ALL_NUMBERS', message: `Todas as amostras possuem números válidos.`, type: 'info'})}
        
            if(!payload.every(item => 'date' in item)) {
              state.time_serie_errors.push({code: 'NO_DATE', message: `O arquivo lido não possui a propriedade date em todas as amostras.`, type: 'error'})
            }
            else {state.time_serie_errors.push({code: 'NO_DATE', message: `O arquivo lido possui a propriedade date em todas as amostras.`, type: 'info'})}

            if(!ts_validation.valid_min_size()) throw new TimeSeriesError(
              'MIN_SIZE',
              `A série informada possui um tamanho de ${ts.size()} amostras, sendo que o tamanho mínimo aceitável é de ${ts.get_frequency()} amostras.`
            ) 
            else {state.time_serie_errors.push({code: 'MIN_SIZE', message: `A série informada atende ao critério de número mínimo de amostras: ${ts_validation.get_minimum_size()}`, type: 'info'})}

            if(!ts_validation.valid_max_size()) throw new TimeSeriesError(
              'MAX_SIZE',
              `A série informada possui um tamanho de ${ts.size()} amostras, sendo que o tamanho máximo aceitável é de ${ts.get_frequency()} amostras.`
            )
            else {state.time_serie_errors.push({code: 'MAX_SIZE', message: `A série informada atende ao critério de número máximo de amostras: ${ts_validation.get_maximum_size()}`, type: 'info'})}

            if(!ts_validation.valid_ideal_size()) throw new TimeSeriesError(             
              'IDEAL_SIZE',  
              `A série deve ter um tamanho múltiplo de ${ts.get_frequency()} amostras. O tamanho atual é de ${ts.size()} amostras. O tamanho correto deveria ser de ${ts_validation.ideal_size()}`
            )
            else {state.time_serie_errors.push({code: 'IDEAL_SIZE', message: `A série é um múltiplo de ${ts.get_frequency()} amostras. O tamanho atual é de ${ts.size()} amostras.`, type: 'info'})}

            if(ts_validation.hasDuplicatesDates().length) {
              ts.sort()
              const data = ts.toString()
              let message = [... new Set(ts_validation.isDateSequence().map(index => data[index].date))]
              throw new TimeSeriesError(
                'DUPLICATED_VALUE',
                `A série deve não deve ter valores repetidos. As seguintes Datas possuem mais de um valor: ${message.join(', ')}`
              )         
            }
            else {state.time_serie_errors.push({code: 'DUPLICATED_VALUE', message: `A série não possui duplicação de datas.`, type: 'info'})}

            if(ts_validation.isDateSequence().length) {
              ts.sort()      
              const data = ts.toString()
              let message = ts_validation.isDateSequence().map(index => data[index].date)
              throw new TimeSeriesError(
                'DATA_SEQ',  
                `A série deve ter uma sequência cronológica. As seguintes Datas não estão em sequência: ${message.join(', ')}`
              )
            }            
            else {state.time_serie_errors.push({code: 'DATA_SEQ', message: `As datas da série estão em sequência cronológica.`, type: 'info'})}

            payload.map(item => {        
              item.demand = Math.max(item.peak_demand, item.off_peak_demand)
            })
            commit("load_user_data_history_raw", payload)            
          } catch(err) {
            if (err instanceof TimeSeriesError) {
              state.time_serie_errors.push({code: err.name, message: err.message, type: 'error'})
            } else if(err instanceof RangeError) {
              if(err.message === "Invalid time value") {
                state.time_serie_errors.push({code: "DATA_INV", message: 'O arquivo carregado possui data inválida', type: 'error'})
              } 
            } 
            else {
              state.time_serie_errors.push({code: "ERR_UND", message: 'Ocorreu um erro inesperado no carregamento do Arquivo', type: 'error'})
            }                                 
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