<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex flex-column flex-md-row flex-lg-row">
    <div class="col-sm-1 col-lg-2 col-md-2">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
  export default {
    name: 'DayBookLayout',
    components: {
      Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
      EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
    },
    methods: {
      ...mapActions('journal', ['loadEntries'])
    },
    computed: {
      ...mapState('journal', ['isLoading'])
    },
    created() {
      this.loadEntries()
    }
  }
</script>