<template>
  <div class="editor">
    <el-input
      type="textarea"
      :rows="3"
      :placeholder="placeholder"
      v-model="input"
      maxlength="200"
      resize="none"
      show-word-limit
    ></el-input>
    <el-popover
      trigger="manual"
      :visible="popoverVisible"
      :content="popoverContent"
      :show-arrow="false"
      popper-class="popper"
    >
      <template #reference>
        <el-button type="primary" @click="send">发送</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit, computed } from 'vue'
import { useStore } from '../store'
import type { User } from './popup/types'
import { axios, error } from '../utils'

const store = useStore()
const props = defineProps<{
  placeholder?: string
  reply?: {
    messageId: string
    to: User | null
  }
}>()
const emit = defineEmit(['refresh-page-one', 'refresh-current-page'])

ref: noLodined = computed(() => store.state.user === null)
ref: input = ''
ref: popoverContent = ''
ref: popoverVisible = false

function showPopover(content: string) {
  popoverContent = content
  popoverVisible = true
  setTimeout(() => (popoverVisible = false), 1000)
}

function send() {
  if (noLodined) {
    showPopover('还未登录')
    return
  }
  if (!input) {
    showPopover('你还没有留言')
    return
  }
  const data: {
    content: string
    to?: string
  } = { content: input }
  let url = '/messages'
  let event: 'refresh-page-one' | 'refresh-current-page' = 'refresh-page-one'
  if (props.reply) {
    if (props.reply.to) {
      data.to = props.reply.to._id
    }
    url = `/messages/${props.reply.messageId}/replies`
    event = 'refresh-current-page'
  }
  axios.post(url, data).then(() => {
    input = ''
    emit(event)
  }, error)
}
</script>

<style scoped>
.editor {
  display: flex;
  column-gap: 10px;
}

:global(.popper) {
  border: unset !important;
  background-color: red !important;
  color: white !important;
  text-align: center !important;
}

:deep(.el-textarea__inner),
:deep(.el-textarea .el-input__count) {
  background-color: var(--input-bgcolor);
}

:deep(.el-textarea__inner) {
  border: 2px solid rgba(64, 158, 255, 0.5);
  color: var(--global-color);
}

:deep(.el-textarea__inner:hover),
:deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
}
</style>
