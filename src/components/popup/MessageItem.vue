<template>
  <div class="message">
    <el-avatar class="avatar" :src="message.user.avatar" :size="avatarSize">
      {{ message.user.name[0] }}
    </el-avatar>
    <div class="message-body">
      <profile-popover :user="message.user" />
      <div class="content">{{ message.content }}</div>
      <div class="operation">
        <span class="operation-text">{{ dateFromNow(message.createdAt) }}</span>
        <el-button class="operation-btn" type="text" @click="onThumbsUp">
          <i class="iconfont" :class="thumbsUped"></i>
          <span class="operation-text">{{ message.thumbsUpUsers.length }}</span>
        </el-button>
        <el-button class="operation-btn" type="text" @click="spreadReplies">
          <i class="iconfont icon-replies"></i>
          <span class="operation-text">{{ message.repliesLength }}</span>
        </el-button>
        <el-button class="operation-btn" type="text" @click="onReply()">回复</el-button>
      </div>
      <div v-if="showReplies">
        <transition-group name="moveFromLeft" appear>
          <div class="reply" v-for="reply in message.replies[currentPage - 1]" :key="reply._id">
            <el-avatar class="reply-avatar" :src="reply.user.avatar" :size="30">
              {{ reply.user.name[0] }}
            </el-avatar>
            <div>
              <div class="content">
                <profile-popover :user="reply.user" />
                <template v-if="reply.to">
                  <span> 回复 </span>
                  <profile-popover :user="reply.to" />
                  <span> : </span>
                </template>
                <span class="content-text">{{ reply.content }}</span>
              </div>
              <div class="operation">
                <span class="operation-text">{{ dateFromNow(reply.createdAt) }}</span>
                <el-button class="operation-btn" type="text" @click="onReply(reply.user)"
                  >回复</el-button
                >
              </div>
            </div>
          </div>
        </transition-group>
        <el-pagination
          small
          layout="total, prev, pager, next"
          :page-count="5"
          :current-page="currentPage"
          :total="message.repliesLength"
          @current-change="onCurrentChange"
        ></el-pagination>
      </div>
      <editor
        v-show="showEditor"
        class="reply-editor"
        :placeholder="replyPlaceholder"
        :reply="{ messageId: message._id, to: replyTo }"
        @refresh-current-page="refreshCurrentPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit, toRef, computed, inject } from 'vue'
import throttle from 'lodash-es/throttle'
import { useStore } from '../../store'
import { notify, error, axios } from '../../utils'
import { dateFromNow } from '../../utils/filters'
import type { Message, User } from './types'
import Editor from '../Editor.vue'
import ProfilePopover from './ProfilePopover.vue'

const store = useStore()
const props = defineProps<{ message: Message }>()
const emit = defineEmit(['refresh-current-page'])
const isMobile = inject<boolean>('isMobile')
const avatarSize = isMobile ? 30 : 60

ref: showReplies = false
ref: showEditor = false
ref: replyTo = null as User | null
ref: replyPlaceholder = ''
ref: currentPage = 1
ref: user = toRef(store.state, 'user')
ref: thumbsUped = computed(() => {
  if (user && props.message.thumbsUpUsers.includes(user._id)) {
    return 'icon-good-fill'
  }
  return 'icon-good'
})

function spreadReplies() {
  showReplies = !showReplies
}

function onCurrentChange(toPage: number) {
  currentPage = toPage
}

function refreshCurrentPage() {
  if (!showReplies) {
    spreadReplies()
  }
  emit('refresh-current-page')
}

function onReply(to?: User) {
  if (to) {
    replyPlaceholder = `回复 @${to.name}:`
    replyTo = to
  } else {
    replyPlaceholder = `回复 @${props.message.user.name}:`
    replyTo = null
  }
  showEditor = !showEditor
}

function updateThumbsUpUsers(id: string) {
  const indexOfUser = props.message.thumbsUpUsers.indexOf(id)
  if (indexOfUser === -1) {
    props.message.thumbsUpUsers.push(id)
  } else {
    props.message.thumbsUpUsers.splice(indexOfUser, 1)
  }
}

async function patchThumbsUp(id: string) {
  try {
    await axios.patch(`/messages/${props.message._id}/thumbsUp`)
  } catch (err) {
    error(err)
    // 回滚
    updateThumbsUpUsers(id)
  }
}

const patchThumbsUpThrottle = throttle(patchThumbsUp, 5000, { leading: false })

function onThumbsUp() {
  if (!user) return notify.error('还未登录')
  updateThumbsUpUsers(user._id)
  patchThumbsUpThrottle(user._id)
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
  word-break: break-all;
  white-space: pre-wrap;
  margin: 10px 0;
}

.content-text::before {
  content: ' ';
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
  color: var(--light-gray);
  padding: 0;
}

.operation-btn:hover,
.icon-good-fill {
  color: var(--primary-color);
}

.icon-good {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.47, 2.02, 0.31, -0.36);
}

.icon-good:hover {
  transform: scale(1.5);
}

/* 操作栏文本：时间，点赞数，回复数 */
.operation-text {
  font-size: small;
  color: var(--light-gray);
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

@media (max-width: 1024px) {
  .avatar {
    min-width: 30px;
  }
}
</style>
