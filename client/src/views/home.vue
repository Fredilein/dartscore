<template>
  <div class="container">
    <h1 class="title">DARTSCORE</h1>
    <div v-if="errored">Error loading rooms.</div>
    <div v-else-if="loading">Loading rooms...</div>
    <div v-else-if="rooms.length < 1">No rooms</div>
    <div v-else>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <ul class="list-group list-group-flush rooms">
            <li v-for="r in rooms" class="list-group-item room-item" v-bind:key="r._id">
          
              <span class="num-players">{{ r.player.length }} <i class="fas fa-user-friends fa-sm"></i></span>
          
                <router-link class="name" :to="{ name: 'room', params: {roomId: r._id}}">
                    {{ r.roomName }}
                </router-link>
          
              <button class="btn btn-del" v-on:click="deleteRoom(r._id)"><i class="fas fa-times"></i></button>
            </li>
          </ul>
        </div>
      </div>

      <br>

      <NewRoom />

    </div>
  </div>
</template>



<script>
import NewRoom from '../components/NewRoom.vue';
import axios from 'axios';

export default {
  name: 'home',
  components: {
    NewRoom
  },
  data () {
    return {
      rooms: [],
      loading: true,
      errored: false
    }
  },
  methods: {
    deleteRoom(id) {
      axios
        .post('http://localhost:3001/closeroom', {
          rid: id
        })
        .then(res => {
          location.reload(true)
        })
        .catch(err => {
          alert('Error: ' + err)
        });
    }
  },
  mounted () {
    axios
      .get('http://localhost:3001/rooms')
      .then(res => {
        this.rooms = res.data
      })
      .catch(err => {
        alert('Error: ' + err)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.title
  color WHITE

.rooms
  color WHITE
  font-size 1.2em

  .room-item
    padding-left 80px
    text-align left
    background-color rgba(0,0,0,0)
    border-color WHITE

    a,button
      &:hover
        color #FFF

    .num-players
      position absolute
      left 0
      width 80px
      text-align center
      margin-top 5px

    .name
      position relative
      font-size 1.1em
      text-decoration none
      top 4px
      color WHITE
      
    .btn-del
      position relative
      float right
      color WHITE


</style>
