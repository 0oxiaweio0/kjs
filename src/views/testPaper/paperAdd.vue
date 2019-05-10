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
            <el-select v-model="formData.education_level_id" @change="educationChange" placeholder="请选择年级">
              <el-option
                v-for="item in educationOptions"
                :key="item.edu_level_id"
                :label="item.edu_name"
                :value="item.edu_level_id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.grade_level_id" placeholder="请选择">
              <el-option
                v-for="item in gradeOptions"
                :key="item.grade_level_id"
                :label="item.grade_level"
                :value="item.grade_level_id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="上下册:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.book_id" placeholder="请选择">
              <el-option
                v-for="item in bookOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="单元:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.unit_id" placeholder="请选择单元">
              <el-option
                v-for="item in unitOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="题数:">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-select v-model="formData.question_num" @change="questionChange" placeholder="请选择题数">
              <el-option
                v-for="item in stOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-table
              :data="questionArray"
              border
              max-height="300"
              empty-text="点击下方“加号”开始添加"
            >
              <el-table-column
                prop="question_number"
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
                prop="pass"
                label="分值"
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
          <el-button type="primary" icon="el-icon-plus" @click="setKnowledge">设置知识点</el-button>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">新增试卷</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <knowledge-dialog
    ref="knowledgeDialog">
    </knowledge-dialog>
  </div>
</template>
<script>
  import baseData from '@/data/config/baseData'
  import KnowledgeDialog from './component/addKnowledge'
  export default {
    name: 'testPaperList',
    components: {
      KnowledgeDialog
    },
    data() {
      return {
        stOptions: baseData.stOptions,
        questionArray: [],
        gradeOptions: [],
        formData: {
          name: '', // 试卷名称
          grade_level_id: null, // 级别
          education_level_id: null, // 年级
          book_id: '', // 册
          unit_id: '', // 单元
          question_num: null // 题数
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
      setKnowledge() {
        this.$refs.knowledgeDialog.onOpenDialog()
      },
      educationChange() {
        this.formData.grade_level_id = null
        const education = this.educationOptions.filter(item => {
          return item.edu_level_id === this.formData.education_level_id
        })
        this.gradeOptions = education ? education[0].grades : []
      },
      questionChange() {
        const addCount = this.formData.question_num - this.questionArray.length
        const strat = this.questionArray.length
        for (let i = 0; i < addCount; i++) {
          this.questionArray.push({
            question_number: strat + i + 1,
            options: '',
            answer: '',
            knowledge_id: '',
            standard_score: 0
          })
        }
        console.log(this.questionArray)
      },
      onSubmit() {}
    },
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
