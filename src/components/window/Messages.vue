<template>
  <div
    class="messages"
    v-loading="messagesLoading"
    element-loading-background="var(--blog-bgcolor)"
  >
    <div class="messages-nav">
      <el-pagination
        class="pagination"
        layout="total, ->, prev, pager, next"
        :pager-count="5"
        :current-page="currentPage"
        :total="messagesLength"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="messages-body">
      <message-item
        v-for="(message, index) in messages[currentPage - 1]"
        :key="index"
        :message="message"
        @refresh-current-page="refreshCurrentPage"
      ></message-item>
    </div>
    <div class="messages-editor">
      <messages-editor
        placeholder="正能量留言"
        @refresh-page-one="refreshPageOne"
      ></messages-editor>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import axios from '../../utils/axios'
import MessageItem from './messageItem.vue'
import MessagesEditor from './MessagesEditor.vue'

export default {
  name: 'Messages',
  components: { MessageItem, MessagesEditor },
  data: () => ({
    // 二维数组
    messages: [],
    messagesLoading: false,
    currentPage: 1,
    messagesLength: 0,
  }),
  computed: {
    ...mapState(['errorMsg']),
  },
  methods: {
    async getMessages(index = 1) {
      this.messagesLoading = true
      try {
        const { data } = await axios.get(`/messages?sort=date&order=desc&page=${index}`)
        // 直接赋值没有响应式的变化侦测
        this.$set(this.messages, index - 1, data)
      } catch (e) {
        Message.error(this.errorMsg.universal)
      }
      this.messagesLoading = false
    },
    async getMessagesLength() {
      const { data } = await axios.get('/messages/length')
      this.messagesLength = data
    },
    handleCurrentChange(toPage) {
      // 请求过的不再请求
      if (!this.messages[toPage - 1]) {
        this.getMessages(toPage)
      }
      this.currentPage = toPage
    },
    refreshPageOne() {
      this.getMessagesLength()
      this.getMessages()
      this.currentPage = 1
    },
    refreshCurrentPage() {
      this.getMessages(this.currentPage)
    },
  },
  mounted() {
    this.getMessagesLength()
    this.getMessages()
  },
}
</script>

<style scoped>
/* 根元素容器 */
.messages {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 导航栏容器 */
.messages-nav {
  height: 5%;
}

/* 留言列表容器 */
.messages-body {
  height: 85%;
  overflow-y: scroll;
  padding: 15px;
}

/* 留言编辑器容器 */
.messages-editor {
  height: 10%;
  padding: 10px 10px 2px 10px;
}
</style>

<style>
.pagination,
.pagination .el-pager li.btn-quicknext,
.pagination .el-pager li.btn-quickprev {
  color: inherit;
}

.pagination button:disabled,
.pagination .el-pager li {
  background-color: inherit;
}

.pagination .btn-next,
.pagination .btn-prev {
  color: inherit;
  background-color: inherit;
}
</style>
