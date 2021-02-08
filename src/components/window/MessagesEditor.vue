<script>
import Editor from '../Editor.vue'

export default {
  name: 'MessagesEditor',
  extends: Editor,
  methods: {
    async post() {
      await this.$axios.post('/messages', { content: this.input })
      this.input = ''
      this.$emit('refresh-page-one')
    },
  },
}
</script>
