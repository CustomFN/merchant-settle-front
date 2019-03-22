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
                <el-amap vid="auditWmPoiBaseInfomap" :center="mapCenter" :zoom="14" class="amap-demo">
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
              <el-table-column prop="auditDataObj.customerId" label="客户ID" width="120px"></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiId" label="门店ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmPoiName" label="门店名称"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmPoiLinkMan" label="门店联系人" width="180px"></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiPhone" label="门店联系人电话" ></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiCategory" label="门店经营品类"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmPoiCityRegion" label="门店城市" width="180"></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiAddress" label="门店地址"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmPoiLongitude" label="经度"></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiLatitude" label="纬度"></el-table-column>
            </el-table>
            <div class="container-right-bottom">
              <div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="auditResult.result"></el-input>
              </div>
              <div class="container-right-bottom-btn">
                <el-button type="primary" @click="submitAuditPass()">审核通过</el-button>
                <el-button type="danger" @click="submitAuditReject()">审核驳回</el-button>
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
      image_1: '',
      image_2: '',
      tableData: [],
      auditResult: {
        auditTaskId: 0,
        auditStatus: 203,
        result: '',
        opUser: ''
      },
      markers: [
        [121.59996, 31.197646]
      ],
      searchOption: {
        city: '北京',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646]
    }
  },
  mounted () {
    this.auditResult.auditTaskId = this.$store.state.auditTaskId
    this.auditResult.opUser = this.$cookies.get('user').userId
    this.fetchData()
  },
  methods: {
    fetchData () {
      let self = this
      let targetUrl = '/api/audit/detail/' + this.auditResult.auditTaskId
      this.$axios.post(targetUrl, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.handleShowAuditTask(_data.data)
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
    handleShowAuditTask (data) {
      this.tableData = data

      // let images = data[0].auditDataObj.wmPoiLogoList
      // self.image_1 = images[0]
      // images = data[0].auditDataObj.wmPoiEnvironmentPicList
      // self.image_2 = images[0]

      let mapPosition = [Number(data[0].auditDataObj.wmPoiLongitude), Number(data[0].auditDataObj.wmPoiLatitude)]
      this.mapCenter = mapPosition
      this.markers.push(mapPosition)
    },
    submitAuditPass () {
      let self = this
      this.auditResult.auditStatus = this.$store.state.auditPassStatus
      this.$axios.post('/api/audit/saveAuditResult', this.$qs.stringify(self.auditResult), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '审核通过',
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
      this.$router.go(-1)
    },
    submitAuditReject () {
      let self = this
      if (this.auditResult.result === '') {
        self.$message({
          message: '驳回原因必填',
          type: 'warning'
        })
      } else {
        self.auditResult.auditStatus = self.$store.state.auditRejectStatus
        self.$axios.post('/api/audit/saveAuditResult', self.$qs.stringify(self.auditResult), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (response) {
          console.log(response)
          const _data = response.data
          if (_data.code === 200) {
            self.$message({
              message: '审核驳回',
              type: 'warning'
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
        this.$router.go(-1)
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
