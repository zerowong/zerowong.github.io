<template>
  <el-tooltip :content="tip" placement="bottom" transition="el-zoom-in-top">
    <el-button class="btn" type="text" @click="openPopupWindow">
      <i class="iconfont icon-shezhi"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'SettingBtn',
  data: () => ({
    tip: '设置',
  }),
  methods: {
    openPopupWindow() {
      this.$emit('open-popup-window')
    },
  },
}
</script>

<style scoped>
.btn {
  position: absolute;
  top: 12px;
  right: 10px;
  padding: 0;
}

.iconfont {
  font-size: 35px;
  color: #7a80fc;
}
</style>
