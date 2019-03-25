<template>
<div>
  <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
  <div class="app-container">
    <div class="core-tag">
      <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
    </div>
    <div class="container-core">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="个人证件" name="1">
          <el-row class="row-class">
            <el-col :span="12">
              <div class="container-core-left">
                <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                  <el-form-item>
                    <el-upload class="avatar-uploader"
                      :http-request="uploadIDCardPic"
                      action="string"
                      list-type="picture-card"
                      :on-preview="handlePicCardPreview"
                      :on-remove="handleIDCardPicRemove"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="true"
                      :file-list="showPics.IDCardList"
                      multiple>
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="isShowPicDialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="container-core-right">
                <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                  <el-form-item label="姓名">
                    <el-input v-model="submitForm.wmPoiLinkManName" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="证件类型">
                    <el-select v-model="submitForm.wmPoiLinkManIDCardType" v-bind:disabled="editDisabled">
                      <el-option v-for="item in certificatesTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码">
                    <el-input v-model="submitForm.wmPoiLinkManIDCardNo" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="营业执照" name="2">
          <el-row class="row-class">
            <el-col :span="12">
              <div class="container-core-left">
                <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                  <el-form-item>
                    <el-upload class="avatar-uploader"
                      :http-request="uploadBusinessPic"
                      action="string"
                      list-type="picture-card"
                      :on-preview="handlePicCardPreview"
                      :on-remove="handleBusinessPicRemove"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="true"
                      :file-list="showPics.businessPicList"
                      multiple>
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="isShowPicDialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="container-core-right">
                <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                  <el-form-item label="执照编号">
                    <el-input v-model="submitForm.wmPoiBusinessLicenceNo" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="法人/经营者">
                    <el-input v-model="submitForm.wmPoiOperatorName" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="执照名称">
                    <el-input v-model="submitForm.wmPoiBusinessLicenceName" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="经营场所/地址">
                    <el-input v-model="submitForm.wmPoiBusinessLicenceAddress" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="注册/成立日期">
                    <el-input v-model="submitForm.wmPoiRegistrationDate" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="注册/登记机关">
                    <el-input v-model="submitForm.wmPoiRegisterDepartment" v-bind:disabled="editDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="执照有效期">
                    <el-date-picker  v-bind:disabled="editDisabled" type="date" placeholder="选择日期" v-model="submitForm.wmPoiBusinessLicenceValidTime" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div class="container-bottom">
        <el-button type="primary" @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'WmPoiQua',
  data () {
    return {
      activeNames: ['1', '2'],
      isShowPicDialogVisible: false,
      dialogImageUrl: '',
      submitForm: {
        wmPoiId: this.$store.state.wmPoiId,
        wmPoiLinkManIDCardPicList: [],
        wmPoiLinkManIDCardType: '',
        wmPoiLinkManName: '',
        wmPoiLinkManIDCardNo: '',
        wmPoiBusinessLicencePicList: [],
        wmPoiBusinessLicenceNo: '',
        wmPoiOperatorName: '',
        wmPoiBusinessLicenceName: '',
        wmPoiBusinessLicenceAddress: '',
        wmPoiRegistrationDate: '',
        wmPoiRegisterDepartment: '',
        wmPoiBusinessLicenceValidTime: ''
      },
      showPics: {
        IDCardList: [],
        businessPicList: []
      },
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
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      if (this.submitForm.wmPoiId != null && this.submitForm.wmPoiId > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    onSubmit () {
      let self = this
      let validTime = this.submitForm.wmPoiBusinessLicenceValidTime
      let unixtime = this.$moment(validTime).format('X')
      this.submitForm.wmPoiBusinessLicenceValidTime = unixtime
      this.$axios.post('/api/wmpoi/qua/save/', this.$qs.stringify(this.submitForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '保存成功',
            type: 'success'
          })
          self.handleShowWmPoiQua(_data.data)
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
      this.submitForm.wmPoiBusinessLicenceValidTime = validTime
    },
    fetchData () {
      let self = this
      let targetUrl = '/api/wmpoi/qua/show/' + this.submitForm.wmPoiId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.handleShowWmPoiQua(_data.data)
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
    handleShowWmPoiQua (data) {
      this.submitForm = data
      // 处理图片展示
      if (data.wmPoiLinkManIDCardPicList != null) {
        let picList = data.wmPoiLinkManIDCardPicList
        var list = []
        for (let i = 0; i < picList.length; i++) {
          list.push({name: 'name' + i, url: picList[i]})
        }
        this.showPics.IDCardList = list
      } else {
        this.showPics.IDCardList = []
      }
      if (data.wmPoiBusinessLicencePicList != null) {
        let picList = data.wmPoiBusinessLicencePicList
        list = []
        for (let i = 0; i < picList.length; i++) {
          list.push({name: 'name' + i, url: picList[i]})
        }
        this.showPics.businessPicList = list
      } else {
        this.showPics.businessPicList = []
      }

      this.submitForm.wmPoiBusinessLicenceValidTime = this.submitForm.wmPoiBusinessLicenceValidTime * 1000
      // 处理是否可修改
      if (data.status === 412) {
        this.editDisabled = true
      }
    },
    uploadIDCardPic (param) {
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
          self.showPics.IDCardList.push({name: _name, url: _data.data})
          self.submitForm.wmPoiLinkManIDCardPicList.push(_data.data)
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
    uploadBusinessPic (param) {
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
          self.showPics.businessPicList.push({name: _name, url: _data.data})
          self.submitForm.wmPoiBusinessLicencePicList.push(_data.data)
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
    handleIDCardPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.wmPoiLinkManIDCardPicList.indexOf(fileUrl, 0)
      this.submitForm.wmPoiLinkManIDCardPicList.splice(index, 1)
    },
    handleBusinessPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.wmPoiBusinessLicencePicList.indexOf(fileUrl, 0)
      this.submitForm.wmPoiBusinessLicencePicList.splice(index, 1)
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
  width: 980px;
  margin: 20px;
  float: left;
  .el-form {
    width: 100% ;
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
  .row-class {
    margin-top: 20px;
  }
}
.container-bottom {
  margin-top: 20px;
  text-align: center
}
.core-tag {
  text-align: left
}
</style>
