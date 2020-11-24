<template>
  <div>
    <TypedText></TypedText>
    <div class="footer">
      <ButtonBar></ButtonBar>
      <div class="footer-info">
        <div class="footer-info-inner">
          <RunningTime></RunningTime>
          <!-- 备案 -->
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
  background-color: var(--bg-footer);
}

.footer-info-inner {
  color: white;
  text-align: center;
}
</style>
