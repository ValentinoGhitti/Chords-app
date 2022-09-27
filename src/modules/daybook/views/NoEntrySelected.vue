<template>
  <div class="d-flex flex-column justify-content-center">
    <h1 class="align-self-center">No hay canción seleccionada</h1>
    <img src="../../../../public/img/empty-entry.jpg" class="align-self-center" height="500" width="550" alt="empty-entry">
  </div>

  <Fab 
    @on:click="createNewEntry"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'NoEntrySelected',
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  },
  methods: {
    createNewEntry() {
      this.$router.push({name: 'entry', params: {id: 'new'}})
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    height: 100%;
  }
</style>