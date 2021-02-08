<template>
  <el-form
    class="login-register"
    :model="register"
    :rules="registerRules"
    ref="register"
    label-position="top"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="邮箱" prop="mail">
      <el-input class="input" v-model="register.mail"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input class="input" v-model="register.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input class="input" v-model="register.pass" show-password></el-input>
    </el-form-item>
    <el-form-item class="submit">
      <el-button type="primary" native-type="submit" @submit="onSubmit" :loading="registerLodaing"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data: () => {
    const checkPass = (rule, value, callback) => {
      if (!/^[\w<>?,./+=_-~!@#$%^&*]{6,20}$/.test(value)) {
        callback(new Error('必须为6到20位的大小写字母、数字或特殊符号(<>?,./+=_-~!@#$%^&*)的组合'))
      }
      callback()
    }
    return {
      register: {
        mail: '',
        name: '',
        pass: '',
      },
      registerRules: {
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
      },
      registerLodaing: false,
    }
  },
  methods: {
    ...mapActions(['getUser']),
    onSubmit() {
      this.$refs.register.validate((valid) => {
        if (!valid) {
          return false
        }
        return this.onCaptcha()
      })
    },
    onCaptcha() {
      // eslint-disable-next-line no-undef
      const captcha = new TencentCaptcha('2054543757', async (res) => {
        if (res.ret === 0) {
          this.registerLodaing = true
          try {
            const { data } = await this.$axios.post('/register', {
              Ticket: res.ticket,
              Randstr: res.randstr,
              register: this.register,
            })
            this.getUser()
            this.$store.commit('updateWindow', { name: 'lr', val: false })
            this.$notification.success(data.message)
          } catch (err) {
            this.$throw(err)
          }
          this.registerLodaing = false
        }
      })
      captcha.show()
    },
  },
}
</script>
