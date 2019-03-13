<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="客户ID">
        <el-input v-model="submitForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select v-model="submitForm.customerType">
          <el-option v-for="item in customerTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户资质图片">
        <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadPic" action="string" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" multiple>
          <img v-if="submitForm.customerCertificatesPic[0]" :src="submitForm.customerCertificatesPic[0]" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadPic" action="string" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" multiple>
          <img v-if="submitForm.customerCertificatesPic[1]" :src="submitForm.customerCertificatesPic[1]" class="avatar">
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
        <el-col>
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
        customerCertificatesPic: [],
        customerCertificatesNum: '',
        customerName: '',
        customerLegalPerson: '',
        customerCertificatesAddress: '',
        customerValidTimed: new Date()
      },
      customerTypes: [{
        value: 1,
        label: '营业执照'
      }, {
        value: 2,
        label: '个人证件'
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadPic (param) {
      let self = this
      let formData = new FormData()
      formData.append('file', param.file)
      formData.append('chunk','0')
      this.$axios.post('/api/ui/upload', formData, {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm.customerCertificatesPic.push(_data.data)
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
      const isJPG = file.type === 'image/jpeg'
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isJPG && isLt4M
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
