<template>
  <div class="app-container">
    <div class="container-wrapper">
      <el-tabs v-model="activeName"  @tab-click="getTabData" type="card">
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
  data () {
    return {
      activeName: '1',
      isTab1: true,
      isTab2: false,
      isTab3: false,
      isTab4: false,
      isTab5: false
    }
  },
  methods: {
    getTabData (tab) {
      let self = this
      if (tab.name === '1') {
        self.isTab1 = true
        self.isTab2 = self.isTab3 = self.isTab4 = self.isTab5 = false
      } else if (tab.name === '2') {
        self.isTab2 = true
        self.isTab1 = self.isTab3 = self.isTab4 = self.isTab5 = false
      } else if (tab.name === '3') {
        self.isTab3 = true
        self.isTab1 = self.isTab2 = self.isTab4 = self.isTab5 = false
      } else if (tab.name === '4') {
        self.isTab4 = true
        self.isTab1 = self.isTab2 = self.isTab3 = self.isTab5 = false
      } else if (tab.name === '5') {
        self.isTab5 = true
        self.isTab1 = self.isTab2 = self.isTab3 = self.isTab4 = false
      }
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
