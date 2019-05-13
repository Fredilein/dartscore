<template>
  <div>
    <h3>Scoreboard</h3>
    Player 0: {{ score0 }}
    <br>
    Player 1: {{ score1 }}
    <br>
    <input v-model="newscore" placeholder="Enter score">
    <button v-on:click="newScore">yup</button>
  </div>
</template>



<script>

export default {
  name: 'Scoreboard',
  data () {
    return {
      score0: 0,
      score1: 0,
      activePlayer: 0,
      newscore: ""
    }
  },
  methods: {
    newScore: function () {
      alert('score: ' + this.newscore);
    }
  },
  mounted () {
    console.log("mounted scoreboard");
  }
}
</script>



<style lang="stylus">


</style>
