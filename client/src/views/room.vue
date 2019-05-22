<template>
  <div class="room">
    <div v-if="loading">
      <p>Loading state...</p>
    </div>
    <div v-else-if="errored">
      {{ errorMsg }}
    </div>
    <div v-else>

      <router-link :to="{name: 'home'}">back</router-link>
      <h2>{{ state.roomName }}</h2>

      <div class="container sheet-container">
        <div class="row">
          <div class="col-sm" v-for="p in state.player" v-bind:key="p._id">
            <PlayerSheet v-bind:player="p" v-bind:active="p._id == state.player[state.activePlayer]._id"/>
          </div>
        </div>
      </div>
      
      <div class="container keyboard-container">
        <div class="row justify-content-center">
          <div class="col-xs">
            <keyboard v-model="turnscore" :maxlength="3" layouts="12345{←:backspace}|67890{K:ok}" @ok="sendTurnscore"></keyboard>
          </div>
            <div class="col-xs">
              <div class="turnscore" v-on:click="sendTurnscore">
                <span class="turnscore-label">
                  {{ turnscore || "0" }}
                </span>
                <span class="turnscore-text">
                  Enter Score
                </span>
              </div>
            </div>
        </div>
      </div>

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

@import '../assets/App.styl'

.room
  color WHITE

  .sheet-container
    margin-top 30px
    margin-bottom 30px


  .keyboard-container
    bottom 30px
    padding-top 30px

    .vue-keyboard-key
      height 80px
      width 80px
      font-size 24px
      border-radius 10px
      background-color WHITE
      color #222

  .turnscore
    position relative
    height 164px
    width 164px
    background-color WHITE
    border-radius 10px
    border 2px solid WHITE
    margin 2px
    padding-top 20px

    .turnscore-label
      font-size 50px
      color #222

    .turnscore-text
      position absolute
      font-size 24px
      color #222
      left 10%
      bottom 12%





</style>
