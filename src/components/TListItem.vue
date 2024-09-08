<template>
  <li :class="{
    'bg-success': highlight === 'success',
    'bg-danger': highlight === 'danger'
  }">
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <button v-if="editBtn" @click.stop="$emit('edit-click')">{{  editBtnLabel }}</button>
      <button v-if="deleteBtn" @click.stop="$emit('delete-click')">{{ deleteBtnLabel }}</button>
    </div>
  </li>
</template>

<script>

export default {
  props: {
    editBtn: {
      type: Boolean,
      default: true
    },
    deleteBtn: {
      type: Boolean,
      default: true
    },
    editBtnLabel: {
      type: String,
      default: 'edit'
    },
    deleteBtnLabel: {
      type: String,
      default: 'delete'
    },
    highlight: {
      type: String,
      default: '',
      validator: (v) => ['', 'danger', 'success'].indexOf(v) > - 1
      // validator: (v) => v === 'danger' || v === 'success' || v === ''
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '../styles/variables.styl'
li {
  display: flex;
  gap: 1rem;
  padding: .35em .7em;
  align-items: center;
}
li:not(:last-child) {
  border-bottom: 1px solid $border-color;
}
.left {
  flex-grow: 1;
}
.right {
  display: flex;
  gap: 1rem;
}
.bg-success {
  background: $success-color;
}
.bg-danger {
  background: $danger-color;
}
</style>