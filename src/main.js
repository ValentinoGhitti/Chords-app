import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from './styles/styles.scss'
import CKEditor from '@ckeditor/ckeditor5-vue';

createApp(App)
  .use(store)
  .use(bootstrap)
  .use(CKEditor)
  .use(router)
  .mount('#app')
