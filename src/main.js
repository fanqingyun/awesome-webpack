import Vue from 'vue'
import App from './App'
import HttpUtils from './utils/httpUtils'
import store from './store/store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$HttpUtils = HttpUtils
Vue.use(ElementUI)
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
