import "element-plus/dist/index.css";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '/@/styles/index.scss'

import App from '/@/App.vue';
import { createApp } from 'vue';
import router from '/@/router/index';
import store from '/@/stores/index';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';

import VueVirtualScroller from 'vue-virtual-scroller'
import { apolloProvider } from './plugins/apollo';

const app = createApp(App)


library.add(far);
library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.use(apolloProvider)
app.use(ElementPlus)
app.use(VueVirtualScroller)
app.mount('#app')
