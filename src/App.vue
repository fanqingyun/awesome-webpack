<template>
  <div>
    <div>{{ test1 }}</div>
    <div>{{ $store.state.username }}</div>
    <router-link to="/login">
      登录
    </router-link>
    <router-link to="/home">
      首页
    </router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      test1: '测试vue与webpack的整合'
    }
  },
  mounted () {
    this.$HttpUtils.post('/api/systemMgr/getSystemVersion', {}, (res) => {
      console.log(res)
    })
  }
}
</script>

<style>
</style>
