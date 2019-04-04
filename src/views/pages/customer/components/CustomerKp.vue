<template>
<div>
  <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
  <div class="container-core">
    <div class="core-tag">
      <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
    </div>
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="KP类型">
        <el-select v-model="submitForm.kpType" disabled>
          <el-option v-for="item in kpTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签约类型">
        <el-radio-group v-model="submitForm.kpSiginType"  v-bind:disabled="editDisabled">
          <el-radio :label="1" value=1>法人代表</el-radio>
          <el-radio :label="2" value=2>个人</el-radio>
          <el-radio :label="3" value=3>代理人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代理人授权书">
        <el-upload class="avatar-uploader"
          :http-request="uploadAuthorPic"
          action="string"
          list-type="picture-card"
          :on-preview="handlePicCardPreview"
          :on-remove="handleAuthorPicRemove"
          :before-upload="beforeAvatarUpload"
          :show-file-list="true"
          :file-list="submitForm.kpAuthorizationPicList"
          multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="证件图片">
        <el-upload class="avatar-uploader"
          :http-request="uploadCertiPic"
          action="string"
          list-type="picture-card"
          :on-preview="handlePicCardPreview"
          :on-remove="handleCertiPicRemove"
          :before-upload="beforeAvatarUpload"
          :show-file-list="true"
          :file-list="submitForm.kpCertificatesPicList"
          multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="isShowPicDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="submitForm.kpName" v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="submitForm.kpCertificatesType" v-bind:disabled="editDisabled">
          <el-option v-for="item in kpCertificatesTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="submitForm.kpCertificatesNum" v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="submitForm.kpPhoneNum" v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="银行">
        <el-select v-model="submitForm.bankId" v-bind:disabled="editDisabled">
          <el-option v-for="item in bankInfo" :key="item.bankId" :label="item.bankName" :value="item.bankId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input v-model="submitForm.bankNum" v-bind:disabled="editDisabled"></el-input>
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
  name: 'customerKp',
  data () {
    return {
      isShowPicDialogVisible: false,
      dialogImageUrl: '',
      customerId: this.$store.state.customerId,
      submitForm: {
        kpType: 1,
        kpSiginType: 1,
        kpAuthorizationPicList: [],
        kpCertificatesPicList: [],
        kpName: '',
        kpCertificatesType: '',
        kpCertificatesNum: '',
        kpPhoneNum: '',
        bankId: '',
        bankNum: '',
        statusStr: '',
        customerId: this.$store.state.customerId
      },
      bankInfo: [],
      kpCertificatesTypes: [{
        value: 1,
        label: '身份证'
      }, {
        value: 2,
        label: '港澳通行证'
      }],
      kpTypes: [{
        value: 1,
        label: '签约人'
      }],
      editDisabled: false
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      this.fetchBanks()
      if (this.customerId > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    onSubmit () {
      let self = this
      this.$axios.post('/api/customer/kp/save', this.$qs.stringify(self.submitForm), {
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
      let targetUrl = '/api/customer/kp/show/' + this.customerId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.submitForm = _data.data

            if (_data.data.kpAuthorizationPicList != null) {
              let picList = _data.data.kpAuthorizationPicList
              var list = []
              for (let i = 0; i < picList.length; i++) {
                list.push({name: 'name' + i, url: picList[i]})
              }
              self.submitForm.kpAuthorizationPicList = list
            } else {
              _data.data.kpAuthorizationPicList = []
            }
            if (_data.data.kpCertificatesPicList != null) {
              let picList = _data.data.kpCertificatesPicList
              let list = []
              for (let i = 0; i < picList.length; i++) {
                list.push({name: 'name' + i, url: picList[i]})
              }
              self.submitForm.kpCertificatesPicList = list
            } else {
              _data.data.kpCertificatesPicList = []
            }
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
    fetchBanks () {
      let self = this
      this.$axios.post('/api/ui/getBanks', this.$qs.stringify({'cityId': 1101}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.bankInfo = _data.data
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
    uploadCertiPic (param) {
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
          self.submitForm.kpCertificatesPicList.push({name: _name, url: _data.data})
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
    handleCertiPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.kpCertificatesPicList.indexOf(fileUrl, 0)
      this.submitForm.kpCertificatesPicList.splice(index, 1)
    },
    handlePicCardPreview (file) {
      this.dialogImageUrl = file.url
      this.isShowPicDialogVisible = true
    },
    uploadAuthorPic (param) {
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
          self.submitForm.kpAuthorizationPicList.push({name: _name, url: _data.data})
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
    handleAuthorPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.kpAuthorizationPicList.indexOf(fileUrl, 0)
      this.submitForm.kpAuthorizationPicList.splice(index, 1)
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
    width: 480px;
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
