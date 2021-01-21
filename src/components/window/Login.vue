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
import { Message } from 'element-ui'
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
  computed: {
    ...mapState(['errorMsg']),
  },
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
        const { status } = await axios.post('/login', this.login, {
          validateStatus(_status) {
            return _status >= 200 && _status < 500
          },
        })
        switch (status) {
          case 200:
            this.getUser()
            this.$store.commit('updateWindow', { name: 'lr', val: false })
            Message.success(this.errorMsg.loginSuccess)
            break
          case 400:
            Message.info(this.errorMsg.userNotExits)
            break
          case 401:
            Message.info(this.errorMsg.badPass)
            break
          default:
            break
        }
      } catch (e) {
        Message.error(this.errorMsg.server)
      }
      this.loginLoading = false
    },
  },
}
</script>
