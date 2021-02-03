import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    errorMsg: {
      networkError: '网络错误',
      sendFailure: '发送失败',
      notLogined: '还未登录',
    },
    windowOpen: {
      // login-register
      lr: false,
      messages: false,
      setting: false,
      user: false,
    },
    user: null,
    // 每次打开或点击窗口都会使其自增1，从而使窗口保持最前，只作用于可拖动窗口
    maxZIndex: 0,
  }),
  getters: {
    logined: ({ user }) => user !== null,
  },
  mutations: {
    updateWindow(state, { name, val }) {
      state.windowOpen[name] = val
    },
    updateUser(state, user) {
      state.user = user
    },
    updateMaxZIndex(state) {
      state.maxZIndex += 1
    },
  },
  actions: {
    async getUser({ commit }) {
      try {
        const { data } = await axios.get('/user/auth')
        commit('updateUser', data)
      } catch (err) {
        // do nothing
      }
    },
  },
})
