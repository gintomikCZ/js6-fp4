<template>
  <h1>Persons list</h1>
  <ul v-if="!loading">
    <li v-for="person in persons" style="display: flex;">
      <div>{{ person.last + person.first + ', ' + person.position }}</div>
      <button style="margin-left: 1rem;" @click="onEditClick(person.id)">edit</button>
    </li>
  </ul>
</template>

<script>
// import db from '../utils/db.js'

export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    persons () {
      return this.$store.state.persons
    }
  },
  created () {
    this.$store.dispatch('fetchPersons').then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClick (id) {
      this.$router.push('/persons-form/' + id)
    }
  }
}


</script>