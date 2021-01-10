<template>
  <el-tooltip content="留言" :placement="config.placement" :transition="config.transition">
    <el-button class="btn" type="text" @click="openMessageWindow">
      <i class="iconfont icon-shequ"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'MessageBtn',
  props: ['config'],
  methods: {
    openMessageWindow() {
      this.$emit('open-message-window')
    },
  },
}
</script>

<style scoped>
.iconfont {
  font-size: var(--primary-btn-size);
  color: #3dc3c6;
}
</style>
