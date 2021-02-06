<template>
  <div class="container">
    <el-avatar class="avatar" :src="user.avatar" :size="120">{{ user.name[0] }}</el-avatar>
    <el-card class="name-card">
      <span class="name">{{ user.name }}</span>
    </el-card>
    <el-card class="profile-card" v-for="(item, index) in list" :key="index">
      <span>{{ item.name }}</span>
      <span>{{ item.value }}</span>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from '../../utils/filters'

export default {
  name: 'User',
  computed: {
    ...mapState(['user']),
    list() {
      return [
        { name: '邮箱', value: this.user.mail },
        {
          name: '注册于',
          value: date(this.user.createdAt),
        },
      ]
    },
  },
  methods: { ...mapActions(['getUser']) },
  mounted() {
    this.getUser()
  },
}
</script>

<style scoped>
.container {
  height: 100%;
}

.name-card,
.profile-card {
  background-color: inherit;
  color: inherit;
  border: unset;
  box-shadow: 0 0 12px 8px rgba(0, 0, 0, 0.1);
}

.name-card {
  margin: 80px 20px 20px 20px;
  padding-top: 60px;
  display: flex;
  justify-content: center;
}

.avatar {
  position: absolute;
  top: 60px;
  left: calc(50% - 60px);
  display: block;
  font-size: 5rem;
  cursor: pointer;
}

.avatar:hover {
  opacity: 0.5;
}

.name {
  font-size: xx-large;
}

.profile-card {
  margin: 0 20px 20px 20px;
}
</style>

<style>
.profile-card .el-card__body {
  display: flex;
  justify-content: space-between;
}
</style>
