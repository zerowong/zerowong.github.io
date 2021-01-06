<template>
  <div class="nav-menu">
    <nav class="nav">
      <router-link class="route" exact-active-class="route-active" to="/">HOME</router-link>
      <router-link class="route" exact-active-class="route-active" to="/blog">BLOG</router-link>
      <router-link class="route" exact-active-class="route-active" to="/about">ABOUT</router-link>
      <setting-btn @open-popup-window="openSetting"></setting-btn>
    </nav>
    <transition name="el-zoom-in-center">
      <popup-window
        class="setting"
        title="设置"
        v-if="showSetting"
        @close="closeSetting"
        :showClose="true"
        :moveable="true"
      >
        <setting :isDarkMode="blogDarkMode" @dark-mode-change="darkModeChange"></setting>
      </popup-window>
    </transition>
  </div>
</template>

<script>
import SettingBtn from '../components/SettingBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Setting from './Setting.vue'

export default {
  name: 'NavMenu',
  data: () => ({
    showSetting: false,
    blogDarkMode: false,
  }),
  methods: {
    closeSetting() {
      this.showSetting = false
    },
    openSetting() {
      this.showSetting = true
    },
    darkModeChange(val) {
      this.blogDarkMode = val
    },
  },
  components: {
    SettingBtn,
    PopupWindow,
    Setting,
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
