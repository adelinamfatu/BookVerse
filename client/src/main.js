import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Vuex Store
import store from './store'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.use(store)

registerPlugins(app)

app.mount('#app')
