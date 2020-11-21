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
</style>

<style>
:root {
  --bg_1: #4456a7;
  --bg_2: #474747;
  --bg_footer: #252D38;
  --bg_btnBar: #c6c9cf;
  --primary-btn-size: 60px;
  --primary-btn-margin-bottom: 20px;
}

body {
  background-color: var(--bg_1);
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 全局按钮hover动效 */
.btn:hover {
  display: block;
  transform: scale(1.5, 1.5);
}
</style>
