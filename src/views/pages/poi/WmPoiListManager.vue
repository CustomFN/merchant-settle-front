y<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="外卖城市" v-model="searchParam.wmCityId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="外卖门店ID" v-model="searchParam.wmPoiId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="外卖门店名称" v-model="searchParam.wmPoiName"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="外卖门店责任人" v-model="searchParam.wmPoiPrincipal"></el-input>
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
          <el-table-column prop="wmPoiId" label="门店ID" width="100"></el-table-column>
          <el-table-column prop="wmPoiName" label="门店名称"></el-table-column>
          <el-table-column prop="wmPoiTel" label="电话" width="130"></el-table-column>
          <el-table-column prop="wmPoiAddress" label="地址"></el-table-column>
          <el-table-column prop="wmPoiCategory" label="品类" width="160"></el-table-column>
          <el-table-column label="上单状态" width="80">
            <template slot-scope="scope">
              <el-tag size="small" type="">{{ scope.row.wmPoiCoopState }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="wmPoiPrincipal" label="门店责任人" width="100"></el-table-column>
          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <el-button type="text" @click="handleUpdate(scope.row)">修改信息</el-button>
              <el-button type="text" @click="showDistribution(scope.row)">分配门店责任人</el-button>
              <el-button type="text" @click="showOpLog(scope.row)">操作日志</el-button>
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

    <el-dialog title="分配责任人" :visible.sync="isShowDistributionVisible">
      <el-form label-width="100px" :model="distributeParam">
        <el-form-item label="门店责任人">
          <el-input v-model="distributeParam.wmPoiPrincipal"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDistributionVisible = false">取消</el-button>
        <el-button type="primary" @click="submitDistribution()">分配</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowDistributionVisible: false,
      distributeParam: {
        wmPoiId: 0,
        wmPoiPrincipal: ''
      },
      searchParam: {
        wmPoiId: '',
        wmCityId: '',
        wmPoiName: '',
        wmPoiPrincipal: '',
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
    this.fetchData()
  },
  methods: {
    fetchData () {
      console.log(this.searchParam)
      let self = this
      this.$axios.post('/api/wmpoi/list', this.$qs.stringify(self.searchParam), {
        headers: {
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
    showOpLog (row) {
      this.$store.dispatch('setWmPoiIdAction', row.wmPoiId)
      this.$router.push('/poi/wmpoioplog')
    },
    handleUpdate (row) {
      this.$store.dispatch('setWmPoiIdAction', row.wmPoiId)
      this.$router.push('/poi/wmpoiinfo')
    },
    showDistribution (row) {
      this.isShowDistributionVisible = true
      this.distributeParam.wmPoiId = row.wmPoiId
    },
    submitDistribution () {
      console.log(this.distributeParam)
      let self = this
      this.$axios.post('/api/wmpoi/distributePrincipal', this.$qs.stringify(self.distributeParam), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '分配责任人成功',
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
      this.isShowDistributionVisible = false
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
