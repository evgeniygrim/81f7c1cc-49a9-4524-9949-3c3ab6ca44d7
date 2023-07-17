import { RouteRecordRaw } from 'vue-router';
import Main from '/@/layouts/main/index.vue';
import NotFound from '/@/views/common/404.vue';
import WallComponent from '/@/views/wall/WallComponent.vue';

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        component: WallComponent
      }
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
] as Array<RouteRecordRaw>;
