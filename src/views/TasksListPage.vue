<template>
  <h1>Tasks list</h1>
  <ul v-if="!loading">
    <li v-for="task in tasks" style="display: flex; gap: 1rem;">
      <div @click="$router.push('/taskdetail/' + task.id)">{{ task.task }}</div>
      <button @click="onEditClick(task.id)">edit</button>
      <button @click.stop="onDeleteClick(task.id)">delete</button>
    </li>
  </ul>
  <TModal
    :show="showModal"
    :msg="modalMsg"
    cancelBtn
    confirmBtn
    @close-me="closeModal"
    @cancel="closeModal"
    @confirm="deleteTask"
  />
</template>

<script>
import db from '@/utils/db';
import TModal from '../components/TModal.vue'

export default {
  data () {
    return {
      loading: true,
      showModal: false,
      modalMsg: '',
      taskidToDelete: null,
      personsTasks: []
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  created () {
    this.$store.dispatch('fetchTasks').then(() => {
      this.loading = false
    })
  },
  methods: {
    onEditClick (id) {
      this.$router.push('/tasks-form/' + id)
    },
    onDeleteClick (id) {
      this.taskidToDelete = id
      db.get('js6personstasks?taskid=' + id).then(data => {
        this.personsTasks = data
        if (data.length) {
          this.modalMsg = 'k tomuhle úkolu jsou přiřazení lidi. přesto smazat ?'
        } else {
          const taskToDelete = this.tasks.find(task => task.id === id)
          this.modalMsg = 'fakt chceš smazat úkol: ' + taskToDelete.task + ' ?'
        }
        this.showModal = true
      })
    },
    closeModal () {
      this.showModal = false
      this.modalMsg = ''
      this.taskidToDelete = null
      this.personsTasks = []
    },
    deleteTask () {
      // maže spolu s taskem i všechny relační záznamy z js6personstasks !!!!!!
      const promises = this.personsTasks.map(record => {
        db.delete('js6personstasks', {id: record.id})
      })
      Promise.all(promises).then(() => {
        db.delete('js6tasks', {id: this.taskidToDelete}).then(() => {
          this.closeModal()
          this.loading = true
          this.personsTasks = []
          this.$store.dispatch('fetchTasks').then(() => {
            this.loading = false
          })
        })
      })
    }
  },
  components: { TModal }
}


</script>