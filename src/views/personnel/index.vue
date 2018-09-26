<template>
  <div class="personnel-list-content">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="5" :md="4" :lg="4" >
        <el-row :gutter="0">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/personnel' }">人员管理</el-breadcrumb-item>
            <el-breadcrumb-item><a>班级管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
        <el-row :gutter="0" class="statistics-total">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>人员管理</span>
            </div>
            <div class="text item">
              <span>
                <router-link :to="{name:'app.personnel.manage.class'}">班级管理</router-link>
              </span>
            </div>
            <div class="text item">
              <span>
                <router-link :to="{name:'app.personnel.manage.teacher'}">
                  教师管理
                </router-link>
                </span>
            </div>
            <div class="text item">
              <span>待审批信息</span>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="19" :md="20" :lg="20" class="search-content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'personnelIndex',
    components: { },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .personnel-list-content{
    .el-row{
      margin: 10px 0;
    }
    .el-breadcrumb{
      height: 35px;
      line-height: 35px;
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
    .el-collapse-item__header{
      text-align: left;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .personnel-list-content{
    padding: 20px;
    .statistics-total{
      text-align: center;
      margin-top: 20px;
    }
    .table-content{
      margin-top: 20px;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      transition: .2s;
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
    }
    .table-content-title{
      text-align: left;
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
</style>
