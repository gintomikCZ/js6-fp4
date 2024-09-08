<template>

  <ListPageComponent header="Persons list" btnLink="/persons-form" btnLabel="add person">
    <TList v-if="!loading">
      <TListItem
        v-for="person in persons"
        @edit-click="onEditClick(person.id)"
        @delete-click="onDeleteClick(person.id)"
      >
        <div @click="$router.push('/persondetail/' + person.id)">{{ person.last + person.first + ', ' + person.position }}</div>
      </TListItem>
    </TList>
  </ListPageComponent>

  <TModal
    :show="showModal"
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
import TList from '../components/TList.vue'
import TListItem from '../components/TListItem.vue'
import ListPageComponent from '../components/ListPageComponent.vue'



export default {
  data () {
    return {
      loading: true,
      showModal: false,
      modalMsg: '',
      modalCancelBtn: false,
      personidToDelete: null,
      personsTasks: []
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
        this.personsTasks = data
        if (data.length) {
          this.modalMsg = 'tato osoba má přidělené úkoly. přesto smazat?'
        } else {
          const personToDelete = this.persons.find(person => person.id === id)
          this.modalMsg = 'fakt chceš smazat osobu: ' + personToDelete.first + ' ' + personToDelete.last + '?'
        }
        this.showModal = true
      })
    },
    closeModal () {
      this.showModal = false
      this.modalMsg = ''
      this.personidToDelete = null
    },
    deletePerson () {
      // maže spolu s taskem i všechny relační záznamy z js6personstasks !!!!!!
      const promises = this.personsTasks.map(record => {
        return db.delete('js6personstasks', {id: record.id})
      })
      Promise.all(promises)
        .then(() => {
          db.delete('js6persons', {id: this.personidToDelete})
            .then(() => {
              this.closeModal()
              this.loading = true
              this.personsTasks = []
              this.$store.dispatch('fetchPersons').then(() => {
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
.container {
  margin-top: 2rem
}
</style>