<template>
  <div class="btn-bar">
    <MessageBtn></MessageBtn>
    <FeedbackBtn></FeedbackBtn>
    <BooklistBtn></BooklistBtn>
  </div>
</template>

<script>
import MessageBtn from './MessageBtn.vue'
import FeedbackBtn from './FeedbackBtn.vue'
import BooklistBtn from './booklistBtn.vue'

export default {
  name: 'ButtonBar',
  components: {
    MessageBtn,
    FeedbackBtn,
    BooklistBtn,
  },
}
</script>

<style scoped>
.btn-bar {
  /* 内含元素居中 */
  display: flex;
  justify-content: center;

  /* 自身居中 */
  width: 80%;
  height: 100%;
  margin: 0 auto;

  background-color: var(--bg_btnBar);
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}

/* 底部按钮栏按钮位置 */
.btn {
  position: relative;
  bottom: 15px;
}

/* 底部按钮栏hover动效 */
.btn:hover {
  transform: scale(1.5, 1.5) translateY(-10px);
}
</style>
