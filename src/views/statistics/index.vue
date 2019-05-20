<template>
  <div class="statistics-page">
    <el-row :gutter="20"
            v-loading="loading"
            element-loading-text="拼命加载中">
      <el-col :xs="24" :sm="4" :md="4" :lg="4">
        <el-tree
          :data="treeData"
          node-key="id"
          :class="{show:isShowFirst}"
          :highlight-current="true"
          :default-expanded-keys="[1]"
          :current-node-key="1"
          accordion
          @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="20">
        <div id="myChart" :style="{width: '80%', height: '500px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getPlatform, getSchoolStatic } from '@/api/testPaper'
  import { getClassTree } from '@/api/person'
  // 引入基本模板
  const echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'statistics',
    components: {
    },
    data() {
      return {
        isShowFirst: true,
        treeData: [],
        loading: false
      }
    },
    computed: {
    },
    methods: {
      drawPlatformLine(title, data) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: title },
          legend: {
            data: ['学校', '班级', '学生', '教师'],
            align: 'left',
            left: 10
          },
          tooltip: {},
          xAxis: {
            data: ['学校', '班级', '学生', '教师']
          },
          yAxis: { splitLine: { show: false }},
          series: [{
            name: title,
            type: 'bar',
            barWidth: 50,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [data.school_count, data.class_count, data.student_total, data.teacher_count]
          }]
        })
      },
      drawSchoolLine(title, data) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: title },
          tooltip: {},
          xAxis: {
            splitLine: { show: false },
            data: ['班级', '学生', '教师', '试卷']
          },
          yAxis: { splitLine: { show: false }},
          series: [{
            name: title,
            type: 'bar',
            barWidth: 50,
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [data.class_count, data.student_total, data.teacher_count, data.paper_count]
          }]
        })
      },
      getClassTree() { // 年级树
        getClassTree().then(res => {
          if (res.data.code === 200) {
            this.treeData = res.data.data
            this.treeData.unshift({ label: '总览', id: 1 })
          }
        })
      },
      getPlatform() { // 平台统计
        getPlatform().then().then(res => {
          if (res.data.code === 200) {
            this.drawPlatformLine('平台统计', res.data.data)
          }
        })
      },
      getSchoolStatic(title, data) { // 学校统计
        getSchoolStatic(data).then().then(res => {
          if (res.data.code === 200) {
            this.drawSchoolLine(title, res.data.data)
          }
        })
      },
      handleNodeClick(data, node, sel) {
        if (data) {
          this.isShowFirst = false
          if (data.label === '总览') {
            this.getPlatform()
            return false
          }
          if (!data.edu_level_id && node.level === 1) {
            this.getSchoolStatic(data.label, { school_name: data.label })
            return false
          }
          if (data.edu_level_id && node.level === 2) {
            this.getSchoolStatic(node.parent.data.label + ':' + data.label, { school_name: node.parent.data.label, edu_level_id: data.edu_level_id })
            return false
          }
          if (node.parent.data.edu_level_id && node.level === 3) {
            this.$message({
              message: '目前不支持到班级统计',
              type: 'error'
            })
          }
        }
      }
    },
    created() {
      this.getClassTree()
    },
    mounted() {
      this.getPlatform()
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
  .myChart{
    width: 100%;
    height: 500px;
  }
  .show /deep/ .el-tree-node:first-child .el-tree-node__content{
    background:rgba(81,138,255,1);
    color: #ffffff;
  }

  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background:rgba(81,138,255,1);
    color: #ffffff;
  }

</style>
