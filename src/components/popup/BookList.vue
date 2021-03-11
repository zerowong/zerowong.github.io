<template>
  <div class="booklist">
    <nav class="nav">
      <span
        v-for="item in navItem"
        :key="item.key"
        class="nav-item"
        :class="{ 'active-item': cursor === item.key }"
        @click="switchGroup(item.key)"
        >{{ item.text }}</span
      >
    </nav>
    <main class="main">
      <transition-group name="fadeInUp">
        <div class="book" v-for="book in books[cursor]" :key="book.isbn">
          <img class="book-cover" :src="book.coverUrl" :alt="book.title" loading="lazy" />
          <div>
            <h3>{{ book.title }}</h3>
            <p>ISBN：{{ book.isbn }}</p>
            <p>摘要：{{ book.abstract }}</p>
            <a class="to-douban" :href="book.url" target="_blank">前往豆瓣查看</a>
          </div>
        </div>
      </transition-group>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { axios, error } from '../../utils'

interface Book {
  isbn: string
  coverUrl: string
  title: string
  abstract: string
  url: string
}
interface Books {
  read: Book[]
  unread: Book[]
}
type Cursor = 'read' | 'unread'
type NavItem = { key: Cursor; text: string }[]

const navItem: NavItem = [
  { key: 'read', text: '已读' },
  { key: 'unread', text: '未读' },
]

const books: Books = reactive({
  read: [],
  unread: [],
})
ref: cursor = 'read' as Cursor

function switchGroup(val: Cursor) {
  cursor = val
}

async function getBooks() {
  try {
    const { data } = await axios.get('/books')
    books.read = data.read
    books.unread = data.unread
  } catch (err) {
    error(err)
  }
}

onMounted(getBooks)
</script>

<style scoped>
.booklist {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  padding: 10px;
  background-color: var(--blog-bgcolor);
}

.nav-item {
  cursor: pointer;
  height: 100%;
  width: 50%;
  padding-bottom: 5px;
  text-align: center;
  font-size: large;
  border-bottom: 2px solid transparent;
  display: inline-block;
  position: relative;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 51%;
  right: 51%;
  bottom: 0;
  background-color: var(--primary-color);
  height: 2px;
  transition-property: left, right;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}

.nav-item:hover::before {
  left: 0;
  right: 0;
}

.active-item::before {
  left: 0;
  right: 0;
}

.main {
  overflow: hidden scroll;
  padding: 30px;
}

.book {
  display: flex;
  column-gap: 20px;
  margin-bottom: 20px;
}

.book-cover {
  width: 150px;
}

.to-douban {
  color: var(--dark-gray);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  transition: transform 0.25s ease;
}

.to-douban::before {
  pointer-events: none;
  content: '→';
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  transform: translateX(-1.5em);
  transition-property: transform, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease;
}

.to-douban:hover {
  color: var(--primary-color);
  text-decoration: underline;
  transform: translateX(1em);
}

.to-douban:hover::before {
  transform: translateX(-1em);
  opacity: 1;
}

@media (max-width: 1024px) {
  .book-cover {
    width: 100px;
  }

  .book {
    font-size: small;
  }
}
</style>
