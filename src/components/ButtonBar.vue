<template>
  <div class="btn-bar">
    <message-btn class="btn"></message-btn>
    <booklist-btn class="btn"></booklist-btn>
    <popup-window
      key="messages"
      title="留言"
      :moveable="true"
      windowName="messages"
      :width="700"
      :height="900"
      v-if="windowOpen.messages"
    >
      <messages></messages>
    </popup-window>
    <popup-window
      key="booklist"
      title="书单"
      :moveable="true"
      windowName="booklist"
      :width="700"
      :height="900"
      v-if="windowOpen.booklist"
    >
      <booklist></booklist>
    </popup-window>
  </div>
</template>

<script>
import MessageBtn from './btn/MessagesBtn.vue'
import BooklistBtn from './btn/BooklistBtn.vue'
import PopupWindow from './PopupWindow.vue'
import Messages from './window/Messages.vue'
import Booklist from './window/Booklist.vue'

export default {
  name: 'ButtonBar',
  components: {
    MessageBtn,
    BooklistBtn,
    PopupWindow,
    Messages,
    Booklist,
  },
  computed: {
    windowOpen() {
      return this.$store.state.windowOpen
    },
  },
}
</script>

<style scoped>
.btn-bar {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 55px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 15px;
  box-shadow: 0 0 6px 0 black;
}

/* 底部按钮栏按钮位置 */
.btn {
  position: relative;
  bottom: 30px;
}
</style>

<style>
.btn > span {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn .iconfont {
  transition: transform 0.1s;
  font-size: var(--primary-btn-size);
}

.btn:hover .iconfont {
  transform: scale(1.5) translateY(-10px);
}

.btn > span > span {
  color: white;
  font-size: small;
}
</style>
