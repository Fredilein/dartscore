<template>
    <div class="container container-bars">
      <div 
        class="bar pts-bar" 
        v-bind:style="{ height: remaining / 301 * 100 + '%'}"
      >
        <span class="pts">{{ remaining }}</span>
      </div>
      <div 
        class="bar avg-bar" 
        v-bind:style="{ height: average / 301 * 100 + '%'}"
      >
        <span v-if="(average / 301) > 0.18" class="avg">Ø</span>
      </div>
    </div>
</template>



<script>
export default {
  name: 'StatBars',
  props: {
    remaining: Number,
    average: Number
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.container-bars
  height 150px
  width 90px
  position relative
  padding 0

.bar
  border-radius 8px
  height 100%
  bottom 0
  position absolute

.pts-bar
  background-image linear-gradient(to left, BTN_GRAD_1, BTN_GRAD_2)
  min-height 18%!important
  width 50px

.avg-bar
  background-image linear-gradient(to left, AVG_GRAD_1, AVG_GRAD_2)
  left 60px
  width 30px

.pts
  color TEXT_DARK
  font-size 1.2em

.avg
  position absolute
  color TEXT_DARK
  font-size 1.2em
  bottom 0
  left 8px

</style>
