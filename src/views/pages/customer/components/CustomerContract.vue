<template>
  <div class="container-core">
    <div>
      <el-button type="primary" @click="addPaperContract()">添加纸质合同</el-button>
      <el-button type="primary">添加电子合同</el-button>
    </div>
    <div class="container-core-bottom">
      <el-table :data="tableData" border>
        <el-table-column prop="contractId" label="合同ID" width="100"></el-table-column>
        <el-table-column prop="contractNum" label="合同编号" width="200"></el-table-column>
        <el-table-column prop="contractType" label="合同类型" width="120"></el-table-column>
        <el-table-column prop="partyAName" label="甲方"></el-table-column>
        <el-table-column prop="partyASignerName" label="甲方签约人" width="120"></el-table-column>
        <el-table-column prop="partyBSignerName" label="乙方签约人" width="120"></el-table-column>
        <el-table-column prop="contractValidTime" label="合同有效期" width="120"></el-table-column>
        <el-table-column prop="auditStatus" label="合同状态" width="100"></el-table-column>
        <el-table-column label="操作" width="150">
          <el-button type="text">修改合同</el-button>
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
        <el-form-item label="合同类型">
          <el-select v-model="submitForm.customerContractType">
            <el-option label="商家与平台合同" value="1"></el-option>
            <el-option label="商家与代理商合同" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="submitForm.customerContractNum"></el-input>
        </el-form-item>
        <el-form-item label="合同有效期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="submitForm.contractEndTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="甲方">
          <el-input v-model="submitForm.partyA.party" disabled></el-input>
        </el-form-item>
        <el-form-item label="甲方联系人">
          <el-input v-model="submitForm.partyA.partyContactPerson"></el-input>
        </el-form-item>
        <el-form-item label="甲方联系人电话号码">
          <el-input v-model="submitForm.partyA.partyContactPersonPhone"></el-input>
        </el-form-item>
        <el-form-item label="甲方签约时间">
          <el-input v-model="submitForm.partyA.signTime"></el-input>
        </el-form-item>
        <el-form-item label="乙方">
          <el-input v-model="submitForm.partyB.party" disabled></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人">
          <el-input v-model="submitForm.partyB.partyContactPerson"></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人电话号码">
          <el-input v-model="submitForm.partyB.partyContactPersonPhone"></el-input>
        </el-form-item>
        <el-form-item label="乙方签约时间">
          <el-input v-model="submitForm.partyB.signTime"></el-input>
        </el-form-item>
        <el-form-item label="合同扫描件">
          <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="submitForm.contractScan" :src="submitForm.contractScan" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: 'CustomerContract',
  data () {
    return {
      tableData: [{
        contractId: 1,
        contractNum: 'WM-P-10000001',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人1',
        partyBSignerName: '乙方签约人1',
        principal: '朱家琨',
        auditStatus: '审核中',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }],
      total: 0,
      page: 1,
      pageSize: 10,
      isShowEditVisible: false,
      submitForm: {
        customerContractType: '',
        customerContractNum: '',
        contractEndTime: '',
        contractScan: '',
        partyA: {
          party: '',
          partyContactPerson: '',
          partyContactPersonPhone: '',
          signTime: ''
        },
        partyB: {
          party: '',
          partyContactPerson: '',
          partyContactPersonPhone: '',
          signTime: ''
        }
      }
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
    addPaperContract () {
      this.isShowEditVisible = true
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
