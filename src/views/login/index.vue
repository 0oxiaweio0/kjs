<template>
  <div class="login-container">
    <div class="login-top">
      <div class="login-top-content">
        <div class="system-logo">
          金典教育LOGO
        </div>
        <div class="system-user">
          <div class="system-user-content">
            <div class="system-user-cell">
              <img class="user-avatar" :src="userGif">
              <span>金典教育</span>
              <img class="user-set" :src="userSet">
              <span>设置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-main">
      <div class="login-banner">
        <div class="login-banner-content">
          <img :src="BG" class="bg-style" alt="背景图片">
          <div class="login-from">
            <div class="login-from-content">
              <div class="login-from-title">账户登录</div>
              <div class="login-from-body">
                <el-form ref="form" :model="loginForm">
                  <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-input type="password" v-model="loginForm.password"  placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleLogin()">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="link"><a >关于我们</a>|<a>联系我们</a></div>
      <div class="copyright">
        Copyright&nbsp;©&nbsp;2019&nbsp;&nbsp;金典教育&nbsp;版权所有
      </div>
    </div>
  </div>
</template>

<script>
  import userSet from '@/assets/icon/set.png'
  import userGif from '@/assets/user.gif'
  import BG from '@/assets/bg.jpg'
  import login_logo from '@/assets/login/u581.jpg'
  export default {
    components: { },
    name: 'login',
    data() {
      return {
        debug: false,
        systemName: this.$store.state.app.systemName,
        login_logo,
        userGif,
        userSet,
        BG,
        loginForm: {
          username: '', // 用户名
          password: '' // 密码
        }
      }
    },
    methods: {
      handleLogin() {
        let params = {}
        if (!this.loginForm.username) {
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          })
          return
        }
        if (!this.loginForm.password) {
          this.$message({
            message: '登录密码不能为空',
            type: 'error'
          })
          return
        }
        params['username'] = this.loginForm.username
        params['password'] = this.loginForm.password
        this.$store.dispatch('LoginByUsername', params).then(() => {
          this.$store.dispatch('GenerateRoutes', this.$store.state.user.roles).then(() => {
            if (this.$store.state.permission.addRouters && this.$store.state.permission.addRouters.length > 0) {
              this.$router.addRoutes(this.$store.state.permission.addRouters)
              this.$router.push({ path: '/home' })
            }
            this.$store.dispatch('GetBaseInfo').then()
          }).catch(function(err) {
            console.log(err)
          })
        }).catch(() => {
          this.loading = false
        })
        params = null
      },
      handleCancel() {
        this.loginForm.username = null
        this.loginForm.password = null
      }
    },
    created() {
    },
    destroyed() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-form-item{
      margin-bottom: 20px;
    }
    .el-button--medium{
      border-width: 0px;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-size: 20px;
      background:rgba(81,138,255,1);
      border-radius:3px;
    }
    .el-button--medium:hover{
      background-color: #66b1ff;
    }
    .el-input--medium .el-input__inner{
      height: 40px;
      line-height: 40px;
    }
    .el-button+.el-button {
    margin-left: 44px;
    }

  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#f0f2f5;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    padding-top: 80px;
    .login-top{
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 80px;
      background: inherit;
      background-color: rgba(255,255,255,1);
      border-radius: 0px;
      -moz-box-shadow:0px 3px 5px 0px rgba(218,218,218,0.5);
      -webkit-box-shadow:0px 3px 5px 0px rgba(218,218,218,0.5);
      box-shadow:0px 3px 5px 0px rgba(218,218,218,0.5);
      .login-top-content{
        position: relative;
        width: 1000px;
        height: 100%;
        margin: 0 auto;
        .system-logo{
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -14.5px;
          vertical-align: middle;
          width:164px;
          height:29px;
          font-size:20px;
          font-family:Helvetica;
          color:rgba(51,51,51,1);
          line-height:24px;
          letter-spacing:3px;
          display: table-cell;
          vertical-align: middle;
        }
        .system-user{
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -14.5px;
          height:29px;
          .system-user-content{
            height: 100%;
            display: table;
            .system-user-cell{
              display: table-cell;
              vertical-align: middle;
              img.user-avatar{
                width: 29px;
                height: 29px;
                border-radius: 50%;
                vertical-align: middle;
              }
              .user-set{
                vertical-align: middle;
                margin-left: 40px;
              }
              span{
                display: inline-block;
                height: 29px;
                line-height: 29px;
              }
            }
          }
        }
      }
    }
    .login-main{
      position: relative;
      border-width: 0px;
      position: relative;
      margin: 0 auto;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      display: table;
      width: 100%;
      .login-banner{
        width: 100%;
        position: relative;
        z-index: 1;
        background:rgba(196,231,241,1);
      .login-banner-content{
        display: block;
        width: 1000px;
        height: 350px;
        margin: 0 auto;
        position: relative;
        .bg-style{
          display: block;
          width: 100%;
          height: 100%;
        }
        .login-from{
          position: absolute;
          right: 20px;

          top: 25px;
          width: 280px;
          height: 300px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 22px 0px rgba(222,219,219,0.5);
          .login-from-content{
            padding: 20px 15px;
            .login-from-title{
              margin-top: 20px;
              width:80px;
              height:28px;
              font-size:20px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:rgba(51,51,51,1);
              line-height:28px;
            }
            .login-from-body{
              margin-top: 20px;
            }
          }
        }
      }
      }
    }
    .footer{
      margin-top: 20px;
      font-size: 12px;
      color: #666;
      .link{
        margin-bottom: 10px;
        a{
          margin: 0 10px;
        }
      }
    }
  }
  @media screen and (min-width: 1400px) {
    .login-container .login-main{
    }
  }
  @media (max-width: 1399px)  and (min-width: 1200px) {
    .login-container .login-main{

    }
  }
  @media (max-width: 1199px)  and (min-width: 1024px) {
    .login-container .login-main{
    }
  }
  @media (max-width: 1023px)  and (min-width: 769px) {
    .login-container .login-main{
    }
  }
  @media screen and (max-width: 768px) {
    .login-container .login-main{
    }
  }
</style>
