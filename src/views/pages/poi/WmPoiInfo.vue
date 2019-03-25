<template>
  <div class="app-container">
    <div class="container-wrapper">
      <el-tabs v-model="activeName"  type="card">
        <el-tab-pane label="基本信息" name="1">
          <wm-poi-base-info></wm-poi-base-info>
        </el-tab-pane>
        <el-tab-pane label="资质信息" name="2">
          <wm-poi-qua></wm-poi-qua>
        </el-tab-pane>
        <el-tab-pane label="配送信息" name="3">
          <wm-poi-delivery-info></wm-poi-delivery-info>
        </el-tab-pane>
        <el-tab-pane label="结算信息" name="4">
          <wm-poi-settle-info></wm-poi-settle-info>
        </el-tab-pane>
        <el-tab-pane label="营业信息" name="5">
          <wm-poi-business-info></wm-poi-business-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { WmPoiBaseInfo, WmPoiQua, WmPoiDeliveryInfo, WmPoiSettleInfo, WmPoiBusinessInfo } from './components'

export default {
  components: {
    WmPoiBaseInfo,
    WmPoiQua,
    WmPoiDeliveryInfo,
    WmPoiSettleInfo,
    WmPoiBusinessInfo
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    }
  },
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.container-wrapper {
  margin: 20px;
  .container-wrapper-header {
    float: right;
  }
}
</style>
