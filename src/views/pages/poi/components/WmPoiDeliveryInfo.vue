<template>
<div>
  <el-alert type="error" v-if="submitForm.auditResult">{{ submitForm.auditResult }}</el-alert>
  <div class="container-core">
    <div class="core-tag">
      <el-tag v-if="submitForm.statusStr" type="success">{{ submitForm.statusStr }}</el-tag>
    </div>
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="配送方式">
        <el-radio-group v-model="submitForm.wmDeliveryType"  v-bind:disabled="editDisabled">
          <el-radio :label="1" value=1>平台配送</el-radio>
          <el-radio :label="2" value=2>商家自配</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="平台分成比例/%">
        <el-input v-model="submitForm.poportion"  v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="商家保底收入">
        <el-input v-model="submitForm.minMoney"  v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="配送方案">
        <el-tabs type="border-card">
          <el-tab-pane label="正常时段">
            <div>
              <el-form ref="form" :model="submitForm" label-width="80px" size="small">
                <el-form-item label="起送价/元">
                  <el-input v-model="submitForm.wmPoiProjectList[0].minDeliveryPrice" v-bind:disabled="editDisabled"></el-input>
                </el-form-item>
                <el-form-item label="配送费/元">
                  <el-input v-model="submitForm.wmPoiProjectList[0].dispatcherMoney" v-bind:disabled="editDisabled"></el-input>
                </el-form-item>
                <el-form-item label="配送范围">
                  <el-button disabled>开始标注</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="amap-page-container">
              <el-amap vid="wmPoiDeliveryInfoMap" :center="mapCenter" ref="map" :zoom="14" class="amap-demo">
                <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
                <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity"></el-amap-circle>
              </el-amap>
            </div>
          </el-tab-pane>
        </el-tabs>
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
  name: 'WmPoiDeliveryInfo',
  data () {
    return {
      mapCenter: [121.59996, 31.197646],
      markers: [
        [121.59996, 31.197646]
      ],
      circles: [
        {
          center: [121.59996, 31.197646],
          radius: 1000,
          fillOpacity: 0.5
        }
      ],
      submitForm: {
        wmPoiId: this.$store.state.wmPoiId,
        wmDeliveryType: 1,
        poportion: '',
        minMoney: '',
        wmPoiProjectList: [{
          minDeliveryPrice: '',
          dispatcherMoney: '',
          deliveryAreaType: 1,
          deliveryRadius: 1000,
          deliveryArea: [
            [121.59996, 31.197646]
          ]
        }]
      },
      editDisabled: false
    }
  },
  mounted () {
    if (this.submitForm.wmPoiId != null && this.submitForm.wmPoiId > 0) {
      this.fetchData()
      this.fetchWmPoiBaseInfo()
    }
  },
  methods: {
    onSubmit () {
      let self = this
      this.$axios.post('/api/wmpoi/delivery/save/', JSON.stringify(this.submitForm), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '保存成功',
            type: 'success'
          })
          self.handleShowWmPoiDeliveryInfo(_data.data)
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
    handleShowWmPoiDeliveryInfo (data) {
      console.log(data)
      this.submitForm = data
      if (data.status === 412) {
        this.editDisabled = true
      }
    },
    fetchData () {
      let self = this
      let targetUrl = '/api/wmpoi/delivery/show/' + this.submitForm.wmPoiId
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.handleShowWmPoiDeliveryInfo(_data.data)
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
    fetchWmPoiBaseInfo () {
      let self = this
      let targetUrl = '/api/wmpoi/baseinfo/show/' + this.submitForm.wmPoiId
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
            self.handleShowMap(_data.data)
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
    handleShowMap (data) {
      let mapPosition = [Number(data.wmPoiLongitude), Number(data.wmPoiLatitude)]
      this.mapCenter = this.circles[0].center = mapPosition
      this.markers.push(mapPosition)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  margin: 20px;
  width: 780px;
  float: left
}
.amap-demo {
  height: 350px;
}
</style>
