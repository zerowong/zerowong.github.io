<template>
  <div class="container">
    <el-button
      class="to-register"
      type="text"
      icon="el-icon-right"
      v-if="isLogin"
      @click="switchLoginRegister"
      >注册</el-button
    >
    <el-button class="to-login" type="text" icon="el-icon-back" v-else @click="switchLoginRegister"
      >登录</el-button
    >
    <div class="form">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  name: 'LoginRegister',
  components: {
    Login,
    Register,
  },
  data: () => ({ isLogin: true }),
  computed: {
    currentComponent() {
      return this.isLogin ? this.$options.components.Login : this.$options.components.Register
    },
  },
  methods: {
    switchLoginRegister() {
      this.isLogin = !this.isLogin
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
}

.to-register {
  position: absolute;
  right: 10px;
  font-size: 25px;
}

.to-login {
  position: absolute;
  left: 10px;
  font-size: 25px;
}

.form {
  display: flex;
  justify-content: center;
  padding: 70px 0;
}

.login-register {
  width: 70%;
}
</style>

<style>
.submit {
  margin-top: 50px;
}

.submit .el-button {
  width: 100%;
}

.el-form-item__label {
  color: inherit;
}

.el-input__inner {
  background-color: var(--input-bgcolor);
  border-color: var(--input-bgcolor);
  color: inherit;
}

.el-input__inner:hover,
.el-input__inner:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(4, 120, 190, 0.1);
}

.el-input .el-input__clear {
  color: var(--blog-color);
}
</style>
