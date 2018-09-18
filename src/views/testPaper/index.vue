<template>
  <div class="test-paper-content">
    <div class="test-paper-items-content">
      <div class="test-paper-items-title"><img :src="u618" alt=""><span>初中试卷</span></div>
      <hr>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="5" v-for="(classItem,index) in class1" :key="index">
          <el-card shadow="hover">
            <div class="paper-item">
              <div class="top">{{classItem.className}}</div>
              <div class="bottom">
                <div class="left"><img :src="classItem.icon" :alt="classItem.className"></div>
                <div class="right">
                  <div class="paper-left">
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[0].classLevelType}}">
                      {{classItem.children[0].classLevel}}
                    </router-link>
                  </div>
                  <div class="paper-mid">|</div>
                  <div class="paper-right">
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[1].classLevelType}}">
                      {{classItem.children[1].classLevel}}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="test-paper-items-content">
      <div class="test-paper-items-title"><img :src="u619" alt=""><span>高中试卷</span></div>
      <hr>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" :lg="5" v-for="(classItem,index) in class2" :key="index">
          <el-card shadow="hover">
            <div class="paper-item">
              <div class="top">{{classItem.className}}</div>
              <div class="bottom">
                <div class="left"><img :src="classItem.icon" :alt="classItem.className"></div>
                <div class="right">
                  <div class="paper-left">
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[0].classLevelType}}">
                      {{classItem.children[0].classLevel}}
                    </router-link>
                  </div>
                  <div class="paper-mid">|</div>
                  <div class="paper-right">
                    <router-link :to="{name:'app.testPaper.list',params:{'class':classItem.classType,'type':classItem.children[1].classLevelType}}">
                      {{classItem.children[1].classLevel}}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import u618 from '@/assets/testPaper/u618.jpg'
  import u619 from '@/assets/testPaper/u619.jpg'
  import classData from '@/data/classData'
  export default {
    name: 'testPaperIndex',
    data() {
      return {
        u618,
        u619
      }
    },
    computed: {
      class1() {
        return classData.filter(item => item.level === '1')
      },
      class2() {
        return classData.filter(item => item.level === '2')
      }
    },
    components: { }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.test-paper-content{
  padding: 20px;
  .test-paper-items-content{
    margin-bottom: 40px;
    hr{
      margin-bottom: 20px;
    }
  }
  .test-paper-items-title{
    text-align: left;
    text-indent: 20px;
    img{
      display: block;
      float: left;
      width: 69px;
      height: 65px;
    }
    span{
      float: left;
      display: block;
      font-size: 25px;
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
  }
  .test-paper-items-title:after{
    display: block;
    visibility: hidden;
    content: "";
    clear: both;
  }
  .paper-item{
    width: 100%;
    .top{
      text-align: center;
      font-size: 20px;
    }
    .bottom{
      width: 100%;
      padding-left:45px ;
      margin-top: 15px;
      div{
        float: left;
      }
      .left{
        margin-left: -45px;
        width: 43px;
        height: 50px;
      }
      .right{
        width: 100%;
        height: 50px;
        .paper-left{
          display: inline-block;
          width: 48%;
          height: 100%;
          line-height:  50px;
          text-align: right;
          padding-right: 8px;
          color:#169BD5;
        }
        .paper-mid{
          display: inline-block;
          width: 4%;
          line-height:  50px;
          line-height:  50px;
        }
        .paper-right{
          display: inline-block;
          padding-left: 8px;
          width: 48%;
          height: 100%;
          line-height:  50px;;
          text-align: left;
          color:#169BD5;
        }
      }
    }
    .bottom:after{
      display: block;
      visibility: hidden;
      content: "";
      clear: both;

    }
  }
}
</style>
