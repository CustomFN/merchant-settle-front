<template>
  <div class="app-container">
      <div class="container-header">
        <el-col :span="24" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item >
              <el-input placeholder="客户ID" v-model="searchParam.customerId"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input placeholder="门店ID" v-model="searchParam.poiId"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input placeholder="任务提交人" v-model="searchParam.submitterId"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
      <div class="container-footer">
        <el-tabs type="border-card" v-model="activeName"  @tab-click="getTabData">
          <el-tab-pane label="待处理" name="1">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="任务ID" width="150"></el-table-column>
              <el-table-column prop="auditTypeStr" label="审核类型" width="200"></el-table-column>
              <el-table-column prop="auditApplicationTypeStr" label="申请类型" width="200"></el-table-column>
              <el-table-column label="申请时间" width="250">
                <template slot-scope="scope">
                  <p>{{ scope.row.ctime | dateformat('YYYY-DD-MM HH:mm:ss') }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="submitterId" label="提交人" width="200"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleAudit(scope.row)">处理</el-button>
                  <el-button type="text" @click="handleView(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="2">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="任务ID" width="150"></el-table-column>
              <el-table-column prop="auditTypeStr" label="审核类型" width="200"></el-table-column>
              <el-table-column prop="auditApplicationTypeStr" label="申请类型" width="200"></el-table-column>
              <el-table-column label="申请时间" width="250">
                <template slot-scope="scope">
                  <p>{{ scope.row.ctime | dateformat('YYYY-DD-MM HH:mm:ss') }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="commitor" label="提交人" width="200"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleView(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <div class="pagination">
            <!--工具条-->
            <el-pagination layout="total, prev, pager, next"
                            background
                            :page-size="10"
                            @size-change="handleSizeChange"
                            :total="total"
                            @current-change="handleCurrentChange"
                            style="text-align:center;">
            </el-pagination>
          </div>
        </el-tabs>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchParam: {
        customerId: '',
        poiId: '',
        submitterId: '',
        transactor: '',
        completed: 0,
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
      activeName: '1',
      isTab1: true,
      isTab2: false
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    } else {
      this.searchParam.transactor = user.userId
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      let self = this
      this.$axios.post('/api/audit/list', this.$qs.stringify(self.searchParam), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.tableData = _data.data.data
          self.page = _data.data.pageNum
          self.pageSize = _data.data.pageSize
          self.total = _data.data.totalSize
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
    handleAudit (row) {
      this.handleViewRoute(row.id, row.auditType)
    },
    handleView (row) {
      this.handleViewRoute(row.id, row.auditType)
    },
    handleViewRoute (auditTaskId, auditType) {
      this.$store.dispatch('setAuditTaskIdAction', auditTaskId)
      let self = this
      if (auditType === 1) {
        self.$router.push('/audit/auditcustomer')
      } else if (auditType === 2) {
        self.$router.push('/audit/auditcustomerkp')
      } else if (auditType === 3) {
        self.$router.push('/audit/auditcustomercontract')
      } else if (auditType === 4) {
        self.$router.push('/audit/auditcustomersettle')
      } else if (auditType === 5) {
        self.$router.push('/audit/auditwmpoibaseinfo')
      } else if (auditType === 6) {
        self.$router.push('/audit/auditwmpoiqua')
      } else if (auditType === 7) {
        self.$router.push('/audit/auditwmpoideliveryinfo')
      } else if (auditType === 8) {
        self.$router.push('/audit/auditwmpoibusinessinfo')
      }
    },
    getTabData (tab) {
      let self = this
      if (tab.name === '1') {
        self.isTab1 = true
        self.isTab2 = false
        self.searchParam.completed = 0
        self.fetchData()
      } else if (tab.name === '2') {
        self.isTab1 = false
        self.isTab2 = true
        self.searchParam.completed = 1
        self.fetchData()
      }
    },
    doFilter () {
      this.fetchData()
    },
    handleSizeChange (val) {
      this.searchParam.pageNum = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.searchParam.pageNum = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-header {
  height: 80px
}
.container-footer {
  margin-top: 10px;
  .pagination {
    margin-top: 10px;
  }
}
</style>
