import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 这里存放可以全局访问的变量名
  state: {
    username: '测试啦'
  },
  mutations: {
    // 这里设置更新state里面的属性的方法，store实例通过commit同步更新state里面的值
    setUsername (state, name) {
      state.username = name
    }
  }
})
export default store
