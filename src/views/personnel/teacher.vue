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
        <div class="el-tabs-content">
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="已审核" name="first">
              <el-table
                :data="paperData"
                border
              >
                <el-table-column
                  prop="NO"
                  label="编号"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="教师姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系方式"
                >
                </el-table-column>
                <el-table-column
                  prop="school"
                  label="学校"
                >
                </el-table-column>
                <el-table-column
                  prop="class"
                  label="任教班级"
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
                      type="danger"
                      @click="handleClick(scope.$index, scope.row)">冻结</el-button>
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleClick(scope.$index, scope.row)">解冻</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待审核" name="second">
              <el-table
                :data="paperData"
                border
              >
                <el-table-column
                  prop="NO"
                  label="编号"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="教师姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="联系方式"
                >
                </el-table-column>
                <el-table-column
                  prop="school"
                  label="学校"
                >
                </el-table-column>
                <el-table-column
                  prop="class"
                  label="任教班级"
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
                      @click="handleClick(scope.$index, scope.row)">确认</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleClick(scope.$index, scope.row)">拒绝</el-button>
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
  import { getTeacherAll, addTeacher } from '@/api/person'
  import { teacherAdd } from './component'
  export default {
    components: { teacherAdd },
    data() {
      return {
        show: false,
        activeTab: 'first',
        paperData: [
          { NO: '01', name: '张三', phone: '18610971314', school: '成都一中', class: '高二（16）班' },
          { NO: '02', name: '张四', phone: '18610971315', school: '成都一中', class: '高二（15）班' }
        ]
      }
    },
    created() {
      this.getTeacherAll()
    },
    methods: {
      getTeacherAll(type) {
        getTeacherAll().then().catch()
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      showAdd() {
        this.show = !this.show
      },
      addTeacher(data) {
        const that = this
        addTeacher(data).then(function(res) {
          if (res.data.code === 200) {
            that.handleGetTableData()
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(function(res) {
          this.$message({
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
