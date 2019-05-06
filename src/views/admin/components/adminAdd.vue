<template>
  <div class="teacher-content">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-label="添加教师" class="el-message-box__wrapper" style="z-index: 100;background-color: rgba(0,0,0,0.5)">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>添加管理员</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn">
            <i class="el-message-box__close el-icon-close" @click="closeBox"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="uname">
              <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="form.pwd" type="password"></el-input>
            </el-form-item>
 <!--           <el-form-item label="确认密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="身份">
              <el-select v-model="form.password" filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->
          </el-form>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small"><span>取消</span></button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary " :disabled="isDisabled" @click="submit"><span>添加</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'adminAdd',
    props: ['adminShow'],
    components: { },
    data() {
      return {
        isDisabled: false,
        options: [
          { label: '超级管理员', value: 1 },
          { label: '普通管理员', value: 2 }
        ],
        form: {
          uname: '',
          pwd: ''
        },
        rules: {
          uname: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      closeBox() {
        this.$parent.adminShow = !this.$parent.adminShow
      },
      submit() {
        this.isDisabled = true
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('add-admin', this.form)
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
