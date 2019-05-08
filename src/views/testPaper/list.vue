<template>
  <div class="test-paper-list-content">
    <div class="query-cotent">
      <el-row :gutter="20">
        <el-col :xs="16" :sm="16" :md="16" :lg="16" class="paper-search">
          <el-input
            size="medium"
            placeholder="搜素试卷"
            suffix-icon="el-icon-search"
          >
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add">
          <el-button type="primary">
            <router-link :to="{name:'app.testPaper.paperAdd'}">添加试卷</router-link>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" >
        <el-row :gutter="0" class="statistics-total">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <p class="title-bold">初一年级上册试卷列表</p>
            <span class="title-span">Grade One</span>
          </el-col>
          <el-col :xs="24" :sm="4" :md="4" :lg="4">
            <p class="title-bold">50</p>
            <span class="title-span">试卷总数</span>
          </el-col>
          <el-col :xs="24" :sm="4" :md="4" :lg="4">
            <p class="title-bold">10</p>
            <span class="title-span">使用学校数</span>
          </el-col>
          <el-col :xs="24" :sm="4" :md="4" :lg="4">
            <p class="title-bold">60</p>
            <span class="title-span">使用班级数</span>
          </el-col>
          <el-col :xs="24" :sm="4" :md="4" :lg="4">
            <p class="title-bold">100</p>
            <span class="title-span">总考试人数</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" >
        <div class="table-content">
          <el-table
            :data="paperData"
            border
            max-height="500"
            >
            <el-table-column
              prop="name"
              label="试卷名称"
            >
            </el-table-column>
            <el-table-column
              prop="count"
              label="考试人数"
            >
            </el-table-column>
            <el-table-column
              prop="pass"
              label="及格率"
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
                  icon="el-icon-edit"
                  @click="handleClick(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleClick(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 20px;text-align: right"
                         :background="tablePageConfig.background"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="tablePageConfig.currentPage"
                         :page-sizes="tablePageConfig.pageSizes"
                         :page-size="tablePageConfig.pageSize"
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
  import paperData from '@/data/test/paperData'
  import { getPapersList } from '@/api/testPaper'
  export default {
    name: 'testPaperList',
    data() {
      return {
        tablePageConfig,
        paperData
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      handleClick($index, row) {
        console.log(row)
      }
    },
    components: { },
    created() {
      getPapersList({
        education_id: this.$route.params.class,
        book_id: this.$route.params.type,
        page_num: 1,
        page_per_count: 10
      })
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .test-paper-list-content{
    text-align: right;
    .el-row{
      margin: 10px 0;
    }
    .search-content{
      .paper-add{
        text-align: left;
      }
      .paper-search{
        text-align: right;
        .el-input{
          width: 250px;
        }
      }
    }
    .statistics-total{
      margin: 0 auto;
      padding: 20px;
      background:linear-gradient(150deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 100%);
      box-shadow:0px 2px 4px 0px rgba(235,241,255,1);
      border:1px solid rgba(239,239,239,1);
      .title-bold{
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:30px;
        margin: 0;
      }
      .title-span{
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(182,182,182,1);
        line-height:12px;
      }
      .el-col{
        margin: 5px 0;
        text-align: left;
      }
    }
    .el-table .cell{
      text-align: left;
    }
    .el-card{
      text-align: left;
      el-card__header{
        font-weight: bold;
        font-size: 18px;
      }
      .el-card__body{
        .text.item{
          padding: 5px 0;
          span{
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .test-paper-list-content{
    .statistics-total{
      text-align: center;
    }
    .table-content{
      margin-top: 10px;

    }

  }
</style>
