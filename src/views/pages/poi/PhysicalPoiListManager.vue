y<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="物理城市" v-model="searchParam.physicalCityId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="物理门店ID" v-model="searchParam.id"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="物理门店名称" v-model="searchParam.physicalPoiName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card container-footer">
      <div class="container-footer-top">
        <el-button type="primary" @click="createPhysicalPoi()">新建物理门店</el-button>
      </div>
      <div class="container-footer-bottom">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="物理门店ID" width="150"></el-table-column>
          <el-table-column prop="physicalPoiName" label="物理门店名称"></el-table-column>
          <el-table-column prop="physicalPoiPhone" label="店内电话" width="200"></el-table-column>
          <el-table-column prop="physicalPoiAddress" label="地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="claimphysicalPoi(scope.row)">认领</el-button>
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
        id: '',
        physicalCityId: '',
        physicalPoiName: '',
        claimed: 0,
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
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      let self = this
      this.$axios.post('/api/physicalpoi/listall', this.$qs.stringify(self.searchParam), {
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
    claimphysicalPoi (row) {
      let self = this
      let api = '/api/physicalpoi/claim/' + row.id
      this.$axios.post(api, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '认领成功',
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
      this.fetchData()
    },
    createPhysicalPoi () {
      this.$router.push('/poi/physicalpoiinfo')
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
