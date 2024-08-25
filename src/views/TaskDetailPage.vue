<template>
  <h1>task detail page</h1>
  <div v-if="!loading">
    <ul>
      <li>
        <span>task name:</span>
        <strong>{{  task.task }}</strong>
      </li>
      <li>
        <span>task name:</span>
        <strong>{{  task.project }}</strong>
      </li>
      <li>
        <span>date:</span>
        <strong>{{  task.date }}</strong>
      </li>
      <li>
        <span>completed:</span>
        <strong>{{  completedToDisplay }}</strong>
      </li>
      <li>
        <span>priority:</span>
        <strong>{{  priorityToDisplay }}</strong>
      </li>
    </ul>

    <h3>assigned persons:</h3>
    <ul v-if="personsTasks.length">
      <li v-for="person in personsTasks" style="display: flex; gap: 1rem;">
        <span>{{  person.last + ' ' + person.first + ', ' + person.position }}</span>
        <button @click="onDeletePersonClick(person.id)">delete</button>
      </li>
    </ul>
    <div v-else>k tomuto úkolu nebyl nikdo přiřazen</div>

    <h3>assign someone</h3>
    <label for="addPerson">choose a guy</label>
    <select id="addPerson" v-model="selectValue">
      <option value=""></option>
      <option v-for="person in personsToSelect" :value="person.id">{{ person.last + ' ' + person.first }}</option>
    </select>
    <button @click="onSaveClick">save</button>
  </div>
</template>

<script>
import db from '@/utils/db.js'

export default {
  data () {
    return {
      loading: true,
      selectValue: ''
    }
  },
  computed: {
    task () {
      return this.$store.state.taskDetail
    },
    personsTasks () {
      return this.$store.state.personsTasks
    },
    completedToDisplay () {
      if (!this.task) return ''
      return this.task.completed ? 'Yes' : 'No'
    },
    priorityToDisplay () {
      if (!this.task) return ''
      const priorities = ['low', 'medium', 'high']
      return priorities[this.task.priority - 1]
    },
    persons () {
      return this.$store.state.persons
    },
    personsToSelect () {
      // persons, které zároveň nemají svoje personid v personsTasks
      const ids = this.personsTasks.map(obj => obj.personid)
      return this.persons.filter(person => ids.indexOf(person.id) < 0)
    }
  },
  created () {
    const promises = [
      this.$store.dispatch('fetchTask', this.$route.params.id),
      this.$store.dispatch('fetchPersonsTasks', { filter: 'taskid', id: this.$route.params.id }),
      this.$store.dispatch('fetchPersons')
    ]
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  methods: {
    onSaveClick () {
      if (!this.selectValue) {
        return
      }
      db.get('js6personstasks?personid=' + this.selectValue + '&taskid=' + this.$route.params.id).then((data) => {
        if (!data.length) {
          db.post('js6personstasks', {personid: this.selectValue, taskid: this.$route.params.id}).then(() => {
            this.selectValue = ''
            this.$store.dispatch('fetchPersonsTasks', { filter: 'taskid', id: this.$route.params.id })
          })
        }
      })
    },
    onDeletePersonClick (id) {
      db.delete('js6personstasks', { id }).then(() => {
        this.$store.dispatch('fetchPersonsTasks', { filter: 'taskid', id: this.$route.params.id })
      })
    }
  }
}

</script>
<style scoped>
h3 {
  margin-top: 2rem;
}
</style>