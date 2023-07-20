import { type RouteRecordRaw } from 'vue-router'
import MainLayout from '/@/layouts/main/MainLayout.vue'
import NotFound from '/@/views/common/NotFound.vue'
import WallComponent from '/@/views/wall/WallComponent.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: WallComponent
      }
    ]
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
] as RouteRecordRaw[]
