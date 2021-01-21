import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import parse from '../utils/cookieParse'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    errorMsg: {
      universal: '发生了一些错误，请稍后再试',
      server: '服务器错误，请稍后再试',
      userExits: '用户已存在',
      userNotExits: '用户不存在',
      loginSuccess: '登录成功',
      loginFailure: '登陆失败',
      registerSuccess: '注册成功',
      registerFailure: '注册失败',
      badPass: '密码错误',
      authExpired: '用户认证已过期，请重新登录',
    },
    windowOpen: {
      // login-register
      lr: false,
      messages: false,
      setting: false,
      user: false,
    },
    user: {},
  }),
  getters: {
    // eslint-disable-next-line no-underscore-dangle
    logined: ({ user }) => user._id !== undefined,
  },
  mutations: {
    updateWindow(state, { name, val }) {
      state.windowOpen[name] = val
    },
    updateUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async checkExp({ state: { errorMsg } }) {
      const { user_exp: exp } = parse(document.cookie)
      //                                          UTC+8      1 day
      if (exp && parseInt(exp, 10) - Date.now() - 28800000 < 86400000) {
        try {
          await axios.get('/login')
        } catch (e) {
          Message.info(errorMsg.authExpired)
        }
      }
    },
    async getUser({ commit, state: { errorMsg } }) {
      try {
        const { data } = await axios.get('/users/current')
        commit('updateUser', data)
      } catch (e) {
        Message.error(errorMsg.universal)
      }
    },
  },
})
