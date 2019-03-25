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
          <el-input placeholder="角色名称" v-model="searchParam.roleName"></el-input>
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
    <el-table :data="tableList" border style="width: 100%;">
      <el-table-column prop="id" label="序号" width="90px">
      </el-table-column>
      <el-table-column prop="roleId" label="角色ID" width="220px">
      </el-table-column>
      <el-table-column prop="roleName" label="角色姓名" width="200px">
      </el-table-column>
      <el-table-column prop="description" label="角色说明" >
      </el-table-column>
      <el-table-column v-if="false" prop="resourceIdList" label="资源ID" >
      </el-table-column>
      <el-table-column label="创建时间" width="130px">
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
        <template slot-scope="scope" >
          <el-button size="small" type="primary"  @click="showResource(scope.row)">资源</el-button>
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

    <!-- 新增角色 -->
    <el-dialog title="Edit" :visible.sync="isShowAddVisible">
      <el-form label-width="80px" :model="submitForm">
        <el-form-item label="角色名称">
          <el-input v-model="submitForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="submitForm.description"></el-input>
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
        <el-button type="primary" @click="createRole()">创建</el-button>
        <el-button @click="isShowAddVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="Edit" :visible.sync="isShowEditVisible">
      <el-form label-width="80px" :model="submitForm">
        <el-form-item label="角色ID">
          <el-input v-model="submitForm.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="submitForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="submitForm.description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :value="submitForm.ctime | dateformat" disabled></el-input>
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
        <el-button type="primary" @click="submitEdit()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 角色资源 -->
    <el-dialog title="RoleResource" :visible.sync="isShowResourceVisible">
      <el-form label-width="80px" :model="roleResource">
        <el-form-item label="角色ID">
          <el-input v-model="roleResource.roleId" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="roleResource.roleName" disabled></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-tree
          :data="resourcesTree"
          show-checkbox
          node-key="resourceId"
          default-expand-all
          ref="tree"
          :expand-on-click-node="false"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRoleResource()">保存</el-button>
        <el-button @click="isShowResourceVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible"
      :model="deleteParam"
      width="30%">
      <span>确认删除 {{ deleteParam.roleName }} 吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDelete(deleteParam.roleId)">确 定</el-button>
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
      isShowResourceVisible: false,
      isShowEditVisible: false,
      isShowAddVisible: false,
      deleteVisible: false,
      submitForm: {
        roleId: '',
        roleName: '',
        description: '',
        ctime: '',
        status: ''
      },
      roleResource: {
        roleId: '',
        roleName: '',
        resourceIdList: []
      },
      searchParam: {
        status: '',
        roleName: '',
        pageNum: 1,
        pageSize: 10
      },
      deleteParam: {
        roleId: '',
        roleName: ''
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
      resourcesTree: [],
      defaultProps: {
        id: 'resourceId',
        children: 'childResource',
        label: 'resourceName'
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
    saveOrUpdateRole () {
      let self = this
      this.$axios.post('/api/role/save', this.$qs.stringify(self.submitForm), {
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
    createRole () {
      this.saveOrUpdateRole()
      this.isShowAddVisible = false
      this.reload()
    },
    showEdit (row) {
      this.resetSubmitForm()

      let self = this
      this.$axios.post('/api/role/show', this.$qs.stringify({'roleId': row.roleId}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        const _data = response.data
        if (_data.code === 200) {
          self.submitForm = _data.data
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
      this.saveOrUpdateRole()
      this.showEditVisiable(false)
    },
    showDelete (row) {
      this.deleteVisible = true
      this.deleteParam.roleId = row.roleId
      this.deleteParam.roleName = row.roleName
    },
    submitDelete (roleId) {
      let self = this
      this.$axios.post('/api/role/delete', this.$qs.stringify({'roleId': roleId}), {
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
    showResource (row) {
      this.fetchResourceData()
      this.roleResource.roleId = row.roleId
      this.roleResource.roleName = row.roleName
      this.isShowResourceVisible = true
      this.$nextTick(function () {
        if (row.resourceIdList != null) {
          this.$refs.tree.setCheckedKeys(row.resourceIdList)
        }
      })
    },
    saveRoleResource () {
      this.roleResource.resourceIdList = this.$refs.tree.getCheckedKeys()
      console.log(this.roleResource)

      let self = this
      this.$axios.post('/api/role/assignResources', this.$qs.stringify(self.roleResource), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
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
      }).catch(function (error) {
        console.log(error)
      })
      this.isShowResourceVisible = false
    },
    fetchData () {
      console.log(this.searchParam)
      let self = this
      this.$axios.post('/api/role/list', this.$qs.stringify(self.searchParam), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
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
    fetchResourceData () {
      let self = this
      this.$axios.post('/api/resource/list', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
        console.log(response)
        const _data = response.data
        if (_data.code === 200) {
          self.resourcesTree = _data.data
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
    resetSubmitForm () {
      this.submitForm = {}
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
    }
  }
}
</script>
