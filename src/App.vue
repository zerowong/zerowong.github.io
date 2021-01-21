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
import { Message } from 'element-ui'
import NavMenu from './components/NavMenu.vue'
import axios from './utils/axios'
import parse from './utils/cookieParse'

export default {
  name: 'App',
  components: {
    NavMenu,
  },
  methods: {
    async checkExp() {
      const { user_exp: exp } = parse(document.cookie)
      //                                          UTC+8      1 day
      if (exp && parseInt(exp, 10) - Date.now() - 28800000 < 86400000) {
        try {
          await axios.get('/login', {
            validateStatus(status) {
              return status >= 200 && status < 300
            },
          })
        } catch (e) {
          Message.info(this.$store.state.errorMsg.authExpired)
          document.cookie = 'user_id="";max-age=0'
          document.cookie = 'user_exp="";max-age=0'
        }
      }
      this.$store.commit('updateUserId')
    },
  },
  mounted() {
    this.checkExp()
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
