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
      <SettingBtn></SettingBtn>
    </el-menu>
  </div>
</template>

<script>
import SettingBtn from '../components/SettingBtn.vue'

export default {
  name: 'Header',
  computed: {
    // 根据url确定active index
    activeIndex: () => new URL(document.URL).pathname,
  },
  components: {
    SettingBtn,
  },
}
</script>

<style scoped>
.route {
  font-size: larger;
  font-weight: bold;
}
</style>
