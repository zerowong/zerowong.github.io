<template>
  <el-tooltip :content="tip" :placement="config.placement" :transition="config.transition">
    <el-button class="btn" type="text">
      <i class="iconfont icon-xiaoshuo"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'BooklistBtn',
  props: ['config'],
  data: () => ({
    tip: '书单',
  }),
}
</script>

<style scoped>
.iconfont {
  font-size: var(--primary-btn-size);
  color: #3fd5f6;
}
</style>
