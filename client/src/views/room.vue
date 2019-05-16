<template>
  <div>
    <h1>Room</h1>
    <p>roomId: {{ this.$route.params.roomId }}</p>
    <div v-if="errored">
      {{ errorMsg }}
    </div>
    <div v-else="">
      <p>
        {{ state }}
      </p>
    </div>
  </div>
</template>



<script>
import socket from 'socket.io-client';

export default {
  name: 'room',
  data () {
    return {
      something: 0,
      state: {},
      socket: socket('localhost:3001'),
      errored: false,
      errorMsg: ""
    }
  },
  mounted () {
    this.socket.emit('INIT', {
      roomId: this.$route.params.roomId
    });
    this.socket.on('STATE_UPDATE', (data) => {
      if (data.error != "") {
        this.errored = true;
        this.errorMsg = data.error;
      } else {
        this.state = data.state;
      }
    });
  }
}
</script>



<style lang="stylus">


</style>
