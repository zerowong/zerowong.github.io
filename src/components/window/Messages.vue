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
      <div class="message" v-for="(message, index) in messages[currentPage - 1]" :key="index">
        <el-avatar class="avatar" :src="message.user.avatar" :size="60">
          {{ message.user.name[0] }}
        </el-avatar>
        <div>
          <div class="name">{{ message.user.name }}</div>
          <div class="content">{{ message.content }}</div>
          <div class="operation">
            <span class="date">{{ message.date | dateFromNow }}</span>
            <el-button class="thumbsup" type="text" @click="onThumbsUp(message)">
              <i class="iconfont" :class="checkThumbsUped(message)"></i>
            </el-button>
            <span class="thumbsup-text">{{ message.thumbsUpUserList.length }}</span>
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
        v-if="limitPopover"
        :visible.sync="limitPopover"
      ></popover>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import throttle from 'lodash-es/throttle'
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
    // 发留言频率限制
    sendLimit: false,
    // 留言频率限制的popover用户提示
    limitPopover: false,
    // 上次点赞的留言id
    lastThumbsUp: -1,
  }),
  computed: {
    ...mapState(['errorMsg', 'user']),
  },
  methods: {
    async getMessages(index = 1) {
      this.messageLoading = true
      try {
        const { data } = await axios.get(`/messages?sort=date&order=desc&page=${index}`)
        // 直接赋值没有响应式的变化侦测
        this.$set(this.messages, index - 1, data)
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
      if (!this.$store.getters.logined) {
        Message.error(this.errorMsg.notLogined)
        return
      }
      if (this.input) {
        // 操作频率限制
        if (!this.sendLimit) {
          this.sendMessage()
          this.sendLimit = true
          setTimeout(() => {
            this.sendLimit = false
          }, 2000)
        } else {
          this.limitPopover = true
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
    // 是否已点赞
    checkThumbsUped(message) {
      //                                               可能未登录
      return message.thumbsUpUserList.includes(this.user?._id) ? 'icon-good-fill' : 'icon-good'
    },
    onThumbsUp(message) {
      if (!this.$store.getters.logined) {
        Message.error(this.errorMsg.notLogined)
        return
      }
      const indexOfUser = message.thumbsUpUserList.indexOf(this.user._id)
      if (indexOfUser === -1) {
        message.thumbsUpUserList.push(this.user._id)
      } else {
        message.thumbsUpUserList.splice(indexOfUser, 1)
      }
      if (message._id === this.lastThumbsUp) {
        // 反复点击时节流
        this.postThumbsUpThrottle(message._id)
      } else {
        this.postThumbsUp(message._id)
      }
      this.lastThumbsUp = message._id
    },
    async postThumbsUp(_messageId) {
      try {
        await axios.post('/messages/thumbsUp', { messageId: _messageId })
      } catch (e) {
        Message.error(this.errorMsg.universal)
      }
    },
  },
  mounted() {
    this.postThumbsUpThrottle = throttle(this.postThumbsUp, 5000, { leading: false })
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

.message {
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

.operation .iconfont {
  font-size: 25px;
}

.thumbsup {
  margin-left: 15px;
  padding: 0;
}

.icon-good {
  color: #99a2aa;
}

.icon-good:hover {
  color: var(--primary-color);
}

.icon-good-fill {
  color: var(--primary-color);
}

.date,
.thumbsup-text {
  font-size: small;
  color: #99a2aa;
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
