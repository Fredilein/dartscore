<template>
  <div>
    <h5>{{ player.name }}</h5>
    <p>Remaining: {{ player.remaining }}</p>
    <p>Legs: {{ player.legs }}</p>
  </div>
</template>



<script>
export default {
  name: 'PlayerSheet',
  props: {
    player: {
      name: String,
      remaining: Number,
      legs: Number
    }
  }
}
</script>



<style lang="stylus">


</style>
