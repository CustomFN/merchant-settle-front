<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">外卖供应链上单系统</h3>
      <el-form-item prop="userId">
        <span class="fontcontainer">
          <span class="iconfont icon-yonghu"></span>
        </span>

        <el-input
            v-model="loginForm.userId"
            name="userId"
            type="text"
            auto-complete="on"
            placeholder="userId" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="fontcontainer">
          <span class="iconfont icon-mima"></span>
        </span>

        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />

        <span class="show-pwd iconfont icon-yanjing" @click="showPwd"></span>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userId: 'admin',
        password: 'admin',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      let self = this
      self.$axios.post('/api/login', this.$qs.stringify(this.loginForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response.data)
        const _data = response.data
        if (_data.code === 200) {
          self.$cookies.set('user', _data.data)
          self.$router.push('/')
        } else {
          alert(_data.msg)
        }
      }).catch(function (err) {
        if (err.response) {
          console.log(err.response)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
  .fontcontainer{
    color:#889aa4;
    padding-left:10px;
  }
}
</style>
