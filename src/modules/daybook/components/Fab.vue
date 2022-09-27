<template>
  <button @click="$emit('on:click')" class="btn btn-secondary">
    <i :class="icon" class="fa fa-2x"></i>
  </button>
</template>

<script>
export default {
  name: 'Fab',
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    border-radius: 100%;
    bottom: 20px;
    height: 80px;
    position: fixed;
    right: 20px;
    width: 80px;
  }
</style>