<script>
import { mapState, mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Editor from '../Editor.vue'
import axios from '../../utils/axios'

export default {
  name: 'ReplyEditor',
  extends: Editor,
  props: {
    messageId: Number,
    // 是否回复某个用户
    replyTo: Object,
  },
  computed: {
    ...mapState(['errorMsg']),
    ...mapGetters(['logined']),
  },
  methods: {
    onSend() {
      if (!this.logined) {
        Message.error(this.errorMsg.notLogined)
        return
      }
      if (this.input) {
        // 操作频率限制
        if (!this.sendLimit) {
          this.postReply()
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
    async postReply() {
      const reply = { content: this.input }
      if (this.replyTo) {
        reply.to = this.replyTo._id
      }
      try {
        await axios.post(`/messages/${this.messageId}/replies`, reply)
        this.input = ''
        this.$emit('refresh-current-page')
      } catch (e) {
        Message.error(this.errorMsg.sendFailure)
      }
    },
  },
}
</script>
