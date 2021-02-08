<script>
import Editor from '../Editor.vue'

export default {
  name: 'ReplyEditor',
  extends: Editor,
  props: {
    messageId: String,
    // 是否回复某个用户
    replyTo: Object,
  },
  methods: {
    async post() {
      await this.$axios.post(`/messages/${this.messageId}/replies`, {
        content: this.input,
        to: this.replyTo?._id,
      })
      this.input = ''
      this.$emit('refresh-current-page')
    },
  },
}
</script>
