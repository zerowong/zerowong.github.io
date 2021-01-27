<script>
import Editor from '../Editor.vue'
import axios from '../../utils/axios'

export default {
  name: 'MessagesEditor',
  extends: Editor,
  methods: {
    async post() {
      await axios.post('/messages', { content: this.input })
      this.input = ''
      this.$emit('refresh-page-one')
    },
  },
}
</script>
