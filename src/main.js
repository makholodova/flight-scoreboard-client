import './assets/main.css'
import './plugins/vuetify.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
/*import VueMoment from 'vue-moment'*/

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const pinia = createPinia()
const app = createApp(App)

/*app.use(VueMoment);*/
/*app.use(require('vue-moment'))*/

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
