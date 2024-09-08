<template>
  <button @click="$emit('clicked')">{{  label  }}</button>
</template>
<script>

export default {
  props: {
    label: String
  }
}

</script>