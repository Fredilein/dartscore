<template>
  <div>
    <h1>dartscore</h1>
    <div v-if="errored">Error loading rooms.</div>
    <div v-else-if="loading">Loading rooms...</div>
    <div v-else>

      <h3>All rooms:</h3>
      <ul class="list-group">
        <li v-for="r in rooms" class="list-group-item room-item" v-bind:key="r._id">

          <router-link :to="{ name: 'room', params: {roomId: r._id}}">
            <span class="name">
              {{ r.roomName }}
            </span>
          </router-link>

          <button class="btn btn-del" v-on:click="deleteRoom(r._id)">Delete room</button>

        </li>
      </ul>

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

.room-item
  position relative
  text-align left

  .name
    font-size 1.1em
    
  .btn-del
    position relative
    float right


</style>
