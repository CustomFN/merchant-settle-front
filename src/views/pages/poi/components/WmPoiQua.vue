<template>
  <div class="container-core">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="个人证件" name="1">
        <el-row class="row-class">
          <el-col :span="12">
            <div class="container-core-left">
              <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                <el-form-item>
                  <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="submitForm.wmPoiLinkManIDCardPic" :src="submitForm.wmPoiLinkManIDCardPic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="container-core-right">
              <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                <el-form-item label="姓名">
                  <el-input v-model="submitForm.wmPoiLinkManName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="submitForm.wmPoiLinkManIDCardType">
                    <el-option label="身份证" value="1"></el-option>
                    <el-option label="港澳通行证" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input v-model="submitForm.wmPoiLinkManIDCardNo"></el-input>
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
                  <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="submitForm.wmPoiBusinessLicencePic" :src="submitForm.wmPoiBusinessLicencePic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="container-core-right">
              <el-form ref="form" :model="submitForm" label-width="120px" size="small">
                <el-form-item label="执照编号">
                  <el-input v-model="submitForm.wmPoiBusinessLicenceNo"></el-input>
                </el-form-item>
                <el-form-item label="法人/经营者">
                  <el-input v-model="submitForm.wmPoiOperatorName"></el-input>
                </el-form-item>
                <el-form-item label="执照名称">
                  <el-input v-model="submitForm.wmPoiBusinessLicenceName"></el-input>
                </el-form-item>
                <el-form-item label="经营场所/地址">
                  <el-input v-model="submitForm.wmPoiBusinessLicenceAddress"></el-input>
                </el-form-item>
                <el-form-item label="注册/成立日期">
                  <el-input v-model="submitForm.wmPoiRegistrationDate"></el-input>
                </el-form-item>
                <el-form-item label="注册/登记机关">
                  <el-input v-model="submitForm.wmPoiRegisterDepartment"></el-input>
                </el-form-item>
                <el-form-item label="执照有效期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="submitForm.wmPoiBusinessLicenceValidTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div class="container-bottom">
      <el-button type="primary" @click="onSubmit">保存并提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WmPoiQua',
  data () {
    return {
      activeNames: ['1', '2'],
      submitForm: {
        wmPoiLinkManIDCardPic: '',
        wmPoiLinkManIDCardType: '',
        wmPoiLinkManName: '',
        wmPoiLinkManIDCardNo: '',
        wmPoiBusinessLicencePic: '',
        wmPoiBusinessLicenceNo: '',
        wmPoiOperatorName: '',
        wmPoiBusinessLicenceName: '',
        wmPoiBusinessLicenceAddress: '',
        wmPoiRegistrationDate: '',
        wmPoiRegisterDepartment: '',
        wmPoiBusinessLicenceValidTime: ''
      }
    }
  },
  methods: {
    onSubmit () {
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
</style>
