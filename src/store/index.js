import { createStore } from 'vuex'

export default createStore({
  state: {
    user_data_history: []
  },
  getters: {
    get_user_data_history(state) {
      return state.user_data_history
    }
  },
  mutations: {
    load_user_data_history(state, payload) {
      state.user_data_history = payload
    },
    add_user_data_history(state, payload) {
      state.user_data_history.push(payload)
    },
    set_item_user_data_history(state, payload) {
      console.log("ENTROU" + payload)
      Object.assign(state.user_data_history[payload.index], payload.value)
    }
  },
  actions: {
    load_user_data_history({ commit }, payload) {
      commit("load_user_data_history", payload)
    },
    add_user_data_history({ commit }, payload) {
      commit("add_user_data_history", payload)
    },
    set_item_user_data_history({ commit }, payload) {
      commit("set_item_user_data_history", payload)
    }
  },
  modules: {

  }
})
