<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="客户ID" v-model="searchParam.customerId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="合同ID" v-model="searchParam.contractId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="合同编号" v-model="searchParam.contractNum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card container-footer">
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="contractId" label="合同ID" width="100"></el-table-column>
          <el-table-column prop="contractNum" label="合同编号" width="200"></el-table-column>
          <el-table-column prop="partyAName" label="甲方名称" width="250"></el-table-column>
          <el-table-column prop="partyASignerName" label="甲方签约人" width="120"></el-table-column>
          <el-table-column prop="partyBSignerName" label="乙方签约人" width="120"></el-table-column>
          <el-table-column prop="principal" label="合同责任人" width="150"></el-table-column>
          <el-table-column prop="auditStatus" label="合同状态" width="100"></el-table-column>
          <el-table-column prop="signerTime" label="签约时间" width="120"></el-table-column>
          <el-table-column prop="contractValidTime" label="合同有效期" width="120"></el-table-column>
          <el-table-column prop="contractType" label="合同类型" width="120"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" @click="handleShowView()">查看</el-button>
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
    </el-card>

    <div class="contract-dialog">
      <el-dialog title="合同信息" :visible.sync="isShowViewVisible">
        <el-form label-width="150px"  :model="showViewForm" size="medium">
          <el-form-item label="合同类型">
            <el-select v-model="showViewForm.customerContractType">
              <el-option label="商家与平台合同" value="1"></el-option>
              <el-option label="商家与代理商合同" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="showViewForm.customerContractNum"></el-input>
          </el-form-item>
          <el-form-item label="合同有效期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="showViewForm.contractEndTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="甲方">
            <el-input v-model="showViewForm.partyA.party" disabled></el-input>
          </el-form-item>
          <el-form-item label="甲方联系人">
            <el-input v-model="showViewForm.partyA.partyContactPerson"></el-input>
          </el-form-item>
          <el-form-item label="甲方联系人电话号码">
            <el-input v-model="showViewForm.partyA.partyContactPersonPhone"></el-input>
          </el-form-item>
          <el-form-item label="甲方签约时间">
            <el-input v-model="showViewForm.partyA.signTime"></el-input>
          </el-form-item>
          <el-form-item label="乙方">
            <el-input v-model="showViewForm.partyB.party" disabled></el-input>
          </el-form-item>
          <el-form-item label="乙方联系人">
            <el-input v-model="showViewForm.partyB.partyContactPerson"></el-input>
          </el-form-item>
          <el-form-item label="乙方联系人电话号码">
            <el-input v-model="showViewForm.partyB.partyContactPersonPhone"></el-input>
          </el-form-item>
          <el-form-item label="乙方签约时间">
            <el-input v-model="showViewForm.partyB.signTime"></el-input>
          </el-form-item>
          <el-form-item label="合同扫描件">
            <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="showViewForm.contractScan" :src="showViewForm.contractScan" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowViewVisible = false">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowViewVisible: false,
      searchParam: {
        customerId: '',
        contractId: '',
        contractNum: ''
      },
      tableData: [{
        contractId: 1,
        contractNum: 'WM-P-10000001',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人1',
        partyBSignerName: '乙方签约人1',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }, {
        contractId: 2,
        contractNum: 'WM-P-10000002',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人2',
        partyBSignerName: '乙方签约人2',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }, {
        contractId: 3,
        contractNum: 'WM-P-10000003',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人3',
        partyBSignerName: '乙方签约人3',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }],
      showViewForm: {
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
      },
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    handleShowView () {
      this.isShowViewVisible = true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container-footer {
  margin-top: 20px;
  .pagination {
    margin-top: 10px;
  }
}
.contract-dialog {
  text-align: left;
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
}
</style>
