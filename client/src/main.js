import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Vuex Store
import store from './store'

// Composables
import { createApp } from 'vue'

// Toastify
import 'vue3-toastify/dist/index.css';
import VueToastify from 'vue3-toastify';

const app = createApp(App)

app.use(store)

app.use(VueToastify);

registerPlugins(app)

app.mount('#app')
