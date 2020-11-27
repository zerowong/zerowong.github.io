<template>
  <div id="app">
    <el-container>
      <el-header height="61px">
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './views/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style scoped>
.el-header {
  background-color: white;
}

.el-container {
  height: inherit;
}
</style>
