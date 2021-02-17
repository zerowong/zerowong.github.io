<template>
  <nav class="nav-menu-root">
    <routes-menu v-if="!isMobile"></routes-menu>
    <el-button class="menu-btn" type="text" @click="updateDrawer(true)" v-else>
      <i style="font-size: 40px;" class="iconfont icon-menu"></i>
    </el-button>
    <header-text></header-text>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
import HeaderText from './HeaderText.vue'
import RoutesMenu from './RoutesMenu.vue'

export default {
  name: 'NavMenu',
  components: {
    HeaderText,
    RoutesMenu,
  },
  inject: ['isMobile'],
  methods: {
    ...mapMutations(['updateDrawer']),
  },
}
</script>

<style scoped>
.nav-menu-root {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  background-color: var(--blog-bgcolor);
  /* background-color: transparent; */
  box-shadow: 0 0 5px 0 black;
  display: flex;
  justify-content: center;
}

.menu-btn {
  position: absolute;
  top: 9px;
  right: 10px;
  padding: 0;
}
</style>
