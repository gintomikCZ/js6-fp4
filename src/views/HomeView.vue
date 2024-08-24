<template>
  <main>
    <h1>Home page</h1>
    <div>{{ itWorks }}</div>
  </main>
</template>

<script>

export default {
  computed: {
    itWorks () { return this.$store.state.itWorks}
  }
}

</script>

