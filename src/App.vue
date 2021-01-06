<template>
  <overlay-scrollbars :options="{ scrollbars: { autoHide: 'scroll' } }">
    <div id="app">
      <el-container>
        <el-header>
          <nav-menu></nav-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </overlay-scrollbars>
</template>

<script>
import NavMenu from './views/NavMenu.vue'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
}
</script>

<style scoped>
.el-header {
  background-color: var(--blog-bgcolor);
}

.el-container {
  height: inherit;
}
</style>
