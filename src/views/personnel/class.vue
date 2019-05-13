<template>
  <div class="class-content">
    <div class="table-content">
      <div class="query-cotent">
        <el-row :gutter="20">
          <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add" style="float: right">
<!--            <el-button type="primary" @click="showAdd">
              添加班级
            </el-button>-->
          </el-col>
        </el-row>
      </div>
      <el-collapse v-model="activeName" @change="handleChange" accordion>
        <el-collapse-item :name="tableItem.school_name" v-for="tableItem in tableData" :key="tableItem.school_name">
          <template slot="title" class="el-collapse-title-content">
            <img :src="schoolPng" alt="学校图标">
            <span>{{tableItem.school_name}}</span>
          </template>
          <el-table
            :data="tableItem.clsinfo"
            border
          >
            <el-table-column
              prop="id"
              label="编号"
            >
            </el-table-column>
            <el-table-column
              prop="class_name"
              label="班级名称"
            >
            </el-table-column>
            <el-table-column
              prop="student_count"
              label="人数"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="班主任"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="190"
            >
              <template slot-scope="scope">
     <!--           <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleClick(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-tickets"
                  @click="handleClick(scope.$index, scope.row)">报表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import { getClassList } from '@/api/person'
  import schoolPng from '@/assets/icon/school.png'
  export default {
    components: { },
    data() {
      return {
        schoolPng,
        show: false,
        activeName: '',
        tableData: []
      }
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      handleClick() {
        this.$message({
          message: '无正确的报表数据',
          type: 'error'
        })
      },
      handleClassData() {
        const that = this
        getClassList().then(function(res) {
          if (res.data.code === 200) {
            that.activeName = res.data.data && res.data.data.length > 0 ? res.data.data[0].school_name : ''
            that.tableData = res.data.data
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      showAdd() {
        this.show = !this.show
      }
    },
    created() {
      this.handleClassData()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .class-content{
    .el-collapse{
      border: 0;
      .el-collapse-item{
        position: relative;
        border: 1px solid #ebeef5;
        margin-bottom: 10px;
        .el-collapse-item__header{
          border-bottom: 0;
          text-align: left;
          text-indent: 10px;
          position: relative;
          vertical-align: middle;
          img{
            display: inline-block;
            vertical-align: middle;
          }
          span{
            display: inline-block;
            vertical-align: middle;
            line-height: 100%;
          }
        }
        .el-collapse-item__wrap{
          border-bottom: 0;
        }
      }
      .el-collapse-item.is-active{
        border-left: 0;
      }
      .el-collapse-item.is-active:before{
        position: absolute;
        left:0;
        height: 100%;
        width: 2px;
        content: "";
        color:rgba(81,138,255,1);
        background:rgba(81,138,255,1);
        z-index: 100;
      }
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
