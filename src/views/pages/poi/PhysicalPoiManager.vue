y<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="物理城市" v-model="searchParam.physicalCityId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="物理门店ID" v-model="searchParam.physicalPoiId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="物理门店名称" v-model="searchParam.physicalPoiName"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="认领人" v-model="searchParam.physicalPoiPrincipal"></el-input>
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
          <el-table-column prop="physicalCityId" label="物理门店ID" width="150"></el-table-column>
          <el-table-column prop="physicalPoiName" label="物理门店名称"></el-table-column>
          <el-table-column prop="physicalPoiPhone" label="店内电话" width="200"></el-table-column>
          <el-table-column prop="physicalPoiAddress" label="地址"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text" @click="handleCooperate()">上单</el-button>
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
        physicalPoiId: '',
        physicalCityId: '',
        physicalPoiName: '',
        physicalPoiPrincipal: '王小虎'
      },
      tableData: [{
        physicalCityId: 1,
        physicalPoiName: '物理门店1',
        physicalPoiPhone: '12345678900',
        physicalPoiAddress: '北京市朝阳区望京国际研发园'
      }, {
        physicalCityId: 2,
        physicalPoiName: '物理门店2',
        physicalPoiPhone: '12345678900',
        physicalPoiAddress: '北京市朝阳区望京国际研发园'
      }, {
        physicalCityId: 3,
        physicalPoiName: '物理门店3',
        physicalPoiPhone: '12345678900',
        physicalPoiAddress: '北京市朝阳区望京国际研发园'
      }],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    handleCooperate () {
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
