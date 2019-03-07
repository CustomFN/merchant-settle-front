<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="KP类型">
        <el-select v-model="submitForm.kpType" disabled>
          <el-option label="签约人" value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签约类型">
        <el-radio-group v-model="submitForm.kpSiginType">
          <el-radio :label="1" value='1'>法人代表</el-radio>
          <el-radio :label="2" value='2'>个人</el-radio>
          <el-radio :label="3" value='3'>代理人</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代理人授权书">
        <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="submitForm.kpAuthorizationPic" :src="submitForm.kpAuthorizationPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="证件图片">
        <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="submitForm.kpCertificatesPic" :src="submitForm.kpCertificatesPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="submitForm.kpName"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="submitForm.kpCertificatesType">
          <el-option label="身份证" value="1"></el-option>
          <el-option label="港澳通行证" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="submitForm.kpCertificatesNum"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="submitForm.kpPhoneNum"></el-input>
      </el-form-item>
      <el-form-item label="银行">
        <el-select v-model="submitForm.bankId">
          <el-option label="中国建设银行" value="1"></el-option>
          <el-option label="中国工商银行" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input v-model="submitForm.bankNum"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CustomerKp',
  data () {
    return {
      submitForm: {
        kpType: '1',
        kpSiginType: 1,
        kpAuthorizationPic: '',
        kpCertificatesPic: '',
        kpName: '',
        kpCertificatesType: '',
        kpCertificatesNum: '',
        kpPhoneNum: '',
        bankId: '',
        bankNum: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  margin: 20px;
  float: left;
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
