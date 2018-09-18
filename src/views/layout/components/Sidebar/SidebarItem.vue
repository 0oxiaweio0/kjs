<template>
  <div class="menu-wrapper left-menu-content">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest,'selected':$route.path.indexOf(item.path)!==-1}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon" :class-name="svgColor"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.name" slot="title">{{item.meta.name}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svgColor: 'default-color'
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  },
  created() {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-wrapper{
    .el-menu-item.is-active{
      background-color: rgba(16, 141, 233, 1)!important;
    }
    .el-menu-item.selected{
      background-color: rgba(16, 141, 233, 1)!important;
      color: #ffffff!important;
    }
    .el-menu-item, .el-submenu__title{
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item:hover{
      background-color: rgba(255, 255, 255, 0.458824) !important;
      color: #efeb5b!important;
      .svg-icon{
        path{
          fill:#efeb5b;
        }
      }
    }
    .el-menu-item.is-active:hover{
      background-color: rgba(16, 141, 233, 1)!important;
      color: #ffffff!important;
    }
    .el-menu-item.selected:hover{
      background-color: rgba(16, 141, 233, 1)!important;
      color: #ffffff!important;
    }
    .svg-icon{
      width: 20px!important;
      height: 20px!important;
    }
  }
</style>


