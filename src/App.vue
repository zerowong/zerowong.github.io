<template>
  <div id="app">
    <nav-menu></nav-menu>
    <main id="main">
      <router-view></router-view>
    </main>
    <div id="popup-window-wrapper">
      <transition name="el-zoom-in-center">
        <popup-window
          title="设置"
          :moveable="true"
          windowName="setting"
          :width="400"
          :height="600"
          v-if="windowOpen.setting"
        >
          <setting :config="config"></setting>
        </popup-window>
      </transition>
      <transition name="el-zoom-in-center">
        <popup-window
          title="个人资料"
          :moveable="true"
          windowName="user"
          :width="500"
          :height="600"
          v-if="windowOpen.user"
        >
          <user></user>
        </popup-window>
      </transition>
      <transition name="el-zoom-in-center">
        <popup-window
          :moveable="true"
          windowName="lr"
          :width="500"
          :height="620"
          v-if="windowOpen.lr"
        >
          <login-register></login-register>
        </popup-window>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import settingMixin from './utils/setting-mixin'
import NavMenu from './components/NavMenu.vue'
import PopupWindow from './components/PopupWindow.vue'
import Setting from './components/window/Setting.vue'
import User from './components/window/User.vue'
import LoginRegister from './components/window/LoginRegister.vue'

export default {
  name: 'App',
  mixins: [settingMixin],
  components: {
    NavMenu,
    PopupWindow,
    Setting,
    User,
    LoginRegister,
  },
  data: () => ({
    config: {
      darkmode: true,
      pwHeaderBgColor: '#e2e2e2',
      backgroundImage: 'https://cdn.apasser.xyz/blog/escape.jpg',
    },
  }),
  computed: { ...mapState(['windowOpen']) },
  methods: {
    ...mapActions(['getUser']),
    polling() {
      this.$axios.patch('/user/polling').catch(() => {})
      setTimeout(this.polling, 840000)
    },
  },
  created() {
    this.getUser()
    this.$axios.get('/client').catch(() => {})
    setTimeout(this.polling, 840000)
  },
  mounted() {
    const initConfig = localStorage.getItem('config')
    if (initConfig) {
      this.config = JSON.parse(initConfig)
    }
    this.darkModeChange(this.config.darkmode)
    this.colorPicker(this.config.pwHeaderBgColor)
    this.imagePicker(this.config.backgroundImage)
  },
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

#main {
  height: calc(100% - 60px);
  margin-top: 60px;
  box-sizing: border-box;
}

#popup-window-wrapper {
  position: absolute;
}
</style>
