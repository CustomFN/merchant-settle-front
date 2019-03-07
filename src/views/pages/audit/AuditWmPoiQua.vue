<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="container-left">
        <el-col :span="10">
          <el-tabs type="border-card">
            <el-tab-pane label="个人证件">
              <img :src="image_1" class="audit-pic"/>
              <img :src="image_2" class="audit-pic"/>
            </el-tab-pane>
            <el-tab-pane label="营业执照">
              <img :src="image_3" class="audit-pic"/>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </div>
      <div class="container-right">
        <el-col :span="12">
          <h3>审核信息</h3>
          <div class="">
            <el-table :data="tableData" border style="width:121px">
              <el-table-column prop="wmPoiId" label="门店ID" width="120px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiLinkManIDCardType" label="门店经营者证件类型"  width="180px"></el-table-column>
              <el-table-column prop="wmPoiLinkManName" label="门店经营者姓名"  width="180px"></el-table-column>
              <el-table-column prop="wmPoiLinkManIDCardNo" label="门店经营者证件号码"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiBusinessLicenceNo" label="营业执照号码"></el-table-column>
              <el-table-column prop="wmPoiOperatorName" label="法定代表人" width="180px"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiBusinessLicenceName" label="名称"></el-table-column>
              <el-table-column prop="wmPoiBusinessLicenceAddress" label="经营地址"></el-table-column>
            </el-table>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="wmPoiRegistrationDate" label="注册日期"></el-table-column>
              <el-table-column prop="wmPoiRegisterDepartment" label="登记机关"></el-table-column>
              <el-table-column prop="wmPoiBusinessLicenceValidTime" label="营业执照有效期"></el-table-column>
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
        wmPoiId: '1',
        wmPoiLinkManIDCardType: '中国居民身份证',
        wmPoiLinkManName: '全渠道',
        wmPoiLinkManIDCardNo: '4521231111111',
        wmPoiBusinessLicenceNo: '111111111111111',
        wmPoiOperatorName: '朱家琨',
        wmPoiBusinessLicenceName: '北京黄焖鸡米饭有限公司',
        wmPoiBusinessLicenceAddress: '北京市朝阳区望京国际研发园',
        wmPoiRegistrationDate: '2018-12-11',
        wmPoiRegisterDepartment: '北京市朝阳区工商局',
        wmPoiBusinessLicenceValidTime: '2020-12-11'
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
