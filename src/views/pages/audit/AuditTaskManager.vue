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
        <el-tabs type="border-card">
          <el-tab-pane label="待分配">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="taskId" label="任务ID" width="150"></el-table-column>
              <el-table-column prop="auditType" label="审核类型" width="200"></el-table-column>
              <el-table-column prop="applicationType" label="申请类型" width="200"></el-table-column>
              <el-table-column prop="applicationTime" label="申请时间" width="250"></el-table-column>
              <el-table-column prop="commitor" label="提交人" width="200"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="handleAudit()">分配</el-button>
                <el-button type="text" @click="handleView()">查看</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已完成">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="taskId" label="任务ID" width="150"></el-table-column>
              <el-table-column prop="auditType" label="审核类型" width="200"></el-table-column>
              <el-table-column prop="applicationType" label="申请类型" width="200"></el-table-column>
              <el-table-column prop="applicationTime" label="申请时间" width="250"></el-table-column>
              <el-table-column prop="commitor" label="提交人" width="200"></el-table-column>
              <el-table-column label="操作">
                <el-button type="text" @click="handleView()">查看</el-button>
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
        submitterId: ''
      },
      tableData: [{
        taskId: '1',
        auditType: '基本信息审核',
        applicationType: '新建',
        applicationTime: '2016-05-02',
        commitor: '朱家琨'
      }, {
        taskId: '2',
        auditType: '基本信息审核',
        applicationType: '新建',
        applicationTime: '2016-05-02',
        commitor: '朱家琨'
      }, {
        taskId: '3',
        auditType: '基本信息审核',
        applicationType: '新建',
        applicationTime: '2016-05-02',
        commitor: '朱家琨'
      }, {
        taskId: '4',
        auditType: '基本信息审核',
        applicationType: '新建',
        applicationTime: '2016-05-02',
        commitor: '朱家琨'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    handleAudit () {
    },
    handleView () {
      this.$router.push('/audit/auditwmpoibaseinfo')
    },
    handleSizeChange (val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    currentChangePage (list) {
      let from = (this.page - 1) * this.pageSize
      const to = this.page * this.pageSize
      this.tableList = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableList.push(list[from])
        }
      }
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
