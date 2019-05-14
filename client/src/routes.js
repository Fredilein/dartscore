import home from './views/home.vue'
import room from './views/room.vue'

export default [
  {
    path: '/',
    component: home
  },
  {
    path: '/room/:roomId',
    component: room
  }
]
