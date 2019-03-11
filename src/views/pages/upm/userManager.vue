<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="searchParam.status" clearable placeholder="状态">
              <el-option
                v-for="item in status"
                :key="item.statusId"
                :label="item.label"
                :value="item.statusId">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="用户ID" v-model="searchParam.userId"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input placeholder="用户名" v-model="searchParam.userName"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isShowAddVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList"  border style="width: 100%;">
      <el-table-column prop="id" label="序号" width="90px">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="200px">
      </el-table-column>
      <el-table-column prop="userNameSpell" label="用户姓名拼写" width="200px">
      </el-table-column>
      <el-table-column prop="userName" label="用户姓名" width="200px">
      </el-table-column>
      <el-table-column prop="roleNameList" label="拥有角色" >
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" width="130px">
      </el-table-column>
      <el-table-column  label="状态" width="130px">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 1">启用</el-tag>
          <el-tag size="small"  :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="250px">
        <template slot-scope="scope" >
         <el-button size="small" type="primary"  @click="showEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="showDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
                    background
                    :page-size="10"
                    @size-change="handleSizeChange"
                    :total="total"
                    @current-change="handleCurrentChange"
                    style="text-align:center;">
    </el-pagination>

    <!-- 新增用户 -->
    <el-dialog title="创建用户" :visible.sync="isShowAddVisible">
      <el-form label-width="80px" :model="submitForm" ref="dataForm">
        <el-form-item label="姓名拼音">
          <el-input v-model="submitForm.userNameSpell"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="submitForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-model="submitForm.status">
         <el-select v-model="submitForm.status" placeholder="启用状态">
            <el-option v-for="item in status"
                       :label="item.label"
                       :value="item.statusId"
                       :key="item.statusId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  class="title1" @click="createUser()">创建</el-button>
        <el-button @click="isShowAddVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog title="Edit" :visible.sync="isShowEditVisible">
      <el-form label-width="80px" ref="dataForm">
        <el-form-item label="用户ID">
          <el-input v-model="submitForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="submitForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="submitForm.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-model="submitForm.status">
         <el-select v-model="submitForm.status" placeholder="启用状态">
            <el-option v-for="item in status"
                       :label="item.label"
                       :value="item.statusId"
                       :key="item.statusId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditVisiable(false)">取消</el-button>
        <el-button type="primary" @click="submitEdit()"  class="title1">确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      width="30%">
      <span>确认删除 {{ deleteUserId }} 吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete(deleteUserId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  inject: ['reload'],
  data () {
    return {
      tableList: [],
      isShowEditVisible: false,
      isShowAddVisible: false,
      deleteVisible: false,
      submitForm: {
        userId: '',
        userNameSpell: '',
        userName: '',
        userPassword: '',
        status: ''
      },
      searchParam: {
        userId: '',
        userName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      page: 1,
      pageSize: 10,
      status: [
        {
          statusId: 1,
          label: '启用'
        }, {
          statusId: 2,
          label: '禁用'
        }
      ],
      deleteUserId: ''
    }
  },
  created () {
    this.fetchData()
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    saveOrUpdateUser () {
      let self = this
      this.$axios.post('/api/user/save', this.$qs.stringify(self.submitForm), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (200 === _data.code) {
          self.$message({
            message: '保存修改成功',
            type: 'success'
          })
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        console.log(err.response)
      })
    },
    createUser () {
      this.saveOrUpdateUser()
      this.isShowAddVisible = false
      this.reload()
    },
    showEdit (row) {
      this.showEditVisiable(true)
      this.submitForm.userId = row.userId
      this.submitForm.userNameSpell = row.userNameSpell
      this.submitForm.userName = row.userName
      this.submitForm.status = row.status
    },
    showEditVisiable (visiable) {
      this.isShowEditVisible = visiable
      this.resetSubmitForm()
    },
    submitEdit () {
      this.saveOrUpdateUser()
      this.showEditVisiable(false)
    },
    showDelete (row) {
      this.deleteVisible = true
      this.deleteUserId = row.userId
    },
    submitDelete (userId) {
      let self = this
      this.$axios.post('/api/user/delete', this.$qs.stringify({'userId': userId}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (200 == _data.code) {
          self.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        console.log(err.response)
      })
      this.deleteVisible = false
      self.reload()
    },
    fetchData () {
      console.log(this.searchParam)
      let self = this
      this.$axios.post('/api/user/list', this.$qs.stringify(self.searchParam), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (200 === _data.code) {
          self.tableList = _data.data.data
          self.page = _data.data.pageNum
          self.pageSize = _data.data.pageSize
          self.total = _data.data.totalSize
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
    doFilter () {
      this.fetchData()
    },
    handleSizeChange (val) {
      this.searchParam.pageNum = val
      console.log(this.page)
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.searchParam.pageNum = val
      console.log(this.page)
      this.fetchData()
    },
    resetSubmitForm () {
      this.submitForm = {}
    }
  }
}
</script>
