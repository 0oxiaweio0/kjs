<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="rgba(50,53,61,1)"
      text-color="rgba(255, 255, 255, 0.447058823529412)"
      active-text-color="#FFFFFF"
    >
      <sidebar-item :routes="modalRouters"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      systemName: this.$store.state.app.systemName
    }
  },
  computed: {
    ...mapGetters([
      'modalRouters',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .sys-logo{
    border-width: 0px;
    position: absolute;
    width: 140px;
    height: 32px;
    font-size: 20px;
    color: #FFFFFF;
    z-index: 1002;
    top: 20px;
    left: 20px;
    .sys-logo-bg{
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
      line-height: 32px;
      letter-spacing: 5px;
  }
  }
  .menu-wrapper{
    .router-link-active{
      background-color: rgba(16, 141, 233, 1);
    }
  }
</style>
