import { GROUP_CLASSIFICATION_TYPES } from '@/assets/files/consts'

export default {
    namespaced: true,
    state: {
        tariff_modality: {name: 'green', text: 'Verde'},
        group_classification: {name: GROUP_CLASSIFICATION_TYPES[0].name, text: GROUP_CLASSIFICATION_TYPES[0].text}, 
        subgroup_classification: {}, 
        class_classification_unit_consumer: {name: 'state', text: 'Poder Público'},
        consumer_unit: {
          code: "",
          supply_voltage: "",
          tariff_modality: "Verde",
          group: "A4",
          subgroup: "Poder Público",
          address: {
              address: "",
              number: "",
              zip_code: "",
              city: "",
              state: ""
          },
        },
        utility: {
          name: "",
          registration_number: "",
      }
      },
      getters: {
        get_tariff_modality(state) {
          return state.tariff_modality
        },
        get_group_classification(state) {
          return state.group_classification
        },
        get_subgroup_classification(state) {
          return state.subgroup_classification
        },
        get_class_classification_unit_consumer(state) {
          return state.class_classification_unit_consumer
        },
        get_consumer_unit(state) {
          return state.consumer_unit
        },
        get_utility(state) {
          return state.utility
        },
      },
      mutations: {  
        set_tariff_modality(state, payload) {
          state.tariff_modality = payload
        },
        set_group_classification(state, payload) {
          state.group_classification = payload
        },
        set_subgroup_classification(state, payload) {
          state.subgroup_classification = payload
        },
        set_class_classification_unit_consumer(state, payload) {
          state.class_classification_unit_consumer = payload
        },
        set_consumer_unit(state, payload) {
          state.consumer_unit = payload
        },
        set_utility(state, payload) {
          state.utility = payload
        },
      },
      actions: {
        set_tariff_modality({ commit }, payload) {
          commit("set_tariff_modality", payload)
        },
        set_group_classification({ commit }, payload) {
          commit("set_group_classification", payload)
        },
        set_subgroup_classification({ commit }, payload) {
          commit("set_subgroup_classification", payload)
        },
        set_class_classification_unit_consumer({ commit }, payload) {
          commit("set_class_classification_unit_consumer", payload)
        },
        set_consumer_unit({ commit }, payload) {
          commit("set_consumer_unit", payload)
        },
        set_utility({ commit }, payload) {
          commit("set_utility", payload)
        },
      },
    }
    