<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="图片审核">
              <img :src="image_1" class="audit-pic"/>
              <img :src="image_2" class="audit-pic"/>
              <img :src="image_3" class="audit-pic"/>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width:241px">
              <el-table-column prop="customerId" label="客户ID" width="120px"></el-table-column>
              <el-table-column prop="contractId" label="合同ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="customerContractType" label="合同类型" width="180px"></el-table-column>
              <el-table-column prop="customerContractNum" label="合同编号"></el-table-column>
              <el-table-column prop="contractEndTime" label="合同有效期" width="180px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="partyA" label="甲方"></el-table-column>
              <el-table-column prop="partyAContactPerson" label="甲方签约人" width="120"></el-table-column>
              <el-table-column prop="partyAContactPersonPhone" label="甲方签约人手机号" width="180"></el-table-column>
              <el-table-column prop="partyASignTime" label="甲方签约时间" width="120"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="partyB" label="乙方"></el-table-column>
              <el-table-column prop="partyBContactPerson" label="乙方签约人" width="120"></el-table-column>
              <el-table-column prop="partyBContactPersonPhone" label="乙方签约人手机号" width="180"></el-table-column>
              <el-table-column prop="partyBSignTime" label="乙方签约时间" width="120"></el-table-column>
            </el-table>
            <div class="container-right-bottom">
              <div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
              </div>
              <div class="container-right-bottom-btn">
                <el-button type="primary">审核通过</el-button>
                <el-button type="danger">审核驳回</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image_1: 'http://pniquhm38.bkt.clouddn.com/2ec37620-7b8b-4d01-b180-df72753c78ba',
      image_2: 'http://pniquhm38.bkt.clouddn.com/2ec37620-7b8b-4d01-b180-df72753c78ba',
      image_3: 'http://pniquhm38.bkt.clouddn.com/2ec37620-7b8b-4d01-b180-df72753c78ba',
      textarea: '',
      tableData: [{
        customerId: '1',
        contractId: '1',
        customerContractType: '商家-平台',
        customerContractNum: 'WM-P-123456789',
        contractEndTime: '2020-03-06',
        partyA: '甲方',
        partyAContactPerson: '朱家琨',
        partyAContactPersonPhone: '12345678900',
        partyASignTime: '2019-03-06',
        partyB: '乙方',
        partyBContactPerson: '朱家琨',
        partyBContactPersonPhone: '12345678900',
        partyBSignTime: '2019-03-06'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.container-left, .container-right {
  text-align: left;
  margin-left: 30px;
  padding: 0%;
  .audit-pic {
    width: 480px
  }
}
.container-right-bottom, .container-right-bottom-btn {
  margin-top: 10px
}

</style>
