<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="SidebarTop"></div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  }
}
</script>

<style lang="scss" scoped>
.SidebarTop {
  background-color: #304156;
  color: #bfcbd9;
  height: 6%;
  line-height: 50px;
}
</style>
