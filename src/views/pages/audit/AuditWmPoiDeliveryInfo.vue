<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="地图坐标审核">
              <div class="audit-map">
                <div class="amap-page-container">
                  <el-amap vid="auditWmPoiDeliveryInfomap" :center="mapCenter" ref="map" :zoom="14" class="amap-demo">
                    <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker" ></el-amap-marker>
                    <el-amap-circle v-for="(circle, index) in circles" :key="index" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity"></el-amap-circle>
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
            <el-table :data="tableData" border style="width:121px">
              <el-table-column prop="wmPoiId" label="门店ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmDeliveryType" label="门店配送方式"></el-table-column>
              <el-table-column prop="poportion" label="平台分成比例/%"></el-table-column>
              <el-table-column prop="minMoney" label="商家保底收入/元" ></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="minDeliveryPrice" label="起送价/元"></el-table-column>
              <el-table-column prop="dispatcherMoney" label="配送费/元"></el-table-column>
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
        wmPoiId: '1',
        wmDeliveryType: '平台配送',
        poportion: '12',
        minMoney: '12',
        minDeliveryPrice: '8',
        dispatcherMoney: '5'
      }],
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-left, .container-right {
  text-align: left;
  margin-left: 30px;
  padding: 0%;
  .audit-map {
    width: 570px
  }
  .amap-demo {
    height: 350px;
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
}

</style>
