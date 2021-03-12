<template>
  <nav-bar />
  <main id="main">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition ?? 'MTLFR'" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
  <transition name="moveLeft">
    <aside v-if="isMobile" v-show="drawer" id="drawer">
      <routes />
    </aside>
  </transition>
  <div class="drawer-mask" v-show="drawer" @click="closeDrawer"></div>
</template>

<script lang="ts" setup>
import { toRef, watch, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ElLoading from 'element-plus/lib/el-loading'
import { useStore } from './store'
import { axios } from './utils'
import NavBar from './components/NavBar.vue'
import Routes from './components/Routes.vue'

const store = useStore()
const isMobile = inject<boolean>('isMobile')

ref: drawer = toRef(store.state, 'drawer')
ref: path = toRef(useRoute(), 'path')

function closeDrawer() {
  store.commit('updateDrawer', false)
}

function polling() {
  axios.patch('/user/polling').catch(() => {})
  setTimeout(polling, 840000)
}

function init() {
  store.dispatch('getUser')
  axios.get('/client').catch(() => {})
  // setTimeout(polling, 840000)
  if (isMobile) {
    watch($path, () => store.commit('updateDrawer', false))
  }
}

onMounted(init)

const loading = ElLoading.service({
  lock: true,
  spinner: 'iconfont icon-loading',
  background: 'var(--global-bgcolor)',
})

window.addEventListener('load', () => loading.close())
</script>

<style scoped>
:global(#app) {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background-color: unset;
}

#main {
  height: calc(100% - 60px);
  margin-top: 60px;
  box-sizing: border-box;
}

:global(#popup-moveable-wrapper) {
  position: absolute;
}

#drawer {
  position: absolute;
  width: 60vw;
  height: 100vh;
  background-color: var(--global-bgcolor);
  box-shadow: 10px 0 20px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 18px 18px 0;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.drawer-mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.6);
}

:global(.icon-loading) {
  display: inline-block;
  font-size: 40px !important;
  animation: loading 2s linear infinite;
}
</style>
