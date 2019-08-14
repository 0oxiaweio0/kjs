<template>
  <div>
    <div class="table-content">
      <template>
        <div class="query-cotent">
          <el-row :gutter="20">
            <el-col :xs="16" :sm="16" :md="16" :lg="16" class="paper-search">
              <el-input
                size="medium"
                placeholder="检索教师"
                suffix-icon="el-icon-search"
              >
              </el-input>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add">
              <el-button type="primary" @click="showAdd">
                添加教师
              </el-button>
            </el-col>
          </el-row>
        </div>
        <div class="el-tabs-content"
             v-loading="loading"
             element-loading-text="拼命加载中">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="已审核" name="first">
              <el-table
                :data="checkedArray"
                border
              >
                <el-table-column
                  prop="id"
                  label="ID"
                >
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="教师姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系方式"
                >
                </el-table-column>
                <el-table-column
                  prop="school_name"
                  label="学校"
                >
                </el-table-column>
                <el-table-column
                  prop="info"
                  label="任教班级"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="slot">
                    <template>
                      {{ getArrayStr(slot.row['info']) }}
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  label="管理操作"
                  fixed="right"
                  width="190"
                >
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.status !==2"
                      size="mini"
                      type="danger"
                      @click="handleClick('lock', scope.row)">冻结</el-button>
                    <el-button
                      v-if="scope.row.status ===2"
                      size="mini"
                      type="success"
                      @click="handleClick('unlock', scope.row)">解冻</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待审核" name="second">
              <el-table
                :data="uncheckedArray"
                :show-overflow-tooltip="true"
                border
              >
                <el-table-column
                  prop="id"
                  label="ID"
                >
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="教师姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系方式"
                >
                </el-table-column>
                <el-table-column
                  prop="school_name"
                  label="学校"
                >
                </el-table-column>
                <el-table-column
                  prop="info"
                  label="任教班级"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="slot">
                    <template>
                      {{ getArrayStr(slot.row['info']) }}
                    </template>
                  </template>
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
                      @click="handleClick('submit', scope.row)">确认</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleClick('refuse', scope.row)">拒绝</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </div>
    <teacher-add
      v-if="show"
      @add-teacher="addTeacher"
      :teacher-show="show">
    </teacher-add>
  </div>
</template>

<script>
  import { getTeacherAll, addTeacher, reject, check, lockUser, unlockUser } from '@/api/person'
  import { teacherAdd } from './component'
  export default {
    components: { teacherAdd },
    data() {
      return {
        show: false,
        loading: false,
        activeTab: 'first',
        checkedArray: [],
        uncheckedArray: []
      }
    },
    created() {
      this.getTeacherAll()
    },
    methods: {
      getArrayStr(data) {
        const array = []
        data.forEach(item => {
          array.push(item.class_name)
        })
        return array.join(',')
      },
      getTeacherAll(type) {
        this.loading = true
        getTeacherAll().then(res => {
          if (res.data.code === 200) {
            this.checkedArray = res.data.data.checked
            this.uncheckedArray = res.data.data.not_checked
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
          this.loading = false
        })
      },
      handleClick(type, data) {
        if (type === 'lock') { // 冻结
          lockUser(data.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '冻结成功',
                type: 'success'
              })
              this.getTeacherAll()
            }
          })
        }
        if (type === 'unlock') { // 解冻
          unlockUser(data.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '解冻成功',
                type: 'success'
              })
              this.getTeacherAll()
            }
          })
        }
        if (type === 'submit') { // 确认审核
          check(data.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '审核成功',
                type: 'success'
              })
              this.getTeacherAll()
            }
          })
        }
        if (type === 'refuse') { // 拒绝审核
          reject(data.id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '成功拒绝',
                type: 'success'
              })
              this.getTeacherAll()
            }
          })
        }
      },
      showAdd() {
        this.show = !this.show
      },
      addTeacher(data) {
        const that = this
        addTeacher(data).then(function(res) {
          if (res.data.code === 200) {
            that.$message({
              message: '教师添加成功',
              type: 'success'
            })
            this.getTeacherAll()
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(function(res) {
          that.$message({
            message: res.data.message,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
