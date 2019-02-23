<template>
  <div>
    <div class="query-cotent">
      <el-row :gutter="20">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" class="paper-search">
          <el-input
            size="medium"
            placeholder="搜素班级"
            suffix-icon="el-icon-search"
          >
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add">
          <el-button type="primary">
            <router-link :to="{name:'app.testPaper.paperAdd'}">添加教师</router-link>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-content">
      <template>
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
                label="操作"
                fixed="right"
                width="190"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleClick(scope.$index, scope.row)">冻结</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待审核" name="second">

          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app.personnel.manage.teacher',
    components: { },
    data() {
      return {
        activeTab: 'first',
        paperData: [
          { NO: '01', name: '张三', phone: '18610971314', school: '成都一中', class: '高二（16）班' },
          { NO: '02', name: '张四', phone: '18610971315', school: '成都一中', class: '高二（15）班' }
        ]
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .query-cotent{
    position: absolute;
    width: 300px;
    top: 60px;
    right: 20px;
    z-index: 10000;
  }
  .table-content{
    margin-top: 10px;
  }
</style>
