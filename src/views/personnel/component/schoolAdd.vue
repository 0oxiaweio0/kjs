<template>
  <div class="school-content">
    <div tabindex="-1" role="dialog" aria-modal="true" aria-label="添加学校" class="el-message-box__wrapper" style="z-index: 1000;background-color: rgba(0,0,0,0.5)">
      <div class="el-message-box">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>{{form.id?'修改学校':'添加学校'}}</span>
          </div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn">
            <i class="el-message-box__close el-icon-close" @click="closeBox"></i>
          </button>
        </div>
        <div class="el-message-box__content"
             v-loading="loading"
             element-loading-text="拼命加载中">
          <el-form ref="form"
                   :rules="rules"
                   :model="form"
                   label-width="90px">
            <el-form-item label="学校名称" prop="school_name">
              <el-input v-model="form.school_name"  placeholder="学校名称"></el-input>
            </el-form-item>
            <el-form-item label="学校地址" prop="school_address">
              <el-row :gutter="10">
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.school_province" filterable placeholder="省" @change="getCity(form.school_province)">
                    <el-option
                      v-for="item in provinceOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.school_city" filterable placeholder="市" @change="getCounty(form.school_city)">
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="7" :sm="7" :md="7" :lg="7" style="margin-bottom: 22px">
                  <el-select v-model="form.school_county" filterable placeholder="区/县">
                    <el-option
                      v-for="item in areaOptions"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <el-input v-model="form.school_address" placeholder="详细地址"></el-input>
                </el-col>
              </el-row>
             <!-- <el-input v-model="form.school_address" placeholder="详细地址"></el-input>-->
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.school_comment"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="el-message-box__btns">
          <button type="button" class="el-button el-button--default el-button--small" @click="closeBox"><span>取消</span></button>
          <button type="button" class="el-button el-button--default el-button--small el-button--primary " :disabled="isDisabled" @click="submit"><span >保存</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getProvince, getCity, getArea } from '@/api/person'
  export default {
    props: {
      schoolShow: '',
      data: {
        type: Object
      }
    },
    components: { },
    data() {
      return {
        isDisabled: false,
        loading: false,
        provinceOptions: [],
        cityOptions: [],
        areaOptions: [],
        form: {
          school_name: '',
          school_province: '',
          school_city: '',
          school_county: '',
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
      getProvince() {
        const that = this
        that.loading = true
        getProvince().then(function(res) {
          if (res.data.code === 200) {
            that.provinceOptions = res.data.data.map(item => { return { label: item, id: item } })
          }
          that.loading = false
        })
      },
      getCity(data) {
        this.cityOptions = []
        this.areaOptions = []
        this.form.school_city = ''
        this.form.school_county = ''
        const that = this
        this.loading = true
        getCity({ province_name: data }).then(function(res) {
          if (res.data.code === 200) {
            that.cityOptions = res.data.data.map(item => { return { label: item.city_name, id: item.city_name } })
            that.loading = false
          } else {
            that.loading = false
          }
        })
      },
      getCounty(data) {
        this.areaOptions = []
        this.form.school_county = ''
        const that = this
        this.loading = true
        getArea({ province_name: that.form.school_province, city_name: data }).then(function(res) {
          if (res.data.code === 200) {
            that.areaOptions = res.data.data.map(item => { return { label: item.county_name, id: item.county_name } })
          }
          that.loading = false
        })
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
    },
    created() {
      const that = this
      this.getProvince()
      if (this.data) {
        this.form.id = this.data.id
        this.form.school_name = this.data.name
        this.form.school_province = this.data.province
        this.form.school_city = this.data.city
        this.form.school_county = this.data.county
        this.form.school_address = this.data.address
        this.form.school_comment = this.data.comment
        this.form.school_education_level = 1
        getCity({ province_name: this.data.province }).then(function(res) {
          if (res.data.code === 200) {
            that.cityOptions = res.data.data.map(item => { return { label: item.city_name, id: item.city_name } })
          }
        })
        getArea({ province_name: this.form.school_province, city_name: this.form.school_city }).then(function(res) {
          if (res.data.code === 200) {
            that.areaOptions = res.data.data.map(item => { return { label: item.county_name, id: item.county_name } })
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
  /deep/.el-message-box{
    width: 600px;
  }
</style>
