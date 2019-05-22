<template>
  <div class="sheet" v-bind:class="{ 'active': active }">

    <StatBars 
      v-bind:remaining="player.points | remaining" 
      v-bind:average="player.points | average"
    />
    
    <span class="name">{{ player.name }}</span>

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

.name
  position relative
  top 10px
  font-size 1.3em

</style>
