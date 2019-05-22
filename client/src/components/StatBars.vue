<template>
    <div class="container container-bars">
      <div 
        class="point-bar" 
        v-bind:style="{ height: remaining / 301 * 100 + '%'}">
      </div>
    </div>
</template>



<script>
export default {
  name: 'StatBars',
  props: {
    remaining: Number
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

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
