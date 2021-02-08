<template>
  <div class="container">
    <main>
      <div class="list">
        <span v-for="book in savedBooks.read" :key="book.isbn">
          <span v-text="book.title"></span>
          <i class="el-icon-delete" @click="remove(book)"></i>
        </span>
        <span v-for="book in newBooks.read" :key="book.isbn">
          <span v-text="book.title"></span>
          <i class="el-icon-delete" @click="remove(book)"></i>
        </span>
      </div>
      <div class="list-operation">
        <input type="text" v-model="inputRead" placeholder="isbn" />
        <button class="btn" @click="add(true)">
          新增已读<i class="el-icon-loading" v-if="fetching"></i>
        </button>
      </div>
    </main>
    <main>
      <div class="list">
        <span v-for="book in savedBooks.unread" :key="book.isbn">
          <span v-text="book.title"></span>
          <i class="el-icon-delete" @click="remove(book)"></i>
          <i class="text-btn" @click="changeStatus(book)">已读</i>
        </span>
        <span v-for="book in newBooks.unread" :key="book.isbn">
          <span v-text="book.title"></span>
          <i class="el-icon-delete" @click="remove(book)"></i>
          <i class="text-btn" @click="changeStatus(book)">已读</i>
        </span>
      </div>
      <div class="list-operation">
        <input type="text" v-model="inputUnread" placeholder="isbn" />
        <button class="btn" @click="add(false)">
          新增未读<i class="el-icon-loading" v-if="fetching"></i>
        </button>
      </div>
    </main>
    <nav class="operation">
      <button class="btn" @click="save">保存</button>
      <button class="btn" @click="restore">恢复新增</button>
      <button class="btn" @click="clear">清除缓存</button>
      <button class="btn" @click="refresh">刷新</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BooklistManager',
  data: () => ({
    newBooks: {
      read: [],
      unread: [],
    },
    savedBooks: {
      read: [],
      unread: [],
    },
    inputRead: '',
    inputUnread: '',
    baseUrl:
      process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : 'https://api.apasser.xyz',
    modified: {
      update: [],
      delete: [],
    },
    fetching: false,
  }),
  methods: {
    async add(isRead) {
      this.fetching = true
      try {
        const input = isRead ? this.inputRead : this.inputUnread
        // https://github.com/qiaohaoforever/DoubanBook
        const response = await fetch(`https://book.feelyou.top/isbn/${input}`)
        if (response.ok) {
          const data = await response.json()
          const index = data.cover_url.lastIndexOf('/')
          data.cover_url = `https://cdn.apasser.xyz/blog/books${data.cover_url.substring(index)}`
          const book = {
            isbn: data.isbn,
            title: data.title,
            abstract: data.abstract,
            coverUrl: data.cover_url,
            url: data.url,
            isRead,
          }
          const arrName = isRead ? 'read' : 'unread'
          this.newBooks[arrName].push(book)
          sessionStorage.setItem(`${arrName}_books`, JSON.stringify(this.newBooks[arrName]))
          this.inputRead = ''
          this.inputUnread = ''
        } else {
          throw new Error(response.statusText)
        }
      } catch (err) {
        this.$notification.error(err)
      }
      this.fetching = false
    },
    remove(book) {
      const books = book._id ? this.savedBooks : this.newBooks
      const arrName = book.isRead ? 'read' : 'unread'
      const index = books[arrName].indexOf(book)
      if (index !== -1) {
        books[arrName].splice(index, 1)
        if (book._id) {
          this.modified.delete.push(book._id)
        }
      }
    },
    async save() {
      const response = await fetch(`${this.baseUrl}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ newBooks: this.newBooks, modified: this.modified }),
        credentials: 'include',
      })
      if (response.ok) {
        this.$notification.success('保存成功')
        this.modified = { update: [], delete: [] }
      } else {
        this.$notification.error('保存失败')
      }
    },
    restore() {
      this.newBooks.read = JSON.parse(sessionStorage.getItem('read_books')) || []
      this.newBooks.unread = JSON.parse(sessionStorage.getItem('unread_books')) || []
    },
    clear() {
      sessionStorage.clear()
    },
    async getBooks() {
      try {
        const response = await fetch(`${this.baseUrl}/books`)
        if (response.ok) {
          const data = await response.json()
          this.savedBooks = data
        } else {
          throw new Error(response.statusText)
        }
      } catch (err) {
        this.$notification.error(err)
      }
    },
    changeStatus(book) {
      const books = book._id ? this.savedBooks : this.newBooks
      const index = books.unread.indexOf(book)
      if (index !== -1) {
        book.isRead = true
        books.unread.splice(index, 1)
        books.read.push(book)
        if (book._id) {
          this.modified.update.push(book._id)
        }
      }
    },
    refresh() {
      this.getBooks()
      this.modified = { delete: [], update: [] }
    },
  },
  mounted() {
    this.getBooks()
  },
}
</script>

<style scoped>
.container {
  display: flex;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  justify-content: space-around;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  height: 95%;
  overflow-y: scroll;
}

.list-operation {
  display: flex;
  justify-content: center;
}

.el-icon-delete,
.text-btn {
  margin-left: 10px;
  cursor: pointer;
  font-style: normal;
  color: gray;
}

.el-icon-delete:hover,
.text-btn:hover {
  color: var(--primary-color);
}

.operation {
  display: flex;
  flex-direction: column;
}

.btn {
  cursor: pointer;
  width: 100px;
  height: 30px;
}
</style>
