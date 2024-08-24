<template>
  <h1>Persons list</h1>
  <ul v-if="!loading">
    <li v-for="person in persons" style="display: flex; gap: 1rem;">
      <div>{{ person.last + person.first + ', ' + person.position }}</div>
      <button @click="onEditClick(person.id)">edit</button>
      <button @click="onDeleteClick(person.id)">delete</button>
    </li>
  </ul>
  <TModal
    v-if="showModal"
    :msg="modalMsg"
    :cancelBtn="modalCancelBtn"
    confirmBtn
    @close-me="closeModal"
    @cancel="closeModal"
    @confirm="deletePerson"
  />
</template>

<script>
import db from '@/utils/db';
import TModal from '../components/TModal.vue'


// import db from '../utils/db.js'

export default {
  data () {
    return {
      loading: true,
      showModal: false,
      modalMsg: '',
      modalCancelBtn: false,
      personidToDelete: null
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
    },
    onDeleteClick (id) {
      this.personidToDelete = id
      db.get('js6personstasks?personid=' + id).then(data => {
        if (data.length) {
          this.modalMsg = 'sorry, tuhle osobu jen tak nesmázneš'
        } else {
          const personToDelete = this.persons.find(person => person.id === id)
          this.modalMsg = 'fakt chceš smazat člověka jménem: ' + personToDelete.last + ' ' + personToDelete.first + ' ?'
        }
        this.modalCancelBtn = !data.length
        this.showModal = true
      })
    },
    closeModal () {
      this.showModal = false
      this.modalMsg = ''
      this.personidToDelete = null
    },
    deletePerson () {
      db.delete('js6persons', {id: this.personidToDelete}).then(() => {
        this.closeModal()
        this.loading = true
        this.$store.dispatch('fetchPersons').then(() => {
          this.loading = false
        })
      })
    }
  },
  components: { TModal }
}


</script>