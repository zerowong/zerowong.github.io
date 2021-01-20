<template>
  <div class="nav-menu">
    <nav class="nav">
      <router-link class="route" exact-active-class="route-active" to="/">HOME</router-link>
      <router-link class="route" exact-active-class="route-active" to="/blog">BLOG</router-link>
      <router-link class="route" exact-active-class="route-active" to="/about">ABOUT</router-link>
      <div class="operation">
        <component :is="currentBtn"></component>
        <setting-btn></setting-btn>
      </div>
    </nav>
    <transition name="el-zoom-in-center">
      <popup-window
        class="setting"
        title="设置"
        :moveable="true"
        v-if="windowOpen.setting"
        windowName="setting"
      >
        <setting :config="config"></setting>
      </popup-window>
    </transition>
    <transition name="el-zoom-in-center">
      <popup-window class="user" :moveable="true" v-if="windowOpen.user" windowName="user">
        <user></user>
      </popup-window>
    </transition>
    <transition name="el-zoom-in-center">
      <popup-window class="login-register" :moveable="true" v-if="windowOpen.lr" windowName="lr">
        <login-register></login-register>
      </popup-window>
    </transition>
  </div>
</template>

<script>
import SettingBtn from './btn/SettingBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Setting from './window/Setting.vue'
import settingMixin from '../utils/settingMixin'
import LoginBtn from './btn/LoginBtn.vue'
import UserBtn from './btn/UserBtn.vue'
import User from './window/User.vue'
import LoginRegister from './window/LoginRegister.vue'

export default {
  name: 'NavMenu',
  mixins: [settingMixin],
  components: {
    SettingBtn,
    PopupWindow,
    Setting,
    LoginBtn,
    UserBtn,
    User,
    LoginRegister,
  },
  data: () => ({
    config: {
      darkmode: false,
      pwHeaderBgColor: '#e2e2e2',
      backgroundImage: 'https://cdn.apasser.xyz/blog/escape.jpg',
    },
  }),
  computed: {
    currentBtn() {
      return this.$store.getters.logined
        ? this.$options.components.UserBtn
        : this.$options.components.LoginBtn
    },
    windowOpen() {
      return this.$store.state.windowOpen
    },
  },
  mounted() {
    const initConfig = window.localStorage.getItem('config')
    if (initConfig !== null) {
      this.config = JSON.parse(window.localStorage.getItem('config'))
    }
    this.colorPicker(this.config.pwHeaderBgColor)
    this.imagePicker(this.config.backgroundImage)
    this.darkModeChange(this.config.darkmode)
  },
}
</script>

<style scoped>
.nav-menu {
  height: 100%;
}

.nav {
  display: flex;
  justify-content: center;
  height: 100%;
}

.operation {
  position: absolute;
  right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 15px;
}

.route {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 100%;
  text-decoration: none;
  color: var(--blog-color);
}

.route:hover {
  background-color: var(--primary-color);
  opacity: 0.7;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.7, 1);
}

.route-active {
  background-color: var(--primary-color);
}

.setting {
  width: 400px;
  height: 600px;
}

.login-register {
  width: 500px;
  height: 620px;
}
</style>
