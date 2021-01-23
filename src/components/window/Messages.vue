<template>
  <div
    class="container"
    v-loading="messageLoading"
    element-loading-background="var(--blog-bgcolor)"
  >
    <div class="nav">
      <el-pagination
        class="pagination"
        layout="total, ->, prev, pager, next"
        :pager-count="5"
        :current-page="currentPage"
        :total="messagesLength"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="body">
      <div class="message-item" v-for="(item, index) in messages[currentPage - 1]" :key="index">
        <el-avatar class="avatar" :src="item.user.avatar" :size="60">
          {{ item.user.name[0] }}
        </el-avatar>
        <div>
          <div class="name">{{ item.user.name }}</div>
          <div class="content">{{ item.content }}</div>
          <div class="operation">
            <span class="date">{{ item.date | dateFromNow }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="editor">
      <el-input
        class="textarea"
        type="textarea"
        :rows="3"
        placeholder="正能量留言"
        v-model="input"
        maxlength="200"
        resize="none"
        show-word-limit
      ></el-input>
      <el-button class="submit-btn" type="primary" @click="onSend">发送</el-button>
      <popover
        class="send-message-popover"
        content="你还没有留言!"
        v-if="inputEmpty"
        :visible.sync="inputEmpty"
      ></popover>
      <popover
        class="send-message-popover"
        content="操作太频繁了"
        v-if="sendLimitPopover"
        :visible.sync="sendLimitPopover"
      ></popover>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import axios from '../../utils/axios'
import Popover from '../Popover.vue'

export default {
  name: 'Messages',
  components: { Popover },
  data: () => ({
    // 二维数组
    messages: [],
    messageLoading: false,
    input: '',
    inputEmpty: false,
    currentPage: 1,
    messagesLength: 0,
    sendLimit: false,
    sendLimitPopover: false,
  }),
  computed: {
    ...mapState(['errorMsg']),
  },
  methods: {
    async getMessages(index = 1) {
      this.messageLoading = true
      try {
        const { data } = await axios.get(`/messages?sort=date&order=desc&page=${index}`)
        this.messages[index - 1] = data
      } catch (e) {
        Message.error(this.errorMsg.universal)
      }
      this.messageLoading = false
    },
    async getMessageLength() {
      const { data } = await axios.get('/messages/length')
      this.messagesLength = data
    },
    onSend() {
      if (this.input) {
        // 操作频率限制
        if (!this.sendLimit) {
          this.sendMessage()
          this.sendLimit = true
          setTimeout(() => {
            this.sendLimit = false
          }, 2000)
        } else {
          this.sendLimitPopover = true
        }
      } else {
        this.inputEmpty = true
      }
    },
    async sendMessage() {
      try {
        await axios.post('/messages', { content: this.input })
        this.input = ''
        this.getMessageLength()
        this.getMessages(1)
        this.currentPage = 1
      } catch (e) {
        Message.error(this.errorMsg.sendFailure)
      }
    },
    handleCurrentChange(toPage) {
      // 请求过的不再请求
      if (!this.messages[toPage - 1]) {
        this.getMessages(toPage)
      }
      this.currentPage = toPage
    },
  },
  mounted() {
    this.getMessageLength()
    this.getMessages(1)
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav {
  height: 5%;
}

.body {
  height: 85%;
  overflow-y: scroll;
}

.message-item {
  display: flex;
  margin: 20px 0;
}

.avatar {
  margin: 0 20px 0 10px;
  /* 没有头像或头像加载失败时的头像文字 */
  font-size: 2rem;
  min-width: 60px;
}

.name {
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.content {
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break */
  word-break: break-all;
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space */
  white-space: pre-wrap;
}

.operation {
  margin-top: 10px;
}

.date {
  font-size: small;
  opacity: 0.5;
}

.editor {
  display: flex;
  height: 10%;
}

.textarea {
  margin: 0 10px;
}

.submit-btn {
  height: 96%;
  margin-right: 10px;
}

.send-message-popover {
  right: 0;
  bottom: 87px;
}
</style>

<style>
.el-textarea__inner,
.el-textarea .el-input__count {
  background-color: var(--input-bgcolor);
  color: inherit;
}

.el-textarea__inner {
  border: 2px solid rgba(64, 158, 255, 0.5);
}

.el-textarea__inner:hover,
.el-textarea__inner:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
}

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
