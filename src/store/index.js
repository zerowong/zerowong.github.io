import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import parse from '../utils/cookie-parse'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    errorMsg: {
      universal: '发生了一些错误',
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
    async checkExp({ state: { errorMsg } }) {
      const { user_exp: exp } = parse(document.cookie)
      //                                          UTC+8      1 day
      if (exp && parseInt(exp, 10) - Date.now() - 28800000 < 86400000) {
        try {
          await axios.get('/login')
        } catch (err) {
          Message.error(err.response?.data ?? errorMsg.universal)
        }
      }
    },
    async getUser({ commit, state: { errorMsg } }) {
      try {
        const { data } = await axios.get('/user/auth')
        commit('updateUser', data)
      } catch (err) {
        Message.error(err.response?.data ?? errorMsg.universal)
      }
    },
  },
})
