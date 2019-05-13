<template>
  <div>
    <h5>{{ name }}</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="s in scores">
        {{ s }}
      </li>
    </ul>
    <p>Active: {{ active }}</p>
  </div>
</template>



<script>
export default {
  name: 'PlayerScore',
  props: {
    name: String,
    scores: Array,
    active: Boolean
  }
}
</script>



<style lang="stylus">


</style>
