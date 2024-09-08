<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>

export default {
  name: 'Tlist'
}

</script>

<style lang="stylus" scoped>

@import '../styles/variables.styl'

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid $border-color;
}

</style>