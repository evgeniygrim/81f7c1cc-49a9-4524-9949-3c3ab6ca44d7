import 'element-plus/dist/index.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '/@/styles/index.scss'

import App from '/@/App.vue'
import { createApp } from 'vue'
import router from '/@/router/index'
import store from '/@/stores/index'
import ElementPlus from 'element-plus'

import VueVirtualScroller from 'vue-virtual-scroller'
import { apolloProvider } from './plugins/apollo'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(apolloProvider)
app.use(ElementPlus)
app.use(VueVirtualScroller)
app.mount('#app')
