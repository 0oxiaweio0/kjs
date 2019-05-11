<template>
  <div class="home-modal-content">
    <div class="home-modal-item">
      <div class="home-modal-item-content">
        <div class="home-modal-item-info">
          <p>在线课程</p>
          <a>立即参加</a>
        </div>
        <img :src="coursePng" alt="在线课程">
      </div>
    </div>
    <div class="home-modal-item">
      <router-link to="/testPaper">
        <div class="home-modal-item-content">
          <div class="home-modal-item-info">
            <p>考试阅卷</p>
            <a>去阅卷</a>
          </div>
          <img :src="watchPng" alt="考试阅卷">
        </div>
      </router-link>
    </div>
    <div class="home-modal-item">
      <div class="home-modal-item-content">
        <div class="home-modal-item-info">
          <p>听力练习</p>
          <a>立即参加</a>
        </div>
        <img :src="hearPng" alt="听力练习">
      </div>
    </div>
  </div>

</template>

<script>
  import coursePng from '@/assets/dashboard/course.png'
  import hearPng from '@/assets/dashboard/hear.png'
  import watchPng from '@/assets/dashboard/watch.png'
  export default {
    components: { },
    name: 'home',
    data() {
      return {
        coursePng,
        hearPng,
        watchPng
      }
    },
    methods: {
    },
    created() {
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .home-modal-content{
    text-align: left;
    .home-modal-item{
      display: inline-block;
      margin: 10px;
      .home-modal-item-content{
        width: 304px;
        height: 109px;
        position: relative;
        box-shadow: 0px 3px 5px 0px rgba(218, 218, 218, 0.5);
        .home-modal-item-info{
          position: absolute;
          left: 20px;
          transform: translate(0,-50%);
          top: 50%;
          p{
            margin-top: 0;
            margin-bottom: 10px;
            width:100px;
            height:16px;
            font-size:22px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:16px;
          }
          a{
            width:57px;
            height:13px;
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(180,183,197,1);
            line-height:13px;
          }
          &:hover{
            cursor: pointer;
          }
        }
        img:hover{
          cursor: pointer;
        }
      }
    }
  }
</style>
