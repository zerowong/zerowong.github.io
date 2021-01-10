<template>
  <el-tooltip :content="tip" placement="bottom" transition="el-zoom-in-top">
    <el-button class="btn" type="text" @click="openSettingWindow">
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
    openSettingWindow() {
      this.$emit('open-setting-window')
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

.btn:hover {
  display: block;
  transform: scale(1.5);
}

.iconfont {
  font-size: 35px;
  color: #7a80fc;
}
</style>
