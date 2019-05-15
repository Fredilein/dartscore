<template>
  <div>
    <h1>Home</h1>
    <div v-if="errored">Error loading rooms.</div>
    <div v-else-if="loading">Loading rooms...</div>
    <div v-else>

      <h3>All rooms:</h3>
      <ul class="list-group">
        <li v-for="r in rooms" class="list-group-item room-item">
          <span class="name">
            {{ r.roomName }}
          </span>

        </li>
      </ul>

    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'home',
  data () {
    return {
      rooms: [],
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('http://localhost:3001/rooms')
      .then(res => {
        this.rooms = res.data
      })
      .catch(err => {
        console.log(err)
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


</style>
