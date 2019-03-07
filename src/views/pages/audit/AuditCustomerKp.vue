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
            <el-table :data="tableData" border style="width: 121px">
              <el-table-column prop="customerId" label="客户ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 361px">
              <el-table-column prop="kpType" label="KP类型" width="120px"></el-table-column>
              <el-table-column prop="kpSiginType" label="KP签约类型" width="120px"></el-table-column>
              <el-table-column prop="kpName" label="KP姓名" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="kpCertificatesType" label="证件类型" width="240"></el-table-column>
              <el-table-column prop="kpCertificatesNum" label="证件号码"></el-table-column>
              <el-table-column prop="kpPhoneNum" label="手机号"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="bankName" label="银行"></el-table-column>
              <el-table-column prop="bankNum" label="银行卡号"></el-table-column>
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
        kpType: '签约人',
        kpSiginType: '法人代表',
        kpName: '朱家琨',
        kpCertificatesType: '中国居民身份证',
        kpCertificatesNum: '1234567890000',
        kpPhoneNum: '123456789',
        bankName: '北京市-朝阳区-中国建设银行',
        bankNum: '6666666666666666'
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
