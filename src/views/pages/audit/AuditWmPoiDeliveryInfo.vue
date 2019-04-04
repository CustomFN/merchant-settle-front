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
                    <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity"></el-amap-circle>
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
              <el-table-column prop="auditDataObj.wmPoiId" label="门店ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmDeliveryType" label="门店配送方式"></el-table-column>
              <el-table-column prop="auditDataObj.poportion" label="平台分成比例/%"></el-table-column>
              <el-table-column prop="auditDataObj.minMoney" label="商家保底收入/元" ></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.wmPoiProjectList[0].minDeliveryPrice" label="起送价/元"></el-table-column>
              <el-table-column prop="auditDataObj.wmPoiProjectList[0].dispatcherMoney" label="配送费/元"></el-table-column>
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
      tableData: [],
      auditResult: {
        auditTaskId: 0,
        auditStatus: 203,
        result: '',
        opUser: ''
      },
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
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    } else {
      this.auditResult.auditTaskId = this.$store.state.auditTaskId
      this.auditResult.opUser = user.userId
      this.fetchData()
    }
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
      let area = data[0].auditDataObj.wmPoiProjectList[0].deliveryArea[0]
      let mapPosition = [Number(area[0]), Number(area[1])]
      this.mapCenter = this.circles[0].center = mapPosition
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
