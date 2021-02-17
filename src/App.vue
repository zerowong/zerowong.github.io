<template>
  <div id="app">
    <nav-menu></nav-menu>
    <main id="main">
      <transition :name="routeTransitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <div id="popup-window-wrapper">
      <popup-window
        title="设置"
        key="setting"
        :moveable="true"
        windowName="setting"
        :width="400"
        :height="600"
        v-show="windowOpen.setting"
      >
        <setting :config="config"></setting>
      </popup-window>
      <popup-window
        title="个人资料"
        key="profile"
        :moveable="true"
        windowName="user"
        :width="500"
        :height="600"
        v-if="windowOpen.user"
      >
        <user></user>
      </popup-window>
      <popup-window
        key="login-register"
        :moveable="true"
        windowName="lr"
        :width="500"
        :height="620"
        v-if="windowOpen.lr"
      >
        <login-register></login-register>
      </popup-window>
    </div>
    <transition name="moveLeft" css>
      <aside v-if="drawer" id="drawer">
        <routes-menu></routes-menu>
      </aside>
    </transition>
    <div class="drawer-mask" v-if="drawer" @click="updateDrawer(false)"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import settingMixin from './utils/setting-mixin'
import NavMenu from './components/NavMenu.vue'
import PopupWindow from './components/PopupWindow.vue'
import Setting from './components/window/Setting.vue'
import User from './components/window/User.vue'
import LoginRegister from './components/window/LoginRegister.vue'
import RoutesMenu from './components/RoutesMenu.vue'

export default {
  name: 'App',
  // inject: ['isMobile'],
  mixins: [settingMixin],
  components: {
    NavMenu,
    PopupWindow,
    Setting,
    User,
    LoginRegister,
    RoutesMenu,
  },
  data: () => ({
    config: {
      darkmode: true,
      pwHeaderBgColor: '#e2e2e2',
      backgroundImage: 'https://cdn.apasser.xyz/blog/october_rain.jpg',
    },
    routeTransitionName: 'MTLFR',
  }),
  computed: { ...mapState(['windowOpen', 'drawer']) },
  watch: {
    $route(to, from) {
      if (this.drawer) {
        this.$store.commit('updateDrawer', false)
      }
      if (to.path === '/' || from.path === '/') {
        this.routeTransitionName = 'MTBFB'
      } else {
        this.routeTransitionName = 'MTLFR'
      }
    },
  },
  methods: {
    ...mapMutations(['updateDrawer']),
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

    // 使用原生样式
    // if (this.isMobile) {
    //   for (let i = 0; i < document.styleSheets.length; i++) {
    //     const cssStyleSheet = document.styleSheets[i]
    //     const cssRules = cssStyleSheet.cssRules
    //     for (let j = 0; j < cssRules.length; j++) {
    //       if (cssRules[j]?.selectorText === '::-webkit-scrollbar') {
    //         cssStyleSheet.deleteRule(j)
    //       }
    //     }
    //   }
    // }
  },
}
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background-color: unset;
}

#main {
  height: calc(100% - 60px);
  margin-top: 60px;
  box-sizing: border-box;
}

#popup-window-wrapper {
  position: absolute;
}

#drawer {
  position: absolute;
  width: 60vw;
  height: 100vh;
  background-color: var(--blog-bgcolor);
  box-shadow: 10px 0 20px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0 18px 18px 0;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.drawer-mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
