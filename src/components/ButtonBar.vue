<template>
  <div class="btn-bar">
    <message-btn :config="tooltipConfig" @open-message-window="openWindow('message')"></message-btn>
    <feedback-btn :config="tooltipConfig"></feedback-btn>
    <booklist-btn :config="tooltipConfig"></booklist-btn>
    <transition name="el-zoom-in-center">
      <popup-window
        class="message-window"
        title="留言"
        :showClose="true"
        :moveable="true"
        v-if="windowIsOpen.message"
        @close-popup-window="closeWindow('message')"
      >
        <message-interface></message-interface>
      </popup-window>
    </transition>
  </div>
</template>

<script>
import MessageBtn from './MessageBtn.vue'
import FeedbackBtn from './FeedbackBtn.vue'
import BooklistBtn from './BooklistBtn.vue'
import PopupWindow from '../views/PopupWindow.vue'
import MessageInterface from './MessageInterface.vue'

export default {
  name: 'ButtonBar',
  data: () => ({
    tooltipConfig: {
      placement: 'top',
      transition: 'el-zoom-in-bottom',
    },
    windowIsOpen: {
      message: false,
      feedback: false,
      booklist: false,
    },
  }),
  methods: {
    openWindow(key) {
      this.windowIsOpen[key] = true
    },
    closeWindow(key) {
      this.windowIsOpen[key] = false
    },
  },
  components: {
    MessageBtn,
    FeedbackBtn,
    BooklistBtn,
    PopupWindow,
    MessageInterface,
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

  background-color: rgba(0, 0, 0, 0.45);
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
  transform: scale(1.5) translateY(-10px);
}

.message-window {
  width: 600px;
  height: 850px;
}
</style>
