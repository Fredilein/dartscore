<template>
  <div>
    <h5>{{ player.name }}</h5>
    <p>Remaining: {{ player.points | remaining }}</p>
    <p>Legs: {{ player.legs }}</p>
    <p>Active: {{ active }}</p>
  </div>
</template>



<script>
export default {
  name: 'PlayerSheet',
  props: {
    player: {
      name: String,
      points: [Number],
      legs: Number
    },
    active: Boolean
  },
  data() {
    return{
      remaining: this.calcRemaining(this.player.points)
    }
  },
  methods: {
    calcRemaining(points) {
      var sum = 301
      for (var p in points) {
        sum -= points[p]
      }
      return sum
    }
  }
}
</script>



<style lang="stylus">


</style>
