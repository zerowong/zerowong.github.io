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

<style>
:root {
  --bg_docBody: #4456a7;
  --bg_footer: #252d38;
  --bg-pw-header: #e2e2e2;
  --primary-btn-size: 60px;
}

body {
  background-color: var(--bg_docBody);
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
}

/* 全局按钮hover动效 */
.btn:hover {
  display: block;
  transform: scale(1.5, 1.5);
}
</style>
