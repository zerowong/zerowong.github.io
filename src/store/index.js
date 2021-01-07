import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    blogs: [],
    friends: [],
    errorMsg: ['发生了一些错误'],
    signal: {
      blogsLoading: true,
      friendsLoading: true,
    },
  }),
  getters: {
    blogsLoading: (state) => state.signal.blogsLoading,
    friendsLoading: (state) => state.signal.friendsLoading,
  },
  mutations: {
    initData(state, { key, val }) {
      state[key] = val
    },
    showErrorMsg(state, index) {
      Message.error({
        message: state.errorMsg[index],
        type: 'error',
        offset: 60,
      })
    },
    changeSignal(state, { key, val }) {
      state.signal[key] = val
    },
  },
  actions: {
    async getData({ commit, state }, key) {
      const targetSignal = `${key}Loading`
      if (state.signal[targetSignal]) {
        commit('changeSignal', { key: targetSignal, val: true })
      }
      try {
        const response = await axios.get(`/${key}`)
        commit('initData', { key, val: response.data })
      } catch (e) {
        commit('showErrorMsg', 0)
      }
      commit('changeSignal', { key: targetSignal, val: false })
    },
  },
})
