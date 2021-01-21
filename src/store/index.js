import Vue from 'vue'
import Vuex from 'vuex'
import parse from '../utils/cookieParse'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    errorMsg: {
      server: '服务器发生了一些错误，请稍后再试',
      userExits: '用户已存在',
      userNotExits: '用户不存在',
      loginSuccess: '登录成功',
      loginFailure: '登陆失败',
      registerSuccess: '注册成功',
      registerFailure: '注册失败',
      badPass: '密码错误',
      authExpired: '用户认证已过期，请重新登录',
    },
    userId: -1,
    windowOpen: {
      // login-register
      lr: false,
      messages: false,
      setting: false,
      user: false,
    },
  }),
  getters: {
    logined: ({ userId }) => userId >= 0,
  },
  mutations: {
    updateUserId(state) {
      const { user_id: userId = -1 } = parse(document.cookie)
      state.userId = parseInt(userId, 10)
    },
    updateWindow(state, { name, val }) {
      state.windowOpen[name] = val
    },
  },
})
