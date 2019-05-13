<template>
  <div id="app" class="app">
    <div class="container">
      <h1>dartscore</h1>
      <Scoreboard />
    </div>
  </div>
</template>



<script>
import Scoreboard from './components/Scoreboard.vue';

export default {
  name: 'app',
  components: {
    Scoreboard
  },
  data () {
    return {
      something: 1
    }
  }
}
</script>



<style lang="stylus">

.app 
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  padding-top 60px
  padding-bottom 20px
  text-align center

</style>

