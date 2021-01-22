<template>
  <el-button class="setting" type="text" @click="open">
    <i class="iconfont icon-setting"></i>
  </el-button>
</template>

<script>
export default {
  name: 'SettingBtn',
  methods: {
    open() {
      this.$store.commit('updateWindow', { name: 'setting', val: true })
    },
  },
}
</script>

<style scoped>
.setting {
  display: block;
  transition: transform 0.5s;
  padding: 0;
}

.setting:hover {
  transform: rotate(0.5turn);
}

.iconfont {
  font-size: 40px;
  color: #7a80fc;
}
</style>
