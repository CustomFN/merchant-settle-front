<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" ></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div>
        <i class="el-icon-setting" style="margin-right: 10px"></i>
        <span>{{ userName }}</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Hamburger from '@/components/Hamburger/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      this.userName = user.userName
    }
  },
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    logout () {
      let self = this
      self.$axios.post('/api/logout', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response.data)
        const _data = response.data
        if (_data.code === 200) {
          self.$cookies.remove('user')
          self.$router.push('/login')
        } else {
          alert(_data.msg)
        }
      }).catch(function (err) {
        if (err.response) {
          console.log(err.response)
        }
      })
      // this.$cookies.remove('user')
      // this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
