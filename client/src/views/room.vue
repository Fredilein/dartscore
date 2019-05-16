<template>
  <div>
    <h1>Room</h1>
    <p>roomId: {{ this.$route.params.roomId }}</p>
    <div v-if="loading">
      <p>Loading state...</p>
    </div>
    <div v-else-if="errored">
      {{ errorMsg }}
    </div>
    <div v-else>

      <p>
        {{ state }}
      </p>

    <input v-model="turnscore" placeholder="Enter score">
    <button type="button" class="btn btn-success" v-on:click="sendTurnscore">yup</button>

    </div>
  </div>
</template>



<script>
import socket from 'socket.io-client';

export default {
  name: 'room',
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
