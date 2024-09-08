<template>
  <TNavBar :links="links" />
  <RouterView />
</template>

<script>
  import TNavBar from '@/components/TNavBar.vue'
  export default {
    components: { TNavBar },
    data () {
      return {
        showMenu: false,
        links: [
          { label: 'home', link: '/' },
          { label: 'projects', link: '/projectslist' },
          { label: 'persons', link: '/personslist'},
          { label: 'tasks', link: '/taskslist'}
        ]
      }
    }
  }

</script>

<style scoped>

</style>
