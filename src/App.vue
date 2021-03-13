<template>
  <nav id="nav">
    <routes v-if="!isMobile" />
    <primary-link-icon />
  </nav>
  <main id="main">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
  <template v-if="isMobile">
    <el-button class="menu-btn" type="text" @click="openDrawer">
      <i class="iconfont icon-menu"></i>
    </el-button>
    <transition name="moveLeft">
      <aside id="drawer" v-show="drawerDisplay">
        <routes />
      </aside>
    </transition>
    <div class="fullscreen-mask" v-show="drawerDisplay" @click="closeDrawer"></div>
  </template>
</template>

<script lang="ts" setup>
import { toRef, watch, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from './store'
import { axios } from './utils'
import Routes from './components/Routes.vue'
import PrimaryLinkIcon from './components/PrimaryLinkIcon.vue'

const store = useStore()
const isMobile = inject<boolean>('isMobile')

ref: drawerDisplay = toRef(store.state, 'drawerDisplay')
ref: path = toRef(useRoute(), 'path')

function openDrawer() {
  store.commit('updateDrawerDisplay', true)
}

function closeDrawer() {
  store.commit('updateDrawerDisplay', false)
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
    watch($path, closeDrawer)
  }
}

onMounted(init)
</script>

<style scoped>
:global(#app) {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#nav {
  height: 60px;
  background-color: var(--nav-bar-bgcolor);
  box-shadow: 0 5px 20px 0 black;
  display: flex;
  justify-content: center;
}

#main {
  height: calc(100% - 60px);
}

#drawer {
  position: absolute;
  top: 0;
  width: 60vw;
  height: 100vh;
  background-color: var(--global-bgcolor);
  box-shadow: 10px 0 20px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 18px 18px 0;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.menu-btn {
  position: absolute;
  top: 9px;
  right: 10px;
  padding: 0;
}

.icon-menu {
  font-size: 40px;
}

.fullscreen-mask {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
