<template>
  <div class="app-container">
    <div class="container-core">
      <el-form label-width="150px"  :model="submitForm" size="medium">
        <el-form-item label="账户类型">
          <el-radio-group v-model="submitForm.settleAccType">
            <el-radio :label="1" value=1>对公</el-radio>
            <el-radio :label="2" value=2>对私</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户名">
          <el-input v-model="submitForm.settleAccName"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <div class="block">
            <el-select v-model="submitForm.province" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="submitForm.city" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="submitForm.bankId" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="submitForm.branchId" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="submitForm.settleAccNo"></el-input>
        </el-form-item>
        <el-form-item label="开户证件类型">
          <el-select v-model="submitForm.financialOfficerCertificatesType" placeholder="请选择">
            <el-option v-for="item in certificatesTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号">
          <el-input v-model="submitForm.financialOfficerCertificatesNum"></el-input>
        </el-form-item>
        <el-form-item label="银行预留手机号">
          <el-input v-model="submitForm.reservePhoneNum"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="submitForm.financialOfficer"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人手机号">
          <el-input v-model="submitForm.financialOfficerPhone"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-radio-group v-model="submitForm.settleType">
            <el-radio :label="1" value=1>系统自动结算</el-radio>
            <el-radio :label="2" value=2>商家自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-radio-group v-model="submitForm.settleCycle">
            <el-radio :label="1" value=1>3天</el-radio>
            <el-radio :label="2" value=2>7天</el-radio>
            <el-radio :label="3" value=3>30天</el-radio>
            <el-radio :label="4" value=4>每月最后一天</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算金额/元">
          <el-input v-model="submitForm.settleMinAmount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer container-core-footer">
        <el-button type="primary">保存并提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WmPoiSettleInfo',
  data () {
    return {
      submitForm: {
        settleAccType: 1,
        settleAccName: '',
        settleAccNo: '',
        province: 1,
        city: 2,
        bankId: 2,
        branchId: 1,
        branchName: '',
        reservePhoneNum: '',
        financialOfficer: '',
        financialOfficerPhone: '',
        financialOfficerCertificatesType: 2,
        financialOfficerCertificatesNum: '',
        settleType: 1,
        settleCycle: 1,
        settleMinAmount: ''
      },
      options: [{
        value: 1,
        label: '黄金糕'
      }, {
        value: 2,
        label: '双皮奶'
      }],
      certificatesTypes: [{
        value: 1,
        label: '身份证'
      }, {
        value: 2,
        label: '港澳通行证'
      }]
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  float: left;
  .el-form {
    width: 600px
  }
  .container-core-footer {
    float: right;
  }
}

</style>
