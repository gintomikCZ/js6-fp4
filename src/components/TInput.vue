<template>
   <input :type="settings.type" :id="control" :value="value" @input="onInput">
</template>

<script>

export default {
  props: {
    settings: Object,
    control: String
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.settings.initialValue || ''
  },
  methods: {
    onInput (e) {
      this.value = e.target.value
      this.$emit('inputed', this.value)
    }
  }
}

</script>