<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-new-room" data-toggle="modal" data-target="#newRoomModal">
      <i class="fas fa-plus fa-sm"></i> Create New Room
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="newRoomModal" tabindex="-1" role="dialog" aria-labelledby="newRoomModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">


          <div class="modal-body">
            <div class="form-group">
              <label for="roomName">Room Name</label>
              <input class="form-control" id="roomName" type="text" v-model="roomName" />
              <br>
              <label for="playerNames">Player Names</label>
              <input class="form-control" id="playerNames" type="text" v-for="(player, index) in playerNames" v-model="playerNames[index]" v-bind:key="index"/>
              <button type="button" class="btn btn-primary btn-add-player" v-on:click="addPlayer">Add Player</button>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-create-room" v-on:click="createRoom">Create Room</button>
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

@import '../assets/App.styl'

.modal
  background-color rgba(255,255,255,0.1)

.modal-content
  background-color BG_GRAD_2
  color WHITE

.btn-new-room
  width 200px
  border-radius 50px
  background-image btn-bg
  color BG_GRAD_2
  border-color WHITE
  
  &:hover
    border-color WHITE

.btn-add-player
  border-radius 50px
  margin-top 15px
  margin-bottom -10px
  background-image btn-bg
  color BG_GRAD_2

.btn-create-room
  border-radius 50px
  background-image btn-bg
  color BG_GRAD_2

label
  float left

.form-control
  border-radius 50px
  margin-bottom 5px

</style>
