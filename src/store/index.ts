import { createStore } from 'vuex'

export default createStore({
  state: {
    Authorization:localStorage.getItem("Authorization") ? localStorage.getItem("Authorization") : '', 
    refreshToken: localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : '',
    token:localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : '',
    userId:'',
    username: '',
  },
  getters: {
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.token;
      state.refreshToken = user.refreshToken;
      state.token = user.token;
      localStorage.setItem('Authorization',user.token)
      localStorage.setItem('refreshToken',user.refreshToken)
      localStorage.setItem('token',user.token)
      localStorage.setItem('userId', user.userId)
      localStorage.setItem('username', user.username)
    },
  },
  actions: {
  },
  modules: {
  }
})
