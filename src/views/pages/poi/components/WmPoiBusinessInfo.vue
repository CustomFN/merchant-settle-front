<template>
<div>
  <el-alert type="error" v-if="submitForm.businessInfoAuditResult">{{ submitForm.businessInfoAuditResult }}</el-alert>
  <div class="container-core">
    <div class="core-tag">
      <el-tag v-if="submitForm.businessInfoStatusStr" type="success">{{ submitForm.businessInfoStatusStr }}</el-tag>
    </div>
    <el-form ref="form" :model="submitForm" label-width="120px" size="medium">
      <el-form-item label="订餐日期">
         <el-checkbox-group v-model="submitForm.orderMealDateList" size="mini">
           <el-checkbox-button v-for="city in week" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="订餐时间">
        <el-time-select  v-bind:disabled="editDisabled"
          placeholder="起始时间"
          v-model="submitForm.orderMealStartTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select  v-bind:disabled="editDisabled"
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
        <el-input v-model="submitForm.orderMealTel" v-bind:disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit" v-bind:disabled="editDisabled">保存并提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
const weekOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  name: 'WmPoiBusinessInfo',
  data () {
    return {
      submitForm: {
        id: this.$store.state.wmPoiId,
        orderMealDateList: [],
        orderMealStartTime: '',
        orderMealEndTime: '',
        orderMealTel: ''
      },
      showTime: {
        orderMealStartTime: '',
        orderMealEndTime: ''
      },
      week: weekOptions,
      editDisabled: false
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user != null) {
      if (this.submitForm.id != null && this.submitForm.id > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    onSubmit () {
      let self = this
      this.$axios.post('/api/wmpoi/businessinfo/save/', this.$qs.stringify(this.submitForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.$message({
            message: '保存成功',
            type: 'success'
          })
          self.handleShowWmPoiBusinessInfo(_data.data)
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
    fetchData () {
      let self = this
      let targetUrl = '/api/wmpoi/businessinfo/show/' + this.submitForm.id
      this.$axios.post(targetUrl, this.$qs.stringify({'effective': 0}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          if (_data.data != null) {
            self.handleShowWmPoiBusinessInfo(_data.data)
          }
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
    handleShowWmPoiBusinessInfo (data) {
      this.submitForm = data
      this.submitForm.orderMealDateList = data.orderMealDateList == null ? [] : data.orderMealDateList
      // 处理是否可修改
      if (data.businessInfoStatus === 412) {
        this.editDisabled = true
      }
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
