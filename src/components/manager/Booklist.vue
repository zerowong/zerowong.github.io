<template>
  <div class="booklist">
    <main>
      <span v-for="book in bookExisted.read" :key="book.isbn" v-text="book.title"></span>
      <span v-for="book in books.read" :key="book.isbn">
        <span v-text="book.title"></span>
        <i class="el-icon-delete" @click="remove(book, true)"></i>
      </span>
      <input type="text" v-model="inputRead" placeholder="isbn" />
      <button @click="add(true)">新增已读</button>
    </main>
    <main>
      <span v-for="book in bookExisted.unread" :key="book.isbn" v-text="book.title"></span>
      <span v-for="book in books.unread" :key="book.isbn">
        <span v-text="book.title"></span>
        <i class="el-icon-delete" @click="remove(book, false)"></i>
      </span>
      <input type="text" v-model="inputUnread" placeholder="isbn" />
      <button @click="add(false)">新增未读</button>
    </main>
    <nav class="operation">
      <button @click="save">保存</button>
      <button @click="restore">恢复</button>
      <button @click="clear">清除缓存</button>
      <button @click="getBooks">刷新</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BooklistManager',
  data: () => ({
    books: {
      read: [],
      unread: [],
    },
    bookExisted: {
      read: [],
      unread: [],
    },
    inputRead: '',
    inputUnread: '',
    baseUrl:
      process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://api.apasser.xyz',
  }),
  methods: {
    async add(isRead) {
      try {
        // https://github.com/qiaohaoforever/DoubanBook
        const response = await fetch(
          `https://book.feelyou.top/isbn/${isRead ? this.inputRead : this.inputUnread}`
        )
        if (response.ok) {
          const data = await response.json()
          data.cover_url = data.cover_url.replace('/l', '/s')
          data.cover_url = data.cover_url.replace('/m', '/s')
          const book = {
            isbn: data.isbn,
            title: data.title,
            abstract: data.abstract,
            coverUrl: data.cover_url,
            url: data.url,
            isRead,
          }
          const arrName = isRead ? 'read' : 'unread'
          this.books[arrName].push(book)
          sessionStorage.setItem(`${arrName}_books`, JSON.stringify(this.books[arrName]))
          this.inputRead = ''
          this.inputUnread = ''
        } else {
          throw new Error(response.statusText)
        }
      } catch (err) {
        this.$notification.error(err)
      }
    },
    remove(book, isRead) {
      const arrName = isRead ? 'read' : 'unread'
      const index = this.books[arrName].indexOf(book)
      if (index !== -1) {
        this.books[arrName].splice(index, 1)
      }
    },
    async save() {
      if (this.books.read.length === 0 && this.books.unread.length === 0) {
        this.$notification.info('没有新增')
        return
      }
      for (let i = 0; i < this.books.read.length; i++) {
        const { coverUrl } = this.books.read[i]
        const index = coverUrl.lastIndexOf('/')
        this.books.read[i].coverUrl = `https://cdn.apasser.xyz/blog/books${coverUrl.substring(
          index
        )}`
      }
      for (let i = 0; i < this.books.unread.length; i++) {
        const { coverUrl } = this.books.unread[i]
        const index = coverUrl.lastIndexOf('/')
        this.books.unread[i].coverUrl = `https://cdn.apasser.xyz/blog/books${coverUrl.substring(
          index
        )}`
      }
      const response = await fetch(`${this.baseUrl}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(this.books),
        credentials: 'include',
        keepalive: true,
      })
      if (response.ok) {
        this.$notification.success('保存成功')
      } else {
        this.$notification.error('保存失败')
      }
    },
    restore() {
      this.books.read = JSON.parse(sessionStorage.getItem('read_books')) || []
      this.books.unread = JSON.parse(sessionStorage.getItem('unread_books')) || []
    },
    clear() {
      sessionStorage.clear()
    },
    async getBooks() {
      try {
        const response = await fetch(`${this.baseUrl}/books`)
        if (response.ok) {
          const data = await response.json()
          this.bookExisted.read = data.read
          this.bookExisted.unread = data.unread
        } else {
          throw new Error(response.statusText)
        }
      } catch (err) {
        this.$notification.error(err)
      }
    },
  },
  mounted() {
    this.getBooks()
  },
}
</script>

<style scoped>
.booklist {
  display: flex;
  padding: 20px;
}

.booklist > main {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
}

.el-icon-delete {
  margin-left: 10px;
  cursor: pointer;
}

.el-icon-delete:hover {
  color: var(--primary-color);
}

.operation {
  width: 10%;
  display: flex;
  flex-direction: column;
}

button {
  cursor: pointer;
  width: 100px;
  height: 30px;
}
</style>
