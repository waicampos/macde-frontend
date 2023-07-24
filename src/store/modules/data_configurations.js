import { SUBGROUP_CLASSIFICATION_TYPES, GROUP_CLASSIFICATION_TYPES, CLASS_CLASSIFICATION_UNITY_CONSUMER, TARIFF_MODALITY_TYPES } from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
        consumer_unit: {
          class: {
            name: CLASS_CLASSIFICATION_UNITY_CONSUMER.filter(item => item.name === 'state')[0].name, 
            text: CLASS_CLASSIFICATION_UNITY_CONSUMER.filter(item => item.name === 'state')[0].text
          },
          registration_number: "123.456/0001",
          name: "Instituto Federal de Educação, Ciência e Tecnologia de Santa Catarina",
          code: "123456",
          supply_voltage: "13800",
          tariff_modality: TARIFF_MODALITY_TYPES[0],
          group: {
            name: GROUP_CLASSIFICATION_TYPES.filter(item => item.name === 'a')[0].name,
            text: GROUP_CLASSIFICATION_TYPES.filter(item => item.name === 'a')[0].text
          },
          subgroup: {
            name: SUBGROUP_CLASSIFICATION_TYPES.filter(item => item.name === 'a4')[0].name,
            text: SUBGROUP_CLASSIFICATION_TYPES.filter(item => item.name === 'a4')[0].text
          },
          address: {
              address: "Avenida Mauro Ramos",
              number: "950",
              zip_code: "88020-300",
              city: "Florianópolis",
              state: "Santa Catarina"
          },
        },
        utility: {
          name: "CELESC",
          registration_number: "789.123/000.2",
      }
      },
      getters: {
        get_consumer_unit(state) {
          return state.consumer_unit
        },

        get_utility(state) {
          return state.utility
        },

      get_tariff_modality(state) {
        return state.consumer_unit.tariff_modality
      },

      get_demand_measurements_names(state) {
        return state.consumer_unit.tariff_modality.name == 'green' ? ['demand'] : ['peak_demand', 'off_peak_demand']
      },
      
      get_energy_measurements_names() {
          return ['peak_energy', 'off_peak_energy']
      },
      
      get_all_measurements_names() {
          return ['demand', 'peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']
      },
      
      get_measurements_names(state, getters) {
        return getters.get_demand_measurements_names.concat(getters.get_energy_measurements_names)
      },
      },
      mutations: {  
        set_consumer_unit(state, payload) {
          state.consumer_unit = payload
        },

        set_utility(state, payload) {
          state.utility = payload
        },

        set_tariff_modality(state, payload) {
          state.consumer_unit.tariff_modality = payload
        },
      },
      actions: {
        set_consumer_unit({ commit }, payload) {
          commit("set_consumer_unit", payload)
        },

        set_utility({ commit }, payload) {
          commit("set_utility", payload)
        },

        set_tariff_modality({ commit }, payload) {
          commit("set_tariff_modality", payload)
        },
      },
    }
    