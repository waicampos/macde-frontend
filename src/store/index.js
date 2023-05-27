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
    }
  },
  actions: {
    load_user_data_history({ commit }, payload) {
      commit("load_user_data_history", payload)
    }
  },
  modules: {

  }
})
