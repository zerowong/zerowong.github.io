<template>
  <el-form :model="login" :rules="rules" ref="root" label-position="top" @submit.prevent="onSubmit">
    <el-form-item label="邮箱" prop="mail">
      <el-input v-model="login.mail"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="login.pass" show-password></el-input>
    </el-form-item>
    <el-button class="submit" type="primary" native-type="submit" @submit="onSubmit" :loading="loading">
      登录
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, inject } from 'vue'
import { useStore } from '../../store'
import { axios } from '../../utils'
import { notify, error } from '../../utils/'

const store = useStore()
const closePopup = inject<() => void>('closePopup')

const rules = {
  mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const login = reactive({
  mail: '',
  pass: '',
})
ref: loading = false
ref: root = null as any

function onSubmit() {
  root.validate((valid: boolean) => {
    if (!valid) return false
    return handleLogin()
  })
}

function handleLogin() {
  loading = true
  axios.post('/login', login).then((res) => {
    store.dispatch('getUser')
    closePopup?.()
    notify.success(res.data.message)
  }, error)
  loading = false
}
</script>
