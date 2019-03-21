<template>
<div>
  <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
  <div class="app-container">
    <div class="core-tag">
      <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
    </div>
    <el-card class="box-card" >
      <div class="header">
        <div class="header-left">
          <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
            <el-form-item label="客户ID">
              <el-input v-model="submitForm.customerId" v-bind:disabled="editDisabled"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="editCustomerInfo()">编辑客户信息</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="footer">
        <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
          <el-form-item label="门店名称">
            <el-input v-model="submitForm.wmPoiName" v-bind:disabled="editDisabled"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="submitForm.wmPoiLinkMan" v-bind:disabled="editDisabled"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="submitForm.wmPoiPhone" v-bind:disabled="editDisabled"></el-input>
          </el-form-item>
          <el-form-item label="主营品类">
            <el-select v-model="submitForm.wmPoiCategory" v-bind:disabled="editDisabled">
              <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物理城市">
            <el-select v-model="submitForm.wmPoiCityId" placeholder="请选择" v-bind:disabled="editDisabled">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="submitForm.wmPoiRegionId" placeholder="请选择" v-bind:disabled="editDisabled">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店地址">
            <el-input v-model="submitForm.wmPoiAddress" v-bind:disabled="editDisabled"></el-input>
          </el-form-item>
          <el-form-item label="门店坐标/经度">
            <el-input v-model="submitForm.wmPoiLongitude" disabled></el-input>
          </el-form-item>
          <el-form-item label="门店坐标/维度">
            <el-input v-model="submitForm.wmPoiLatitude" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <div class="amap-page-container">
              <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
              <el-amap vid="wmPoiBaseInfoMap" :center="mapCenter" :zoom="14" :events="events" class="amap-demo">
                  <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
              </el-amap>
            </div>
          </el-form-item>
          <el-form-item label="门店LOGO">
            <el-upload class="avatar-uploader"
              :http-request="uploadLOGOPic"
              action="string"
              list-type="picture-card"
              :on-preview="handlePicCardPreview"
              :on-remove="handleLOGOPicRemove"
              :before-upload="beforeAvatarUpload"
              :show-file-list="true"
              :file-list="showPics.logoList"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="isShowPicDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="门店环境图片">
            <el-upload class="avatar-uploader"
              :http-request="uploadEnvironmentPic"
              action="string"
              list-type="picture-card"
              :on-preview="handlePicCardPreview"
              :on-remove="handleEnvironmentPicRemove"
              :before-upload="beforeAvatarUpload"
              :show-file-list="true"
              :file-list="showPics.environmentPicList"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="isShowPicDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'WmPoiBaseInfo',
  data () {
    let self = this
    return {
      physicalPoiId: this.$store.state.physicalPoiId,
      wmPoiId: this.$store.state.wmPoiId,
      isShowPicDialogVisible: false,
      dialogImageUrl: '',
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
        wmPoiLogoList: [],
        wmPoiEnvironmentPicList: []
      },
      showPics: {
        logoList: [],
        environmentPicList: []
      },
      options: [{
        value: 1,
        label: '黄金糕'
      }, {
        value: 2,
        label: '双皮奶'
      }],
      categories: [{
        value: 1,
        label: '主食/米饭'
      }, {
        value: 2,
        label: '主食/面条'
      }],
      markers: [
        [121.59996, 31.197646]
      ],
      searchOption: {
        city: '北京',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      events: {
        click (e) {
          let { lng, lat } = e.lnglat
          self.submitForm.wmPoiLongitude = lng
          self.submitForm.wmPoiLatitude = lat

          self.markers = []
          self.markers.push([self.submitForm.wmPoiLongitude, self.submitForm.wmPoiLatitude])
        }
      },
      editDisabled: false
    }
  },
  mounted () {
    let self = this
    if (this.physicalPoiId > 0 && this.wmPoiId <= 0) {
      self.fetchPhysicalPoiInfo()
    } else if (this.wmPoiId > 0) {
      self.fetchData()
    }
  },
  methods: {
    onSubmit () {
      let self = this
      console.log(this.submitForm)
      this.$axios.post('/api/wmpoi/baseinfo/save/', this.$qs.stringify(this.submitForm), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
          self.handleShowWmPoiBaseInfo(_data.data)
          self.handlePhysicalPoiStatus(self.physicalPoiId)
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
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
        this.submitForm.wmPoiLongitude = center.lng
        this.submitForm.wmPoiLatitude = center.lat
      }
    },
    fetchData () {
      let self = this
      let targetUrl = '/api/wmpoi/baseinfo/show/' + this.wmPoiId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.handleShowWmPoiBaseInfo(_data.data)
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
    handleShowWmPoiBaseInfo (data) {
      this.submitForm = data
      // 处理地图
      let mapPosition = [Number(this.submitForm.wmPoiLongitude), Number(this.submitForm.wmPoiLatitude)]
      this.mapCenter = mapPosition
      this.markers.push(mapPosition)
      // 处理图片展示
      if (data.wmPoiLogoList != null) {
        let picList = data.wmPoiLogoList
        var list = []
        for (let i = 0; i < picList.length; i++) {
          list.push({name: 'name' + i, url: picList[i]})
        }
        this.showPics.logoList = list
      } else {
        this.showPics.logoList = []
      }
      if (data.wmPoiEnvironmentPicList != null) {
        let picList = data.wmPoiEnvironmentPicList
        list = []
        for (let i = 0; i < picList.length; i++) {
          list.push({name: 'name' + i, url: picList[i]})
        }
        this.showPics.environmentPicList = list
      } else {
        this.showPics.environmentPicList = []
      }
      // 处理是否可修改
      if (data.status === 412) {
        this.editDisabled = true
      }
    },
    fetchPhysicalPoiInfo () {
      let self = this
      let targetUrl = '/api/physicalpoi/show/' + this.physicalPoiId
      this.$axios.post(targetUrl, {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.transPhysicalPoi2WmPoi(_data.data)
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
    transPhysicalPoi2WmPoi (data) {
      this.submitForm.wmPoiName = data.physicalPoiName
      this.submitForm.wmPoiAddress = data.physicalPoiAddress
      this.submitForm.wmPoiCategory = data.physicalPoiCategory
      this.submitForm.wmPoiPhone = data.physicalPoiPhone
      this.submitForm.wmPoiCityId = data.physicalCityId
      this.submitForm.wmPoiRegionId = data.physicalRegionId
      this.submitForm.wmPoiLongitude = data.physicalPoiLongitude
      this.submitForm.wmPoiLatitude = data.physicalPoiLatitude
      let mapPosition = [Number(this.submitForm.wmPoiLongitude), Number(this.submitForm.wmPoiLatitude)]
      this.mapCenter = mapPosition
      this.markers.push(mapPosition)
    },
    handlePhysicalPoiStatus (id) {
      let self = this
      this.$axios.post('/api/physicalpoi/update', this.$qs.stringify({'physicalPoiId': id}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
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
    uploadEnvironmentPic (param) {
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
          let length = _data.data.length
          let index = _data.data.lastIndexOf('-')
          let _name = _data.data.substring(index + 1, length)
          self.showPics.environmentPicList.push({name: _name, url: _data.data})
          self.submitForm.wmPoiEnvironmentPicList.push(_data.data)
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
    uploadLOGOPic (param) {
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
          let length = _data.data.length
          let index = _data.data.lastIndexOf('-')
          let _name = _data.data.substring(index + 1, length)
          self.showPics.logoList.push({name: _name, url: _data.data})
          self.submitForm.wmPoiLogoList.push(_data.data)
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
    handleEnvironmentPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.wmPoiEnvironmentPicList.indexOf(fileUrl, 0)
      this.submitForm.wmPoiEnvironmentPicList.splice(index, 1)
    },
    handleLOGOPicRemove (file, fileList) {
      let fileUrl = file.url.slice(5, -1)
      let index = this.submitForm.wmPoiLogoList.indexOf(fileUrl, 0)
      this.submitForm.wmPoiLogoList.splice(index, 1)
    },
    handlePicCardPreview (file) {
      this.dialogImageUrl = file.url
      this.isShowPicDialogVisible = true
    },
    editCustomerInfo () {
      if (this.submitForm.customerId !== '') {
        this.$store.dispatch('setCustomerIdAction', this.submitForm.customerId)
        this.$router.push('/customer/customerinfo')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header, .footer {
  margin: 20px;
  float: left;
  text-align: left;
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
.amap-demo {
  height: 350px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.amap-page-container {
  position: relative;
}
.core-tag {
  text-align: left
}
</style>
