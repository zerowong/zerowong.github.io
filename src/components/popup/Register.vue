<template>
  <el-form :model="register" :rules="rules" ref="root" label-position="top" @submit.prevent="onSubmit">
    <el-form-item label="邮箱" prop="mail">
      <el-input v-model="register.mail"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input v-model="register.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="register.pass" show-password></el-input>
    </el-form-item>
    <el-button class="submit" type="primary" native-type="submit" @submit="onSubmit" :loading="loading"
      >注册</el-button
    >
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, inject } from 'vue'
import { useStore } from '../../store'
import { axios } from '../../utils'
import { notify, error } from '../../utils/'

const store = useStore()
const closePopup = inject<() => void>('closePopup')

const checkPass = (rule: any, value: any, callback: (err?: Error) => void) => {
  if (!/^[\w<>?,./+=_-~!@#$%^&*]{6,20}$/.test(value)) {
    callback(new Error('必须为6到20位的大小写字母、数字或特殊符号(<>?,./+=_-~!@#$%^&*)的组合'))
  } else {
    callback()
  }
}
const rules = {
  mail: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 1, max: 20, message: '昵称长度须在1到20个字符之间', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: checkPass, trigger: 'blur' },
  ],
}

const register = reactive({
  mail: '',
  name: '',
  pass: '',
})
ref: loading = false
ref: root = null as any

function onSubmit() {
  root.validate((valid: boolean) => {
    if (!valid) return false
    return onCaptcha()
  })
}

function onCaptcha() {
  // @ts-ignore
  const captcha = new TencentCaptcha('2054543757', (res) => {
    if (res.ret === 0) {
      loading = true
      axios
        .post('/register', {
          Ticket: res.ticket,
          Randstr: res.randstr,
          register: register,
        })
        .then((res) => {
          store.dispatch('getUser')
          closePopup?.()
          notify.success(res.data.message)
        }, error)
      loading = false
    }
  })
  captcha.show()
}
</script>
