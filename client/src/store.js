import { createStore } from 'vuex';
import authModule from './vuex/auth'
import sidebarModule from './vuex/sidebar'

const store = createStore({
  modules: {
    auth: authModule, 
    sidebar: sidebarModule
  },
});

export default store;