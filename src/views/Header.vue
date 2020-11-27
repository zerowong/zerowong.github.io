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
      <SettingBtn @open-popup-window="openSetting"></SettingBtn>
    </el-menu>
    <transition name="el-zoom-in-center">
      <PopupWindow class="setting" title="设置" v-if="showSetting" @close="closeSetting">
        <Setting></Setting>
      </PopupWindow>
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
  }),
  methods: {
    closeSetting() {
      this.showSetting = false
    },
    openSetting() {
      this.showSetting = true
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
