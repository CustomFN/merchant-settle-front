<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="客户ID">
        <el-input v-model="submitForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select v-model="submitForm.customerType">
          <el-option label="营业执照" value="1"></el-option>
          <el-option label="个人证件" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户资质图片">
        <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="submitForm.customerCertificatesPic" :src="submitForm.customerCertificatesPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="客户证件编号">
        <el-input v-model="submitForm.customerCertificatesNum"></el-input>
      </el-form-item>
      <el-form-item label="客户证件名称">
        <el-input v-model="submitForm.customerName"></el-input>
      </el-form-item>
      <el-form-item label="法人/经营者">
        <el-input v-model="submitForm.customerLegalPerson"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="submitForm.customerCertificatesAddress"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-col :span="11">
          <el-date-picker type="date" editable placeholder="选择日期" v-model="submitForm.customerValidTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CustomerBaseInfo',
  data () {
    return {
      submitForm: {
        id: '',
        customerType: '',
        customerCertificatesPic: '',
        customerCertificatesNum: '',
        customerName: '',
        customerLegalPerson: '',
        customerCertificatesAddress: '',
        customerValidTimed: new Date('2019-12-12')
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
