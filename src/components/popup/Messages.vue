<template>
  <div
    class="messages"
    v-loading="messagesLoading"
    element-loading-background="var(--global-bgcolor)"
  >
    <!-- '->'bug: https://github.com/element-plus/element-plus/pull/1576 -->
    <el-pagination
      layout="total,prev,pager,next"
      :pager-count="5"
      :current-page="currentPage"
      :total="messagesLength"
      @current-change="onCurrentChange"
    ></el-pagination>
    <main class="messages-body">
      <transition-group name="moveFromLeft">
        <message-item
          v-for="message in messages[currentPage - 1]"
          :key="message._id"
          :message="message"
          @refresh-current-page="refreshPage(currentPage)"
        />
      </transition-group>
    </main>
    <footer class="messages-editor">
      <editor @refresh-page-one="refreshPage(1)"></editor>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { axios, error } from '../../utils'
import type { Message } from './messages'
import Editor from '../Editor.vue'
import MessageItem from './MessageItem.vue'

const messages: Message[][] = reactive([])
ref: messagesLoading = false
ref: currentPage = 1
ref: messagesLength = 0

async function getMessages(index: number) {
  messagesLoading = true
  try {
    const { data } = await axios.get(`/messages?sort=createdAt&page=${index}`)
    messagesLength = data.length
    messages[index - 1] = data.messages
  } catch (err) {
    error(err)
  }
  messagesLoading = false
}

function onCurrentChange(toPage: number) {
  if (!messages[toPage - 1]) {
    getMessages(toPage)
  }
  currentPage = toPage
}

function refreshPage(index: number) {
  getMessages(index)
  currentPage = index
}

onMounted(() => {
  getMessages(1)
})
</script>

<style scoped>
.messages {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* 兼容移动端 */
  overflow-y: hidden;
}

/* 留言列表容器 */
.messages-body {
  height: 85%;
  overflow-y: scroll;
  padding: 15px;
}

/* 留言编辑器容器 */
.messages-editor {
  padding: 10px 10px 2px 10px;
}

@media (max-width: 1024px) {
  .messages-body {
    font-size: small;
  }
}

:deep(.el-pager .btn-quicknext),
:deep(.el-pager .btn-quickprev),
:deep(.el-pager .number),
:deep(.btn-prev),
:deep(.btn-next) {
  color: #c0c4cc;
  background-color: var(--global-bgcolor) !important;
}

:deep(.el-pager .active),
:deep(.el-pager .number:hover),
:deep(.el-pager .btn-quickprev:hover),
:deep(.el-pager .btn-quicknext:hover) {
  color: var(--primary-color);
}
</style>
