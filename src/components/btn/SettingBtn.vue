<template>
  <el-tooltip content="设置" placement="bottom" transition="el-zoom-in-top">
    <el-button class="btn" type="text" @click="open">
      <i class="iconfont icon-setting"></i>
    </el-button>
  </el-tooltip>
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
.btn {
  display: block;
}

.btn:hover {
  transform: scale(1.5);
}

.iconfont {
  font-size: 35px;
  color: #7a80fc;
}
</style>
