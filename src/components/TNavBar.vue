<template>
  <ul>
    <li v-for="link in links">

      <div class="active-link" v-if="$route.path === link.link">{{ link.label }}</div>

      <RouterLink v-else :to="link.link">{{ link.label }}</RouterLink>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}


</script>

<style scoped>
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style-type: none;
    gap: 1rem;
  }
  a {
    padding: .5rem;
  }
  .active-link {
    font-weight: bold;
  }
</style>