<template>
  <div class="test-paper-content">
    <div class="test-paper-items-content">
      <div class="test-paper-items-title"><span>初中试卷</span></div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" v-for="(classItem,index) in class1" :key="index">
          <el-card shadow="hover">
            <div class="paper-item">
              <div class="left">
                <p>{{classItem.className}}</p>
                <span>{{classItem.eName}}</span>
                <div class="paper-item-le">
                  <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[0].classLevelType}}">
                    {{classItem.children[0].classLevel}}
                  </router-link>
                  <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[1].classLevelType}}">
                    {{classItem.children[1].classLevel}}
                  </router-link>
                </div>
              </div>
              <div class="right">{{classItem.className?classItem.className.split("年级")[0]:""}}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="test-paper-items-content">
      <div class="test-paper-items-title"><span>高中试卷</span></div>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="6" v-for="(classItem,index) in class2" :key="index">
          <el-card shadow="hover">
            <div class="paper-item">
              <div class="paper-item">
                <div class="left">
                  <p>{{classItem.className}}</p>
                  <span>{{classItem.eName}}</span>
                  <div class="paper-item-le">
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[0].classLevelType}}">
                      {{classItem.children[0].classLevel}}
                    </router-link>
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[1].classLevelType}}">
                      {{classItem.children[1].classLevel}}
                    </router-link>
                  </div>
                </div>
                <div class="right">{{classItem.className?classItem.className.split("年级")[0]:""}}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import classData from '@/data/config/classData'
  export default {
    name: 'testPaperIndex',
    components: { },
    data() {
      return {
      }
    },
    computed: {
      class1() {
        return classData.filter(item => item.level === 2)
      },
      class2() {
        return classData.filter(item => item.level === 1)
      }
    },
    created() {
      console.log(this.$store.state.user.resCode)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.test-paper-content{
  padding: 20px;
  .test-paper-items-content{
    margin-bottom: 40px;
  }
  .test-paper-items-title{
    text-align: left;
    margin-bottom: 10px;
    span{
      display: inline-block;
      margin-left: 10px;
      width:56px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:20px;
    }
  }
  .test-paper-items-title:before{
    width:4px;
    height:18px;
    content: "|";
    color: rgba(81,138,255,1);
    background:rgba(81,138,255,1);
  }
  .test-paper-items-title:after{
    display: block;
    visibility: hidden;
    content: "";
    clear: both;
  }
  .paper-item{
    text-align: right;
    width: 100%;
    position: relative;
    .left{
      position: absolute;
      left: 20px;
      transform: translate(0, -50%);
      top: 50%;
      text-align: left;
      .paper-item-le{display: none}
      p{
        margin-top: 0;
        margin-bottom: 0px;
        width:88px;
        height:30px;
        font-size:22px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:30px;
      }
      span{
        width:136px;
        height:24px;
        font-size:10px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(182,182,182,1);
        line-height:12px
      }
      a{
        margin-right: 10px;
        display: inline-block;
        height:12px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(81,138,255,1);
        line-height:12px;
      }
    }
    .right{
      display: inline-block;
      width:119px;
      height:101px;
      font-size:50px;
      font-family:Helvetica;
      color:rgba(182,182,182,1);
      line-height:84px;
      background:linear-gradient(133deg, rgba(255,255,255,1) 0%, rgba(183,204,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
  }
  .el-card{
    &:hover{
      border: 1px solid #518AFF;
      cursor: pointer;
      .paper-item-le{
        display: block;
      }
    }
  }
}
</style>
