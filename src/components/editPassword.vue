<template>
  <div class="password-content">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-label="添加学校" class="el-message-box__wrapper" style="z-index: 2040;background-color: rgba(0,0,0,0.5)">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>修改密码</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn">
            <i class="el-message-box__close el-icon-close" @click="closeBox"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="user_name">
              <el-input v-model="form.user_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="old_pwd">
              <el-input v-model="form.old_pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
              <el-input v-model="form.new_pwd" type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small"><span>取消</span></button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary " :disabled="isDisabled" @click="submit"><span>确定</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'editPassword',
    props: {
      personData: {
        type: Object,
        default: null
      }
    },
    components: { },
    data() {
      return {
        isDisabled: false,
        form: {
          user_name: '',
          old_pwd: '',
          new_pwd: ''
        },
        rules: {
          user_name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          old_pwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          new_pwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
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
            this.$emit('edit-password', this.form)
            this.isDisabled = false
            this.closeBox()
          } else {
            this.isDisabled = false
            return false
          }
        })
      }
    },
    created() {
      this.form.user_name = this.personData.uname ? this.personData.uname : ''
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .password-content{
    .el-form{
      width: 80%;
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
