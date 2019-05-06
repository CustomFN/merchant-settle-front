<template>
<div>
  <div class="header">
    <el-button type="text" @click="handleToCustomerSettle">前往客户结算页</el-button>
  </div>
  <div class="app-container">
    <div class="container-core">
      <el-tag v-if="showForm.statusStr" type="success">{{ showForm.statusStr }}</el-tag>
      <el-alert type="error" v-if="showForm.auditResult">{{ showForm.auditResult }}</el-alert>
      <el-form label-width="150px"  :model="showForm" size="medium">
        <el-form-item label="账户类型">
          <el-radio-group v-model="showForm.settleAccType" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>对公</el-radio>
            <el-radio :label="2" value=2>对私</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户名" v-bind:disabled="editDisabled">
          <el-input v-model="showForm.settleAccName"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <div class="block">
            <el-select v-model="showForm.province" placeholder="请选择" @change="fetchCity" v-bind:disabled="editDisabled">
              <el-option v-for="item in provinces" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
            <el-select v-model="showForm.city" placeholder="请选择" @change="fetchBank" v-bind:disabled="editDisabled">
              <el-option v-for="item in cities" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
            <el-select v-model="showForm.bankId" placeholder="请选择" @change="fetchSubBank" v-bind:disabled="editDisabled">
              <el-option v-for="item in banks" :key="item.bankId" :label="item.bankName" :value="item.bankId"></el-option>
            </el-select>
            <el-select v-model="showForm.branchId" placeholder="请选择" v-bind:disabled="editDisabled">
              <el-option v-for="item in branches" :key="item.subBankId" :label="item.subBankName" :value="item.subBankId"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="showForm.settleAccNo" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="开户证件类型">
          <el-select v-model="showForm.financialOfficerCertificatesType" placeholder="请选择" v-bind:disabled="editDisabled">
            <el-option v-for="item in certificatesTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号">
          <el-input v-model="showForm.financialOfficerCertificatesNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="银行预留手机号">
          <el-input v-model="showForm.reservePhoneNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="showForm.financialOfficer" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人手机号">
          <el-input v-model="showForm.financialOfficerPhone" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-radio-group v-model="showForm.settleType" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>系统自动结算</el-radio>
            <el-radio :label="2" value=2>商家自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-radio-group v-model="showForm.settleCycle" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>3天</el-radio>
            <el-radio :label="2" value=2>7天</el-radio>
            <el-radio :label="3" value=3>30天</el-radio>
            <el-radio :label="4" value=4>每月最后一天</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算金额/元">
          <el-input v-model="showForm.settleMinAmount" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'WmPoiSettleInfo',
  data () {
    return {
      showForm: {
        wmPoiId: this.$store.state.wmPoiId,
        settleAccType: 1,
        settleAccName: '',
        settleAccNo: '',
        province: '',
        city: '',
        bankId: '',
        branchId: '',
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
      editDisabled: false,
      provinces: [],
      cities: [],
      banks: [],
      branches: [],
      certificatesTypes: [{
        value: 1,
        label: '身份证'
      }, {
        value: 2,
        label: '港澳通行证'
      }]
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      this.fetchProvinces()
      if (this.showForm.wmPoiId != null && this.showForm.wmPoiId > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    fetchData () {
      let self = this
      let targetUrl = '/api/wmpoi/settle/show/' + this.showForm.wmPoiId
      this.$axios.post(targetUrl, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        console.log(_data)
        if (_data.code === 200) {
          if (_data.data != null) {
            self.showForm = _data.data
            if (_data.data.status === 1) {
              self.editDisabled = true
            }
          }
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleToCustomerSettle () {
      this.$router.push('/customer/customerinfo')
    },
    fetchProvinces () {
      let self = this
      this.$axios.post('/api/ui/getProvinces', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.provinces = _data.data
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    fetchCity (provinceId) {
      let self = this
      this.$axios.post('/api/ui/getCities', this.$qs.stringify({'provinceId': provinceId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.cities = _data.data
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    fetchBank (cityId) {
      let self = this
      this.$axios.post('/api/ui/getBanks', this.$qs.stringify({'cityId': cityId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.banks = _data.data
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    fetchSubBank (bankId) {
      let self = this
      this.$axios.post('/api/ui/getSubBanks', this.$qs.stringify({'bankId': bankId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.branches = _data.data
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
}
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
