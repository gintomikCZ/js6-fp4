<template>
  <h1>Projects Form</h1>
  <!-- <form autocomplete="off">
    <div>
      <label for="project">project name</label>
      <input type="text" id="project">
    </div>
    <div>
      <label for="description">description</label>
      <input type="text" id="description">
    </div>
  </form> -->
  <TForm formName="projects" v-if="!loading" @submited="onSubmited" />
</template>

<script>
import db from '../utils/db.js'
import TForm from '../components/TForm.vue'
export default {
  computed: {
    isEdit () {
      return !!this.$route.params.id
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    if (this.isEdit) {
      db.get('js6projects/' + this.$route.params.id)
      .then((record) => {
        this.$store.commit('setInitialValues', {
          formName: 'projects',
          values: record
        })
      })
      .then(() => {
        this.loading = false
      })
    } else {
      this.loading = false
    }
  },
  methods: {
    onSubmited (formData) {
      console.log(formData)
      const promise = this.isEdit
        ? db.put('js6projects', Object.assign({ id: this.$route.params.id }, formData))
        : db.post('js6projects', formData).then(() => {
          this.$router.push('/')
        })

        promise.then(() => {
          this.$router.push('/')
        })
    }
  },
  components: { TForm }
}


</script>