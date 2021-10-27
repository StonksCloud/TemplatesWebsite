import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false
Vue.use(Vuesax, {
  colors: {
    primary:'rgb(250,140,27)',
    success:'rgb(35,138,231)',
    danger:'rgb(196,9,37)',
    warning:'rgb(252,199,36)',
    dark:'rgb(36, 33, 69)'
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
