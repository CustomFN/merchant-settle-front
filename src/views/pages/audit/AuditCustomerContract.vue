<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="图片审核">
              <img :src="image_1" class="audit-pic"/>
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
              <el-table-column prop="auditDataObj.contractId" label="合同ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.customerContractTypeStr" label="合同类型" width="180px"></el-table-column>
              <el-table-column prop="auditDataObj.customerContractNum" label="合同编号"></el-table-column>
              <el-table-column prop="auditDataObj.contractEndTime" label="合同有效期" width="180px">
                <template slot-scope="scope">
                  <p>{{ scope.row.auditDataObj.contractEndTime | dateformat }}</p>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.partyA" label="甲方"></el-table-column>
              <el-table-column prop="auditDataObj.partyAContactPerson" label="甲方签约人" width="120"></el-table-column>
              <el-table-column prop="auditDataObj.partyAContactPersonPhone" label="甲方签约人手机号" width="180"></el-table-column>
              <el-table-column label="甲方签约时间" width="120">
                <template slot-scope="scope">
                  <p>{{ scope.row.auditDataObj.partyASignTime | dateformat }}</p>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.partyB" label="乙方"></el-table-column>
              <el-table-column prop="auditDataObj.partyBContactPerson" label="乙方签约人" width="120"></el-table-column>
              <el-table-column prop="auditDataObj.partyBContactPersonPhone" label="乙方签约人手机号" width="180"></el-table-column>
              <el-table-column label="乙方签约时间" width="120">
                <template slot-scope="scope">
                  <p>{{ scope.row.auditDataObj.partyBSignTime | dateformat }}</p>
                </template>
              </el-table-column>
            </el-table>
            <div class="container-right-bottom">
              <div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="auditResult.result"></el-input>
              </div>
              <div class="container-right-bottom-btn">
                <el-button type="primary" @click="submitAuditPass">审核通过</el-button>
                <el-button type="danger" @click="submitAuditReject">审核驳回</el-button>
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
      tableData: [],
      auditResult: {
        auditTaskId: 0,
        auditStatus: 203,
        result: '',
        opUser: ''
      }
    }
  },
  mounted () {
    this.taskId = this.auditResult.auditTaskId = this.$store.state.auditTaskId
    this.opUser = this.$store.state.userId
    this.fetchData()
  },
  methods: {
    fetchData () {
      let self = this
      let targetUrl = '/api/audit/detail/' + this.taskId
      console.log(targetUrl)
      this.$axios.post(targetUrl, {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.tableData = _data.data
          let images = _data.data[0].auditDataObj.contractScanArr
          self.image_1 = images[0]
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
    submitAuditPass () {
      let self = this
      this.auditResult.auditStatus = this.$store.state.auditPassStatus
      this.$axios.post('/api/audit/saveAuditResult', this.$qs.stringify(self.auditResult), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
            'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
  .audit-pic {
    width: 480px
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
}

</style>
