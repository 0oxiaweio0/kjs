<template>
  <div class="test-paper-add-content">
    <el-row :gutter="20">
      <div class="paper-add-title">添加试卷</div>
    </el-row>
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-form-item label="试卷名称:">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="高/初中:">
          <el-select v-model="formData.level" placeholder="请选择年级">
            <el-option label="初中" value="cz"></el-option>
            <el-option label="高中" value="gz"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级:">
          <el-select v-model="formData.class" placeholder="请选择年级">
            <el-option label="初中" value="cz"></el-option>
            <el-option label="高中" value="gz"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="册:">
          <el-select v-model="formData.book" placeholder="请选择">
            <el-option label="上册" value="sc"></el-option>
            <el-option label="下册" value="xc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单元:">
          <el-select v-model="formData.unit" placeholder="请选择单元">
            <el-option label="上册" value="sc"></el-option>
            <el-option label="下册" value="xc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题数:">
          <el-select v-model="formData.unit" placeholder="请选择题数">
            <el-option label="上册" value="sc"></el-option>
            <el-option label="下册" value="xc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增试卷</el-button>
          <el-button>取消</el-button>
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
    .el-form{
      width: 460px;
      .el-select .el-input{
        width: 360px;
      }
    }
    .el-form-item__content{
      text-align: left;
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
