<template>
  <div>
    <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
    <div class="container-core">
      <div class="core-tag">
        <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
      </div>
      <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
        <el-form-item label="客户ID">
          <el-input v-model="submitForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户类型">
          <el-select v-model="submitForm.customerType" v-bind:disabled="editDisabled">
            <el-option v-for="item in customerTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户资质图片">
          <el-upload class="avatar-uploader"
            :http-request="uploadPic"
            action="string"
            list-type="picture-card"
            :on-preview="handlePicCardPreview"
            :on-remove="handlePicRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="true"
            :file-list="tmpForm.customerCertificatesPicList"
            multiple>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="isShowPicDialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="客户证件编号">
          <el-input v-model="submitForm.customerCertificatesNum" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="客户证件名称">
          <el-input v-model="submitForm.customerName" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="法人/经营者">
          <el-input v-model="submitForm.customerLegalPerson" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="submitForm.customerCertificatesAddress" v-bind:disabled="editDisabled"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-col>
            <el-date-picker type="date" editable placeholder="选择日期" v-bind:disabled="editDisabled" v-model="submitForm.customerValidTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customerBaseInfo',
  data () {
    return {
      isShowPicDialogVisible: false,
      dialogImageUrl: '',
      customerId: this.$store.state.customerId,
      tmpForm: {
        customerCertificatesPicList: []
      },
      submitForm: {
        id: '',
        customerType: '',
        customerCertificatesPicList: [],
        customerCertificatesNum: '',
        customerName: '',
        customerLegalPerson: '',
        customerCertificatesAddress: '',
        customerValidTime: '',
        statusStr: ''
      },
      customerTypes: [{
        value: 1,
        label: '营业执照'
      }, {
        value: 2,
        label: '个人证件'
      }],
      editDisabled: false
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      if (this.customerId > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    onSubmit () {
      let validTime = this.submitForm.customerValidTime
      let unixtime = this.$moment(validTime).format('X')
      this.submitForm.customerValidTime = unixtime
      let self = this
      console.log(self.submitForm)
      this.$axios.post('/api/customer/save', this.$qs.stringify(self.submitForm), {
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
          self.$store.dispatch('setCustomerIdAction', self.submitForm.customerId)
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
      this.submitForm.customerValidTime = validTime
    },
    fetchData () {
      let self = this
      let targetUrl = '/api/customer/show/' + this.customerId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm = _data.data
          self.submitForm.customerValidTime = self.submitForm.customerValidTime * 1000
          if (_data.data.customerCertificatesPicList != null) {
            let picList = _data.data.customerCertificatesPicList
            var list = []
            for (let i = 0; i < picList.length; i++) {
              list.push({name: 'name' + i, url: picList[i]})
            }
            self.tmpForm.customerCertificatesPicList = list
          } else {
            self.tmpForm.customerCertificatesPicList = self.submitForm.customerCertificatesPicList = []
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
    },
    uploadPic (param) {
      let self = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('chunk', '0')
      this.$axios.post('/api/ui/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          let length = _data.data.length
          let index = _data.data.lastIndexOf('-')
          let _name = _data.data.substring(index + 1, length)
          self.tmpForm.customerCertificatesPicList.push({name: _name, url: _data.data})
          self.submitForm.customerCertificatesPicList.push(_data.data)
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
      let index = this.tmpForm.customerCertificatesPicList.indexOf(fileUrl, 0)
      this.tmpForm.customerCertificatesPicList.splice(index, 1)
      this.submitForm.customerCertificatesPicList.splice(index, 1)
    },
    handlePicCardPreview (file) {
      this.dialogImageUrl = file.url
      this.isShowPicDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  margin: 20px;
  float: left;
  .core-tag {
    text-align: right
  }
  .el-form {
    width: 600px;
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
}
</style>
