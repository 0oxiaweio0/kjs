<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    margin: 0px 0 50px 20px;
    padding-right: 20px;
    padding-top: 20px;
    background-color: #ffffff;
    height: 100%;
    min-height: 100%!important;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
