<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="配送方式">
         <el-checkbox-group v-model="submitForm.wmDeliveryType" size="mini">
          <el-checkbox-button v-for="deliveryType in deliveryTypes" :label="deliveryType" :key="deliveryType">{{deliveryType}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="平台分成比例/%">
        <el-input v-model="submitForm.poportion"></el-input>
      </el-form-item>
      <el-form-item label="商家保底收入">
        <el-input v-model="submitForm.minMoney"></el-input>
      </el-form-item>
      <el-form-item label="配送方案">
        <el-tabs type="border-card">
          <el-tab-pane label="正常时段">
            <div class="container-core-left">
              <el-form ref="form" :model="submitForm" label-width="80px" size="small">
                <el-form-item label="起送价/元">
                  <el-input v-model="submitForm.wmPoiProjectList.minDeliveryPrice"></el-input>
                </el-form-item>
                <el-form-item label="配送费/元">
                  <el-input v-model="submitForm.wmPoiProjectList.minDeliveryPrice"></el-input>
                </el-form-item>
                <el-form-item label="配送范围">
                  <el-button>开始标注</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="container-core-right">

            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'WmPoiDeliveryInfo',
  data () {
    return {
      submitForm: {
        wmDeliveryType: [],
        poportion: '',
        minMoney: '',
        wmPoiProjectList: [{
          minDeliveryPrice: '',
          dispatcherMoney: '',
          deliveryAreaType: '',
          deliveryArea: []
        }]
      },
      deliveryTypes: ['平台配送', '商家自配']
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  margin: 20px;
  width: 780px;
  float: left;
  .el-form {
    width: 100%;
  }
  .container-core-left {
    width: 150px;
    float: left;
  }
}
</style>
