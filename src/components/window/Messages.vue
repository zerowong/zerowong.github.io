<template>
  <div
    class="messages"
    v-loading="messagesLoading"
    element-loading-background="var(--blog-bgcolor)"
  >
    <nav class="messages-nav">
      <el-pagination
        class="pagination"
        layout="total, ->, prev, pager, next"
        :pager-count="5"
        :current-page="currentPage"
        :total="messagesLength"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </nav>
    <transition-group class="messages-body" name="moveFromLeft" tag="main" css>
      <message-item
        v-for="message in messages[currentPage - 1]"
        :key="message._id"
        :message="message"
        @refresh-current-page="refreshCurrentPage"
      ></message-item>
    </transition-group>
    <footer class="messages-editor">
      <messages-editor
        placeholder="正能量留言"
        @refresh-page-one="refreshPageOne"
      ></messages-editor>
    </footer>
  </div>
</template>

<script>
import MessageItem from './MessageItem.vue'
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
  methods: {
    async getMessages(index = 1) {
      this.messagesLoading = true
      try {
        const { data } = await this.$axios.get(`/messages?sort=createdAt&page=${index}`)
        this.messagesLength = data.length
        // 直接赋值没有响应式的变化侦测
        this.$set(this.messages, index - 1, data.messages)
      } catch (err) {
        this.$throw(err)
      }
      this.messagesLoading = false
    },
    handleCurrentChange(toPage) {
      // 请求过的不再请求
      if (!this.messages[toPage - 1]) {
        this.getMessages(toPage)
      }
      this.currentPage = toPage
    },
    refreshPageOne() {
      this.getMessages()
      this.currentPage = 1
    },
    refreshCurrentPage() {
      this.getMessages(this.currentPage)
    },
  },
  mounted() {
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
