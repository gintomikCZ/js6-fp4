<template>

  <ListPageComponent header="Tasks list" btnLink="/tasks-form/add" btnLabel="add task">
    <TList v-if="!loading">
      <!-- completed - 'success', před due date - '' - over due - 'danger' -->
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
  </ListPageComponent>

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
import TList from '../components/TList.vue'
import TListItem from '../components/TListItem.vue'
import { getPriority, getHighlight } from '@/utils/utils.js'
import ListPageComponent from '../components/ListPageComponent.vue'


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
              this.$store.dispatch('fetchTasks').then(() => {
                this.loading = false
              })
            })
        })
    }
  },
  components: { TModal, TList, TListItem, ListPageComponent }
}


</script>

<style scoped>
.task-row {
  display: flex;
  gap: 1rem;
}
.task-row > div:first-child {
  flex-grow: 1;
}
.task-row > div:nth-child(2) {
  /* flex-basis: 100px;
  flex-grow: 0;
  flex-shrink: 0; */
  flex: 0 0 100px;
}
.task-row > div:last-child {
  /* flex-grow: 0;
  flex-basis: 70px;
  flex-shrink: 0; */
  flex: 0 0 70px;
  text-align: center;
}
</style>