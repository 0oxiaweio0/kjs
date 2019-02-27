<template>
  <div>
    <div class="table-content">
      <template>
        <div class="query-cotent">
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add" style="float: right">
              <el-button type="primary" @click="showAdminAdd">
                添加管理员
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="el-tabs-content">
          <el-table
            :data="tableData"
            border
          >
            <el-table-column
              prop="id"
              label="编号"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="账号"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="学校地址"
            >
            </el-table-column>
            <el-table-column
              label="管理操作"
              fixed="right"
              width="190"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleClick(scope.$index, scope.row)">修改密码</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleClick(scope.$index, scope.row)">冻结</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
    <edit-password v-if="show" tperson-id=""></edit-password>
    <admin-add v-if="adminShow"></admin-add>
  </div>
</template>

<script>
  import editPassword from '@/components/editPassword'
  import adminAdd from './components/adminAdd'
  export default {
    components: { editPassword, adminAdd },
    data() {
      return {
        show: false,
        adminShow: false,
        tableData: []
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      showAdd() {
        this.show = !this.show
      },
      showAdminAdd() {
        this.adminShow = !this.adminShow
      },
      handleGetTableData() {
      }
    },
    created() {
      this.handleGetTableData()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
