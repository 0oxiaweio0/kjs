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
      <div class="login-box">
        <div class="login-box-bg">
          <div class="login-box-left">
            <img :src="login_logo" width="465" height="364" alt="登录logo">
          </div>
          <div class="login-box-right">
            <div class="login-from">
              <div class="login-from-title"><p>登&nbsp;&nbsp;&nbsp;&nbsp;录</p></div>
              <div class="login-from-body">
                <el-form ref="form" :model="loginForm" label-width="80px">
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
  </div>
</template>

<script>
  import userSet from '@/assets/icon/set.png'
  import userGif from '@/assets/user.gif'
  import login_logo from '@/assets/login/u581.jpg'
  import Cookies from 'js-cookie'// 用于测试设置token后续删除
  export default {
    components: { },
    name: 'login',
    data() {
      return {
        debug: true,
        systemName: this.$store.state.app.systemName,
        login_logo,
        userGif,
        userSet,
        loginForm: {
          username: '', // 用户名
          password: '' // 密码
        }
      }
    },
    methods: {
      handleLogin() {
        let params = {}
        const roles = ['superAdmin']
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
        if (this.debug) {
          // 跳过登录进入测试模块
          this.$store.dispatch('GenerateRoutes', roles).then(() => {
            if (this.$store.state.permission.addRouters && this.$store.state.permission.addRouters.length > 0) {
              Cookies.set('User-Token', '123456789')
              this.$router.addRoutes(this.$store.state.permission.addRouters)
              this.$router.push({ path: '/testPaper' })
            }
          }).catch(function(err) {
            console.log(err)
          })
        } else {
          params['username'] = this.loginForm.username
          params['password'] = this.loginForm.password
          this.$store.dispatch('LoginByUsername', params).then(() => {
            this.$store.dispatch('GetUserInfo', params).then(() => {
              this.$store.dispatch('GenerateRoutes', ['superAdmin']).then(() => {
                if (this.$store.state.permission.addRouters && this.$store.state.permission.addRouters.length > 0) {
                  this.$router.addRoutes(this.$store.state.permission.addRouters)
                  this.$router.push({ path: '/testPaper' })
                }
              }).catch(function(err) {
                console.log(err)
              })
            }).catch(function(err) {
              this.$message({
                message: err.message,
                type: 'error'
              })
            })
          }).catch(() => {
            this.loading = false
          })
        }
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
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-form-item{
      margin-bottom: 30px;
    }
    .el-form-item__label{
      color: #fff;
      font-size: 28px;
      width: 110px!important;
      font-weight: normal;
    }
    .el-form-item__content{
      margin-left: 110px!important;
    }
    .el-button--medium{
      border-width: 0px;
      width: 100%;
      height: 40px;
      background: inherit;
      background-color: rgba(22, 155, 213, 1);
      border: none;
      border-radius: 5px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-size: 20px;
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
  @media (max-width: 1199px)  and (min-width: 1024px){
    .login-container{
      .el-form-item{
        margin-bottom: 20px;
      }
      .el-input--medium .el-input__inner{
        height: 35px;
        line-height: 35px;
      }
      .el-button--medium{
        width: 110px;
        height: 35px;
        font-size: 18px;
        padding: 5px 20px;
      }
      .el-button+.el-button {
        margin-left: 66px;
      }
      .el-form-item__label{
        font-size: 20px;
      }
    }
  }
  @media (max-width: 1023px)  and (min-width: 769px) {
    .login-container{
      .el-form-item{
        margin-bottom: 15px;
      }
      .el-input--medium .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
      .el-button--medium{
        width: 90px;
        height: 30px;
        font-size: 16px;
        padding: 5px 20px;
      }
      .el-button+.el-button {
        margin-left: 55px;
      }
      .el-form-item__label{
        font-size: 20px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .login-container{
      .el-form-item{
        margin-bottom: 20px;
      }
      .el-input--medium .el-input__inner{
        height: 40px;
        line-height: 40px;
      }
      .el-button--medium{
        width: 95px;
        height: 35px;
        font-size: 20px;
        padding: 5px 20px;
      }
      .el-button+.el-button {
        margin-left: 45px;
      }
      .el-form-item__label{
        font-size: 20px;
      }
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
    padding-top: 64px;
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
      border-width: 0px;
      position: relative;
      margin: 0 auto;
      margin-top: 64px;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 2px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      display: table;
      .login-box{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        border-width: 0px;
        position: relative;
        margin: 0 auto;
        width: 1000px;
        height: 382px;
        font-style: normal;
        font-size: 13px;
        color: #333333;
        text-align: center;
        line-height: normal;
        .login-box-bg{
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          border-width: 0px;
          position: relative;
          width: 1000px;
          height: 382px;
          background: inherit;
          background-color: rgba(102, 102, 102, 1);
          border: none;
          border-radius: 0px;
          -moz-box-shadow: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          .login-box-left{
            float: left;
            width: 480px;
            height: 100%;
            background: transparent;
            img{
              display: block;
              margin-top: 8px;
              margin-left: 5px;
            }
          }
          .login-box-right{
            float: left;
            width: 400px;
            height: 100%;
            position: relative;
            .login-from{
              width: 100%;
              height: 100%;
              position: relative;
              .login-from-title{
                margin-top: 35px;
                width:100%;
                border-width: 0px;
                height: 41px;
                font-size: 36px;
                color: #000000;
                p{
                  margin: 0;
                }
              }
              .login-from-body{
                margin-top: 40px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 1400px) {
    .login-container .login-main{
      padding:100px;
    }
  }
  @media (max-width: 1399px)  and (min-width: 1200px) {
    .login-container .login-main{
      padding:50px;
    }
  }
  @media (max-width: 1199px)  and (min-width: 1024px) {
    .login-container .login-main{
      padding:40px;
      .login-box{
        width: 850px;
        height: 325px;
        .login-box-bg{
          width: 850px;
          height: 325px;
          .login-box-left{
            width: 419px;
            img{
              display: block;
              margin-top: 8px;
              margin-left: 5px;
              width: 409px;
              height: 305px;
            }
          }
          .login-box-right{
            width: 400px;
            .login-from{
              .login-from-title{
                margin-top: 20px;
                height: 30px;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1023px)  and (min-width: 769px) {
    .login-container .login-main{
      padding:30px;
      .login-box{
        width: 700px;
        height: 267px;
        .login-box-bg{
          width: 700px;
          height: 267px;
          .login-box-left{
            width: 330px;
            img{
              display: block;
              margin-top: 8px;
              margin-left: 5px;
              width: 320px;
              height: 250px;
            }
          }
          .login-box-right{
            width: 350px;
            .login-from{
              .login-from-title{
                margin-top: 15px;
                height: 30px;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .login-container .login-main{
      .login-box{
        width: 370px;
        .login-box-bg{
          width: 370px;
          .login-box-left{
            display: none;
          }
          .login-box-right{
            width: 350px;
            .login-from{
              .login-from-title{
                margin-top: 15px;
                height: 30px;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
  }
</style>
