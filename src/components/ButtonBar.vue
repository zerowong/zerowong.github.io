<template>
  <div class="btn-bar">
    <message-btn :config="tooltipConfig"></message-btn>
    <booklist-btn :config="tooltipConfig"></booklist-btn>
    <transition name="el-zoom-in-center">
      <popup-window
        title="留言"
        :moveable="true"
        windowName="messages"
        :width="600"
        :height="850"
        v-if="windowOpen.messages"
      >
        <messages></messages>
      </popup-window>
    </transition>
  </div>
</template>

<script>
import MessageBtn from './btn/MessagesBtn.vue'
import BooklistBtn from './btn/BooklistBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Messages from './window/Messages.vue'

export default {
  name: 'ButtonBar',
  components: {
    MessageBtn,
    BooklistBtn,
    PopupWindow,
    Messages,
  },
  data: () => ({
    tooltipConfig: {
      placement: 'top',
      transition: 'el-zoom-in-bottom',
    },
  }),
  computed: {
    windowOpen() {
      return this.$store.state.windowOpen
    },
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
</style>
