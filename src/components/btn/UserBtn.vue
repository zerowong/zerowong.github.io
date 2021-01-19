<template>
  <el-avatar class="avatar" :src="user.avatar" :size="32">{{ user.name[0] }}</el-avatar>
</template>

<script>
export default {
  name: 'UserBtn',
  data: () => ({
    user: {
      name: '',
      avatar: '',
    },
  }),
}
</script>

<style scoped>
.avatar {
  display: block;
  font-size: 2rem;
  cursor: pointer;
}

.avatar:hover {
  transform: scale(1.5);
}
</style>
