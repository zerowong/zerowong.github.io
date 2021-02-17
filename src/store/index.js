import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    windowOpen: {
      // login-register
      lr: false,
      messages: false,
      setting: false,
      user: false,
      booklist: false,
    },
    user: null,
    // 每次打开或点击窗口都会使其自增1，从而使窗口保持最前，只作用于可拖动窗口
    maxZIndex: 100,
    drawer: false
  }),
  getters: {
    logined: ({ user }) => user !== null,
    isAdmin: ({ user }) => user?.role === 'admin' ?? false,
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
    updateDrawer(state, val) {
      state.drawer = val
    }
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
