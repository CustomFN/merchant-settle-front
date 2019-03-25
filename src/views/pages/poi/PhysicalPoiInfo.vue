<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="物理省份">
        <el-select v-model="submitForm.physicalCityId" @change="fetchRegion">
          <el-option v-for="item in physicalCities" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物理城市">
        <el-select v-model="submitForm.physicalRegionId">
          <el-option v-for="item in physicalRegions" :key="item.cityId" :label="item.cityName" :value="item.cityId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物理门店名称">
        <el-input v-model="submitForm.physicalPoiName"></el-input>
      </el-form-item>
      <el-form-item label="物理门店电话">
        <el-input v-model="submitForm.physicalPoiPhone"></el-input>
      </el-form-item>
      <el-form-item label="物理门店品类">
        <el-select v-model="submitForm.physicalPoiCategory">
          <el-option v-for="item in categories" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
        </el-select>
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
        <div class="amap-page-container">
          <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
          <el-amap vid="physicalPoiMap" :center="mapCenter" :zoom="14" :events="events" class="amap-demo">
            <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
          </el-amap>
        </div>
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
        physicalCityId: '',
        physicalRegionId: '',
        physicalPoiPhone: '',
        physicalPoiCategory: '',
        physicalPoiAddress: '',
        physicalPoiLongitude: '',
        physicalPoiLatitude: ''
      },
      physicalCities: [],
      physicalRegions: [],
      categories: [],
      markers: [],
      searchOption: {
        city: '北京',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      events: {
        click (e) {
          let { lng, lat } = e.lnglat
          self.submitForm.physicalPoiLongitude = lng
          self.submitForm.physicalPoiLatitude = lat

          self.markers = []
          self.markers.push([self.submitForm.physicalPoiLongitude, self.submitForm.physicalPoiLatitude])
        }
      }
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    } else {
      this.fetchProvinces()
      this.fetchCategory()
    }
  },
  methods: {
    onSubmit () {
      console.log(this.submitForm)
      let self = this
      this.$axios.post('/api/physicalpoi/save', this.$qs.stringify(self.submitForm), {
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
      this.$router.go(-1)
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
        this.submitForm.physicalPoiLongitude = center.lng
        this.submitForm.physicalPoiLatitude = center.lat
      }
    },
    fetchCategory () {
      let self = this
      this.$axios.post('/api/ui/getCategories', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.categories = _data.data
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
    fetchProvinces () {
      let self = this
      this.$axios.post('/api/ui/getProvinces', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.physicalCities = _data.data
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
    fetchRegion (provinceId) {
      let self = this
      this.$axios.post('/api/ui/getCities', this.$qs.stringify({'provinceId': provinceId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.physicalRegions = _data.data
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
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
.amap-demo {
  height: 300px;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.amap-page-container {
  position: relative;
}
</style>
