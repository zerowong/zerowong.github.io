<template>
  <el-form
    class="login-register"
    :model="login"
    :rules="loginRules"
    ref="login"
    label-position="top"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="邮箱" prop="mail">
      <el-input class="input" v-model="login.mail"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input class="input" v-model="login.pass" show-password></el-input>
    </el-form-item>
    <el-form-item class="submit">
      <el-button type="primary" native-type="submit" @submit="onSubmit" :loading="loginLoading"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from '../../utils/axios'

export default {
  name: 'Login',
  data: () => ({
    login: {
      mail: '',
      pass: '',
    },
    loginRules: {
      mail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
      pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    },
    loginLoading: false,
  }),
  computed: { ...mapState(['errorMsg']) },
  methods: {
    ...mapActions(['getUser']),
    onSubmit() {
      this.$refs.login.validate((valid) => {
        if (!valid) {
          return false
        }
        return this.handleLogin()
      })
    },
    async handleLogin() {
      this.loginLoading = true
      try {
        const { data } = await axios.post('/login', this.login)
        this.getUser()
        this.$store.commit('updateWindow', { name: 'lr', val: false })
        this.$notification.success(data.message)
      } catch (err) {
        this.$notification.error(err.response?.data ?? this.errorMsg.networkError)
      }
      this.loginLoading = false
    },
  },
}
</script>
