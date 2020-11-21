<template>
  <el-tooltip :content="tip" :placement="config.placement" :transition="config.transition">
    <el-button class="btn" type="text">
      <i class="iconfont icon-fankui"></i>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'FeedbackBtn',
  props: ['config'],
  data: () => ({
    tip: '反馈',
  }),
}
</script>

<style scoped>
.iconfont {
  font-size: var(--primary-btn-size);
  color: #b16ef1;
}
</style>
