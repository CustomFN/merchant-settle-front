<template>
  <div class="app-container">
    <div class="container">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="resourceTree">
              <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps">
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="resourceForm">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="资源类型">
                  <el-radio-group v-model="form.resourceType">
                    <el-radio label="1">页面菜单</el-radio>
                    <el-radio label="2">操作按钮</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="资源名称">
                  <el-input v-model="form.resourceName"></el-input>
                </el-form-item>
                <el-form-item label="资源路径">
                  <el-input v-model="form.resourcePath"></el-input>
                </el-form-item>
                <el-form-item label="资源描述">
                  <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input v-model="form.ctime" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="启用">
                  <el-switch
                    v-model="form.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="8">
          <div class="grid-content bg-purple resourceBtn">
            <el-button type="primary" >添加一级菜单</el-button>
            <el-button type="primary" >添加子节点</el-button>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple resourceBtn">
            <el-button type="primary" @click="onSubmit">修改并保存</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        resourceType: '1',
        resourceName: '',
        resourcePath: '',
        description: '',
        ctime: '',
        status: true
      },
      data2: [{
        id: '1',
        label: '客户管理',
        children: [{
          id: '1-1',
          label: '客户列表'
        }, {
          id: '1-2',
          label: '合同列表'
        }]
      }, {
        id: '2',
        label: '门店管理',
        children: [{
          id: '2-1',
          label: '物理门店列表'
        }, {
          id: '2-2',
          label: '我的物理门店'
        }, {
          id: '2-3',
          label: '外卖门店列表'
        }, {
          id: '2-4',
          label: '我的外卖门店'
        }]
      }, {
        id: '3',
        label: '审核管理',
        children: [{
          id: '3-1',
          label: '所有任务'
        }, {
          id: '3-2',
          label: '我的任务'
        }]
      }, {
        id: '4',
        label: '权限管理',
        children: [{
          id: '4-1',
          label: '用户管理'
        }, {
          id: '4-2',
          label: '角色管理'
        }, {
          id: '4-3',
          label: '资源管理'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
  overflow: auto
}
.resourceForm {
  text-align: left;
  margin-right: 5%;
  margin-top: 5%;
  width: 40%;
  height: 60%;
  float: left;
}
.resourceBtn {
  float: left;
}
</style>
