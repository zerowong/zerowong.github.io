<script>
import { mapState, mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Editor from '../Editor.vue'
import axios from '../../utils/axios'

export default {
  name: 'MessagesEditor',
  extends: Editor,
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
          this.postMessage()
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
    async postMessage() {
      try {
        await axios.post('/messages', { content: this.input })
        this.input = ''
        this.$emit('refresh-page-one')
      } catch (e) {
        Message.error(this.errorMsg.sendFailure)
      }
    },
  },
}
</script>
