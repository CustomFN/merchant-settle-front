<template>
  <div class="app-container">
    <div class="container-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="客户信息" name="1">
          <customer-base-info :customerId="customerId"></customer-base-info>
        </el-tab-pane>
        <el-tab-pane label="KP信息" name="2">
          <customer-kp></customer-kp>
        </el-tab-pane>
        <el-tab-pane label="合同信息" name="3">
          <customer-contract></customer-contract>
        </el-tab-pane>
        <el-tab-pane label="结算信息" name="4">
          <customer-settle></customer-settle>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Bus from './bus.js'
import { CustomerBaseInfo, CustomerKp, CustomerContract, CustomerSettle } from './components'
export default {
  components: {
    CustomerBaseInfo,
    CustomerKp,
    CustomerContract,
    CustomerSettle
  },
  mounted () {
    let self = this
    Bus.$on('customerId', (data) => {
      console.log(data)
    })
  },
  data () {
    return {
      activeName: '1',
      customerId: ''
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
