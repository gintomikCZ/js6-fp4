<template>


  <ListPageComponent header="Projects list" btnLink="/projects-form" btnLabel="add project">
    <TList v-if="!loading">
      <TListItem
        v-for="project in projects"
        @edit-click="onEditClick(project.id)"
        @delete-click="onDeleteClick(project.id)"
        highlight="danger"
      >
        <div @click="$router.push('/projectdetail/' + project.id)">{{ project.project }}</div>
      </TListItem>
    </TList>
  </ListPageComponent>

  <TModal
    :show="showModal"
    :msg="modalMsg"
    cancelBtn
    :confirmBtn="modalOkBtn"
    :cancelLabel="cancelBtnLabel"
    @close-me="closeModal"
    @cancel="closeModal"
    @confirm="deleteProject"
  />
</template>

<script>
import db from '../utils/db.js'
import TModal from '../components/TModal.vue'
import TList from '../components/TList.vue'
import TListItem from '../components/TListItem.vue'
import ListPageComponent from '../components/ListPageComponent.vue'
export default {
  data () {
    return {
      loading: true,
      showModal: false,
      modalMsg: '',
      modalOkBtn: false,
      projectidToDelete: null,
      cancelBtnLabel: ''
    }
  },
  computed: {
    projects () {
      return this.$store.state.projects
    }
  },
  created () {
    this.$store.dispatch('fetchProjects').then(() => {
      this.loading = false
    })
  },
  methods: {
    onDeleteClick (id) {
      this.projectidToDelete = id
      db.get('js6tasks?projectid=' + id).then(data => {
        if(!data.length) {
          this.modalMsg = 'potvrď, že fakt chceš mazat projekt s názvem: ' + this.projects.find(project => project.id === id).project
          this.modalOkBtn = true
          this.cancelBtnLabel = 'cancel'
        } else {
          this.modalMsg = 'sorry, tohle smazat nepůjde'
          this.modalOkBtn = false
          this.cancelBtnLabel = 'OK'
        }
        this.showModal = true
      })
    },
    closeModal () {
      this.showModal = false
      this.modalMsg = ''
      this.projectidToDelete = null
    },
    deleteProject () {
      db.delete('js6projects', {id: this.projectidToDelete}).then(() => {
        this.closeModal()
        this.loading = true
        this.$store.dispatch('fetchProjects').then(() => {
          this.loading = false
        })
      })
    },
    onEditClick (id) {
      this.$router.push('/projects-form/' + id)
    }
  },
  components: { TModal, TList, TListItem, ListPageComponent }
}


</script>

