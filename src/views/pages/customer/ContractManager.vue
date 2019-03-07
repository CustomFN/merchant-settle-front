<template>
  <div class="app-container">
    <el-card class="box-card">
      <div>
        <el-form :inline="true">
          <el-form-item >
            <el-input placeholder="客户ID" v-model="searchParam.customerId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="合同ID" v-model="searchParam.contractId"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="合同编号" v-model="searchParam.contractNum"></el-input>
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
          <el-table-column prop="contractId" label="合同ID" width="100"></el-table-column>
          <el-table-column prop="contractNum" label="合同编号" width="200"></el-table-column>
          <el-table-column prop="partyAName" label="甲方名称" width="250"></el-table-column>
          <el-table-column prop="partyASignerName" label="甲方签约人" width="120"></el-table-column>
          <el-table-column prop="partyBSignerName" label="乙方签约人" width="120"></el-table-column>
          <el-table-column prop="principal" label="合同责任人" width="150"></el-table-column>
          <el-table-column prop="auditStatus" label="合同状态" width="100"></el-table-column>
          <el-table-column prop="signerTime" label="签约时间" width="120"></el-table-column>
          <el-table-column prop="contractValidTime" label="合同有效期" width="120"></el-table-column>
          <el-table-column prop="contractType" label="合同类型" width="120"></el-table-column>
          <el-table-column label="操作">
            <el-button type="text">查看</el-button>
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
        contractId: '',
        contractNum: ''
      },
      tableData: [{
        contractId: 1,
        contractNum: 'WM-P-10000001',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人1',
        partyBSignerName: '乙方签约人1',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }, {
        contractId: 2,
        contractNum: 'WM-P-10000002',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人2',
        partyBSignerName: '乙方签约人2',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
      }, {
        contractId: 3,
        contractNum: 'WM-P-10000003',
        partyAName: '甲方1',
        partyASignerName: '甲方签约人3',
        partyBSignerName: '乙方签约人3',
        principal: '朱家琨',
        auditStatus: '审核中',
        signerTime: '2019-03-07',
        contractValidTime: '2020-03-07',
        contractType: '纸质合同'
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
