<template>
  <div class="sheet" v-bind:class="{ 'active': active }">
    <h5>{{ player.name }}</h5>

    <StatBars v-bind:remaining="player.points | remaining" />

    <p>{{player.points}}</p>

    <p>Remaining: {{ player.points | remaining }}</p>
    <p>Legs: {{ player.legs }}</p>
  </div>
</template>



<script>
import StatBars from '../components/StatBars.vue'

export default {
  name: 'PlayerSheet',
  components: {
    StatBars
  },
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

@import '../assets/App.styl'

.sheet
  border 2px solid rgba(0,0,0,0)
  padding 10px
  border-radius 30px

.active 
  border 2px solid WHITE

.container-bars
  height 150px
  width 200px
  background-color #222
  position relative

.point-bar
  position absolute
  background-color #888
  width 40px
  height 80%
  bottom 0

</style>
