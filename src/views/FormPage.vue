<template>
  <h1>{{ header }}</h1>
  <TForm
    :formName="formName"
    :settings="settings"
    v-if="!loading"
    @submited="onSubmited"
  />
</template>

<script>
import TForm from '../components/TForm.vue'
import db from '../utils/db.js'

export default {
  name: 'FormPage',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    formName () { // 'persons', 'tasks', 'projects'
      return this.$route.path.split('/')[1].split('-')[0]
    },
    header () {
      return this.formName + ' form'
    },
    settings () {
      return this.$store.state.formSettings[this.formName]
    },
    isEdit () {
      return !!this.$route.params.id && this.$route.params.id !== 'add'
    }
  },
  created () {
    const promises = []
    if (this.isEdit) {
      promises.push(
        db.get('js6' + this.formName + '/' + this.$route.params.id).then(record => {
          this.$store.commit('setInitialValues', {
            formName: this.formName,
            values: record
          })
        })
      )
    }
    if (this.formName === 'persons') {
      promises.push(
        db.get('js6positions').then((data) => {
          this.$store.commit('setOptions', {
            formName: 'persons',
            control: 'positionid',
            options: data.map(record => ({value: record.id, label: record.position}))
          })
        })
      )
    }
    if (this.formName === 'tasks') {
      promises.push(
        db.get('js6projects').then(data => {
          this.$store.commit('setOptions', {
            formName: 'tasks',
            control: 'projectid',
            options: data.map(record => ({value: record.id, label: record.project}))
          })
        })
      )
    }
    Promise.all(promises).then(() => {
      if (this.formName === 'tasks' && this.$route.params.projectid) {
        this.$store.commit('setInitialValues', {
          formName: 'tasks',
          values: {projectid: this.$route.params.projectid}
        })
      }
      this.loading = false
    })

  },
  methods: {
    onSubmited (formData) {
      const promise = this.isEdit
        ? db.put('js6' + this.formName, Object.assign({id: this.$route.params.id}, formData))
        : db.post('js6' + this.formName, formData)
      promise.then(() => {
        // if - kam potom přesměrovat
        this.$router.back()
      })
    }
  },
  components: { TForm }
}

</script>