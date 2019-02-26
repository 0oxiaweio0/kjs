<template>
  <div class="test-paper-add-content">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-form-item label="试卷名称:">
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-input v-model="formData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年级:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.level" placeholder="请选择年级">
              <el-option label="初中" value="cz"></el-option>
              <el-option label="高中" value="gz"></el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.class" placeholder="请选择">
              <el-option label="初一" value="cz"></el-option>
              <el-option label="初二" value="gz"></el-option>
              <el-option label="初三" value="gz"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="册:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.book" placeholder="请选择">
              <el-option label="上册" value="sc"></el-option>
              <el-option label="下册" value="xc"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="单元:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.unit" placeholder="请选择单元">
              <el-option label="上册" value="sc"></el-option>
              <el-option label="下册" value="xc"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="题数:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.unit" placeholder="请选择题数">
              <el-option label="上册" value="sc"></el-option>
              <el-option label="下册" value="xc"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-table
              :data="paperData"
              border
              max-height="300"
              empty-text="点击下方“加号”开始添加"
            >
              <el-table-column
                prop="name"
                label="题号"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="可选项"
              >
              </el-table-column>
              <el-table-column
                prop="pass"
                label="答案项"
              >
              </el-table-column>
              <el-table-column
                label="知识点"
              >
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">新增试卷</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'testPaperList',
    data() {
      return {
        formData: {
          name: '', // 试卷名称
          level: null, // 级别
          class: '', // 年级
          book: '', // 册
          unit: '', // 单元
          number: null // 题数
        }
      }
    },
    methods: {
    },
    components: { },
    created() {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .test-paper-add-content{
/*    .el-form{
      width: 460px;
      .el-select .el-input{
        width: 360px;
      }
    }*/
    .el-form-item__content{
      text-align: left;
    }
    .el-select, .el-select--medium{
      width: 100%;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .paper-add-title{
    margin: 20px;
    text-align: left;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 10px;
  }
</style>
