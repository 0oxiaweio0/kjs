<template>
  <div>
    <el-row >
      <el-col :xs="12" :sm="4" :md="4" :lg="4" class="paper-add">
        <el-button type="info">
          <router-link :to="{name:'app.testPaper.paperAdd'}">添加班级</router-link>
        </el-button>
      </el-col>
      <el-col :xs="12" :sm="20" :md="20" :lg="20" class="paper-search">
        <el-input
          size="medium"
          placeholder="搜素班级"
          suffix-icon="el-icon-search"
        >
        </el-input>
      </el-col>
    </el-row>
    <div class="table-content">
      <div class="table-content-title">班级列表</div>
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
              label="教师"
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
    name: 'app.personnel.manage.class',
    components: { },
    data() {
      return {
        activeName: '1',
        paperData: []
      }
    },
    methods: {
      handleChange(val) {
        console.log(val)
      }
    }
  }
</script>
