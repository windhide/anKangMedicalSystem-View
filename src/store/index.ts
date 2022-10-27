import { createStore } from 'vuex'

export default createStore({
  state: {
    Authorization: localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : '',
    refreshToken: localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : '',
    token: localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : '',
    userId: '',
    username: '',
  },
  getters: {
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.token;
      state.refreshToken = user.refreshToken;
      state.token = user.token;
      localStorage.setItem('Authorization', user.token)
      localStorage.setItem('refreshToken', user.refreshToken)
      localStorage.setItem('token', user.token)
      localStorage.setItem('userId', user.userId)
      localStorage.setItem('username', user.username)
    },
    logOut(state) {
      state.Authorization = "";
      state.refreshToken = "";
      state.token = "";
      localStorage.setItem('Authorization', "")
      localStorage.setItem('refreshToken', "")
      localStorage.setItem('token', "")
      localStorage.setItem('userId', "")
      localStorage.setItem('username', "")
    }
  },
  actions: {
  },
  modules: {
  }
})
