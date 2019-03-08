<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="物理城市">
      <el-select v-model="submitForm.physicalCityId">
        <el-option label="北京市" value="1"></el-option>
        <el-option label="天津市" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="行政区/县">
      <el-select v-model="submitForm.physicalRegionId">
        <el-option label="朝阳区" value="1"></el-option>
        <el-option label="海淀区" value="2"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="物理门店名称">
        <el-input v-model="submitForm.physicalPoiName"></el-input>
      </el-form-item>
      <el-form-item label="物理门店电话">
        <el-input v-model="submitForm.physicalPoiPhone"></el-input>
      </el-form-item>
      <el-form-item label="物理门店品类">
        <el-input v-model="submitForm.physicalPoiCategory"></el-input>
      </el-form-item>
      <el-form-item label="物理门店地址">
        <el-input v-model="submitForm.physicalPoiAddress"></el-input>
      </el-form-item>
      <el-form-item label="门店坐标/经度">
        <el-input v-model="submitForm.physicalPoiLongitude"></el-input>
      </el-form-item>
      <el-form-item label="门店坐标/维度">
        <el-input v-model="submitForm.physicalPoiLatitude"></el-input>
      </el-form-item>
      <el-form-item>
        <el-amap vid="amap" :center="center" :zoom="zoom" :plugin="plugin" style="height:480px;"></el-amap>
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
    let self = this
    return {
      submitForm: {
        id: '',
        customerType: '',
        customerCertificatesPic: '',
        customerCertificatesNum: '',
        customerName: '',
        customerLegalPerson: '',
        customerCertificatesAddress: '',
        icustomerValidTimed: ''
      },
      zoom: 16,
      center: [121.59996, 31.197646],
      plugin: [{
        pName: 'Geolocation',
        events: {
          init (o) {
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                self.lng = result.position.lng
                self.lat = result.position.lat
                self.center = [self.lng, self.lat]
                self.loaded = true
                self.$nextTick()
              }
            })
          }
        }
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
    width: 780px;
  }
}
</style>
