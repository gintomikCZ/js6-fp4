<template>
  <h1>project detail page</h1>
  <div v-if="!loading">
    <div>
      <span>Project name: </span>
      <strong>{{ project.project }}</strong>
    </div>
    <div>
      <span>Description: </span>
      <strong>{{ project.description }}</strong>
    </div>
    <h2>related tasks</h2>
    <button @click="$router.push('/tasks-form/add/' + $route.params.id)">add task</button>
    <div class="container">
      <div v-if="!tasks.length">there are no tasks in this projects</div>
      <TList v-else>
        <TListItem
          v-for="task in tasks"
          :highlight="getHighlight(task)"
          @edit-click="onEditClick(task.id)"
          @delete-click="onDeleteClick(task.id)"
        >
          <div class="task-row" @click="$router.push('/taskdetail/' + task.id)">
            <div>{{ task.task }}</div>
            <div>{{ task.date}}</div>
            <div>{{ getPriority(task.priority) }}</div>
          </div>
        </TListItem>
      </TList>
    </div>
  </div>
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
import { getPriority, getHighlight } from '@/utils/utils.js'
import TList from '../components/TList.vue'
import TListItem from '../components/TListItem.vue'
import TModal from '../components/TModal.vue'
import db from '@/utils/db.js'

export default {
  data () {
    return {
      loading: true,
      showModal: false,
      modalMsg: '',
      taskidToDelete: null,
      personsTasks: [],
    }
  },
  computed: {
    project () {
      return this.$store.state.projectDetail
    },
    tasks () {
      return this.$store.state.tasksByProject
    }
  },
  created () {
    Promise.all([
      this.$store.dispatch('fetchProject', this.$route.params.id),
      this.$store.dispatch('fetchTasksByProject', this.$route.params.id)
    ]).then(() => {
      this.loading = false
    })
  },
  methods: {
    getHighlight (task) {
      return getHighlight(task)
    },
    getPriority (num) {
      return getPriority(num)
    },
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
        return db.delete('js6personstasks', {id: record.id})
      })
      Promise.all(promises)
        .then(() => {
          db.delete('js6tasks', {id: this.taskidToDelete})
            .then(() => {
              this.closeModal()
              this.loading = true
              this.personsTasks = []
              this.$store.dispatch('fetchTasksByProject', this.$route.params.id).then(() => {
                this.loading = false
              })
            })
        })
    }
  },
  components: { TList, TListItem, TModal }
}


</script>

<style scoped>
strong {
  font-weight: bold;
}
.task-row {
  display: flex;
  gap: 1rem;
}
.task-row > div:first-child {
  flex-grow: 1;
}
.task-row > div:nth-child(2) {
  flex: 0 0 100px;
}
.task-row > div:last-child {
  flex: 0 0 70px;
  text-align: center;
}
.container {
  margin-top: 1rem;
}
</style>