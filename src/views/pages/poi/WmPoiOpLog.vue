<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="外卖门店ID" v-model="searchParam.wmPoiId" disabled></el-input>
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
          <el-table-column prop="module" label="模块" width="100"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column label="操作人" width="150">
            <template slot-scope="scope">
              <p> {{ scope.row.opUser }}({{ scope.row.opUserId }})</p>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" width="200">
            <template slot-scope="scope">
              <p>{{ scope.row.ctime | dateformat('YYYY-DD-MM HH:mm:ss') }}</p>
            </template>
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
        wmPoiId: '',
        module: '',
        content: '',
        opUserId: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    } else {
      this.searchParam.wmPoiId = this.$store.state.wmPoiId
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      let self = this
      this.$axios.post('/api/wmpoi/log/list', this.$qs.stringify(self.searchParam), {
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
.container-footer {
  margin-top: 20px;
  .pagination {
    margin-top: 10px;
  }
}
</style>
