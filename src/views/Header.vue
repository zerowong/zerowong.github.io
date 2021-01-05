<template>
  <div>
    <el-menu
      mode="horizontal"
      text-color="#000"
      active-text-color="#000"
      :default-active="activeIndex"
      router
    >
      <el-menu-item class="route" index="/">HOME</el-menu-item>
      <el-menu-item class="route" index="/blog">BLOG</el-menu-item>
      <el-menu-item class="route" index="/about">ABOUT</el-menu-item>
      <setting-btn @open-popup-window="openSetting"></setting-btn>
    </el-menu>
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
  name: 'Header',
  data: () => ({
    showSetting: false,
    blogDarkMode: true,
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
  computed: {
    // 根据url确定active index
    activeIndex: () => new URL(document.URL).pathname,
  },
  components: {
    SettingBtn,
    PopupWindow,
    Setting,
  },
}
</script>

<style scoped>
.route {
  font-size: larger;
  font-weight: bold;
}

.setting {
  width: 400px;
  height: 600px;
}
</style>
