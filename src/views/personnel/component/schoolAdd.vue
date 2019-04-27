<template>
  <div class="school-content">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-label="添加学校" class="el-message-box__wrapper" style="z-index: 2040;background-color: rgba(0,0,0,0.5)">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>添加学校</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn">
            <i class="el-message-box__close el-icon-close" @click="closeBox"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <el-form ref="form"
                   :rules="rules"
                   :model="form"
                   label-width="80px">
            <el-form-item label="学校名称" prop="school_name">
              <el-input v-model="form.school_name"  placeholder="学校名称"></el-input>
            </el-form-item>
            <el-form-item label="学校地址" prop="school_address">
            <!--  <el-row :gutter="10">
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.shen" filterable placeholder="省">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.shi" filterable placeholder="市">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.qu" filterable placeholder="区/县">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <el-input v-model="form.school_address" placeholder="详细地址"></el-input>
                </el-col>
              </el-row>-->
              <el-input v-model="form.school_address" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.school_comment"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="closeBox"><span>取消</span></button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary " :disabled="isDisabled" @click="submit"><span >添加</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      schoolShow: ''
    },
    components: { },
    data() {
      return {
        isDisabled: false,
        form: {
          school_name: '',
          school_address: '',
          school_comment: '',
          school_education_level: 1
        },
        rules: {
          school_name: [
            { required: true, message: '请输入学校名称', trigger: 'blur' }
          ],
          school_address: [
            { required: true, message: '请输入学校地址', trigger: 'blur' }
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
            this.$emit('add-school', this.form)
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
  .school-content{
    .el-form{

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
