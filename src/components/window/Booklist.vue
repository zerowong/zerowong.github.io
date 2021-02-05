<template>
  <div class="booklist-root">
    <nav>
      <span :class="{ 'active-item': readActive }" @click="switchGroup">已读</span>
      <span :class="{ 'active-item': unreadActive }" @click="switchGroup">未读</span>
    </nav>
    <main>
      <div class="book-info" v-for="(book, index) in books[cursor]" :key="index">
        <img :src="book.coverUrl" :alt="book.title" loading="lazy" />
        <div>
          <h3>{{ book.title }}</h3>
          <p>ISBN：{{ book.isbn }}</p>
          <p>摘要：{{ book.abstract }}</p>
          <a :href="book.url" target="_blank">前往豆瓣查看</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../utils/axios'

export default {
  name: 'Booklist',
  data: () => ({
    books: {
      read: [],
      unread: [],
    },
    readActive: true,
    unreadActive: false,
    cursor: 'read',
  }),
  computed: { ...mapState(['errorMsg']) },
  methods: {
    switchGroup() {
      // eslint-disable-next-line no-extra-semi
      ;[this.readActive, this.unreadActive] = [this.unreadActive, this.readActive]
      this.cursor = this.cursor === 'read' ? 'unread' : 'read'
    },
    async getBooks() {
      try {
        const { data } = await axios.get('/books')
        this.books = data
      } catch (err) {
        this.$notification.err(err.response?.data ?? this.errorMsg.networkError)
      }
    },
  },
  mounted() {
    this.getBooks()
  },
}
</script>

<style scoped>
.booklist-root {
  height: 100%;
}

nav {
  height: 60px;
  width: 700px;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  padding: 10px;
  cursor: pointer;
  background-color: var(--blog-bgcolor);
}

nav > span {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 5px;
  text-align: center;
  font-size: large;
  border-bottom: 2px solid transparent;
}

nav > span:hover {
  background-color: rgba(64, 158, 255, 0.5);
}

.active-item {
  border-bottom-color: var(--primary-color);
}

main {
  margin-top: 60px;
  padding: 30px;
}

.book-info {
  display: flex;
  column-gap: 20px;
  margin-bottom: 20px;
}

img {
  min-width: 150px;
  max-width: 150px;
}

a {
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>
