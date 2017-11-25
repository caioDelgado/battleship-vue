export default {
  namespaced: true,
  state: {
    userLogged: {}
  },
  mutations: {
    USER_LOGIN (state, login) {
      state.userLogged = login
    }
  },
  actions: {
    login ({ commit }, user) {
      commit('USER_LOGIN', user)
    }
  }
}
