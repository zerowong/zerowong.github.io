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
</template>

<script>
import { mapState } from 'vuex'
import SettingBtn from './btn/SettingBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Setting from './window/Setting.vue'
import settingMixin from '../utils/setting-mixin'
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
    ...mapState(['windowOpen']),
    currentBtn() {
      return this.$store.getters.logined
        ? this.$options.components.UserBtn
        : this.$options.components.LoginBtn
    },
  },
  mounted() {
    const initConfig = localStorage.getItem('config')
    if (initConfig) {
      this.config = JSON.parse(initConfig)
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
  top: 9px;
  right: 30px;
  display: flex;
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
</style>
