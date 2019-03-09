<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="图片审核">
              <img :src="image_1" class="audit-pic"/>
              <img :src="image_2" class="audit-pic"/>
            </el-tab-pane>
            <el-tab-pane label="地图坐标审核">
            <div class="audit-map">
              <div class="amap-page-container">
                <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                <el-amap vid="auditWmPoiBaseInfomap" :center="mapCenter" :zoom="14" :events="events" class="amap-demo">
                  <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
                </el-amap>
              </div>
            </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width:241px">
              <el-table-column prop="customerId" label="客户ID" width="120px"></el-table-column>
              <el-table-column prop="wmPoiId" label="门店ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiName" label="门店名称"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiLinkMan" label="门店联系人" width="180px"></el-table-column>
              <el-table-column prop="wmPoiPhone" label="门店联系人电话" ></el-table-column>
              <el-table-column prop="wmPoiCategory" label="门店经营品类"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiCityRegion" label="门店城市" width="180"></el-table-column>
              <el-table-column prop="wmPoiAddress" label="门店地址"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiLongitude" label="经度"></el-table-column>
              <el-table-column prop="wmPoiLatitude" label="纬度"></el-table-column>
            </el-table>
            <div class="container-right-bottom">
              <div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
              <div class="container-right-bottom-btn">
                <el-button type="primary">审核通过</el-button>
                <el-button type="danger">审核驳回</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image_1: 'http://pniquhm38.bkt.clouddn.com/2ec37620-7b8b-4d01-b180-df72753c78ba',
      image_2: 'http://pniquhm38.bkt.clouddn.com/2ec37620-7b8b-4d01-b180-df72753c78ba',
      textarea: '',
      tableData: [{
        customerId: '1',
        wmPoiId: '1',
        wmPoiName: '黄焖鸡大米饭',
        wmPoiLinkMan: '全渠道',
        wmPoiPhone: '12345678900',
        wmPoiCategory: '主食/米饭',
        wmPoiCityRegion: '北京市/朝阳区',
        wmPoiAddress: '北京市朝阳区望京国际研发园',
        wmPoiLongitude: '1.111111',
        wmPoiLatitude: '1.111111'
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

          self.markers = []
          self.markers.push([lng, lat])
        }
      }
    }
  },
  methods: {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-left, .container-right {
  text-align: left;
  margin-left: 30px;
  padding: 0%;
  .audit-pic, .audit-map {
    width: 570px
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
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
</style>
