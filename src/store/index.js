import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    errorMsg: ['数据获取失败'],
    user: null,
    windowOpen: {
      // login-register
      lr: false,
      messages: false,
      setting: false,
      user: false,
    },
  }),
  getters: {
    logined: ({ user }) => user !== null,
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateWindow(state, { name, val }) {
      state.windowOpen[name] = val
    },
  },
})
