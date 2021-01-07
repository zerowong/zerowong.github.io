import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import axios from '../utils/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: () => ({
    blogs: [],
    errorMsg: ['发生了一些错误'],
    signal: {
      blogsDone: false,
    },
  }),
  getters: {
    blogsDone: (state) => state.signal.blogsDone,
  },
  mutations: {
    initBlogs(state, blogs) {
      state.blogs = blogs
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
    async getBlogs({ commit, state }) {
      if (state.signal.blogsDone) {
        commit('changeSignal', { key: 'blogsDone', val: false })
      }
      try {
        const response = await axios.get('/blogs')
        commit('initBlogs', response.data)
      } catch (e) {
        commit('showErrorMsg', 0)
      }
      commit('changeSignal', { key: 'blogsDone', val: true })
    },
  },
})
