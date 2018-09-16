<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth' // getToken from cookie
  export default{
    name: 'App',
    created() {
      if (getToken()) {
        console.log('浏览器刷新动态路由配置')
        this.$store.dispatch('GenerateRoutes', ['superAdmin']).then(() => {
          if (this.$store.state.permission.addRouters && this.$store.state.permission.addRouters.length > 0) {
            this.$router.addRoutes(this.$store.state.permission.addRouters)
          }
        }).catch(function(err) {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  overflow-y: auto;
}
</style>
