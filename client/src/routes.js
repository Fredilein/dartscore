import home from './views/home.vue'
import room from './views/room.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: room
  }
]
