<template>
  <div class="statistics-page">
    <el-row :gutter="20"
            v-if="false"
            v-loading="loading"
            element-loading-text="拼命加载中">
      <el-col :xs="24" :sm="4" :md="4" :lg="4">
        <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20"></el-col>
    </el-row>
    <span class="show-msg">    无准确的统计报告数据</span>
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
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }]
      }
    },
    computed: {
    },
    methods: {
      handleNodeClick() {},
      getClassTree() { // 年级树
        getClassTree().then(res => {
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
</style>
