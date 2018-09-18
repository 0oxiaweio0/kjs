<template>
  <div class="test-paper-list-content">
  </div>
</template>

<script>
  export default {
    name: 'testPaperList',
    data() {
      return {
      }
    },
    components: { },
    created() {
      console.log(this.$route.params)
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
