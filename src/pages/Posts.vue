<template>
  <div class="posts">
    <popup class="list" title="Posts">
      <div
        class="list-inner"
        v-loading="postsLoading"
        element-loading-background="var(--global-bgcolor)"
        v-infinite-scroll="loadPosts"
        infinite-scroll-immediate="false"
        infinite-scroll-disabled="infiniteScrollDisable"
      >
        <div>
          <transition-group name="MTBFB">
            <el-card
              class="list-card"
              :class="{ 'list-card-active': cardsActive[index] }"
              v-for="(post, index) in posts"
              :key="index"
              @click="onClickListItem(index)"
              shadow="hover"
            >
              <h4 class="list-card-title">{{ post.title }}</h4>
              <div class="list-card-date">{{ date(post.date) }}</div>
            </el-card>
          </transition-group>
        </div>
        <div
          class="infinite-scroll-loading"
          v-loading="infiniteScrollLoading"
          element-loading-background="var(--global-bgcolor)"
        >
          <span class="no-more" v-show="noMore">没有更多了</span>
        </div>
      </div>
    </popup>
    <popup class="content" :title="currentPost.title" v-show="contentVisible">
      <div
        class="content-inner"
        v-loading="postsLoading"
        element-loading-background="var(--global-bgcolor)"
        ref="contentEl"
        @scroll="onScroll"
      >
        <div
          class="markdown-body"
          v-html="currentPost.content"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        ></div>
        <transition name="fadeIn">
          <el-button
            v-if="isMobile"
            v-show="backListVisible"
            class="back-btn"
            type="primary"
            icon="el-icon-back"
            @click="backToList"
            circle
          ></el-button>
        </transition>
        <transition name="fadeIn">
          <el-button
            class="back-top"
            type="primary"
            icon="el-icon-top"
            @click="backTop"
            v-show="backTopVisible"
            circle
          ></el-button>
        </transition>
      </div>
    </popup>
  </div>
</template>

<script lang="ts" setup>
import { reactive, inject, computed, onMounted, watch } from 'vue'
import { axios, error } from '../utils'
import { date } from '../utils/filters'
import Popup from '../components/Popup.vue'
import '../styles/github-markdown.css'

interface Post {
  title: string
  date: string
  content: string
}

const isMobile = inject<boolean>('isMobile')
let nextPage = 2

const posts: Post[] = reactive([])
const cardsActive: boolean[] = reactive([])
ref: currentPostIndex = 0
ref: postsLoading = false
ref: infiniteScrollLoading = false
ref: noMore = false
ref: currentPost = computed(() => {
  return posts.length !== 0 ? posts[currentPostIndex] : { title: '', content: '' }
})
ref: infiniteScrollDisable = computed(() => infiniteScrollLoading || noMore)
ref: contentEl = null as HTMLElement | null
// mobile
ref: contentVisible = true
ref: backListVisible = true
ref: backTopVisible = false

function updatePosts(data: any) {
  posts.push(...data)
  cardsActive.push(...Array(data.length).fill(false))
}

async function initPosts() {
  postsLoading = true
  try {
    const { data } = await axios.get('/posts?sort=date&page=1')
    updatePosts(data)
    if (data.length) {
      cardsActive[0] = true
    }
  } catch (err) {
    error(err)
  }
  postsLoading = false
}

async function loadPosts() {
  infiniteScrollLoading = true
  try {
    const { data } = await axios.get(`/posts?sort=date&page=${nextPage}`)
    if (!data.length) {
      noMore = true
      infiniteScrollLoading = false
      return
    }
    updatePosts(data)
    nextPage += 1
  } catch (err) {
    error(err)
  }
  infiniteScrollLoading = false
}

function onClickListItem(index: number) {
  currentPostIndex = index
  backTop()
  if (isMobile) {
    contentVisible = true
  }
}

function onScroll() {
  if (!contentEl) return
  if (contentEl.scrollTop / contentEl.scrollHeight > 0.2) {
    backTopVisible = true
  } else {
    backTopVisible = false
  }
}

function backTop() {
  contentEl?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// mobile
function backToList() {
  contentVisible = false
}

function onTouchMove() {
  backListVisible = false
}

function onTouchEnd() {
  backListVisible = true
}

watch($currentPostIndex, (val) => {
  cardsActive.fill(false)
  cardsActive[val] = true
})

onMounted(() => {
  initPosts()
  if (isMobile) {
    contentVisible = false
  }
})
</script>

<style scoped>
@import url('https://unpkg.com/@highlightjs/cdn-assets@10.6.0/styles/atom-one-dark.min.css');

.posts {
  display: flex;
  padding: 20px 40px;
  box-sizing: border-box;
  height: 100%;
  column-gap: 15px;
}

.list {
  width: 20%;
}

.content {
  width: calc(100% - 20% - 15px);
}

.list-inner,
.content-inner {
  height: 100%;
}

.list-inner {
  padding: 0 15px;
  overflow: hidden scroll;
}

.content-inner {
  box-sizing: border-box;
  padding: 45px;
  overflow: hidden scroll;
}

.list-card {
  background-color: inherit;
  color: inherit;
  border: unset;
  margin: 10px;
}

.list-card-active {
  background-color: var(--primary-color);
}

/* 处在active状态的card标题不变色 */
.list-card-active:hover .list-card-title {
  color: unset !important;
}

.list-card:hover {
  box-shadow: 0 2px 12px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.list-card:hover .list-card-title {
  color: var(--primary-color);
}

.list-card-title {
  margin: 0 0 5px 0;
  max-height: 3rem;
  overflow: hidden;
}

.list-card-date {
  opacity: 0.5;
  font-size: small;
}

.infinite-scroll-loading {
  height: 70px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-more {
  color: var(--dark-gray);
}

.back-btn {
  position: fixed;
  z-index: 2;
  bottom: 9vh;
  right: 7vw;
}

.back-top {
  position: fixed;
  z-index: 2;
  bottom: 5vh;
  right: 5vw;
}

:deep(.el-card) {
  background-color: inherit;
  color: var(--global-color);
  border: unset;
}

@media (max-width: 1024px) {
  .blog {
    display: block;
  }

  .list,
  .content {
    width: 90vw;
    height: calc(100vh - 90px);
    position: absolute;
    left: 5vw;
  }

  .content {
    z-index: 1;
  }

  .content-inner {
    padding: 10px;
  }

  .back-top {
    bottom: 2vh;
    right: 7vw;
  }
}
</style>
