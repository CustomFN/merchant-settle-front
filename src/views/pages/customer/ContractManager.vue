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
          <el-table-column label="合同状态" width="100">
            <template slot-scope="scope">
              <el-tag size="small" type="success">{{ scope.row.auditStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="signerTime" label="签约时间" width="120">
            <template slot-scope="scope">
              <p>{{ scope.row.signerTime | dateformat }}</p>
            </template>
          </el-table-column>
          <el-table-column label="合同有效期" width="120">
            <template slot-scope="scope">
              <p>{{ scope.row.contractValidTime | dateformat }}</p>
            </template>
          </el-table-column>
          <el-table-column label="合同类型" width="120">
            <template slot-scope="scope">
              <el-tag size="small" type="">{{ scope.row.contractType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleShowView(scope.row)">查看</el-button>
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
    </el-card>

    <div class="contract-dialog">
      <el-dialog title="合同信息" :visible.sync="isShowViewVisible">
        <el-form label-width="150px"  :model="showViewForm" size="medium">
          <el-form-item label="合同类型">
            <el-select v-model="showViewForm.customerContractType">
            <el-option v-for="item in customerContractTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <el-upload class="avatar-uploader"
              list-type="picture-card"
              :on-preview="handlePicCardPreview"
              :show-file-list="true"
              action=""
              :file-list="showViewForm.contractScanList"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="isShowPicDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
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
      dialogImageUrl: '',
      isShowPicDialogVisible: false,
      isShowViewVisible: false,
      searchParam: {
        customerId: '',
        contractId: '',
        contractNum: ''
      },
      tableData: [],
      showViewForm: {
        customerContractType: '',
        customerContractNum: '',
        contractEndTime: '',
        contractScanList: [],
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
      customerContractTypes: [{
        value: 1,
        label: '商家与平台合同'
      }, {
        value: 2,
        label: '商家与代理商合同'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let self = this
      this.$axios.post('/api/contract/list', this.$qs.stringify(this.searchParam), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
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
    handleShowView (row) {
      let self = this
      let targetUrl = '/api/customer/contract/show/' + row.contractId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.showViewForm = _data.data

          if (_data.data.contractScanList != null) {
            let picList = _data.data.contractScanList
            var list = []
            for (let i = 0; i < picList.length; i++) {
              list.push({name: 'name' + i, url: picList[i]})
            }
            self.showViewForm.contractScanList = list
          } else {
            self.showViewForm.contractScanList = []
          }

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
      this.isShowViewVisible = true
    },
    handlePicCardPreview (file) {
      this.dialogImageUrl = file.url
      this.isShowPicDialogVisible = true
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
    doFilter () {
      this.fetchData()
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
