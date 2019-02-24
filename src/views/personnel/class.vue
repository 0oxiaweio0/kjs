<template>
  <div class="class-content">
    <div class="table-content">
      <div class="query-cotent">
        <el-row :gutter="20">
          <el-col :xs="8" :sm="8" :md="8" :lg="8"  class="paper-add" style="float: right">
            <el-button type="primary" @click="showAdd">
              添加班级
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-collapse v-model="activeName" @change="handleChange" accordion>
        <el-collapse-item title="成都树德中学" name="1">
          <el-table
            :data="paperData"
            border
          >
            <el-table-column
              prop="name"
              label="编号"
            >
            </el-table-column>
            <el-table-column
              prop="count"
              label="班级名称"
            >
            </el-table-column>
            <el-table-column
              prop="pass"
              label="人数"
            >
            </el-table-column>
            <el-table-column
              prop="pass"
              label="班主任"
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
                  @click="handleClick(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleClick(scope.$index, scope.row)">报表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="成都十七中" name="2">

        </el-collapse-item>
        <el-collapse-item title="新都中学" name="3">

        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    components: { },
    data() {
      return {
        show: false,
        activeName: '1',
        paperData: []
      }
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      showAdd() {
        this.show = !this.show
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .class-content{
    .el-collapse-item{
      position: relative;
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
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
