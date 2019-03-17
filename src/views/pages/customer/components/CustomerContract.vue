<template>
  <div class="container-core">
    <div>
      <el-button type="primary" @click="addPaperContract()">添加纸质合同</el-button>
      <el-button type="primary" disabled>添加电子合同</el-button>
    </div>
    <div class="container-core-bottom">
      <el-table :data="tableData" border>
        <el-table-column prop="contractId" label="合同ID" width="100"></el-table-column>
        <el-table-column prop="contractNum" label="合同编号" width="200"></el-table-column>
        <el-table-column label="合同类型" width="120">
          <template slot-scope="scope">
            <el-tag size="small" type="">{{ scope.row.contractType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="partyAName" label="甲方"></el-table-column>
        <el-table-column prop="partyASignerName" label="甲方签约人" width="120"></el-table-column>
        <el-table-column prop="partyBSignerName" label="乙方签约人" width="120"></el-table-column>
        <el-table-column label="合同有效期" width="120">
          <template slot-scope="scope">
            <p>{{ scope.row.contractValidTime | dateformat }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="auditStatus" label="合同状态" width="100">
          <template slot-scope="scope">
            <el-tag size="small" type="success">{{ scope.row.auditStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="editContract(scope.row)">修改合同</el-button>
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

    <el-dialog title="合同信息" :visible.sync="isShowEditVisible">
      <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
      <div class="core-tag">
        <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
      </div>
      <el-form label-width="150px"  :model="submitForm" size="medium">
        <el-form-item label="合同类型">
          <el-select v-model="submitForm.customerContractType" v-bind:disabled="editDisabled">
            <el-option v-for="item in customerContractTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="submitForm.customerContractNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="合同有效期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="submitForm.contractEndTime"  v-bind:disabled="editDisabled" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="甲方">
          <el-input v-model="submitForm.partyA.party" disabled></el-input>
        </el-form-item>
        <el-form-item label="甲方联系人">
          <el-input v-model="submitForm.partyA.partyContactPerson" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="甲方联系人电话号码">
          <el-input v-model="submitForm.partyA.partyContactPersonPhone" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="甲方签约时间">
          <el-input :value="submitForm.partyA.signTime | dateformat" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="乙方">
          <el-input v-model="submitForm.partyB.party" disabled></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人">
          <el-input v-model="submitForm.partyB.partyContactPerson" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="乙方联系人电话号码">
          <el-input v-model="submitForm.partyB.partyContactPersonPhone" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="乙方签约时间">
          <el-input :value="submitForm.partyB.signTime | dateformat" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="合同扫描件">
          <el-upload class="avatar-uploader"
            :http-request="uploadPic"
            action="string"
            list-type="picture-card"
            :on-preview="handlePicCardPreview"
            :on-remove="handlePicRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="true"
            :file-list="submitForm.contractScanList"
            multiple>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="isShowPicDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
        <el-button @click="isShowEditVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'customerContract',
  data () {
    return {
      customerId: this.$store.state.customerId,
      isShowPicDialogVisible: false,
      dialogImageUrl: '',
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      isShowEditVisible: false,
      tempForm: {},
      submitForm: {
        customerContractType: '',
        customerContractNum: '',
        contractEndTime: '',
        contractScanList: [],
        customerId: this.$store.state.customerId,
        partyA: {
          signerLabel: 'A',
          party: '朱家琨',
          partyContactPerson: '',
          partyContactPersonPhone: '',
          signTime: ''
        },
        partyB: {
          signerLabel: 'B',
          party: '外卖平台',
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
      editDisabled: false
    }
  },
  mounted  () {
    this.tempForm = this.submitForm
    if (this.customerId > 0) {
      this.fetchData()
    }
  },
  methods: {
    editContract (row) {
      let self = this
      let targetUrl = '/api/customer/contract/show/' + row.contractId
      console.log(targetUrl)
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm = _data.data
          self.submitForm.contractEndTime = self.submitForm.contractEndTime * 1000

          if (_data.data.contractScanList != null) {
            let picList = _data.data.contractScanList
            var list = []
            for (let i = 0; i < picList.length; i++) {
              list.push({name: 'name' + i, url: picList[i]})
            }
            self.submitForm.contractScanList = list
          } else {
            self.submitForm.contractScanList = []
          }

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
    onSubmit () {
      let endTime = this.submitForm.contractEndTime
      let partyASignerTime = this.submitForm.partyA.signTime
      let partyBSignerTime = this.submitForm.partyB.signTime
      let unixtime = this.$moment(endTime).format('X')
      let unixtimeA = this.$moment(partyASignerTime).format('X')
      let unixtimeB = this.$moment(endTime).format('X')
      this.submitForm.contractEndTime = unixtime
      this.submitForm.partyA.signTime = unixtimeA
      this.submitForm.partyB.signTime = unixtimeB
      console.log(this.submitForm)
      let self = this
      let params = JSON.stringify(self.submitForm)
      this.$axios.post('/api/customer/contract/save', params, {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
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

      this.submitForm.contractEndTime = endTime
      this.submitForm.partyA.signTime = partyASignerTime
      this.submitForm.partyB.signTime = partyBSignerTime
    },
    fetchData () {
      let self = this
      let customerId = this.customerId
      this.$axios.post('/api/customer/contract/list', this.$qs.stringify({'customerId': customerId}), {
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
    uploadPic (param) {
      let self = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('chunk', '0')
      this.$axios.post('/api/ui/upload', formData, {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          console.log(_data.data)
          self.submitForm.contractScanList.push(_data.data)
          self.$message({
            message: '上传成功',
            type: 'success'
          })
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
    beforeAvatarUpload (file) {
      const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isJPGPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isJPGPNG && isLt4M
    },
    handlePicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.contractScanList.indexOf(fileUrl, 0)
      this.submitForm.contractScanList.splice(index, 1)
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
      this.submitForm = this.tempForm
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
.core-tag {
  text-align: right
}
</style>
