

<template>
  <RouterView />
  <button @click="showMenu = true">menu</button>
  <TContextMenu v-if="showMenu" :settings="settings" @item-clicked="onItemClicked"/>
</template>

<script>
  import TContextMenu from '@/components/TContextMenu.vue'
  export default {
    components: { TContextMenu },
    data () {
      return {
        showMenu: false,
        settings: [
          'addPerson', 'addTask', 'addProject'
        ]
      }
    },
    methods: {
      onItemClicked (payload) {
        this.showMenu = false
        const obj = {
          addPerson: '/persons-form',
          addTask: '/tasks-form/add',
          addProject: '/projects-form'
        }
        this.$router.push(obj[payload])
      }
    }
  }

</script>

<style scoped>

</style>
