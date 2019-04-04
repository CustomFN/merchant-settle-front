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
          </el-tabs>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="customerId" label="客户ID" width="120"></el-table-column>
              <el-table-column prop="auditDataObj.customerTypeStr" label="客户类型" width="120"></el-table-column>
              <el-table-column prop="auditDataObj.customerName" label="客户名称"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.customerCertificatesNum" label="客户证件号" width="240"></el-table-column>
              <el-table-column prop="auditDataObj.customerCertificatesAddress" label="客户证件地址"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="auditDataObj.customerLegalPerson" label="客户法人/经营者" width="240"></el-table-column>
              <el-table-column label="客户有效期">
                <template slot-scope="scope">
                  <p>{{ scope.row.auditDataObj.customerValidTime | dateformat }}</p>
                </template>
              </el-table-column>
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
      }
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
          self.tableData = _data.data
          let images = _data.data[0].auditDataObj.customerCertificatesPicArr
          self.image_1 = images[0]
          self.image_2 = images[1]
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
  .audit-pic {
    width: 480px
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
}

</style>
