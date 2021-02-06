<template>
  <div class="message">
    <el-avatar class="avatar" :src="message.user.avatar" :size="60">
      {{ message.user.name[0] }}
    </el-avatar>
    <div class="message-body">
      <user-popover :user="message.user"></user-popover>
      <div class="content">{{ message.content }}</div>
      <div class="operation">
        <span class="operation-text">{{ message.createdAt | dateFromNow }}</span>
        <el-button class="operation-btn" type="text" @click="onThumbsUp">
          <i class="iconfont" :class="thumbsUped"></i>
          <span class="operation-text">{{ message.thumbsUpUsers.length }}</span>
        </el-button>
        <el-button class="operation-btn" type="text" @click="onSpreadReplies">
          <i class="iconfont icon-replies"></i>
          <span class="operation-text">{{ message.repliesLength }}</span>
        </el-button>
        <el-button class="operation-btn" type="text" @click="onSendReply">回复</el-button>
      </div>
      <template v-if="showReplies">
        <div class="reply" v-for="(reply, index) in message.replies[currentPage - 1]" :key="index">
          <el-avatar class="reply-avatar" :src="reply.user.avatar" :size="30">
            {{ reply.user.name[0] }}
          </el-avatar>
          <div>
            <div class="content">
              <user-popover :user="reply.user"></user-popover>
              <template v-if="reply.to">
                <span> 回复 </span>
                <user-popover :user="reply.to"></user-popover>
                <span> :</span>
              </template>
              <span> {{ reply.content }}</span>
            </div>
            <div class="operation">
              <span class="operation-text">{{ reply.createdAt | dateFromNow }}</span>
              <el-button class="operation-btn" type="text" @click="onSendInnerReply(reply)"
                >回复</el-button
              >
            </div>
          </div>
        </div>
        <el-pagination
          small
          class="pagination"
          layout="total, prev, pager, next"
          :page-count="5"
          :current-page="currentPage"
          :total="message.repliesLength"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </template>
      <template v-if="showEditor">
        <reply-editor
          class="reply-editor"
          :messageId="message._id"
          :replyTo="replyTo"
          :placeholder="replyPlaceholder"
          @refresh-current-page="refreshCurrentPage"
        ></reply-editor>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import throttle from 'lodash-es/throttle'
import axios from '../../utils/axios'
import ReplyEditor from './ReplyEditor.vue'
import UserPopover from './UserPopover.vue'

export default {
  name: 'MessageItem',
  components: { ReplyEditor, UserPopover },
  props: { message: Object },
  data: () => ({
    replyContent: '',
    showReplies: false,
    showEditor: false,
    replyTo: null,
    replyPlaceholder: '',
    currentPage: 1,
  }),
  computed: {
    ...mapState(['errorMsg', 'user']),
    ...mapGetters(['logined']),
    // 是否已点赞
    thumbsUped() {
      //                                               可能未登录
      return this.message.thumbsUpUsers.includes(this.user?._id) ? 'icon-good-fill' : 'icon-good'
    },
  },
  methods: {
    onSpreadReplies() {
      this.showReplies = !this.showReplies
    },
    updateThumbsUpUsers() {
      const indexOfUser = this.message.thumbsUpUsers.indexOf(this.user._id)
      if (indexOfUser === -1) {
        this.message.thumbsUpUsers.push(this.user._id)
      } else {
        this.message.thumbsUpUsers.splice(indexOfUser, 1)
      }
    },
    onThumbsUp() {
      if (!this.logined) {
        this.$notification.error(this.errorMsg.notLogined)
        return
      }
      this.updateThumbsUpUsers()
      this.thumbsUp()
    },
    thumbsUp() {
      axios.patch(`/messages/${this.message._id}/thumbsUp`).catch((err) => {
        this.$notification.error(err.response?.data ?? this.errorMsg.networkError)
        // 回滚
        this.updateThumbsUpUsers()
      })
    },
    onSendReply() {
      this.replyPlaceholder = `回复 @${this.message.user.name}:`
      this.showEditor = !this.showEditor
      this.replyTo = null
    },
    onSendInnerReply(reply) {
      this.replyTo = reply.user
      this.replyPlaceholder = `回复 @${reply.user.name}:`
      this.showEditor = true
    },
    refreshCurrentPage() {
      this.$emit('refresh-current-page')
    },
    handleCurrentChange(toPage) {
      this.currentPage = toPage
    },
  },
  created() {
    // 创建节流函数
    this.thumbsUp = throttle(this.thumbsUp, 5000, { leading: false })
  },
}
</script>

<style scoped>
/* 留言项容器 */
.message {
  display: flex;
  margin: 20px 0;
}

.message-body {
  width: 100%;
}

/* 留言用户头像 */
.avatar {
  margin-right: 20px;
  /* 没有头像或头像加载失败时的头像文字 */
  font-size: 2rem;
  min-width: 60px;
  cursor: pointer;
}

/* 留言内容文本 */
.content {
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break */
  word-break: break-all;
  /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space */
  white-space: pre-wrap;
  margin: 10px 0;
}

/* 操作栏 */
.operation {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

/* 操作栏按钮icon */
.operation .iconfont {
  font-size: 25px;
  margin-right: 5px;
}

.operation-btn {
  color: #99a2aa;
  padding: 0;
}

.operation-btn:hover,
.icon-good-fill {
  color: var(--primary-color);
}

/* 操作栏文本：时间，点赞数，回复数 */
.operation-text {
  font-size: small;
  color: #99a2aa;
}

.reply-editor {
  margin-top: 10px;
}

/* 回复项容器 */
.reply {
  display: flex;
  margin: 10px 0;
}

/* 留言回复用户头像 */
.reply-avatar {
  margin: 2px 10px 0 0;
  font-size: 1rem;
  min-width: 30px;
}
</style>
