<template>
  <div class="app-container">
    <el-card class="box-card" >
      <div class="header">
        <div class="header-left">
          <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
            <el-form-item label="客户ID">
              <el-input v-model="submitForm.customerId"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="header-right">
          <el-button type="primary">编辑客户信息</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="footer">
        <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
          <el-form-item label="门店名称">
            <el-input v-model="submitForm.wmPoiName"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="submitForm.wmPoiLinkMan"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="submitForm.wmPoiPhone"></el-input>
          </el-form-item>
          <el-form-item label="主营品类">
            <el-input v-model="submitForm.wmPoiCategory"></el-input>
          </el-form-item>
          <el-form-item label="物理城市">
            <el-select v-model="submitForm.wmPoiCityId" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="submitForm.wmPoiRegionId" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店地址">
            <el-input v-model="submitForm.wmPoiAddress"></el-input>
          </el-form-item>
          <el-form-item label="门店坐标">
          </el-form-item>
          <el-form-item label="门店LOGO">
            <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="submitForm.wmPoiLogo" :src="submitForm.wmPoiLogo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="门店环境图片">
            <el-upload class="avatar-uploader" :show-file-list="false" action="" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="submitForm.wmPoiEnvironmentPic" :src="submitForm.wmPoiEnvironmentPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存并提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'WmPoiBaseInfo',
  data () {
    return {
      submitForm: {
        customerId: '',
        wmPoiName: '',
        wmPoiLinkMan: '',
        wmPoiPhone: '',
        wmPoiCategory: '',
        wmPoiCityId: '',
        wmPoiRegionId: '',
        wmPoiAddress: '',
        wmPoiLongitude: '',
        wmPoiLatitude: '',
        wmPoiLogo: '',
        wmPoiEnvironmentPic: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }]
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
.header, .footer {
  margin: 20px;
  float: left;
  .header-left {
    float: left;
  }
  .header-right {
    margin-left: 5px;
    float: left;
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
