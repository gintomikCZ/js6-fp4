<template>

<div class="container">
  <div class="menu-item" v-for="item in settings" @click="onClick(item)">
    {{ item }}
  </div>
</div>


</template>

<script>

export default {
  props: {
    settings: Array
  },
  methods: {
    onClick (item) {
      this.$emit('item-clicked', item)
    }
  }
}

</script>
<style scoped>
  .container {
    max-width: 100px;
    border: 1px solid #cdcdcd;
  }
</style>