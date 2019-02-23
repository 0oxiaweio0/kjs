<template>
  <div class="menu-wrapper left-menu-content">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
                   :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.name" slot="title">{{item.children[0].meta.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.name" slot="title">{{item.meta.name}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.name" slot="title">{{child.meta.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

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
<style rel="stylesheet/scss" lang="scss">
  .menu-wrapper{
    .el-menu-item, .el-submenu__title{
      height: 40px;
      line-height: 40px;
      text-align: left!important;
    }
    .el-menu-item.is-active{
      background-color: rgba(33,32,36,1)!important;
    }
    .el-menu-item.is-active:before{
      width: 3px;
      height: 100%;
      content: "|";
      background-color: rgba(81,138,255,1)!important;
      color:rgba(81,138,255,1)!important;
      position: absolute;
      left: 0;
    }
    .el-menu-item.selected{
      background-color: rgba(33,32,36,1)!important;
      color: #ffffff!important;
    }
    .el-menu-item:hover,.el-submenu__title:hover{
      background-color: rgba(255, 255, 255, 0.458824) !important;
      color: #efeb5b!important;
      .el-submenu__icon-arrow ,.el-icon-arrow-down{
        color: #efeb5b!important;
      }
      .svg-icon{
        path{
          fill:#efeb5b;
        }
      }
    }
    .el-menu-item.is-active:hover{
      background-color: rgba(33,32,36,1)!important;
      color: #ffffff!important;
    }
    .el-menu-item.selected:hover{
      background-color: rgba(33,32,36,1)!important;
      color: #ffffff!important;
    }
    .svg-icon{
      width: 20px!important;
      height: 20px!important;
    }
  }
</style>


