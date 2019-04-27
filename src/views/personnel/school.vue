<template>
  <div>
    <div class="table-content">
      <template>
        <div class="query-cotent">
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add" style="float: right">
              <el-button type="primary" @click="showAdd">
                添加学校
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="el-tabs-content"
             v-loading="loading"
             element-loading-text="拼命加载中">
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
              label="学校名称"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="学校地址"
            >
            </el-table-column>
            <el-table-column
              prop="comment"
              label="备注"
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
                  @click="handleEditClick(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelClick(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
    <school-add v-if="show" :teacher-show="show"
    @add-school="addSchool">
    </school-add>
  </div>
</template>

<script>
  import { getSchool, addSchool } from '@/api/person'
  import { schoolAdd } from './component'
  export default {
    components: { schoolAdd },
    data() {
      return {
        loading: false,
        show: false,
        activeTab: 'first',
        tableData: []
      }
    },
    methods: {
      handleEditClick() {},
      handleDelClick(tab, event) {
        this.$confirm('此操作将永久删除该学校, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      showAdd() {
        this.show = !this.show
      },
      handleGetTableData() {
        const that = this
        that.loading = true
        getSchool().then(function(res) {
          if (res.data.code === 200) {
            that.tableData = res.data.data.schools
            that.loading = false
          } else {
            that.loading = false
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(function() {
          that.loading = false
        })
      },
      addSchool(data) {
        const that = this
        addSchool(data).then(function(res) {
          if (res.data.code === 200) {
            that.handleGetTableData()
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      }
    },
    created() {
      this.handleGetTableData(this.queryData)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
