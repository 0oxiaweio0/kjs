<template>
  <el-dialog title="知识点" :visible.sync="dialogVisible">
    <el-table v-if="!addShow"
              v-loading="loading"
              element-loading-text="拼命加载中"
              :data="gridData"
              border
              max-height="300">
      <el-table-column prop="id" label="ID" ></el-table-column>
      <el-table-column prop="knowledge_name" label="知识点"></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="100"
      >
        <template slot-scope="scope">
          <i class="el-icon-delete" @click="handleDel(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-form v-if="addShow"
             ref="form"
             :rules="rules"
             :model="form"
             label-width="80px">
      <el-form-item label="知识点" prop="known_name">
        <el-input v-model="form.known_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancer">取消</el-button>
        <el-button type="primary" :disabled="disabled" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-plus" v-if="!addShow" @click="showClick">添加</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { getKnownList, addKnown, delKnown } from '@/api/testPaper'
  export default {
    name: 'KnowledgeDialog',
    data() {
      return {
        loading: false,
        disabled: false,
        addShow: false,
        dialogVisible: false,
        gridData: [],
        form: {
          known_name: ''
        },
        rules: {
          known_name: [
            { required: true, message: '请输入知识点', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      showClick() {
        this.addShow = true
      },
      getKnownList() {
        const that = this
        that.loading = true
        getKnownList().then(res => {
          if (res.data.code === 200) {
            that.gridData = res.data.data
            that.loading = false
          } else {
            that.loading = false
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      handleDel(data) {
        delKnown({ known_name: data.knowledge_name }).then(res => {
          const that = this
          if (res.data.code === 200) {
            that.$message({
              message: res.data.message,
              type: 'success'
            })
            this.getKnownList()
          } else {
            that.loading = false
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      },
      onCancer() {
        this.addShow = false
        this.form.known_name = ''
      },
      onSubmit() {
        this.disabled = true
        this.$refs.form.validate((valid) => {
          if (valid) {
            addKnown(this.form).then(res => {
              this.disabled = false
              this.onCancer()
              this.getKnownList()
            })
          } else {
            this.disabled = false
            return false
          }
        })
      },
      onOpenDialog() {
        this.dialogVisible = true
        this.getKnownList()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-dialog__header{
    text-align: left;
    border-bottom: 1px solid #c0c4cc;
  }
  /deep/ .el-dialog__body{
    padding-bottom: 0;
  }
  /deep/ .el-dialog__footer{
    text-align: left;
  }
  i{
    color: #f56c6c;
    &:hover{
      cursor: pointer;
    }
  }
</style>
