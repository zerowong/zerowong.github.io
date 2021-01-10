<template>
  <div class="nav-menu">
    <nav class="nav">
      <router-link class="route" exact-active-class="route-active" to="/">HOME</router-link>
      <router-link class="route" exact-active-class="route-active" to="/blog">BLOG</router-link>
      <router-link class="route" exact-active-class="route-active" to="/about">ABOUT</router-link>
      <setting-btn @open-setting-window="openSettingWindow"></setting-btn>
    </nav>
    <transition name="el-zoom-in-center">
      <popup-window
        class="setting"
        title="设置"
        :showClose="true"
        :moveable="true"
        v-if="settingWindowIsOpen"
        @close-popup-window="closeSettingWindow"
      >
        <setting :config="config"></setting>
      </popup-window>
    </transition>
  </div>
</template>

<script>
import SettingBtn from '../components/SettingBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Setting from './Setting.vue'
import settingMixin from '../utils/settingMixin'

export default {
  name: 'NavMenu',
  data: () => ({
    settingWindowIsOpen: false,
    config: {
      darkmode: false,
      pwHeaderBgColor: '#e2e2e2',
      backgroundImage: 'https://cdn.apasser.xyz/blog/escape.jpg',
    },
  }),
  mixins: [settingMixin],
  methods: {
    closeSettingWindow() {
      this.settingWindowIsOpen = false
    },
    openSettingWindow() {
      this.settingWindowIsOpen = true
    },
  },
  components: {
    SettingBtn,
    PopupWindow,
    Setting,
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
</style>
