import { SIMULATION_TYPES } from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
        has_demand_variation: false,
        selected_simulation_type: {name: SIMULATION_TYPES[0].name, text: SIMULATION_TYPES[0].text},
        has_photovoltaic_system: false,
        date_installation_photovoltaic_system: "2023-02-01",
        growth_forecast: 5,
        tariffs: [
            {value: 18.38, name:"Demanda", prefix:"R$", suffix:"por kW", type:"number"},
            {value: 42.4, name:"Demanda de Ponta", prefix:"R$", suffix:"por kW", type:"number"},
            {value: 18.38, name:"Demanda Fora de Ponta", prefix:"R$", suffix:"por kW", type:"number"},
            {value: 0.72, name:"Energia de Ponta", prefix:"R$", suffix:"por kW/h", type:"number"},
            {value: 10.55, name:"Energia Fora de Ponta", prefix:"R$", suffix:"por kW/h", type:"number"},
        ],
        current_contracted_demand: [
            {value: 18.38, name:"Demanda", suffix:"kW", type:"number"},
            {value: 42.4, name:"Demanda de Ponta", suffix:"kW", type:"number"},
            {value: 18.38, name:"Demanda Fora de Ponta", suffix:"kW", type:"number"},
        ]
    },
    getters: {
      get_has_demand_variation(state) {
        return state.has_demand_variation
      },
      get_has_selected_simulation_type(state) {
        return state.has_selected_simulation_type
      },
      get_has_photovoltaic_system(state) {
        return state.has_photovoltaic_system
      },
      get_date_installation_photovoltaic_system(state) {
        return state.date_installation_photovoltaic_system
      },
      get_current_contracted_demand(state) {
        return state.current_contracted_demand
      },
      get_growth_forecast(state) {
        return state.growth_forecast
      },
      get_tariffs(state) {
        return state.tariffs
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
    },
    actions: {
      set_has_demand_variation({ commit }, payload) {
        commit("set_has_demand_variation", payload)
      },
      set_has_selected_simulation_type({ commit }, payload) {
        commit("set_has_selected_simulation_type", payload)
      },
      set_has_photovoltaic_system({ commit }, payload) {
        commit("set_has_photovoltaic_system", payload)
      },
      set_date_installation_photovoltaic_system({ commit }, payload) {
        commit("set_date_installation_photovoltaic_system", payload)
      },
      set_current_contracted_demand({ commit }, payload) {
        commit("set_current_contracted_demand", payload)
      },
      set_growth_forecast({ commit }, payload) {
        commit("set_growth_forecast", payload)
      },
      set_tariffs({ commit }, payload) {
        commit("set_tariffs", payload)
      },
    },
  }
  