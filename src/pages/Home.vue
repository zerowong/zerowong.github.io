<template>
  <div>
    <typed-text></typed-text>
    <div class="footer">
      <button-bar></button-bar>
      <div class="footer-info">
        <div class="footer-info-inner">
          <running-time></running-time>
          <el-link class="beian" :href="beian[0]" :underline="false">{{ beian[1] }}</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypedText from '../components/TypedText.vue'
import ButtonBar from '../components/ButtonBar.vue'
import RunningTime from '../components/RunningTime.vue'

export default {
  name: 'Home',
  data: () => ({
    beian: ['http://beian.miit.gov.cn', '湘ICP备2020022697号-1'],
  }),
  components: {
    TypedText,
    ButtonBar,
    RunningTime,
  },
}
</script>

<style scoped>
.footer {
  /* 固定在页面底部 */
  position: absolute;
  bottom: 10px;
  left: 0px;
  width: 100%;
  height: 60px;
  padding: 1px 0;
}

.footer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width: 100%;
  margin-top: 10px;
  background-color: var(--blog-bgcolor);
}

.footer-info-inner {
  color: var(--blog-color);
  text-align: center;
}

.beian {
  color: var(--blog-color);
}
</style>
