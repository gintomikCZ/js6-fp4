<template>
  <form autocomplete="off" @submit.prevent="onSubmit">
     <TControl
        v-for="control in controls"
        :formName="formName"
        :control="control"
        :settings="settings[control]"
        @changed="onChanged"/>
     <div>
      <button>submit</button>
     </div>
  </form>
</template>

<script>
import TControl from './TControl.vue'
export default {
  props: {
    // formName: String
    settings: Object,
    formName: String
  },
  data () {
    return {
      formData: {}
    }
  },
  created () {
    this.controls.forEach((control) => {
      if (this.settings[control].initialValue === 0) {
        this.formData[control] = 0
      } else {
        this.formData[control] = this.settings[control].initialValue || ''
      }
    })
  },
  computed: {
    // settings () {
    //   return this.$store.state.formSettings[this.formName]
    // },
    controls () {
      return Object.keys(this.settings) //['first', 'last', 'positionid']  ['project', 'description']
    }
  },
  methods: {
    onSubmit() {
      // validace ??????
      // když je vše ok:
      this.$emit('submited', this.formData)
    },
    onChanged(payload) {
      this.formData[payload.control] = payload.value
    }
  },
  components: { TControl }
}

</script>