import { InjectionKey } from '@vue/runtime-core'
import { createStore, Store, useStore as baseUseStore, createLogger } from 'vuex'
import { axios } from '../utils'

interface User {
  _id: string
  name: string
  avatar: string
  mail: string
  createdAt: string
  lastActiveAt: string
  role: 'admin' | 'normal'
}
export interface State {
  user: User | null
  maxZIndex: number
  drawerDisplay: boolean
}

export const key: InjectionKey<Store<State>> = Symbol('vuexStore')

export const store = createStore<State>({
  strict: import.meta.env.DEV,
  plugins: import.meta.env.DEV ? [createLogger()] : [],
  state: () => ({
    user: null,
    // 每次打开或点击窗口都会使其自增1，从而使窗口保持最前，只作用于可拖动窗口
    maxZIndex: 100,
    drawerDisplay: false,
  }),
  getters: {
    logined: ({ user }) => user !== null,
    isAdmin: ({ user }) => user?.role === 'admin' ?? false,
  },
  mutations: {
    updateUser(state, user: State['user']) {
      state.user = user
    },
    incrMaxZIndex(state) {
      state.maxZIndex += 1
    },
    updateDrawerDisplay(state, val: boolean) {
      state.drawerDisplay = val
    },
  },
  actions: {
    getUser({ commit }) {
      axios.get('/user/auth').then(
        (res) => commit('updateUser', res.data),
        () => {
          /**do nothing */
        }
      )
    },
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
