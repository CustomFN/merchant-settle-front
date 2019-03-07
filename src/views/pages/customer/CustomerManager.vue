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
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text" @click="showOpLog()">操作记录</el-button>
            <el-button type="text">分配责任人</el-button>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchParam: {
        customerId: '',
        customerName: '',
        customerPrincipal: ''
      },
      tableData: [{
        customerId: 1,
        customerName: '客户1',
        customerType: '营业执照',
        customerPoiRelNum: 3,
        customerPrincipal: '责任人1',
        customerStatus: '审核中'
      }, {
        customerId: 2,
        customerName: '客户2',
        customerType: '个人证件',
        customerPoiRelNum: 3,
        customerPrincipal: '责任人2',
        customerStatus: '审核中'
      }, {
        customerId: 3,
        customerName: '客户3',
        customerType: '营业执照',
        customerPoiRelNum: 3,
        customerPrincipal: '责任人3',
        customerStatus: '审核中'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    createCustomer () {
      this.$router.push('/customer/customerinfo')
    },
    showOpLog () {
      this.$router.push('/customer/customeroplog')
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
