<template>
  <div>
    <label :for="control">{{ settings.label }}</label>

    <select v-if="settings.type === 'select'" :id="control" :value="value" @change="emitValue">
      <option value=""></option>
      <option v-for="option in settings.options" :value="option.value">{{ option.label }}</option>
    </select>

    <textarea v-else-if="settings.type === 'textarea'" :value="value" :id="control" @input="emitValue"></textarea>

    <TDatepicker v-else-if="settings.type === 'date'" :settings="settings" :control="control" @inputed="onInputed"/>
    <TInput v-else :settings="settings" :control="control" @inputed="onInputed"/>
    <!-- <input v-else :type="settings.type" :id="control" :value="value" @input="emitValue"> -->

  </div>
</template>

<script>
import TInput from './TInput.vue'
import TDatepicker from './TDatepicker.vue'
export default {
  props: {
    formName: String,
    control: String,
    settings: Object
  },
  data () {
    return {
      value: ''
    }

  },
  created () {
    if (this.settings.initialValue === 0) {
      this.value = 0
    } else {
      this.value = this.settings.initialValue || ''
    }
  },
  computed: {
    // settings () {
    //   return this.$store.state.formSettings[this.formName][this.control]
    // }
  },
  methods: {
    emitValue (e) {
      this.value = e.target.value
      this.$emit('changed', {
        control: this.control,
        value: this.value
      })
    },
    onInputed (value) {
      this.value = value
      this.$emit('changed', {
        control: this.control,
        value: this.value
      })
    }
  },
  components: { TInput, TDatepicker }
}


</script>