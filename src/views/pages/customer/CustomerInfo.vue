<template>
  <div class="app-container">
    <div class="container-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="客户信息" name='customerBaseInfo'>
          <customer-base-info></customer-base-info>
        </el-tab-pane>
        <el-tab-pane label="KP信息" name='customerKp'>
          <customer-kp></customer-kp>
        </el-tab-pane>
        <el-tab-pane label="合同信息" name='customerContract'>
          <customer-contract></customer-contract>
        </el-tab-pane>
        <el-tab-pane label="结算信息" name='customerSettle'>
          <customer-settle></customer-settle>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { CustomerBaseInfo, CustomerKp, CustomerContract, CustomerSettle } from './components'
export default {
  components: {
    CustomerBaseInfo,
    CustomerKp,
    CustomerContract,
    CustomerSettle
  },
  created () {
  },
  data () {
    return {
      activeName: 'customerBaseInfo',
      customerId: 0
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
