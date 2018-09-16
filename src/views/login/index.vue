<template>
  <div class="login-container">
    <div class="login-top">
      <div class="system-name">
        <div class="system-name-bg"></div>
        <div class="system-name-text"><span>{{systemName}}</span></div>
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
                  <el-form-item label="用户名:">
                    <el-input v-model="loginForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码:">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleLogin()">登录</el-button>
                    <el-button type="primary" @click="handleCancel()">取消</el-button>
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
      width: 120px;
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
      border-width: 0px;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 64px;
      background: inherit;
      background-color: rgba(63, 63, 63, 1);
      border: none;
      border-radius: 0px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      .system-name{
        border-width: 0px;
        position: absolute;
        left: 142px;
        top: 16px;
        width: 140px;
        height: 32px;
        font-size: 20px;
        color: #FFFFFF;
        .system-name-bg{
          border-width: 0px;
          position: absolute;
          left: 0px;
          top: 0px;
          width: 140px;
          height: 32px;
          background: inherit;
          background-color: rgba(255, 255, 255, 0.458823529411765);
          border: none;
          border-radius: 4px;
          -moz-box-shadow: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          font-size: 20px;
          color: #FFFFFF;
        }
        .system-name-text{
          border-width: 0px;
          position: absolute;
          left: 2px;
          top: 3px;
          width: 136px;
          word-wrap: break-word;
          transform-origin: 68px 13px 0px;
          span{
            letter-spacing: 4px;
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
