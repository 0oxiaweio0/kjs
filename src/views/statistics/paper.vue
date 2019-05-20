<template>
  <div class="test-paper-list-content">
    <div class="query">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="6" :md="4" :lg="4">
          <el-select v-model="queryData.education_level_id" @change="educationChange" placeholder="请选择年级">
            <el-option
              v-for="item in educationOptions"
              :key="item.edu_level_id"
              :label="item.edu_name"
              :value="item.edu_level_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :md="4" :lg="4">
          <el-select v-model="queryData.grade_level_id" placeholder="请选择">
            <el-option
              v-for="item in gradeOptions"
              :key="item.grade_level_id"
              :label="item.grade_level"
              :value="item.grade_level_id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :md="4" :lg="4">
          <el-select v-model="queryData.book_id" placeholder="请选择上下册">
            <el-option
              v-for="item in bookOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="6" :md="4" :lg="4">
          <el-select v-model="queryData.unit_id" placeholder="请选择单元">
            <el-option
              v-for="item in unitOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <el-button type="primary" @click="loadData">搜素</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" >
        <div class="table-content">
          <el-table
            :data="paperData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            border
            max-height="500"
          >
            <el-table-column
              prop="paper_name"
              label="试卷名称"
            >
            </el-table-column>
            <el-table-column
              prop="student_count"
              label="考试人数"
              width="100"
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
                  type="primary"
                  icon="el-icon-tickets"
                  @click="handleClick(scope.$index, scope.row)">详细报告</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 20px;text-align: right"
                         :background="tablePageConfig.background"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="page_num"
                         :page-sizes="tablePageConfig.pageSizes"
                         :page-size="tablePageConfig.pageSize"
                         :page-count="total"
                         layout="total, sizes, prev, pager, next, jumper"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import tablePageConfig from '@/data/config/tablePageConfig'
  import { getPlatformPaper } from '@/api/testPaper'
  export default {
    name: 'statisticsPaperList',
    data() {
      return {
        loading: false,
        tablePageConfig: tablePageConfig,
        paperHeaderData: [],
        paperData: [],
        gradeOptions: [],
        total: 0,
        page_num: 1,
        page_per_count: 10,
        queryData: {
          grade_level_id: null, // 级别
          education_level_id: null, // 年级
          book_id: null, // 册
          unit_id: null // 单元
        }
      }
    },
    computed: {
      bookOptions() {
        return this.$store.state.user.resCode.books
      },
      educationOptions() {
        return this.$store.state.user.resCode.edus
      },
      unitOptions() {
        return this.$store.state.user.resCode.units
      }
    },
    methods: {
      educationChange() {
        this.queryData.grade_level_id = null
        const education = this.educationOptions.filter(item => {
          return item.edu_level_id === this.queryData.education_level_id
        })
        this.gradeOptions = education ? education[0].grades : []
      },
      loadData() {
        this.loading = true
        getPlatformPaper({
          education_id: this.queryData.education_level_id,
          grade_id: this.queryData.grade_level_id,
          book_id: this.queryData.book_id,
          unit_id: this.queryData.unit_id,
          page_num: this.page_num,
          page_per_count: this.page_per_count
        }).then(res => {
          this.loading = false
          if (res.data.code === 200) {
            this.paperData = res.data.data.papge_page_data.page_data
            this.total = res.data.data.papge_page_data.total_page
          }
        }).catch(() => {
          this.loading = false
        })
      },
      handleSizeChange(val) {
        this.page_per_count = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.page_num = val
        this.loadData()
      },
      handleClick($index, row) {
        this.$router.push({
          name: 'app.statistics.detail',
          params: { id: row.paper_id }})
      }
    },
    components: { },
    created() {
      this.loadData()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .test-paper-list-content{
    .statistics-total{
      text-align: center;
    }
    .table-content{
      margin-top: 10px;

    }
    .el-form-item{
    }
    .query{
      padding-bottom: 20px;
      .el-row{
        padding: 0 10px;
      }
    }

  }
</style>
