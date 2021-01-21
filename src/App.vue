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
import { mapActions } from 'vuex'
import NavMenu from './components/NavMenu.vue'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
  methods: {
    ...mapActions(['checkExp', 'getUser']),
  },
  mounted() {
    this.checkExp()
    this.getUser()
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
