y<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="外卖城市" v-model="searchParam.wmPoiId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="外卖门店ID" v-model="searchParam.wmCityId"></el-input>
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
          <el-table-column prop="id" label="门店ID" width="100"></el-table-column>
          <el-table-column prop="wmPoiName" label="门店名称"></el-table-column>
          <el-table-column prop="wmPoiPhone" label="电话" width="130"></el-table-column>
          <el-table-column prop="wmPoiAddress" label="地址"></el-table-column>
          <el-table-column prop="wmPoiCategory" label="品类" width="180"></el-table-column>
          <el-table-column prop="status" label="上单状态" width="100"></el-table-column>
          <el-table-column prop="wmPoiPrincipal" label="门店责任人" width="120"></el-table-column>
          <el-table-column label="操作" width="200">
            <el-button type="text" @click="handleUpdate()">修改信息</el-button>
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
        wmCityId: '',
        wmPoiName: '',
        wmPoiPrincipal: '王小虎'
      },
      tableData: [{
        id: 1,
        wmPoiName: '外卖门店1',
        wmPoiPhone: '12345678900',
        wmPoiAddress: '北京市朝阳区望京国际研发园',
        wmPoiCategory: '主食/米饭',
        status: '上单中',
        wmPoiPrincipal: '朱家琨'
      }, {
        id: 2,
        wmPoiName: '外卖门店2',
        wmPoiPhone: '12345678900',
        wmPoiAddress: '北京市朝阳区望京国际研发园',
        wmPoiCategory: '主食/米饭',
        status: '上单中',
        wmPoiPrincipal: '朱家琨'
      }, {
        id: 3,
        wmPoiName: '外卖门店3',
        wmPoiPhone: '12345678900',
        wmPoiAddress: '北京市朝阳区望京国际研发园',
        wmPoiCategory: '主食/米饭',
        status: '上单中',
        wmPoiPrincipal: '朱家琨'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    handleUpdate () {
      this.$router.push('/poi/wmpoiinfo')
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
  .pagination {
    margin-top: 10px;
  }
}
</style>
