<template>
  <div class="container-core">
    <div>
      <el-button type="primary" @click="addSettle()">添加结算</el-button>
    </div>
    <div class="container-core-bottom">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="结算ID" width="100"></el-table-column>
        <el-table-column prop="financialOfficer" label="财务负责人" ></el-table-column>
        <el-table-column prop="settleAccName" label="开户名" ></el-table-column>
        <el-table-column prop="settleAccNo" label="账号"  ></el-table-column>
        <el-table-column prop="settlePoiRelNum" label="关联门店数" ></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="editSettle(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteSettle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--工具条-->
      <el-pagination layout="total, prev, pager, next"
                      background
                      :page-size="10"
                      @size-change="handleSizeChange"
                      :total="total"
                      @current-change="handleCurrentChange"
                      style="text-align:center;">
      </el-pagination>
    </div>

    <el-dialog title="结算信息" :visible.sync="isShowEditVisible">
      <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
      <div class="core-tag">
        <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
      </div>
      <el-form label-width="150px"  :model="submitForm" size="medium">
        <el-form-item label="账户类型">
          <el-radio-group v-model="submitForm.settleAccType" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>对公</el-radio>
            <el-radio :label="2" value=2>对私</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户名">
          <el-input v-model="submitForm.settleAccName" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <div class="block">
            <el-select v-model="submitForm.province" placeholder="请选择" @change="fetchCity" v-bind:disabled="editDisabled">
              <el-option v-for="item in provinces" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
            <el-select v-model="submitForm.city" placeholder="请选择" @change="fetchBank" v-bind:disabled="editDisabled">
              <el-option v-for="item in cities" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
            <el-select v-model="submitForm.bankId" placeholder="请选择" @change="fetchSubBank" v-bind:disabled="editDisabled">
              <el-option v-for="item in banks" :key="item.bankId" :label="item.bankName" :value="item.bankId"></el-option>
            </el-select>
            <el-select v-model="submitForm.branchId" placeholder="请选择" v-bind:disabled="editDisabled">
              <el-option v-for="item in branches" :key="item.subBankId" :label="item.subBankName" :value="item.subBankId"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="submitForm.settleAccNo" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="开户证件类型">
          <el-select v-model="submitForm.financialOfficerCertificatesType" v-bind:disabled="editDisabled">
            <el-option v-for="item in certificatesTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号">
          <el-input v-model="submitForm.financialOfficerCertificatesNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="银行预留手机号">
          <el-input v-model="submitForm.reservePhoneNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="submitForm.financialOfficer" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人手机号">
          <el-input v-model="submitForm.financialOfficerPhone" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-radio-group v-model="submitForm.settleType" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>系统自动结算</el-radio>
            <el-radio :label="2" value=2>商家自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-radio-group v-model="submitForm.settleCycle" v-bind:disabled="editDisabled">
            <el-radio :label="1" value=1>3天</el-radio>
            <el-radio :label="2" value=2>7天</el-radio>
            <el-radio :label="3" value=3>30天</el-radio>
            <el-radio :label="4" value=4>每月最后一天</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算金额/元">
          <el-input v-model="submitForm.settleMinAmount" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="关联门店ID">
          <el-input v-model="submitForm.wmPoiIds" placeholder="多门店ID以英文逗号,分隔" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
        <el-button @click="isShowEditVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'customerSettle',
  data () {
    return {
      customerId: 0,
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      isShowEditVisible: false,
      tempForm: {},
      submitForm: {
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
        financialOfficerCertificatesType: 1,
        financialOfficerCertificatesNum: '',
        settleType: 1,
        settleCycle: 1,
        settleMinAmount: '',
        wmPoiIds: '',
        statusStr: '',
        customerId: this.$store.state.customerId
      },
      searchParam: {
        customerId: 0,
        settleOrPoiId: '',
        effective: 0,
        pageNum: 1,
        pageSize: 10
      },
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
      }],
      editDisabled: false
    }
  },
  mounted  () {
    let user = this.$cookies.get('user')
    if (user != null) {
      this.tempForm = this.submitForm
      this.fetchProvinces()
      this.customerId = this.$store.state.customerId
      if (this.customerId > 0) {
        this.fetchData()
      }
    }
    
  },
  methods: {
    onSubmit () {
      let self = this
      this.$axios.post('/api/customer/settle/save', this.$qs.stringify(self.submitForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '保存成功',
            type: 'success'
          })
          self.submitForm = _data.data
          if (_data.data.status === 1) {
            self.editDisabled = true
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
    fetchData () {
      let self = this
      this.searchParam.customerId = this.$store.state.customerId
      this.$axios.post('/api/customer/settle/list', this.$qs.stringify(this.searchParam), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.tableData = _data.data.data
          self.pageNum = _data.data.pageNum
          self.pageSize = _data.data.pageSize
          self.total = _data.data.totalSize
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
    handleSizeChange (val) {
      this.page = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.fetchData()
    },
    editSettle (row) {
      let self = this
      let targetUrl = '/api/customer/settle/show/' + row.id
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm = _data.data
          if (_data.data.status === 1) {
            self.editDisabled = true
          }
          self.isShowEditVisible = true
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
    addSettle () {
      this.submitForm = this.tempForm
      this.isShowEditVisible = true
    },
    deleteSettle (row) {
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
.container-core {
  text-align: left;
  margin: 20px;
  .container-core-bottom {
    margin-top: 10px;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
}
.core-tag {
  text-align: right
}
</style>
