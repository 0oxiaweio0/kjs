<template>
  <div class="test-paper-add-content">
    <el-row :gutter="20"
            v-loading="loading"
            element-loading-text="拼命加载中">
      <el-form label-width="100px"
               ref="form"
               :rules="rules"
               :model="formData">
        <el-form-item label="试卷名称:" prop="name">
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-input v-model="formData.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年级:" prop="education_level_id">
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
            <el-form-item  prop="grade_level_id">
              <el-select v-model="formData.grade_level_id" placeholder="请选择">
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.grade_level_id"
                  :label="item.grade_level"
                  :value="item.grade_level_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="上下册:" prop="book_id">
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
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-form-item prop="unit_id">
              <el-select v-model="formData.unit_id" placeholder="请选择单元">
                <el-option
                  v-for="item in unitOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题数:" prop="question_num">
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
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <el-input v-model="totalScore" type="text" disabled>
              <template slot="prepend">总分</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-table
              :data="questions"
              border
              empty-text="选择题数增加试题"
            >
              <el-table-column
                prop="question_number"
                label="题号"
                width="80"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="可选项"
                min-width="140"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.options"
                    filterable
                    placeholder="请选择">
                    <el-option
                      v-for="item in letterOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="answer"
                label="答案项"
                min-width="140"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.answer"
                    filterable
                    placeholder="请选择">
                    <el-option
                      v-for="item in getanswerOption(scope.row.options)"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="pass"
                label="分值"
              >
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.standard_score" size="small" :min="1" :max="9" label="描述文字"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                label="知识点"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.knowledge_id"
                    filterable
                    placeholder="请选择">
                    <el-option
                      v-for="item in knowledgeOptions"
                      :key="item.id"
                      :label="item.knowledge_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="setKnowledge">设置知识点</el-button>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="disabled">{{this.$route.params.id?'修改试卷':'新增试卷'}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <knowledge-dialog
    ref="knowledgeDialog"
    @re-load="reLoad">
    </knowledge-dialog>
  </div>
</template>
<script>
  import { getKnownList, addPaper, getpqlist, editPaper, getpqInfo } from '@/api/testPaper'
  import baseData from '@/data/config/baseData'
  import KnowledgeDialog from './component/addKnowledge'
  export default {
    name: 'testPaperList',
    components: {
      KnowledgeDialog
    },
    data() {
      return {
        loading: false,
        disabled: false,
        knowledgeOptions: [],
        answerOption: baseData.answerOption,
        stOptions: baseData.stOptions,
        letterOption: baseData.letterOption,
        questions: [],
        gradeOptions: [],
        formData: {
          name: '', // 试卷名称
          grade_level_id: null, // 级别
          education_level_id: null, // 年级
          book_id: '', // 册
          unit_id: '', // 单元
          question_num: null, // 题数
          total_score: this.totalScore // 总分
        },
        rules: {
          name: [
            { required: true, message: '请输入试卷名称', trigger: 'blur' }
          ],
          grade_level_id: [
            { required: true, message: '请选择等级', trigger: 'blur' }
          ],
          education_level_id: [
            { required: true, message: '请选择年级', trigger: 'blur' }
          ],
          book_id: [
            { required: true, message: '请选择上下册', trigger: 'blur' }
          ],
          unit_id: [
            { required: true, message: '请选择单元', trigger: 'blur' }
          ],
          question_num: [
            { required: true, message: '请选择试题数', trigger: 'blur' }
          ]
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
      },
      totalScore() {
        let score = 0
        this.questions.forEach(item => { score += item.standard_score })
        return score
      }
    },
    methods: {
      getanswerOption(data) {
        let options = []
        if (data) {
          options = this.answerOption.filter(item => data.indexOf(item.id) !== -1)
        } else {
          options = []
        }
        return options
      },
      getpaperData() {
        if (this.$route.params.id) {
          const that = this
          this.loading = true
          getpqInfo(that.$route.params.id).then(res => {
            if (res.data.code === 200) {
              const { book_id, education_level_id, grade_level_id, question_num, total_score, unit_id } = res.data.data
              this.formData = { book_id, education_level_id, grade_level_id, question_num, total_score, unit_id }
              this.formData.name = res.data.data.paper_name
              this.gradeOptions = this.educationOptions.filter(item => {
                return item.edu_level_id === this.formData.education_level_id
              })[0].grades
            } else {
              that.$message({
                message: res.data.message,
                type: 'error'
              })
            }
          })
          getpqlist(that.$route.params.id).then(res => {
            if (res.data.code === 200) {
              this.questions = res.data.data
            } else {
              that.$message({
                message: res.data.message,
                type: 'error'
              })
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      },
      checkPostData() {
        let istrue = true
        const errArray = this.questions.filter(item => !item.options || !item.answer || !item.standard_score || !item.knowledge_id)
        if (errArray.length > 0) {
          this.$message({
            message: '请填完试卷试题信息',
            type: 'error'
          })
          istrue = false
        }
        return istrue
      },
      getKnownList() {
        const that = this
        getKnownList().then(res => {
          if (res.data.code === 200) {
            that.knowledgeOptions = res.data.data
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      reLoad() {
        this.getKnownList()
      },
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
        const addCount = this.formData.question_num - this.questions.length
        if (addCount >= 0) {
          const strat = this.questions.length
          for (let i = 0; i < addCount; i++) {
            this.questions.push({
              question_number: strat + i + 1,
              options: '',
              answer: '',
              knowledge_id: '',
              standard_score: 1
            })
          }
        } else {
          const splitNum = Math.abs(addCount)
          this.questions.splice(this.formData.question_num, splitNum)
        }
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.checkPostData()) {
              const postData = { paper: this.formData, questions: this.questions }
              postData.paper.total_score = this.totalScore
              postData.questions.forEach(item => {
                if (item.knowledge_name) delete item.knowledge_name
                if (this.$route.params.id) item.paper_id = this.$route.params.id
              })
              this.disabled = true
              if (this.$route.params.id) {
                editPaper(this.$route.params.id, postData).then(res => {
                  this.disabled = false
                  if (res.data.code === 200) {
                    this.$message({
                      message: res.data.message,
                      type: 'success'
                    })
                    this.$router.push({
                      name: 'app.testPaper.list',
                      params: {
                        level: this.$route.params.level,
                        class: this.$route.params.class,
                        type: this.$route.params.type
                      }})
                  }
                }).catch(() => {
                  this.disabled = false
                })
              } else {
                addPaper(postData).then(res => {
                  this.disabled = false
                  if (res.data.code === 200) {
                    this.$message({
                      message: res.data.message,
                      type: 'success'
                    })
                    this.$router.push({
                      name: 'app.testPaper.list',
                      params: {
                        level: this.$route.params.level,
                        class: this.$route.params.class,
                        type: this.$route.params.type
                      }})
                  }
                }).catch(() => {
                  this.disabled = false
                })
              }
            }
          }
        })
      }
    },
    created() {
      this.getKnownList()
      this.getpaperData()
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
