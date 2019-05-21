<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-new-room" data-toggle="modal" data-target="#newRoomModal">
      <i class="fas fa-plus"></i>
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="newRoomModal" tabindex="-1" role="dialog" aria-labelledby="newRoomModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newRoomModalLabel">New Room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="form-group">
              <label for="roomName">Room Name</label>
              <input class="form-control" id="roomName" type="text" v-model="roomName" />
              <br>
              <label>Player Names</label>
              <input class="form-control" type="text" v-for="(player, index) in playerNames" v-model="playerNames[index]" v-bind:key="index"/>

              <button type="button" class="btn btn-primary" v-on:click="addPlayer">+</button>

            </div>
          


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="createRoom">Create Room</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import router from 'vue-router';

export default {
  name: 'NewRoom',
  data () {
    return {
      roomName: "",
      playerNames: ["Player 1"]
    }
  },
  methods: {
    addPlayer(e) {
      e.preventDefault();
      this.playerNames.push("Player "+(this.playerNames.length+1));
    },
    createRoom(e) {
      e.preventDefault();
      if (this.roomName == "" || this.playerNames.length < 1 || this.playerNames.length > 4) {
        alert("Invalid settings")
        return
      }
      
      axios
        .post('http://localhost:3001/rooms', {
        roomName: this.roomName,
        playerNames: this.playerNames
      })
        .then(res => {
          location.reload(true)
        })
        .catch(err => {
          alert('Error: ' + err)
        })

    }
  }
}
</script>



<style lang="stylus">

.btn-new-room
  width 100px
  border-radius 50px

</style>
