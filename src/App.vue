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
import axios from './utils/axios'
import NavMenu from './components/NavMenu.vue'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
  methods: {
    async auth() {
      try {
        const result = await axios.get('/login')
        this.$store.commit('updateUser', result.data)
      } catch (e) {
        this.$store.commit('updateUser', null)
        // todo: 删除cookie
      }
    },
  },
  mounted() {
    this.auth()
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
