<template>
    <div class="container container-legs">
      <div class="leg" v-bind:class="{'won': legs > 0}" />
      <div class="leg" v-bind:class="{'won': legs > 1}" style="left: 40px" />
      <div class="leg" v-bind:class="{'won': legs > 2}" style="left: 65px" />
    </div>
</template>



<script>
export default {
  name: 'StatLegs',
  props: {
    legs: Number
  }
}
</script>



<style lang="stylus">

@import '../assets/App.styl'

.container-legs
  height 20px
  width 100px
  position relative
  margin-top 20px
  margin-bottom 10px

  .leg
    height 20px
    width 20px
    background-color #000
    border-radius 10px
    position absolute

  .won
    background-color #FFF


</style>
