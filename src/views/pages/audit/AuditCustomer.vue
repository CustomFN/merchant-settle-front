<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="图片审核">
              <img :src="image_1" class="audit-pic"/>
              <img :src="image_2" class="audit-pic"/>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="customerId" label="客户ID" width="120"></el-table-column>
              <el-table-column prop="customerType" label="客户类型" width="120"></el-table-column>
              <el-table-column prop="customerName" label="客户名称"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="customerCertificatesNum" label="客户证件号" width="240"></el-table-column>
              <el-table-column prop="customerCertificatesAddress" label="客户证件地址"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="customerLegalPerson" label="客户法人/经营者" width="240"></el-table-column>
              <el-table-column prop="customerValidTime" label="客户有效期"></el-table-column>
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
      textarea: '',
      tableData: [{
        customerId: '1',
        customerType: '营业执照',
        customerName: '北京三快在线科技有限公司',
        customerCertificatesNum: '911111111111111',
        customerCertificatesAddress: '北京市朝阳区望京国际研发园',
        customerLegalPerson: '王兴',
        customerValidTime: '2033-12-22'
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
