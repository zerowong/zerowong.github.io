<template>
  <div class="editor">
    <el-input
      class="editor-textarea"
      type="textarea"
      :rows="3"
      :placeholder="placeholder"
      v-model="input"
      maxlength="200"
      resize="none"
      show-word-limit
    ></el-input>
    <el-button type="primary" @click="onSend">发送</el-button>
    <popover
      class="popover"
      content="你还没有留言!"
      v-if="emptyPopover"
      :visible.sync="emptyPopover"
    ></popover>
    <popover
      class="popover"
      content="操作太频繁了!"
      v-if="limitPopover"
      :visible.sync="limitPopover"
    ></popover>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Popover from './Popover.vue'

export default {
  name: 'Editor',
  components: { Popover },
  props: { placeholder: String },
  computed: {
    ...mapState(['errorMsg']),
    ...mapGetters(['logined']),
  },
  data: () => ({
    input: '',
    // 留言为空时的popover用户提示
    emptyPopover: false,
    // 留言频率限制的popover用户提示
    limitPopover: false,
    // 发留言频率限制
    sendLimit: false,
  }),
  methods: {
    onSend() {
      if (!this.logined) {
        this.$notification.error(this.errorMsg.notLogined)
        return
      }
      if (this.input) {
        // 操作频率限制
        if (!this.sendLimit) {
          this.post().catch((err) => {
            this.$notification.error(err.response?.data ?? this.errorMsg.networkError)
          })
          this.sendLimit = true
          setTimeout(() => {
            this.sendLimit = false
          }, 2000)
        } else {
          this.limitPopover = true
        }
      } else {
        this.emptyPopover = true
      }
    },
  },
}
</script>

<style scoped>
.editor {
  display: flex;
}

.editor-textarea {
  margin-right: 10px;
}

/* 发送留言时的用户提示 */
.popover {
  right: 0;
  bottom: 87px;
}
</style>

<style>
.editor .el-textarea__inner,
.editor .el-textarea .el-input__count {
  background-color: var(--input-bgcolor);
  color: inherit;
}

.editor .el-textarea__inner {
  border: 2px solid rgba(64, 158, 255, 0.5);
}

.editor .el-textarea__inner:hover,
.editor .el-textarea__inner:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
}
</style>
