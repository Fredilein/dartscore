<template>
  <div class="container">
    <h3>Scoreboard</h3>

    <div class="row">
      <PlayerScore class="col" name="player 0" v-bind:scores="scores0" v-bind:active="activePlayer == 0" />
      <PlayerScore class="col" name="player 1" v-bind:scores="scores1" v-bind:active="activePlayer == 1" />
    </div>

    <input v-model="turnscore" placeholder="Enter score">
    <button type="button" class="btn btn-success" v-on:click="sendTurnscore">yup</button>
    <br>
    <button type="button" class="btn btn-danger" v-on:click="clearScores">clear score</button>
  </div>
</template>



<script>
import io from 'socket.io-client';
import PlayerScore from './PlayerScore.vue';

export default {
  name: 'Scoreboard',
  components: {
    PlayerScore
  },
  data () {
    return {
      scores0: [],
      scores1: [],
      activePlayer: 0,
      turnscore: "",
      socket: io('localhost:3001')
    }
  },
  methods: {
    sendTurnscore(e) {
      e.preventDefault();
      let s = Number(this.turnscore);

      if (s > -1 && s < 181) {
        this.socket.emit('SEND_TURNSCORE', {
          activePlayer: this.activePlayer,
          turnscore: Number(this.turnscore)
        });
        this.turnscore = "";
      } else {
        alert("Enter a valid score pls");
      }
    },
    clearScores(e) {
      e.preventDefault();
      this.socket.emit('CLEAR_SCORES');
    }
  },
  mounted () {
    this.socket.on('TURNSCORE', (data) => {
      if (data.activePlayer == 0) {
        this.scores0.push(data.turnscore);
      } else {
        this.scores1.push(data.turnscore);
      }
      this.activePlayer = (data.activePlayer + 1) % 2;
    });
    this.socket.on('CLEAR_SCORES', () => {
      this.scores0 = [];
      this.scores1 = [];
      this.activePlayer = 0;
    });
  }
}
</script>



<style lang="stylus">


</style>
