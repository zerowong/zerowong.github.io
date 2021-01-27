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
import axios from './utils/axios'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
  methods: {
    ...mapActions(['checkExp', 'getUser']),
    polling() {
      axios.patch('/users/polling')
      setTimeout(this.polling, 840000)
    },
  },
  mounted() {
    this.checkExp()
    this.getUser()
    setTimeout(this.polling, 840000)
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
