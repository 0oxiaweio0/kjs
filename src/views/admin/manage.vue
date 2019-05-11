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
            <el-col :xs="16" :sm="16" :md="16" :lg="16"  class="paper-add" style="float: right">
              <el-switch
                @change="switchStatus"
                style="display: block"
                v-model="isTrue"
                active-color="#13ce66"
                active-text="小程序注册教师需审核">
              </el-switch>
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
              prop="uname"
              label="账号"
            >
            </el-table-column>
            <el-table-column
              prop="role_name"
              label="角色"
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
                  @click="handleClick('editPwd',scope.row)">修改密码</el-button>
                <el-button
                  v-if="scope.row.status!==1"
                  size="mini"
                  type="danger"
                  @click="handleClick('lock',scope.row)">冻结</el-button>
                <el-button
                  v-if="scope.row.status===1"
                  size="mini"
                  type="success"
                  @click="handleClick('unlock',scope.row)">解冻</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
    <edit-password v-if="show" :person-data="selectData"
                   @edit-password="editPassword"></edit-password>
    <admin-add v-if="adminShow"
               @add-admin="addAdmin"></admin-add>
  </div>
</template>

<script>
  import editPassword from '@/components/editPassword'
  import { getManagerList, addAdmin, lockAdmin, unlockAdmin, editPwd, editSupPwd, postConfmg } from '@/api/person'
  import { getBaseCode } from '@/api/login'
  import adminAdd from './components/adminAdd'
  export default {
    components: { editPassword, adminAdd },
    data() {
      return {
        isTrue: false,
        selectData: null,
        loading: false,
        show: false,
        adminShow: false,
        tableData: []
      }
    },
    methods: {
      getStatus() {
        getBaseCode().then(res => {
          if (res.data.code === 200) {
            const status = res.data.data.items.config.filter(item => item.item === 'teacher_regist_is_check')[0]
            if (status.value === 'OFF') this.isTrue = false
            if (status.value === 'ON') this.isTrue = true
          }
        })
      },
      switchStatus() {
        const that = this
        const postData = { item: 'teacher_regist_is_check', value: 'OFF' }
        if (this.isTrue) postData.value = 'ON'
        if (!this.isTrue) postData.value = 'OFF'
        postConfmg(postData).then(function(res) {
          console.log(res.data.code === 200)
          if (res.data.code === 200) {
            that.$message({
              message: '状态配置成功！',
              type: 'success'
            })
          } else {
            this.isTrue = !this.isTrue
          }
        }).catch(() => {
          this.isTrue = !this.isTrue
        })
      },
      handleClick(type, data) {
        const that = this
        if (type === 'lock') {
          this.$confirm('此操作将冻结该账户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            lockAdmin(data.id).then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                that.handleGetTableData()
              } else {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
        if (type === 'unlock') {
          unlockAdmin(data.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              that.handleGetTableData()
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        }
        if (type === 'editPwd') {
          this.selectData = data
          this.show = true
        }
      },
      showAdd() {
        this.show = !this.show
      },
      showAdminAdd() {
        this.adminShow = !this.adminShow
      },
      addAdmin(data) {
        const that = this
        addAdmin(data).then(function(res) {
          if (res.data.code === 200) {
            that.handleGetTableData()
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      editPassword(data) {
        const that = this
        if (this.selectData.sys_role_id !== 1) {
          editPwd(data).then(function(res) {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.message,
                type: 'success'
              })
            } else {
              that.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        } else {
          editSupPwd(data).then(function(res) {
            if (res.data.code === 200) {
              that.$message({
                message: res.data.message,
                type: 'success'
              })
            } else {
              that.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
        }
      },
      handleGetTableData() {
        this.loading = true
        getManagerList().then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.$message({
            message: err,
            type: 'error'
          })
        })
      }
    },
    created() {
      this.handleGetTableData()
      this.getStatus()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-switch{
    margin-top: 5px;
  }
</style>
