<template>
  <template v-if="entry">
    <div class="entry-title d-flex flex-column flex-md-row flex-lg-row justify-content-between border-bottom border-dark bg-light">
      <div class="d-flex flex-column col-5">
        <div class="d-flex">
          <div >
            <img
              v-if="entry.picture && !localImage"
              :src="entry.picture" 
              alt="entry-picture"
            >
            <img
              v-if="localImage"
              :src="localImage" 
              alt="entry-picture"
            >
          </div>
          <div class="col-1"></div>

          <div class="col-6">
            <div>
              <i class="fa-solid fa-user-tie p-1"></i>
              <span class="fs-6">{{entry.title}}</span>
            </div>
            <div>
              <i class="fa-solid fa-compact-disc p-1"></i>
              <span class="text-muted">{{entry.artist}}</span>
            </div>
          </div>
        </div>
      </div>

      <input 
        type="file"
        @change="onSelectedImage"
        ref="imageSelector"
        v-show="false"
        accept="image/png, image/jpeg"
      >

      <div class="d-flex justify-content-between m-1 flex-md-row flex-lg-row" >
        <div>
          <button v-if="entry.id" @click="onDeleteEntry()" class="btn btn-danger text-dark mx-2">
            Borrar
            <i class="fa fa-trash-alt"></i>
          </button>
        </div>

        <div>
          <button class="btn btn-success" @click="onSelectImage">
            Subir foto
            <i class="fa fa-upload"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="d-flex flex-column px-3 mt-3 h-75 bg-light">
      <div class="d-flex justify-content-between">
        <div class="mb-3 col-3">
          <label for="exampleFormControlInput1" class="form-label">Ingrese el artista</label>
          <input type="text" v-model="entry.artist" class="form-control" id="exampleFormControlInput1" placeholder="Ingrese su titulo">
        </div>
        <div class="col-1"></div>
        <div class="mb-3 col-3 ">
          <label for="exampleFormControlInput1" class="form-label">Ingrese el titulo</label>
          <input type="text" v-model="entry.title" class="form-control" id="exampleFormControlInput1" placeholder="Ingrese su titulo">
        </div>
      </div>

      <div>
        <label for="exampleFormControlTextarea1" class="form-label">Ingresa tu entrada</label>
        <ckeditor 
          class="form-control ck-editor__editable"
          v-model="entry.text"
          :config="editorConfig"
          :editor="editor"
          @ready="onReady"
        ></ckeditor>
      </div>
    </div>
  </template>

  <Fab 
    icon="fa-save"
    class="bg-success"
    @on:click="saveEntry()"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import uploadImage from '../helpers/uploadImage'

export default {
  name: 'EntryView',
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
      editor: DecoupledEditor,
      editorConfig: {
        placeholder: 'Hola Vachu, ¿Qué canción vamos a tocar hoy?',
        toolbar: [
          'heading', 
          'bold', 
          'italic', 
          '|', 
          'fontColor', 
          'fontSize',
          'fontFamily',
          '|', 
          'undo',
          'redo',
          'alignment',
          'wproofreader'
        ]
      }
    }
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  },

  methods: {
    ...mapActions( 'journal', ['updateEntry', 'deleteEntry' , 'createEntry'] ),
    loadEntry() {
      let entry 
      if( this.id === 'new') {
        entry = {
          text: '',
          title: '',
          artist: '',
          picture: null
        }
      } else {
        entry = this.getEntryById( this.id )
        if(!entry) return this.$router.push({ name: 'non-existent-entry' })
      }
      this.entry = entry
    },

    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()
      const picture = await uploadImage( this.file )

      this.entry.picture = picture

      if ( this.entry.id ) {
        await this.updateEntry(this.entry)
      } else {
        const id = await this.createEntry(this.entry)
        this.$router.push({name: 'entry', params: { id }})
      }
      this.file = null
      this.localImage = null
      Swal.fire('Guardado', 'Canción Agregada', 'success', '', '', '#1b2e35')
    },
    
    async onDeleteEntry() {
      const {isConfirmed} = await Swal.fire({
        title: '¿Estás seguro de borrar la entrada?',
        text: 'Si borrás la entrada será eliminada para siempre',
        showDenyButton: true,
        confirmButtonColor: '#5be3aa',
        confirmButtonText: 'Sí, estoy seguro',
        
      })
      
      if (isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntry(this.entry.id)
        this.$router.push({name: 'no-entry'})
        Swal.fire('Eliminado Vachu','','success')      
      }
    },
    
    onSelectedImage(event) {
      const file = event.target.files[0]
      if (!file) {
        this.localImage = null
        this.file = null
        return
      }
      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },

    onSelectImage() {
      this.$refs.imageSelector.click()
    },
    onReady(editor)  {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    }
  },  

  computed: {
    ...mapGetters('journal', ['getEntryById']),
  },

  created() {
    this.loadEntry()
  },

  //old-value/new-value
  watch: {
    id() {
      this.loadEntry()
    }
  },
}
</script>

<style lang="scss" scoped>
  textarea {
    font-size: 20px;
    height: 100%;

    &:focus {
      outline: none;
    }
  }

  img {
    width: 150px;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  }

  .ck-editor__editable {
    max-height: 550px;
  } 
</style>