<template>
  <div class="app-wrapper" :class="classObj">
    <div class="nav-top">
      <div class="nav-top-content">
        <div class="system-logo">
          <img :src="logo" alt="logo">
        </div>
        <div class="right-menu">
          <div class="right-menu-cell">
            <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
              <screenfull class="screenfull right-menu-item"></screenfull>
            </el-tooltip>
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
              <div class="avatar-wrapper">
                <img class="user-avatar" :src="userGif">
                <span>{{userInfo.username}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="showEditPassWord">修改密码</span>
                </el-dropdown-item>
<!--                <el-dropdown-item divided>
                  <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="right-menu-cell" v-if="userInfo.sys_role_id ===1">
            <el-dropdown class="avatar-container right-menu-item" trigger="click" style="line-height: 40px">
              <div class="avatar-wrapper">
                <img class="user-set" :src="userSet">
                <span>设置</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/admin">管理员管理</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="app-wrapper-content">
      <div class="nav-main">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <navbar></navbar>
          <app-main></app-main>
        </div>
      </div>
    </div>
    <edit-password
      v-if="show"
      :person-data="userInfo"
      @edit-password="editPassword"></edit-password>
  </div>
</template>

<script>
import userSet from '@/assets/icon/set.png'
import logo from '@/assets/logo.new.png'
import userGif from '@/assets/user.gif'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Screenfull from '@/components/Screenfull'
import editPassword from '@/components/editPassword'
import { editPwd, editSupPwd } from '@/api/person'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Screenfull,
    editPassword
  },
  data() {
    return {
      userGif,
      userSet,
      logo,
      show: false
    }
  },
  mixins: [ResizeMixin],
  computed: {
    userInfo() {
      const user = this.$store.state.user.user
      user['uname'] = user.username
      return user
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    editPassword(data) {
      const that = this
      if (this.userInfo.sys_role_id !== 1) {
        editPwd(data).then(function(res) {
          if (res.data.code === 200) {
            that.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      } else {
        editSupPwd(data).then(function(res) {
          if (res.data.code === 200) {
            that.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        })
      }
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    showEditPassWord() {
      this.show = !this.show
      console.log(this.show)
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #f4f4f4 !important;
    .nav-top{
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
      .nav-top-content{
        position: relative;
        height: 100%;
        margin: 0 auto;
        .system-logo{
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          font-family:Helvetica;
          color:rgba(51,51,51,1);
          line-height:24px;
          letter-spacing:3px;
          display: table-cell;
          vertical-align: middle;
          img{
            height: 80px;
          }
        }
        .right-menu {
          float: right;
          height: 100%;
          display: table;
          &:focus{
            outline: none;
          }
          .right-menu-cell{
            display: table-cell;
            vertical-align: middle;
          }
          .user-set{
            vertical-align: middle;
            padding-right: 10px;
          }
          .set-span{
            font-size: 14px;
          }
          .right-menu-item {
            display: inline-block;
            margin: 0 8px;
          }
          .screenfull {
            height: 20px;
            .screenfull-svg{
              vertical-align: 12px!important;
            }
          }
          .international{
            vertical-align: top;
          }
          .theme-switch {
            vertical-align: 15px;
          }
          .avatar-container {
            height: 50px;
            margin-right: 30px;
            .avatar-wrapper {
              cursor: pointer;
              margin-top: 6px;
              position: relative;
              display: table;
              vertical-align: middle;
              .user-avatar {
                display: table-cell;
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              span{
                display: table-cell;
                padding-left: 10px;
                vertical-align: middle;
              }
              .el-icon-caret-bottom {
                display: table-cell;
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
    .app-wrapper-content{
      height: 100%;
      padding-top: 100px;
      margin: 0 auto;
     .nav-main{
       position: relative;
       width: 100%;
       height: 100%;
      .sidebar-container{
        position: absolute!important;
      }
     }
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .main-container{
    background-color: #ffffff !important;
  }
  @media screen and (min-width: 1500px) {
    .nav-top-content{
      width: 1400px;
    }
    .app-wrapper-content{
      width: 1400px;
    }
  }
  @media (max-width: 1499px)  and (min-width: 1300px) {
    .nav-top-content{
      width: 1200px;
    }
    .app-wrapper-content{
      width: 1200px;
    }
  }
  @media (max-width: 1299px)  and (min-width: 1100px) {
    .nav-top-content{
      width: 1000px;
    }
    .app-wrapper-content{
      width: 1000px;
    }
  }
  @media screen and (max-width: 1099px) {
    .nav-top-content{
     margin: 0 20px!important;
    }
  }
</style>
