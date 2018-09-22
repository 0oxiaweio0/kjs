<template>
  <div class="test-paper-list-content">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="5" :md="4" :lg="4" >
        <el-row :gutter="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/testPaper' }">初一</el-breadcrumb-item>
            <el-breadcrumb-item><a>上期</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="19" :md="20" :lg="20" class="search-content">
        <el-row >
          <el-col :xs="12" :sm="4" :md="4" :lg="4" class="paper-add">
            <el-button type="info">
              <router-link :to="{name:'app.testPaper.paperAdd'}">添加试卷</router-link>
              </el-button>
          </el-col>
          <el-col :xs="12" :sm="20" :md="20" :lg="20" class="paper-search">
            <el-input
              size="medium"
              placeholder="搜素试卷"
              suffix-icon="el-icon-search"
            >
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="5" :md="4" :lg="4" >
        <el-row :gutter="0" class="statistics-total">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>试卷汇总</span>
            </div>
            <div class="text item">
              <span>试卷总数:</span><span>50</span>
            </div>
            <div class="text item">
              <span>使用学校数:</span><span>10</span>
            </div>
            <div class="text item">
              <span>使用班级数:</span><span>60</span>
            </div>
            <div class="text item">
              <span>总考试人数:</span><span>1800</span>
            </div>
            <div class="text item">
              <span>总及格率:</span><span>75%</span>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="19" :md="20" :lg="20" >
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
      console.log(this.$route.params)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .test-paper-list-content{
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
      .Breadcrumb{
        text-align: center;
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
    padding: 20px;
    .statistics-total{
      text-align: center;
    }
    .table-content{
      border: 1px solid #ebebeb;
      border-radius: 3px;
      transition: .2s;
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);

    }

  }
</style>
