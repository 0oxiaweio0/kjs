<template>
  <div class="statistics-page">
    <el-row :gutter="20"
            v-loading="loading"
            element-loading-text="拼命加载中">
      <el-col :xs="24" :sm="4" :md="4" :lg="4">
        <el-tree
          :data="treeData"
          :highlight-current="true"
          @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20"></el-col>
    </el-row>
  </div>
</template>
<script>
  import { getPlatform } from '@/api/testPaper'
  import { getClassTree } from '@/api/person'
  export default {
    name: 'statistics',
    components: {
    },
    data() {
      return {
        treeData: []
      }
    },
    computed: {
    },
    methods: {
      handleNodeClick() {},
      getClassTree() { // 年级树
        getClassTree().then(res => {
          if (res.data.code === 200) {
            this.treeData = res.data.data
            this.treeData.unshift({ label: '总览' })
          }
        })
      },
      getPlatform() { // 平台统计
        getPlatform().then()
      }
    },
    created() {
      this.getPlatform()
      this.getClassTree()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .show-msg{
    color: red;
    line-height: 300px;
  }
  /deep/.el-tree{
    background:rgba(249,249,249,1);
    padding: 10px;
  }
  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background:rgba(81,138,255,1);
    color: #ffffff;
  }

</style>
