<template>
  <div class="teacher-content">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-label="添加教师" class="el-message-box__wrapper" style="z-index: 2040;background-color: rgba(0,0,0,0.5)">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>添加教师</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn">
            <i class="el-message-box__close el-icon-close" @click="closeBox"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <el-form ref="form"
                   :rules="rules"
                   :model="form"
                   label-width="60px">
            <el-form-item label="姓名" prop="teacher_name">
              <el-input v-model="form.teacher_name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
     <!--       <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>-->
          </el-form>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="closeBox"><span>取消</span></button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary " :disabled="isDisabled" @click="submit"><span>添加</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      teacherShow: ''
    },
    components: { },
    data() {
      return {
        isDisabled: false,
        form: {
          teacher_name: '',
          phone: ''
        },
        rules: {
          teacher_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      closeBox() {
        this.$parent.show = !this.$parent.show
      },
      submit() {
        this.isDisabled = true
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('add-teacher', this.form)
            this.isDisabled = false
            this.closeBox()
          } else {
            this.isDisabled = false
            return false
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .teacher-content{
    .el-form{
      padding: 0 60px 0 40px;
    }
    .el-message-box__header{
      border-bottom: 2px solid #EEEEEE;
    }
    .el-message-box__btns{
      text-align: left;
      text-indent: 80px;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
