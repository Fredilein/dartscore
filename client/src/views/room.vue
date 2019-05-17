<template>
  <div>
    <div v-if="loading">
      <p>Loading state...</p>
    </div>
    <div v-else-if="errored">
      {{ errorMsg }}
    </div>
    <div v-else>

      <h2>{{ state.roomName }}</h2>

      <div class="container">
        <div class="row">
          <div class="col-sm" v-for="p in state.player" v-bind:key="p._id">
            <PlayerSheet v-bind:player="p" v-bind:active="p._id == state.player[state.activePlayer]._id"/>
          </div>
        </div>
      </div>
      

      <label>{{ turnscore }}</label>

      <keyboard v-model="turnscore" :maxlength="3" layouts="12345{←:backspace}|67890{K:ok}" @ok="sendTurnscore"></keyboard>

    </div>
  </div>
</template>



<script>
import socket from 'socket.io-client';
import keyboard from 'vue-keyboard';
import PlayerSheet from '../components/PlayerSheet.vue';

export default {
  name: 'room',
  components: {
    PlayerSheet,
    keyboard
  },
  data () {
    return {
      state: {},
      turnscore: "",
      socket: socket('localhost:3001'),
      loading: true,
      errored: false,
      errorMsg: ""
    }
  },
  methods: {
    sendTurnscore() {
      let s = Number(this.turnscore);

      if (s > -1 && s < 181) {
        this.socket.emit('SEND_TURNSCORE', {
          roomId: this.$route.params.roomId,
          turnscore: s
        });
        this.turnscore = "";
      } else {
        alert("Enter a valid score pls");
      }
    }
  },
  mounted () {
    this.socket.emit('INIT', {
      roomId: this.$route.params.roomId
    });
    this.socket.on('STATE_UPDATE', (data) => {
      this.state = data.state;
      this.loading = false;
    });
    this.socket.on('ERROR', (data) => {
      this.errorMsg = "Error: " + data.err;
      this.errored = true;
    });
  }
}
</script>



<style lang="stylus">


</style>
