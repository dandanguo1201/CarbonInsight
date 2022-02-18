import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import '@/core/lazy_use';
import * as echarts from 'echarts'
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import vuescroll from 'vuescroll/dist/vuescroll-native';

import Videojs from 'video.js'
import 'video.js/dist/video-js.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.prototype.$video = Videojs
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(vuescroll);
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

const i18n = new VueI18n({
  locale: 'en-US',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh.js'),   // 中文语言包
    'en-US': require('./common/lang/en.js')    // 英文语言包
  }
})

// Vue.use(Viewer, {
//   defaultOptions: {
//     zIndex: 9999
//   }
// })
// Vue.use(Viewer);

Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})


// authentication.initialize().then(() => {
  /* eslint-disable no-new */
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// });
