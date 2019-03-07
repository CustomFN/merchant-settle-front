<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tab-pane label="图片审核">
          </el-tab-pane>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width:241px">
              <el-table-column prop="customerId" label="客户ID" width="120px"></el-table-column>
              <el-table-column prop="settleId" label="结算ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="settleAccType" label="结算账户类型" width="180px"></el-table-column>
              <el-table-column prop="settleAccName" label="结算账户开户名" width="180px"></el-table-column>
              <el-table-column prop="settleAccNo" label="结算账号" ></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="bankName" label="银行"></el-table-column>
              <el-table-column prop="reservePhoneNum" label="预留手机号" width="180"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="financialOfficer" label="财务负责人" width="120"></el-table-column>
              <el-table-column prop="financialOfficerPhone" label="财务负责人手机号" width="180"></el-table-column>
              <el-table-column prop="financialOfficerCertificatesType" label="财务负责人证件类型" width="180"></el-table-column>
              <el-table-column prop="financialOfficerCertificatesNum" label="财务负责人证件号码"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="settleType" label="结算方式"></el-table-column>
              <el-table-column prop="settleCycle" label="结算周期"></el-table-column>
              <el-table-column prop="settleMinAmount" label="最低结算金额/元"></el-table-column>
            </el-table>
            <div class="container-right-bottom">
              <div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
              <div class="container-right-bottom-btn">
                <el-button type="primary">审核通过</el-button>
                <el-button type="danger">审核驳回</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: '',
      tableData: [{
        customerId: '1',
        settleId: '1',
        settleAccType: '对公',
        settleAccName: '全渠道',
        settleAccNo: '66666666666',
        bankName: '北京市-朝阳区-中国建设银行',
        reservePhoneNum: '12345678900',
        financialOfficer: '朱家琨',
        financialOfficerPhone: '12345678900',
        financialOfficerCertificatesType: '中国居民身份证',
        financialOfficerCertificatesNum: '4521111111111',
        settleType: '系统自动结算',
        settleCycle: '3天',
        settleMinAmount: '10.0'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-left, .container-right {
  text-align: left;
  margin-left: 30px;
  padding: 0%;
  .audit-pic {
    width: 480px
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
}

</style>
