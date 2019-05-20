<template>
  <div class="test-paper-list-content">
    <el-row :gutter="20" class="paper-name">{{paperName}}</el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="18" :md="18" :lg="18" >
        <div class="table-content">
          <el-table
            :data="tableData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            border
          >
            <el-table-column
              prop="question_num"
              label="题号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="score_rate"
              label="得分率"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="options"
              label="选项比列"
            >
              <template slot-scope="scope">
                <span class="span-item" v-for="item in scope.row.options" :key="item.op">{{item.op}}：{{item.ratio}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :md="6" :lg="6" >
        <div class="table-content">
          <el-table
            :data="tableDataTwo"
            v-loading="loadingK"
            element-loading-text="拼命加载中"
            border
          >
            <el-table-column
              prop="k_name"
              label="知识点"
            >
            </el-table-column>
            <el-table-column
              prop="k_rate"
              label="得分率"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getkrate, getpqrate } from '@/api/testPaper'
  export default {
    name: 'statisticsPaperDetail',
    data() {
      return {
        loading: false,
        loadingK: false,
        paperName: '',
        tableData: [],
        tableDataTwo: []
      }
    },
    methods: {
      arrayToObiect(keyArray, data) {

      },
      getkrate(id) {
        this.loadingK = true
        getkrate(id).then(res => { // 知识点得分率
          this.loadingK = false
          if (res.data.code === 200) {
            this.tableDataTwo = res.data.data
          }
        }).catch(() => {
          this.loadingK = false
        })
      },
      getpqrate(id) {
        this.loading = true
        getpqrate(id).then(res => { // 试题得分率
          this.loading = false
          if (res.data.code === 200) {
            this.tableData = res.data.data.pqlist
            this.paperName = res.data.data.paper_name
          }
        }).catch(() => {
          this.loading = false
        })
      },
      loadData(id) {
        this.getkrate(id)
        this.getpqrate(id)
      }
    },
    components: { },
    created() {
      if (this.$route.params.id) {
        this.loadData(this.$route.params.id)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .test-paper-list-content{
    .span-item{
      padding: 0 10px;
    }
    .paper-name{
      text-align: left;
      margin: 0!important;
      font-size: 18px;
      font-weight: 700;
    }
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
