<template>
  <nav class="nav-bar">
    <routes v-if="!isMobile" />
    <el-button class="menu-btn" type="text" @click="openDrawer" v-if="isMobile">
      <i class="iconfont icon-menu"></i>
    </el-button>
    <primary-link-icon />
  </nav>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { useStore } from '../store'
import Routes from './Routes.vue'
import PrimaryLinkIcon from './PrimaryLinkIcon.vue'

const isMobile = inject<boolean>('isMobile')
const store = useStore()

function openDrawer() {
  store.commit('updateDrawer', true)
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  background-color: var(--nav-bar-bgcolor);
  box-shadow: 0 5px 20px 0 black;
  display: flex;
  justify-content: center;
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
</style>
