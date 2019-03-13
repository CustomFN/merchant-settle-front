<template>
  <div class="app-container">
    <div class="container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="showAddVisible(true)">添加一级菜单</el-button>
          </div>
          <div class="grid-content bg-purple">
            <div class="resourceTree">
              <el-tree
                :data="resourcesTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span @click="showResource(data)">{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => append(data)">
                      Append
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => remove(node, data)">
                      Delete
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="resourceForm">
              <el-form :model="submitForm" label-width="100px">
                <el-form-item label="资源ID">
                  <el-input v-model="submitForm.resourceId" disabled></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                  <el-radio-group v-model="submitForm.resourceType">
                    <el-radio :label="1" value=1>页面菜单</el-radio>
                    <el-radio :label="2" value=2>操作按钮</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="资源名称">
                  <el-input v-model="submitForm.resourceName"></el-input>
                </el-form-item>
                <el-form-item label="资源路径">
                  <el-input v-model="submitForm.resourcePath"></el-input>
                </el-form-item>
                <el-form-item label="资源描述">
                  <el-input v-model="submitForm.description"></el-input>
                </el-form-item>
                <el-form-item label="父级资源ID">
                  <el-input v-model="submitForm.parentId"></el-input>
                </el-form-item>
                <el-form-item label="资源层级">
                  <el-input v-model="submitForm.level"></el-input>
                </el-form-item>
                <el-form-item label="资源排序">
                  <el-input v-model="submitForm.sortOrder"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input :value="submitForm.ctime | dateformat" disabled></el-input>
                </el-form-item>
                <el-form-item label="启用">
                  <el-select v-model="submitForm.status" placeholder="启用状态">
                    <el-option v-for="item in status"
                              :label="item.label"
                              :value="item.statusId"
                              :key="item.statusId"
                    ></el-option>
                </el-select>
                </el-form-item>
              </el-form>
              <div class="grid-content bg-purple resourceBtn">
                <el-button type="primary" @click="onSubmit">修改并保存</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 新增资源 -->
    <el-dialog title="创建资源" :visible.sync="isShowAddVisible">
      <div class="resourceTreeDiv">
        <el-form label-width="100px" :model="submitForm">
          <el-form-item label="资源ID">
            <el-input v-model="submitForm.resourceId" disabled></el-input>
          </el-form-item>
          <el-form-item label="资源类型">
            <el-radio-group v-model="submitForm.resourceType">
              <el-radio :label="1" value=1>页面菜单</el-radio>
              <el-radio :label="2" value=2>操作按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源名称">
            <el-input v-model="submitForm.resourceName"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="submitForm.resourcePath"></el-input>
          </el-form-item>
          <el-form-item label="资源描述">
            <el-input v-model="submitForm.description"></el-input>
          </el-form-item>
          <el-form-item label="父级资源ID">
            <el-input v-model="submitForm.parentId"></el-input>
          </el-form-item>
          <el-form-item label="资源层级">
            <el-input v-model="submitForm.level"></el-input>
          </el-form-item>
          <el-form-item label="资源排序">
            <el-input v-model="submitForm.sortOrder" ></el-input>
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
          <el-button type="primary"  @click="createResource()">创建</el-button>
          <el-button @click="showAddVisibl(false)">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      isShowAddVisible: false,
      submitForm: {
        resourceId: '',
        resourceType: 1,
        resourceName: '',
        resourcePath: '',
        description: '',
        level: '',
        parentId: '',
        sortOrder: '',
        ctime: '',
        status: ''
      },
      resourcesTree: [],
      status: [
        {
          statusId: 1,
          label: '启用'
        }, {
          statusId: 2,
          label: '禁用'
        }
      ],
      defaultProps: {
        id: 'resourceId',
        children: 'childResource',
        label: 'resourceName'
      }
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
    saveOrUpdateResource () {
      let self = this
      this.$axios.post('/api/resource/save', this.$qs.stringify(self.submitForm), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
      }).catch(function (err) {
        console.log(err.response)
      })
    },
    createResource () {
      this.saveOrUpdateResource()
      this.showAddVisible(false)
      this.fetchData()
    },
    showResource (data) {
      this.submitForm = data
    },
    fetchData () {
      let self = this
      this.$axios.post('/api/resource/list', {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
    showAddVisible (visible) {
      this.isShowAddVisible = visible
      this.resetSubmitForm()
    },
    resetSubmitForm () {
      this.submitForm = {}
    },
    onSubmit () {
      this.saveOrUpdateResource()
    },
    append (data) {
      this.showAddVisible(true)
      this.submitForm.parentId = data.resourceId
      this.submitForm.level = data.level + 1
    },
    remove (node, data) {
      let self = this
      this.$axios.post('/api/resource/delete', this.$qs.stringify({'resourceId': data.resourceId}), {
        headers: {
          'Access-Control-Allow-Origin': 'http://127.0.0.1',
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
      this.fetchData()
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  margin: 5%;
}
.resourceTree {
  margin: 10% 5%;
  width: 80%;
  height: 60%;
  float: left;
}
.resourceForm {
  text-align: left;
  margin-right: 5%;
  margin-top: 5%;
  width: 60%;
  height: 60%;
  float: left;
}
.resourceBtn {
  text-align: center;
}
.resourceTreeDiv {
  text-align: left;
  .dialog-footer {
    text-align: center
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
