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
        <template slot-scope="scope">
          <el-tag size="small" :type="''" v-for="(item, index) in scope.row.roleNameList" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="false" prop="roleIdList" label="拥有角色ID" >
      </el-table-column>
      <el-table-column  label="创建时间" width="130px">
        <template slot-scope="scope">
          <p>{{ scope.row.ctime | dateformat }}</p>
        </template>
      </el-table-column>
      <el-table-column  label="状态" width="130px">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 1">启用</el-tag>
          <el-tag size="small"  :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="250px">
        <template slot-scope="scope">
          <el-button size="small" type="primary"  @click="showRole(scope.row)">角色</el-button>
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
      <el-form label-width="80px" :model="submitForm">
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

    <el-dialog title="用户角色分配" :visible.sync="isShowRoleVisible">
      <el-form label-width="80px" :model="userRole">
        <el-form-item label="用户ID">
          <el-input v-model="userRole.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="userRole.userName" disabled></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-form :inline="true" :model="roleSearchParam">
          <el-form-item >
            <el-input placeholder="角色名称" v-model="roleSearchParam.roleName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doFilterRole()"><i class="el-icon-search"></i>搜索</el-button>
          </el-form-item>
          </el-form>
        <el-tree
          :data="rolesTree"
          show-checkbox
          node-key="roleId"
          default-expand-all
          ref="tree"
          :expand-on-click-node="false"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUserRole()">保存</el-button>
        <el-button @click="isShowRoleVisible = false">取消</el-button>
      </div>

      <!--工具条-->
      <el-pagination layout="total, prev, pager, next"
                      background
                      :page-size="10"
                      @size-change="handleSearchSizeChange"
                      :total="roleSearchParam.total"
                      @current-change="handleSearchCurrentChange"
                      style="text-align:center;">
      </el-pagination>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      :model="deleteParam"
      width="30%">
      <span>确认删除 {{this.deleteParam.userName}}({{ this.deleteParam.userId }}) 吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete(deleteParam.userId)">确 定</el-button>
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
      isShowRoleVisible: false,
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
      userRole: {
        userId: '',
        userName: '',
        roleIdList: []
      },
      rolesTree: [],
      defaultProps: {
        id: 'roleId',
        label: 'roleName'
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
      deleteParam: {
        userId: '',
        userName: ''
      },
      roleSearchParam: {
        roleName: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    let user = this.$cookies.get('user')
    if (user == null) {
      this.$router.push('/login')
    } else {
      this.fetchData()
    }
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
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
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
      this.resetSubmitForm()

      let self = this
      this.$axios.post('/api/user/show', this.$qs.stringify({'userId': row.userId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm = _data.data
          self.submitForm.userPassword = ''
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        console.log(err.response)
      })

      this.isShowEditVisible = true
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
      this.deleteParam.userId = row.userId
      this.deleteParam.userName = row.userName
    },
    submitDelete (userId) {
      let self = this
      this.$axios.post('/api/user/delete', this.$qs.stringify({'userId': userId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
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
      this.fetchData()
    },
    showRole (row) {
      this.fetchRoleData()
      this.userRole.userId = row.userId
      this.userRole.userName = row.userName
      this.isShowRoleVisible = true
      this.$nextTick(function () {
        if (row.roleIdList != null) {
          this.$refs.tree.setCheckedKeys(row.roleIdList)
        }
      })
    },
    saveUserRole () {
      this.userRole.roleIdList = this.$refs.tree.getCheckedKeys()

      let self = this
      this.$axios.post('/api/user/assignRoles', this.$qs.stringify(self.userRole), {
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
        } else {
          self.$message({
            message: _data.msg,
            type: 'warning'
          })
        }
      }).catch(function (err) {
        console.log(err.response)
      })
      this.isShowRoleVisible = false
    },
    fetchRoleData () {
      let self = this
      this.$axios.post('/api/role/list', this.$qs.stringify(self.roleSearchParam), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.rolesTree = _data.data.data
          self.roleSearchParam.pageNum = _data.data.pageNum
          self.roleSearchParam.pageSize = _data.data.pageSize
          self.roleSearchParam.total = _data.data.totalSize
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
      this.$axios.post('/api/user/list', this.$qs.stringify(self.searchParam), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
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
    doFilterRole () {
      this.fetchRoleData()
    },
    resetSubmitForm () {
      this.submitForm = {}
    },
    handleSizeChange (val) {
      this.searchParam.pageNum = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.searchParam.pageNum = val
      this.fetchData()
    },
    handleSearchSizeChange (val) {
      this.roleSearchParam.pageNum = val
      this.fetchRoleData()
    },
    handleSearchCurrentChange (val) {
      this.roleSearchParam.pageNum = val
      this.fetchRoleData()
    }
  }
}
</script>
