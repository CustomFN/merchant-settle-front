<template>
  <div class="container-core">
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="订餐日期">
         <el-checkbox-group v-model="submitForm.orderMealDate" size="mini">
          <el-checkbox-button v-for="day in week" :label="day" :key="day">{{day}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="订餐时间">
        <el-time-select
          placeholder="起始时间"
          v-model="submitForm.orderMealStartTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="submitForm.orderMealEndTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            minTime: submitForm.orderMealStartTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="订餐电话">
        <el-input v-model="submitForm.orderMealTel"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  name: 'WmPoiBusinessInfo',
  data () {
    return {
      submitForm: {
        orderMealDate: [],
        orderMealStartTime: '',
        orderMealEndTime: '',
        orderMealTel: ''
      },
      week: weekOptions
    }
  },
  methods: {
    onSubmit () {
      console.log(this.submitForm.orderMealStartTime + ' - ' + this.submitForm.orderMealEndTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-core {
  text-align: left;
  margin: 20px;
  float: left;
  .el-form {
    width: 510px;
  }
}
</style>
