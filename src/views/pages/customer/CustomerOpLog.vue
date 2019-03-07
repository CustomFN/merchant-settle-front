<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="客户ID" v-model="searchParam.customerId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="模块" v-model="searchParam.module"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="内容" v-model="searchParam.content"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="操作人" v-model="searchParam.opUser"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card container-footer">
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="120"></el-table-column>
          <el-table-column prop="customerId" label="客户ID" width="120"></el-table-column>
          <el-table-column prop="module" label="模块" width="150"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="opUser" label="操作人" width="150"></el-table-column>
          <el-table-column prop="ctime" label="操作时间" width="200"></el-table-column>
        </el-table>
      </div>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchParam: {
        customerId: '',
        module: '',
        content: '',
        opUser: ''
      },
      tableData: [{
        id: 1,
        customerId: 1,
        module: '客户基本信息',
        content: '新建客户',
        opUser: '朱家琨',
        ctime: '2019-03-07 12:12:12'
      }, {
        id: 2,
        customerId: 1,
        module: '客户KP信息',
        content: '新建KP',
        opUser: '朱家琨',
        ctime: '2019-03-07 12:13:12'
      }, {
        id: 3,
        customerId: 1,
        module: '客户合同信息',
        content: '新建合同',
        opUser: '朱家琨',
        ctime: '2019-03-07 12:14:13'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
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
.container-footer {
  margin-top: 20px;
  .pagination {
    margin-top: 10px;
  }
}
</style>
