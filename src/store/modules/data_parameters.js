import { SIMULATION_TYPES, TARIFF_MODALITY_TYPES } from '@/assets/files/consts'

function isPatternNumber(value) {
  if((value != '') && (typeof value != 'number')) {
    return true
  }
  return false
}

export default {
    namespaced: true,
    state: {
        has_demand_variation: false,
        selected_simulation_type: {name: SIMULATION_TYPES[0].name, text: SIMULATION_TYPES[0].text,  meas: SIMULATION_TYPES[0].meas},
        has_photovoltaic_system: false,
        date_installation_photovoltaic_system: new Date(),
        growth_forecast: [
          {value: 5, name: 'demand', title: "Demanda Verde", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 5, name: 'peak_energy', title:"Energia de Ponta Verde", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 5, name:'off_peak_energy', title:"Energia Fora de Ponta Verde", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 5, name: 'peak_demand', title: "Demanda de Ponta Azul", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 5, name: 'off_peak_demand', title: "Demanda Fora de Ponta Azul", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 5, name: 'peak_energy', title:"Energia de Ponta Azul", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 5, name:'off_peak_energy', title:"Energia Fora de Ponta Azul", prefix:"", suffix:"%", tariff_modality: TARIFF_MODALITY_TYPES[1]}
        ],
        tariffs: [          
          {value: 18.38, name: 'demand', title: "Demanda Verde", prefix:"R$", suffix:"por kW", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 1.84, name: 'peak_energy', title:"Energia de Ponta Verde", prefix:"R$", suffix:"por kW/h", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 0.55, name:'off_peak_energy', title:"Energia Fora de Ponta Verde", prefix:"R$", suffix:"por kW/h", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[0]},
          {value: 42.4, name: 'peak_demand', title: "Demanda de Ponta Azul", prefix:"R$", suffix:"por kW", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 18.38, name: 'off_peak_demand', title: "Demanda Fora de Ponta Azul", prefix:"R$", suffix:"por kW", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 0.72, name: 'peak_energy', title:"Energia de Ponta Azul", prefix:"R$", suffix:"por kW/h", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[1]},
          {value: 0.55, name:'off_peak_energy', title:"Energia Fora de Ponta Azul", prefix:"R$", suffix:"por kW/h", type:"number", tariff_modality: TARIFF_MODALITY_TYPES[1]}         
        ],
        taxes_and_charges: [
          {value: 0.50, name:'pis_pasep', title:"pis_pasep", text:"PIS/PASEP", prefix:"", suffix:"%", type:"number"},
          {value: 2.31, name:'cofins', title:"cofins", text:"COFINS", prefix:"", suffix:"%", type:"number"},
          {value: 25, name:'icms', title:"icms", text:"ICMS", prefix:"", suffix:"%", type:"number"},
          {value: 18.40, name:'cip_cosip', title:"cip_cosip", text:"CIP ou COSIP", prefix:"R$", suffix:"", type:"number"},
          {value: 0, name:'others', title:"others", text:"Outros", prefix:"R$", suffix:"", type:"number"},
        ],
        current_contracted_demand: [
          {value: 480, name: 'demand', title: "Demanda Verde", suffix:"kW", type:"number"},
          {value: 480, name: 'peak_demand', title: "Demanda de Ponta Azul", suffix:"kW", type:"number"},
          {value: 480, name: 'off_peak_demand', title: "Demanda Fora de Ponta Azul", suffix:"kW", type:"number"},
        ]
    },

    getters: {
      get_has_demand_variation(state) {
        return state.has_demand_variation
      },
      get_selected_simulation_type(state) {
        return state.selected_simulation_type
      },
      get_has_photovoltaic_system(state) {
        return state.has_photovoltaic_system
      },
      get_date_installation_photovoltaic_system(state) {
        return state.date_installation_photovoltaic_system
      },
      get_current_contracted_demand: (state) => (key) => {
        return (!key) ? state.current_contracted_demand : state.current_contracted_demand.filter(item => item.name == key)[0]
      },
      
      get_growth_forecast(state) {
        return state.growth_forecast
      },
      
      get_tariffs(state) {
          return state.tariffs
      },

      get_taxes_and_charges(state) {
        return state.taxes_and_charges
      },
    },
    mutations: {  
      set_has_demand_variation(state, payload) {
        state.has_demand_variation = payload
      },
      set_selected_simulation_type(state, payload) {
        state.selected_simulation_type = payload
      },
      set_has_photovoltaic_system(state, payload) {
        state.has_photovoltaic_system = payload
      },
      set_date_installation_photovoltaic_system(state, payload) {
        state.date_installation_photovoltaic_system = payload
      },
      set_current_contracted_demand(state, payload) {
        state.current_contracted_demand = payload
      },
      set_growth_forecast(state, payload) {
        state.growth_forecast = payload
      },
      set_tariffs(state, payload) {
        state.tariffs = payload
      },     
      set_taxes_and_charges(state, payload) {
        state.taxes_and_charges = payload
      },   
    },
    actions: {
      set_has_demand_variation({ commit }, payload) {
        commit("set_has_demand_variation", payload)
      },
      set_selected_simulation_type({ commit }, payload) {
        commit("set_selected_simulation_type", payload)
        commit('data_forecast/set_forecasted_data', [], { root: true })
        commit('data_optimize/set_optimized_data', [], { root: true })
      },
      set_has_photovoltaic_system({ commit }, payload) {
        commit("set_has_photovoltaic_system", payload)
      },
      set_date_installation_photovoltaic_system({ commit }, payload) {
        commit("set_date_installation_photovoltaic_system", payload)
      },
      set_current_contracted_demand({ commit }, payload) {
        payload.forEach(item => {
          if(isPatternNumber(item.value)) {
            item.value = Number(item.value.replace(',', '.'))
          }                    
        })
        commit("set_current_contracted_demand", payload)
      },
      set_growth_forecast({ commit }, payload) {
        payload.forEach(item => {
          if(isPatternNumber(item.value)) {
            item.value = Number(item.value.replace(',', '.'))
          }                    
        })
        commit("set_growth_forecast", payload)
      },
      set_tariffs({ commit }, payload) {
        payload.forEach(item => {
          if(isPatternNumber(item.value)) {
            item.value = Number(item.value.replace(',', '.'))
          }                    
        })
        commit("set_tariffs", payload)
      },
      set_taxes_and_charges({ commit }, payload) {
        payload.forEach(item => {
          if(isPatternNumber(item.value)) {
            item.value = Number(item.value.replace(',', '.'))
          }                    
        })
        commit("set_taxes_and_charges", payload)
      },
    },
  }
  