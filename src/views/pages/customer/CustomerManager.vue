<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="客户ID" v-model="searchParam.customerId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="客户名称" v-model="searchParam.customerName"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="责任人" v-model="searchParam.customerPrincipal"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card container-footer">
      <div class="container-footer-top">
        <el-button type="primary" @click="createCustomer()">新建客户</el-button>
      </div>
      <div class="container-footer-bottom">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="customerId" label="客户ID" width="150"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" width="200"></el-table-column>
          <el-table-column prop="customerType" label="客户类型" width="200"></el-table-column>
          <el-table-column prop="customerPoiRelNum" label="客户关联门店数" width="250"></el-table-column>
          <el-table-column prop="customerPrincipal" label="客户责任人" width="200"></el-table-column>
          <el-table-column prop="customerStatus" label="客户状态" width="200"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" @click="handleUpdate()">编辑</el-button>
            <el-button type="text" @click="deleteVisible = true">删除</el-button>
            <el-button type="text" @click="showOpLog()">操作记录</el-button>
            <el-button type="text" @click="isShowDistributionVisible = true">分配责任人</el-button>
          </el-table-column>
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

    <el-dialog title="分配责任人" :visible.sync="isShowDistributionVisible">
      <el-form label-width="100px">
        <el-form-item label="客户责任人">
          <el-input v-model="customerPrincipal"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDistributionVisible = false">取消</el-button>
        <el-button type="primary" class="title1">分配</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowDistributionVisible: false,
      deleteVisible: false,
      customerPrincipal: '',
      searchParam: {
        customerId: '',
        customerName: '',
        customerPrincipal: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleUpdate () {
      this.$router.push('/customer/customerinfo')
    },
    createCustomer () {
      this.$router.push('/customer/customerinfo')
    },
    submitDelete () {
    },
    showOpLog () {
      this.$router.push('/customer/customeroplog')
    },
    fetchData () {
      console.log(this.searchParam)
      let self = this
      this.$axios.post('/api/customer/list', this.$qs.stringify(self.searchParam), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
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
    doFilter () {
      this.fetchData()
    },
    handleSizeChange (val) {
      this.searchParam.pageNum = val
      console.log(this.page)
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.searchParam.pageNum = val
      console.log(this.page)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-footer {
  margin-top: 20px;
  .container-footer-top {
    float: left;
  }
  .container-footer-bottom {
    margin-top: 50px;
  }
  .pagination {
    margin-top: 10px;
  }
}
</style>
