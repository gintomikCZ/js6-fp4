<template>
  <h1>{{ header }}</h1>
  <button @click="$router.push(btnLink)">{{  btnLabel }}</button>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    header: String,
    btnLink: String,
    btnLabel: String
  }
}


</script>

<style scoped>
 .container {
  margin-top: 2rem;
 }
</style>