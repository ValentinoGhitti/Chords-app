<template>
  <div class="entry-container  d-flex mb-1 pointer p-1" @click="$router.push({name: 'entry', params: { id: entry.id }})">
    <div >
      <img
        v-if="entry.picture"
        :src="entry.picture" 
        alt="entry-picture"
        class="avatar mx-3"
      >
    </div>
    <div class="">
      <div class="entry-title-list mx-4 d-flex">
        <h6 class="">{{shortTitle}}</h6>
      </div>
      <!-- Descripción -->
      <div class=" d-flex mx-4">
        <span class="text-muted">{{shortArtist}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Entry',
  computed: {
    shortArtist() {
      return ( this.entry.artist.length > 130)
        ? this.entry.artist.substring(0, 130) + '...'
        : this.entry.artist
    },
    shortTitle() {
      return ( this.entry.title.length > 20)
        ? this.entry.title.substring(0, 30) + '...'
        : this.entry.title
    },
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45) ;
  }

  .entry-title-list {
    font-size: 20px;
    font-weight: bolder;
  }
}

.avatar {
  width: 65px;
  border-radius: 100px;
} 

</style>