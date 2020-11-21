<template>
  <el-tooltip :content="tip" :placement="config.placement" :transition="config.transition">
    <el-button class="btn" type="text">
      <i class="iconfont icon-shequ"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'MessageBtn',
  props: ['config'],
  data: () => ({
    tip: '留言',
  }),
}
</script>

<style scoped>
.iconfont {
  font-size: var(--primary-btn-size);
  color: #3dc3c6;
}
</style>
