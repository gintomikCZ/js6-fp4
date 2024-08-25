<template>
  <h1>person detail page</h1>
  <div v-if="!loading">
    <ul>
      <li>
        <span>first name:</span>
        <strong>{{  person.first }}</strong>
      </li>
      <li>
        <span>last name:</span>
        <strong>{{  person.last }}</strong>
      </li>
      <li>
        <span>position:</span>
        <strong>{{  person.position }}</strong>
      </li>
    </ul>

    <h3>assigned tasks:</h3>
    <ul v-if="personsTasks.length">
      <li v-for="task in personsTasks" style="display: flex; gap: 1rem;">
        <span>{{  task.task + ', ' + task.date }}</span>
        <button @click="onDeleteTaskClick(task.id)">delete</button>
      </li>
    </ul>
    <div v-else>tomuto člověku nebyl přiřazen žádný úkol</div>

    <h3>assign some task</h3>
    <label for="addTask">choose a task</label>
    <select id="addTask" v-model="selectValue">
      <option value=""></option>
      <option v-for="task in tasksToSelect" :value="task.id">{{ task.task + ', ' + task.project }}</option>
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
    person () {
      return this.$store.state.personDetail
    },
    personsTasks () {
      return this.$store.state.personsTasks
    },
    tasks () {
      return this.$store.state.tasks
    },
    tasksToSelect () {
      // persons, které zároveň nemají svoje personid v personsTasks
      const ids = this.personsTasks.map(obj => obj.taskid)
      return this.tasks.filter(task => ids.indexOf(task.id) < 0)
    }
  },
  created () {
    const promises = [
      this.$store.dispatch('fetchPerson', this.$route.params.id),
      this.$store.dispatch('fetchPersonsTasks', { filter: 'personid', id: this.$route.params.id }),
      this.$store.dispatch('fetchTasks')
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
      db.get('js6personstasks?taskid=' + this.selectValue + '&personid=' + this.$route.params.id).then((data) => {
        if (!data.length) {
          db.post('js6personstasks', {taskid: this.selectValue, personid: this.$route.params.id}).then(() => {
            this.selectValue = ''
            this.$store.dispatch('fetchPersonsTasks', { filter: 'personid', id: this.$route.params.id })
          })
        }
      })
    },
    onDeleteTaskClick (id) {
      db.delete('js6personstasks', { id }).then(() => {
        this.$store.dispatch('fetchPersonsTasks', { filter: 'personid', id: this.$route.params.id })
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