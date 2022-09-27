<template>
  <div class="entry-list-container">
    <div class="input-group mt-3 d-flex justify-content-center">
      <div class="form-outline">
        <input 
          class="form-control  " 
          type="text"
          v-model="term"
          id="example-search-input"
          placeholder="Buscar canción"
        > 
      </div>
      <button id="search-button" type="button" class="btn btn-primary">
        <i class="fas fa-search"></i>
      </button>
    </div>

    
    <div class="mt-2 d-flex flex-column mt-3 mb-3">
      <button class="btn btn-success text-dark mx-3" @click="$router.push({ name: 'entry', params: {id: 'new'}})">
        <span class="p-2">Agregar nueva entrada</span>
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters  } from 'vuex';

export default {
  name: 'EntryList',
  components: {
    Entry: defineAsyncComponent(() => import('./Entry.vue'))
  },
  computed: {
    ...mapGetters('journal', ['getEntriesByTerm']),
    entriesByTerm() {
      return this.getEntriesByTerm( this.term )
    }
  },
  data() {
    return {
      term: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc( 100vh - 56px );
}

.entry-scrollarea {
  height: calc( 100vh - 130px );
  overflow: scroll;
}


</style>