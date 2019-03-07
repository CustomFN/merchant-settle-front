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
          <el-button type="text">修改</el-button>
          <el-button type="text">删除</el-button>
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

    <el-dialog title="合同信息" :visible.sync="isShowEditVisible">
      <el-form label-width="150px"  :model="submitForm" size="medium">
        <el-form-item label="账户类型">
          <el-radio-group v-model="submitForm.settleAccType">
            <el-radio :label="1" value='1'>对公</el-radio>
            <el-radio :label="2" value='2'>对私</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户名">
          <el-input v-model="submitForm.settleAccName"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <div class="block">
            <el-cascader :options="options" v-model="submitForm.province"></el-cascader>
            <el-cascader :options="options" v-model="submitForm.city"></el-cascader>
            <el-cascader :options="options" v-model="submitForm.bankId"></el-cascader>
            <el-cascader :options="options" v-model="submitForm.branchId"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="submitForm.settleAccNo"></el-input>
        </el-form-item>
        <el-form-item label="开户证件类型">
          <el-select v-model="submitForm.financialOfficerCertificatesType">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="港澳通行证" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件编号">
          <el-input v-model="submitForm.financialOfficerCertificatesNum"></el-input>
        </el-form-item>
        <el-form-item label="银行预留手机号">
          <el-input v-model="submitForm.reservePhoneNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="submitForm.financialOfficer"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人手机号">
          <el-input v-model="submitForm.financialOfficerPhone"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-radio-group v-model="submitForm.settleType">
            <el-radio :label="1" value='1'>系统自动结算</el-radio>
            <el-radio :label="2" value='2'>商家自提</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-radio-group v-model="submitForm.settleCycle">
            <el-radio :label="1" value='1'>3天</el-radio>
            <el-radio :label="2" value='2'>7天</el-radio>
            <el-radio :label="3" value='3'>30天</el-radio>
            <el-radio :label="4" value='4'>每月最后一天</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最低结算金额/元">
          <el-input v-model="submitForm.settleMinAmount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  class="title1">保存并提交</el-button>
        <el-button @click="isShowEditVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CustomerSettle',
  data () {
    return {
      tableData: [{
        id: 1,
        financialOfficer: '财务负责人1',
        settleAccName: '全渠道',
        settleAccNo: '622222222222',
        settlePoiRelNum: '1'
      }, {
        id: 2,
        financialOfficer: '财务负责人2',
        settleAccName: '全渠道',
        settleAccNo: '622222222222',
        settlePoiRelNum: '2'
      }, {
        id: 3,
        financialOfficer: '财务负责人3',
        settleAccName: '全渠道',
        settleAccNo: '622222222222',
        settlePoiRelNum: '3'
      }],
      total: 0,
      page: 1,
      pageSize: 10,
      isShowEditVisible: false,
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
        financialOfficerCertificatesType: '',
        financialOfficerCertificatesNum: '',
        settleType: 1,
        settleCycle: 1,
        settleMinAmount: ''
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }]
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSizeChange (val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    currentChangePage (list) {
      let from = (this.page - 1) * this.pageSize
      const to = this.page * this.pageSize
      this.tableList = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableList.push(list[from])
        }
      }
    },
    addSettle () {
      this.isShowEditVisible = true
    },
    handleChange (value) {
      console.log(value)
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
</style>
