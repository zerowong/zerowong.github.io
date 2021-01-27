<script>
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
  methods: {
    async post() {
      const reply = { content: this.input }
      if (this.replyTo) {
        reply.to = this.replyTo._id
      }
      await axios.post(`/messages/${this.messageId}/replies`, reply)
      this.input = ''
      this.$emit('refresh-current-page')
    },
  },
}
</script>
